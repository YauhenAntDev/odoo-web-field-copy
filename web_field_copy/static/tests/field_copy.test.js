// License LGPL-3.0 (https://www.gnu.org/licenses/lgpl-3.0.html).

import { beforeEach, expect, test } from "@odoo/hoot";
import { press, queryOne } from "@odoo/hoot-dom";
import { animationFrame } from "@odoo/hoot-mock";
import { browser } from "@web/core/browser/browser";
import {
    defineModels,
    fields,
    mockService,
    models,
    mountView,
    patchWithCleanup,
} from "@web/../tests/web_test_helpers";
import "@web_field_copy/js/field_copy";

class CopyRecord extends models.Model {
    _name = "field.copy.record";

    name = fields.Char();
    notes = fields.Text();

    _records = [{ id: 1, name: "Product", notes: "First line\nSecond line" }];
}

defineModels([CopyRecord]);

beforeEach(() => {
    patchWithCleanup(browser.navigator.clipboard, {
        async writeText(value) {
            expect.step(value);
        },
    });
});

for (const [field, tag] of [
    ["name", "input"],
    ["notes", "textarea"],
]) {
    for (const readonly of [false, true]) {
        for (const value of [false, "", field === "notes" ? "One\nTwo\n" : "Example"]) {
            test(`${field}: copy ${JSON.stringify(value)} with readonly=${readonly}`, async () => {
                CopyRecord._records[0][field] = value;
                await mountView({
                    type: "form",
                    resModel: "field.copy.record",
                    resId: 1,
                    arch: `<form><field name="${field}" readonly="${readonly ? "1" : "0"}"/></form>`,
                });
                expect(".o_field_copy_button").toHaveCount(1);
                // Content test: an empty readonly field can be hidden by Odoo.
                queryOne(".o_field_copy_button").click();
                await animationFrame();
                expect.verifySteps([value || ""]);
            });
        }
    }

    test(`${field}: copy live unsaved input without committing the record`, async () => {
        const view = await mountView({
            type: "form",
            resModel: "field.copy.record",
            resId: 1,
            arch: `<form><field name="${field}"/></form>`,
        });
        const savedValue = view.model.root.data[field];
        const value = field === "notes" ? "  Unsaved\nmultiline text\n" : "  Unsaved name  ";
        const input = queryOne(`[name='${field}'] ${tag}`);
        input.focus();
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        expect(view.model.root.data[field]).toBe(savedValue);
        // Native click avoids a blur/change that could mask a stale-record bug.
        queryOne(".o_field_copy_button").click();
        await animationFrame();
        expect.verifySteps([value]);
        expect(view.model.root.data[field]).toBe(savedValue);
    });
}

for (const readonly of [false, true]) {
    test(`password field has no copy button with readonly=${readonly}`, async () => {
        await mountView({
            type: "form",
            resModel: "field.copy.record",
            resId: 1,
            arch: `<form><field name="name" password="1" readonly="${readonly ? "1" : "0"}"/></form>`,
        });
        expect(".o_field_copy_button").toHaveCount(0);
    });
}

test("readonly copy buttons have labels and support Tab and Enter", async () => {
    await mountView({
        type: "form",
        resModel: "field.copy.record",
        resId: 1,
        arch: `<form><field name="name" readonly="1"/><field name="notes" readonly="1"/></form>`,
    });
    const first = queryOne("[name='name'] .o_field_copy_button");
    const second = queryOne("[name='notes'] .o_field_copy_button");
    expect(first).toHaveAttribute("aria-label", "Copy to clipboard");
    expect(second).toHaveAttribute("aria-label", "Copy to clipboard");
    first.focus();
    expect(first).toBeFocused();
    expect(getComputedStyle(first).opacity).toBe("1");
    await press("Tab");
    expect(second).toBeFocused();
    expect(getComputedStyle(second).opacity).toBe("1");
    await press("Enter");
    await animationFrame();
    expect.verifySteps(["First line\nSecond line"]);
});

test("successful copy retains the core Copied feedback", async () => {
    mockService("popover", {
        add(element, component, props) {
            expect(props.tooltip).toBe("Copied");
            expect.step("feedback");
            return () => {};
        },
    });
    await mountView({
        type: "form",
        resModel: "field.copy.record",
        resId: 1,
        arch: `<form><field name="name"/></form>`,
    });
    queryOne(".o_field_copy_button").click();
    await animationFrame();
    expect.verifySteps(["Product", "feedback"]);
});

test("product-style textarea does not grow on every input event", async () => {
    await mountView({
        type: "form",
        resModel: "field.copy.record",
        resId: 1,
        arch: `<form><h1><field name="name" widget="text" options="{'line_breaks': False}"/></h1></form>`,
    });
    const input = queryOne("textarea");
    await animationFrame();
    const initialHeight = input.getBoundingClientRect().height;
    for (let i = 0; i < 5; i++) {
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await animationFrame();
    }
    expect(input.getBoundingClientRect().height).toBe(initialHeight);
    const buttons = queryOne(".o_field_input_buttons");
    expect(input.getBoundingClientRect().right <= buttons.getBoundingClientRect().left + 1).toBe(true);
});

test("clipboard rejection does not report success or change the field", async () => {
    patchWithCleanup(browser.navigator.clipboard, {
        async writeText() {
            throw new Error("Clipboard denied");
        },
    });
    patchWithCleanup(browser.console, {
        warn(error) {
            expect.step(error.message);
        },
    });
    mockService("popover", {
        add() {
            expect.step("unexpected success");
            return () => {};
        },
    });
    await mountView({
        type: "form",
        resModel: "field.copy.record",
        resId: 1,
        arch: `<form><field name="name"/></form>`,
    });
    queryOne(".o_field_copy_button").click();
    await animationFrame();
    expect("input.o_input").toHaveValue("Product");
    expect.verifySteps(["Clipboard denied"]);
});
