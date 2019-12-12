"use strict";

const ck = require("chalker");
const { Levels } = require("./log-reader");

// eslint-disable-next-line no-control-regex
const LogParse = /^(?:\u001b\[[0-9]+?m)?([a-z]+)(?:\u001b\[[0-9]+?m)?:(?: ([\s\S]*))?$/;
// eslint-disable-next-line no-control-regex
const FyiLogParse = /^(?:\u001b\[[0-9]+?m)?FYI ([a-z]+):(?:\u001b\[[0-9]+?m)?(?: ([\s\S]*))?$/;
const UnhandledRejection = /([a-zA-Z]+): Unhandled rejection .*/;

const FyiTag = ck`<yellow.inverse>[fyi]</> `;
const BunyanTag = ck`<cyan.inverse>[byn]</> `;
const BunyanLevelLookup = {
  60: "error",
  50: "error",
  40: "warn",
  30: "info",
  20: "debug",
  10: "silly"
};
const parsers = [
  {
    custom: (raw) => raw.match(UnhandledRejection) ? [raw, "error", raw] : undefined,
    prefix: ""
  },
  {regex: LogParse, prefix: ""},
  {regex: FyiLogParse, prefix: FyiTag}
];

function parseRegex(raw, parser) {
  const match = parser.custom ? parser.custom(raw) : raw.match(parser.regex);
  if (!match) {
    return false;
  }

  const level = match[1];
  const message = parser.prefix + (match[2] || ""); // eslint-disable-line no-magic-numbers

  if (!Levels.hasOwnProperty(level)) {
    // Unrecognized level probably means this is a malformed log line
    return false;
  }

  return {
    level,
    message
  };
}

function parse(raw) {
  for (let lcv = 0; lcv < parsers.length; lcv++) {
    const match = parseRegex(raw, parsers[lcv]);
    if (match) {
      return match;
    }
  }

  try {
    const bunyanLogLine = JSON.parse(raw);
    const level = BunyanLevelLookup[bunyanLogLine.level];
    if (level) {
      return {
        level,
        message: BunyanTag + bunyanLogLine.msg
      };
    }
  } catch (e) {} // eslint-disable-line no-empty

  return {
    level: "info",
    message: raw
  };
}

module.exports = {
  BunyanTag,
  FyiTag,
  parse
};
