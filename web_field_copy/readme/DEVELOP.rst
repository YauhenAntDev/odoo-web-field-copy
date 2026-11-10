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
