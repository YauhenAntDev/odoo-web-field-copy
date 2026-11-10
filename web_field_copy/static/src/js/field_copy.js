/** @odoo-module **/
// License LGPL-3.0 (https://www.gnu.org/licenses/lgpl-3.0.html).

import { CopyButton } from "@web/core/copy_button/copy_button";
import { patch } from "@web/core/utils/patch";
import { CharField } from "@web/views/fields/char/char_field";
import { TextField } from "@web/views/fields/text/text_field";

// Keep core clipboard handling; only the icon's accessible name is customized.
class FieldCopyButton extends CopyButton {
    static template = "web_field_copy.CopyButton";
}

patch(CharField, {
    components: {
        ...CharField.components,
        CopyButton: FieldCopyButton,
    },
});

patch(CharField.prototype, {
    get copyContent() {
        return () =>
            this.props.readonly
                ? this.props.record.data[this.props.name] || ""
                : (this.input.el?.value ?? this.props.record.data[this.props.name]) || "";
    },
});

patch(TextField, {
    components: {
        ...TextField.components,
        CopyButton: FieldCopyButton,
    },
});

patch(TextField.prototype, {
    get copyContent() {
        return () =>
            this.props.readonly
                ? this.props.record.data[this.props.name] || ""
                : (this.textareaRef.el?.value ?? this.props.record.data[this.props.name]) || "";
    },
});
