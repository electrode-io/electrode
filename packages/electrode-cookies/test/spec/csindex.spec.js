"use strict";

const cleanup = require("jsdom-global")();
const mockReq = require("mock-require");
const expect = require("chai").expect;

describe("csindex", () => {
  this.timeout(10000);
  let csIndex;
  beforeEach(() => {
    mockReq.reRequire("../../cookies-js");
    mockReq.reRequire("../../lib/csindex");
    csIndex = require("../../lib/csindex");
  });

  after(() => {
    cleanup();
  });

  it(".set should encode value", function() {
    const document = global.document;
    const key = "($;enc:)";
    const value = "i$xx:x;";
    csIndex.set(key, value);
    let cookie = document.cookie;
    expect(cookie).includes("%28$%3Benc%3A%29=i%24xx%3Ax%3B");
    const verifyValue = csIndex.get(key);
    expect(verifyValue).to.equal(value);
    csIndex.expire(key);
    cookie = document.cookie;
    expect(cookie).to.be.empty;
  });

  it(".set should honor skipEncoding option", function() {
    const document = global.document;
    const key = "!enc:)";
    const value = "i$xx:x";
    csIndex.set(key, value, { skipEncoding: true });
    const cookie = document.cookie;
    expect(cookie).to.equal(`${key}=${value}`);
    const verifyValue = csIndex.get(key);
    expect(verifyValue).to.equal(value);
  });
});
