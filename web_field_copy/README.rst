Web Field Copy Button
=====================

Odoo 19.0 | Version 19.0.1.0.0 | LGPL-3


Description
-----------

Add an icon-only copy button to standard Char and Text widgets in Odoo 19.0.
Copy values from readonly fields or the current input while editing, without
saving first. The addon uses Odoo's built-in clipboard component and success
tooltip. Char fields marked as passwords are excluded.

No per-field configuration or server-side models are required. The extension
applies wherever these standard components are used, including their list
variants; custom widgets with separate templates are not automatically covered.

Installation
------------

1. Place web_field_copy in a directory listed in Odoo's addons_path.
2. Restart Odoo, update the Apps list, and remove the Apps filter if necessary.
3. Install **Web Field Copy Button**.
4. When updating an existing installation, upgrade the addon and reload the
   browser so the updated assets and translations are loaded.

Requires Odoo 19.0 and the standard web addon. No additional Python or
JavaScript runtime dependencies are introduced. Use HTTPS, or localhost during
development, for browser clipboard access.

Usage
-----

Hover over a Char or Text field and select the clipboard icon. While editing,
the value currently in the input or textarea is copied. Multiline text is
preserved. Odoo displays its **Copied** tooltip after a successful write.

Keyboard users can Tab to the button and activate it with Enter or Space. The
button becomes visible on focus and has an accessible name and focus outline.
On devices reporting no hover or a coarse pointer, the button stays visible.

Password Char fields do not show a copy button. Empty editable values copy an
empty string; Odoo may hide an entirely empty readonly field.

Known issues / Roadmap
----------------------

Known limitations
~~~~~~~~~~~~~~~~~

* Global component patches can interact with third-party addons that replace
  Char/Text templates, copy component registries, or redefine the same methods.
  Verify combinations in the target database.
* Explicit CopyClipboardChar widgets already embed a Char widget and their
  own copy button, so they can display two copy controls with this addon.
* Browser policy, permissions, and secure-context requirements still apply.
  On failure, Odoo's core component logs a warning and does not show success;
  this addon does not add a separate error notification.
* The core success tooltip is retained; screen-reader announcement of that
  tooltip has not been verified.
* Odoo's normal blur/change processing can trim input according to field
  configuration. The addon copies the value available at activation time.
* Narrow viewports, translations, RTL, touch hardware, and third-party themes
  need browser acceptance checks. The textarea fix prevents flex stretching
  from feeding the previous wrapper height into Odoo's auto-resize calculation.

This is a preparation draft for a possible OCA contribution, not an OCA-approved
or OCA-maintained release. Complete author details and run repository checks.

Changelog
---------

19.0.1.0.0 (unreleased)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Copy from standard Char/Text fields in readonly and edit modes.
* Preserve current input values and exclude masked Char fields.
* Add accessible icon labels, keyboard focus styling, and touch visibility.
* Keep buttons beside editable content and preserve textarea auto-resizing.
* Add Odoo 19 HOOT regression tests and contribution documentation.

Development
-----------

Automated tests
~~~~~~~~~~~~~~~

Tests are registered in web.assets_unit_tests. On a disposable Odoo 19 database
with this addon installed, open /web/tests and select the web_field_copy suite
in the HOOT interface. JavaScript syntax checks do not execute these tests.

The suite covers Char/Text values in readonly and edit modes, empty values,
unsaved values without a blur commit, multiline text, password exclusion,
keyboard focus/activation, success feedback, and textarea height regression.

Manual acceptance
~~~~~~~~~~~~~~~~~

* Check form and editable list views at desktop and narrow mobile widths.
* Tab to readonly and editable buttons; check the focus outline and activate
  with both Enter and Space. Confirm the copied result.
* On actual touch hardware, verify the button is visible before the first tap.
* Test a translated interface, RTL, translation buttons, dynamic placeholders,
  and long names. Confirm the input does not overlap buttons.
* Type and delete in the product-name heading repeatedly. Confirm height changes
  only when content actually needs another line.
* Deny clipboard permission; verify no success tooltip and editing still works.
* Test third-party field customizations and explicit clipboard widgets.

Suggested screenshots
~~~~~~~~~~~~~~~~~~~~~

Capture real Odoo 19 screens showing a hovered readonly Char field, an editable
multiline Text field, the Copied tooltip, keyboard focus, and a mobile view.
Use non-sensitive demo data. No screenshots are supplied or fabricated here.

OCA preparation
~~~~~~~~~~~~~~~

For a future OCA contribution, confirm the target repository and technical
name with maintainers. Keep LGPL-3 and the
initial version.

This workspace has no OCA repository configuration or installed README generator.
The root README is a provisional assembly of these fragments. In an OCA/web
checkout, use its existing pre-commit configuration and regenerate documentation::

    oca-gen-addon-readme --addon-dir=web_field_copy --branch=19.0 --org-name=OCA --repo-name=web --convert-fragments-to-markdown --no-commit
    pre-commit run --all-files

The target hooks use Ruff, ESLint, Prettier, OCA checks, and README generation.
Do not copy repository configuration into this standalone addon. Verify the
generator's CLI against the installed version before running it.

Official references
~~~~~~~~~~~~~~~~~~~

* https://github.com/OCA/odoo-community.org/blob/master/website/Contribution/CONTRIBUTING.rst
* https://github.com/OCA/web/blob/19.0/.pre-commit-config.yaml
* https://github.com/OCA/maintainer-tools/blob/master/template/module/README.rst
* https://github.com/OCA/web/tree/19.0#licenses

The README template requires a description fragment and recommends usage and
contributors. Submission must pass the target repository's hooks. Legacy
guidelines also mention an images manifest entry; no fictitious image path is
added. Supply genuine screenshots if requested by checks or maintainers.

Contributors
------------

* Yauhen Antonau

No personal identity has been inferred from unrelated addons in this workspace.

License
-------

LGPL version 3; see LICENSE and the incorporated GPL terms in COPYING.
