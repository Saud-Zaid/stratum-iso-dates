# Stratum ISO Dates

An Obsidian plugin that writes dates with ASCII digits (`2026-11-19`) when the interface language prints Arabic-Indic or Persian digits.

## The problem

Obsidian's `moment` formats with the digits of the interface language. With an Arabic interface, `YYYY-MM-DD` becomes `٢٠٢٦-١١-١٩`. Templater, Daily Notes, QuickAdd and Tasks then write that string into notes. It is not a date: Dataview, Tasks queries and any date comparison skip it.

## What it does

It wraps `moment.fn.format` and converts the digits `٠-٩` and `۰-۹` in the **output** to `0-9`. Month names, weekday names and the Arabic comma `،` are left as they are. Unloading the plugin restores the original function; it never wraps twice and never undoes a wrapper that another plugin put on top of it.

## Limits

- It changes what `format` returns everywhere in Obsidian, including text you meant to show in the language's own digits.
- It does not change parsing, and it does not touch text typed by hand.
- It has been tested against `moment` 2.30.1 with the `ar`, `ar-sa`, `fa` and `en` locales, not inside a running Obsidian.

## Install

Copy `main.js` and `manifest.json` from the latest release into `.obsidian/plugins/stratum-iso-dates/`, then enable it in Settings, Community plugins. The [Stratum](https://github.com/Saud-Zaid/Stratum) vault installs it from its lock file.

## License

MIT, see [LICENSE](LICENSE).
