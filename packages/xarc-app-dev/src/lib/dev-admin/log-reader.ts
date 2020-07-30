/* eslint-disable @typescript-eslint/no-var-requires */
export {};

const AnsiConvert = require("ansi-to-html");
const ck = require("chalker");
const fs = require("fs");
const readline = require("readline");
const convert = new AnsiConvert();

const DefaultMaxLevel = 6;

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

async function getLogsByLine(maxLevel = DefaultMaxLevel, handleLogLine) {
  return new Promise(resolve => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream("archetype-debug.log")
    });

    readInterface.on("line", event => {
      event = JSON.parse(event);
      const levelInfo = Levels[event.level];
      if (levelInfo.index > maxLevel) {
        return;
      }
      handleLogLine(event);
    });
    readInterface.on("close", resolve);
  });
}

async function getLogs(maxLevel = DefaultMaxLevel) {
  const logs = [];
  await getLogsByLine(maxLevel, event => logs.push(event));
  return logs;
}

function getLogEventAsAnsi(event) {
  const levelInfo = Levels[event.level];
  const name = levelInfo.color ? ck(`<${levelInfo.color}>${levelInfo.name}</>`) : levelInfo.name;
  return `${name}: ${event.message}`;
}

function getLogEventAsHtml(event) {
  const levelInfo = Levels[event.level];
  const name = levelInfo.color
    ? `<span style="color: ${levelInfo.color}">${levelInfo.name}</span>`
    : levelInfo.name;
  return `${name}: ${convert.toHtml(event.message)}`;
}

// eslint-disable-next-line no-console
async function displayLogs(maxLevel = DefaultMaxLevel, show = console.log) {
  await getLogsByLine(maxLevel, event => show(getLogEventAsAnsi(event)));
}

module.exports = {
  getLogsByLine,
  getLogs,
  getLogEventAsAnsi,
  getLogEventAsHtml,
  displayLogs,
  Levels
};
