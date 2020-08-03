/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-statements, complexity */
const AnsiConvert = require("ansi-to-html");
const convert = new AnsiConvert();

const BunyanLevelLookup = {
  60: "error",
  50: "error",
  40: "warn",
  30: "info",
  20: "debug",
  10: "silly"
};

const tagLevelMap = {
  "warn:": "warn",
  "error:": "error",
  fail: "error",
  rejection: "error",
  unhandled: "error",
  exception: "error",
  "debugger listening on": "silly"
};

export function parse(str) {
  let jsonData;
  let show;

  try {
    if (str[0] === "{" || str[0] === "[") {
      jsonData = JSON.parse(str);
    }
  } catch {
    //
  }

  let message;
  let level;

  if (jsonData) {
    level = BunyanLevelLookup[jsonData.level];
    message = jsonData.msg || jsonData.message;
    if (level === "warn" || level === "error") {
      show = 2;
    }
  }

  if (!level) {
    const match = str.match(
      /warn\:|error\:|fail|rejection|unhandled|exception|debugger listening on/i
    );

    if (match) {
      const tag = match[0].toLowerCase();
      if (!level) {
        level = tagLevelMap[tag];
      }
      show = tag === "debugger listening on" ? 1 : 2;
    }
  }

  return {
    level: level || "info",
    message: message || str,
    json: jsonData,
    show
  };
}

const Levels = {
  error: {
    color: "red",
    index: 0,
    name: "error"
  },
  warn: {
    color: "yellow",
    index: 1,
    name: "warn"
  },
  info: {
    index: 2,
    name: "info"
  },
  http: {
    index: 3,
    name: "http"
  },
  verbose: {
    index: 4,
    name: "verbose"
  },
  debug: {
    index: 5,
    name: "debug"
  },
  silly: {
    index: 6,
    name: "silly"
  }
};

export function getLogEventAsHtml(event) {
  const levelInfo = Levels[event.level];
  const levelName = levelInfo.name.substring(0, 4);
  const name = levelInfo.color
    ? `<span style="color: ${levelInfo.color}">${levelName}</span>`
    : levelName;
  return `${name}: ${convert.toHtml(event.message)}`;
}
