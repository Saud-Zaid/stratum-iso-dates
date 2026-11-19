"use strict";
// stratum-iso-dates: Obsidian's moment prints Arabic-Indic and Persian digits for some interface languages, so notes get
// "created: ٢٠٢٦-١١-١٩" (a string, not a date). This wraps moment.fn.format and turns the digits of its OUTPUT into ASCII.
// Month names, weekday names and the Arabic comma are left as they are.
const { Plugin } = require("obsidian");

const NON_ASCII_DIGIT = /[٠-٩۰-۹]/;
const NON_ASCII_DIGITS = /[٠-٩۰-۹]/g;

function toAscii(text) {
  if (typeof text !== "string" || !NON_ASCII_DIGIT.test(text)) return text;   // the cheap test first: format runs very often
  return text.replace(NON_ASCII_DIGITS, (ch) => {
    const code = ch.charCodeAt(0);
    return String(code >= 0x06F0 ? code - 0x06F0 : code - 0x0660);
  });
}

const MARK = "__stratumIsoDates";

class StratumIsoDates extends Plugin {
  onload() {
    const moment = window.moment;
    if (!moment || !moment.fn || typeof moment.fn.format !== "function") return;
    if (moment.fn.format[MARK]) return;   // already wrapped (a reload without unload): never wrap twice
    const original = moment.fn.format;
    const wrapped = function (...args) {
      return toAscii(original.apply(this, args));
    };
    wrapped[MARK] = original;
    moment.fn.format = wrapped;
    this.wrapped = wrapped;
  }

  onunload() {
    const moment = window.moment;
    if (moment && this.wrapped && moment.fn.format === this.wrapped) moment.fn.format = this.wrapped[MARK];   // only undo our own wrapper
    this.wrapped = null;
  }
}

module.exports = StratumIsoDates;
module.exports.toAscii = toAscii;
