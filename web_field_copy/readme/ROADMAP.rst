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
