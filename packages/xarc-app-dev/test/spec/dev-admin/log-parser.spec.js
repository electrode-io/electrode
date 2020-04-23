"use strict";

const expect = require("chai").expect;
const { parse } = require("../../../lib/dev-admin/log-parser");

describe("log-parser", function() {
  it("should return correct level and message for a simple error", () => {
    const raw = "error: Something unexpected happened";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal("error: Something unexpected happened");
  });

  it("should return correct level and message for a simple info", () => {
    const raw = "Totally normal thing happened";
    const { level, message } = parse(raw);
    expect(level).equal("info");
    expect(message).equal("Totally normal thing happened");
  });

  it("should return the first level another level is detected midway through the message", () => {
    const raw =
      "warn: An issue was detected in electrode error: Unable to load secrets file /secrets/ccm-secrets.json";
    const { level, message } = parse(raw);
    expect(level).equal("warn");
    expect(message).equal(
      "warn: An issue was detected in electrode error: Unable to load secrets file /secrets/ccm-secrets.json"
    );
  });

  it("should detect Unhandled rejection messages as an error when they are annotated 'info'", () => {
    const raw = "info: Unhandled rejection ReferenceError: PropTypes is not defined";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal(raw);
  });

  it("should detect Unhandled rejection messages as an error when they are annotated 'debug'", () => {
    const raw =
      "debug: Unhandled rejection (rejection id: 3): TypeError: Cannot read property 'Electrode' of undefined";
    const { level, message } = parse(raw);
    expect(level).equal("error");
    expect(message).equal(raw);
  });

  it("should return info for level and raw message for message if the log line does not match any known format", () => {
    const raw = "This - is! an? unrecognized# format@";
    const { level, message } = parse(raw);
    expect(level).equal("info");
    expect(message).equal(raw);
  });
});
