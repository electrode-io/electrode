"use strict";

const expect = require("chai").expect;
const { BunyanTag, FyiTag, parse } = require("../../../lib/dev-admin/log-parser");

describe("log-parser", function() {
  it("should return correct level and message for a simple error", () => {
    const raw = "error: Something unexpected happened";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal("Something unexpected happened");
  });

  it("should return correct level and message for a simple info", () => {
    const raw = "info: Totally normal thing happened";
    const { level, message } = parse(raw);
    expect(level).equal("info");
    expect(message).equal("Totally normal thing happened");
  });

  it("should return the first level another level is detected midway through the message", () => {
    const raw = "warn: An issue was detected in electrode error: Unable to load secrets file /secrets/ccm-secrets.json";
    const { level, message } = parse(raw);
    expect(level).equal("warn");
    expect(message).equal("An issue was detected in electrode error: Unable to load secrets file /secrets/ccm-secrets.json");
  });

  it("should detect Unhandled rejection messages as an error when they are annotated 'info'", () => {
    const raw = "info: Unhandled rejection ReferenceError: PropTypes is not defined";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal(raw);
  });

  it("should detect Unhandled rejection messages as an error when they are annotated 'debug'", () => {
    const raw = "debug: Unhandled rejection (rejection id: 3): TypeError: Cannot read property 'Electrode' of undefined";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal(raw);
  });

  it("should return correct level and message with badge for an FYI error", () => {
    const raw = "FYI error: Something unexpected happened";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal(`${FyiTag}Something unexpected happened`);
  });

  it("should return correct level and message with badge for an FYI info", () => {
    const raw = "FYI info: Totally normal thing happened";
    const { level, message } = parse(raw);
    expect(level).equal("info");
    expect(message).equal(`${FyiTag}Totally normal thing happened`);
  });

  it("should return error level and msg with badge for a node-bunyan level 50", () => {
    const raw = JSON.stringify({
      "name": "stdout",
      "hostname": "localhost",
      "pid": 131072,
      "tags": ["error"],
      "msg": "Electrode SOARI service discovery failed",
      "level": 50,
      "time": "2019-11-25T23:50:20.353Z"
    });
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal(`${BunyanTag}Electrode SOARI service discovery failed`);
  });

  it("should return silly level and msg with badge for a node-bunyan level 10", () => {
    const raw = JSON.stringify({
      "name": "stdout",
      "hostname": "localhost",
      "pid": 131072,
      "tags": ["silly"],
      "msg": "The integers have been added together",
      "level": 10,
      "time": "2019-11-25T23:50:20.353Z"
    });
    const { level, message } = parse(raw);
    expect(level).equal("silly");
    expect(message).equal(`${BunyanTag}The integers have been added together`);
  });

  it("should return correct level and message with badge for an FYI warning and colon wrapped in color escape code", () => {
    const raw = "\u001b[33mFYI warn:\u001b[39m electrode-ccm: Unable to load secrets file /secrets/ccm-secrets.json";
    const { level, message } = parse(raw);
    expect(level).equal("warn");
    expect(message).equal(`${FyiTag}electrode-ccm: Unable to load secrets file /secrets/ccm-secrets.json`);
  });

  it("should preserve color escape codes in message but not in level", () => {
    const raw = "\u001b[33msilly\u001b[39m: Electrode discoverWithSearch - \u001b[35mdiscovering\u001b[39m {\"environment\": \"qa\"}";
    const { level, message } = parse(raw);
    expect(level).equal("silly");
    expect(message).equal("Electrode discoverWithSearch - \u001b[35mdiscovering\u001b[39m {\"environment\": \"qa\"}");
  });

  it("should return info for level and raw message for message if the log line has an unknown level", () => {
    const raw = "fakelevel: Totally normal thing happened";
    const { level, message } = parse(raw);
    expect(level).equal("info");
    expect(message).equal(raw);
  });

  it("should return info for level and raw message for message if the log line does not match any known format", () => {
    const raw = "This - is! an? unrecognized# format@";
    const { level, message } = parse(raw);
    expect(level).equal("info");
    expect(message).equal(raw);
  });

  it("should mark the debugger listening message as a 'warn' so it is rendered to the console", () => {
    const raw = "Debugger listening on ws://127.0.0.1:9229/75cf1993-daff-4533-a53e-30fb92a5ad16";
    const { level, message } = parse(raw);
    expect(level).equal("warn");
    expect(message).equal("[nod] Debugger listening on ws://127.0.0.1:9229/75cf1993-daff-4533-a53e-30fb92a5ad16");
  });

  it("should mark the inspector help message as a 'warn' so it is rendered to the console", () => {
    const raw = "For help, see: https://nodejs.org/en/docs/inspector";
    const { level, message } = parse(raw);
    expect(level).equal("warn");
    expect(message).equal("[nod] For help, see: https://nodejs.org/en/docs/inspector");
  });
});
