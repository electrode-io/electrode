import * as util from "../../../src/node/utils";
import sinon from "sinon";
import fs from "fs";
import path from "path";
import { expect } from "chai";

describe("Util tests", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("load cdn map with relative path", () => {
    const fakeFs = sandbox.stub(fs, "readFileSync");
    fakeFs.returns(`{"cow":"bunga"}`);
    const cdnMapPath = "test-cdn-map.js";
    const result = util.loadCdnMap(cdnMapPath);
    expect(fakeFs.getCall(0).args[0]).eq(path.resolve(process.cwd(), cdnMapPath));
    expect(result).deep.eq({ cow: "bunga" });
  });

  it("load cdn map with absolute path", () => {
    const fakeFs = sandbox.stub(fs, "readFileSync");
    fakeFs.returns(`{"cow":"dung"}`);
    const cdnMapPath = "/home/user/test-cdn-map.js";
    const result = util.loadCdnMap(cdnMapPath);
    expect(fakeFs.getCall(0).args[0]).eq(cdnMapPath);
    expect(result).deep.eq({ cow: "dung" });
  });

  it("load cdn map with invalid json", () => {
    const fakeFs = sandbox.stub(fs, "readFileSync");
    fakeFs.returns(`}`);
    const cdnMapPath = "test-cdn-map.js";
    const result = util.loadCdnMap(cdnMapPath);
    expect(fakeFs.getCall(0).args[0]).eq(path.resolve(process.cwd(), cdnMapPath));
    expect(result).eq(undefined);
  });

  it("map cdn returns mapping or false", () => {
    const fileOne = "file.one";
    const fileTwo = "file.two";
    const mapping = {
      [fileOne]: "bingo"
    };
    expect(util.mapCdn(fileOne, mapping)).eq("bingo");
    expect(util.mapCdn(fileTwo, mapping)).eq(false);
    expect(util.mapCdn(fileTwo, undefined)).eq(false);
  });

  it("test wrapStringFragment", () => {
    expect(util.wrapStringFragment("fragment")).eq("fragment");
    expect(util.wrapStringFragment("fragment", "pre")).eq("prefragment");
    expect(util.wrapStringFragment("fragment", "post", "ly")).eq("postfragmently");
    expect(util.wrapStringFragment("", "post", "ly")).eq("");
  });

  it("test nonceGenerator", () => {
    const nonce = util.nonceGenerator();
    expect(nonce).match(/[A-Za-z0-9+\/]{22}/);
  });

  it("test generateNonce", () => {
    expect(util.generateNonce({ props: { nonce: false } })).deep.eq({ attr: "" });
    const generated = util.generateNonce({ props: {} });
    expect(generated.attr).match(/ nonce="[A-Za-z0-9+\/]{22}"/);
    expect(generated.nonce.tokens.all).match(/[A-Za-z0-9+\/]{22}/);
    expect(generated.nonce.tokens[""]).match(/[A-Za-z0-9+\/]{22}/);
  });

  it("test generateNonce with generator", () => {
    const nonceInfo = {
      generator: () => "ABCDEF9876",
      tokens: {}
    };
    const generated = util.generateNonce({ props: { nonce: nonceInfo } }, null, "script");
    expect(generated.attr).eq(` nonce="ABCDEF9876"`);
    expect(generated.nonce).deep.eq(nonceInfo);
  });

  it("test generateNonce with false tag", () => {
    const nonceInfo = {
      script: false,
      tokens: {}
    };
    const generated = util.generateNonce({ props: { nonce: nonceInfo } }, null, "script");
    expect(generated).deep.eq({ attr: "" });
  });

  it("test generateNonce specify nonce and tag", () => {
    const nonceInfo = {
      tokens: {
        all: "ABCDEF12345"
      }
    };
    const generated = util.generateNonce({ props: { nonce: nonceInfo } }, null, "bingo");
    expect(generated.attr).eq(` nonce="ABCDEF12345"`);
    expect(generated.nonce).deep.eq(nonceInfo);
  });

  it("test urLJoin", () => {
    expect(util.urlJoin("http://www.google.com")).eq("http://www.google.com/");
    expect(util.urlJoin("http://www.google.com", "cow", "bunga")).eq(
      "http://www.google.com/cow/bunga"
    );
    expect(util.urlJoin("http://www.google.com", "cow", "?bunga=true")).eq(
      "http://www.google.com/cow?bunga=true"
    );
    expect(util.urlJoin("http://www.google.com", "cow", "&bunga=true")).eq(
      "http://www.google.com/cow?bunga=true"
    );
    expect(util.urlJoin("http://www.google.com", "cow", "&bunga=true", "mango")).eq(
      "http://www.google.com/cow?bunga=true&mango"
    );
    expect(util.urlJoin("http://www.google.com", "cow", "&bunga=true", "mango=1")).eq(
      "http://www.google.com/cow?bunga=true&mango=1"
    );
    expect(util.urlJoin("http://www.google.com/hockey")).eq("http://www.google.com/hockey");
    expect(util.urlJoin("http://www.google.com/hockey", "mango")).eq(
      "http://www.google.com/hockey/mango"
    );
    expect(util.urlJoin("http://www.google.com?fishing=true", "cow", "?bunga=true")).eq(
      "http://www.google.com/cow?fishing=true&bunga=true"
    );
  });

  it("test safeStringifyJson", () => {
    expect(util.safeStringifyJson({ french: "<script>" })).eq(`{"french":"&lt;script>"}`);
    expect(util.safeStringifyJson({ french: "</script>" })).eq(`{"french":"&lt;/script>"}`);
    // missing <script/>
  });
});
