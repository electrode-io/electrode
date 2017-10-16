"use strict";

const chalk = require("chalk");
chalk.enabled = false;
const mockRequire = require("mock-require");
const expect = require("chai").expect;
const { logger } = require("ignite-core");
const sinon = require("sinon");
describe("menu-item electrode-oss-doc", function() {
  let docItem;
  let opn;
  let logs;
  let logStub;

  beforeEach(() => {
    delete require.cache[require.resolve("opn")];
    mockRequire("opn", (url, opts) => opn(url, opts));
    docItem = require("../../../lib/menu-items/electrode-oss-doc");
    logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
  });

  afterEach(() => {
    mockRequire.stopAll();
    logStub.restore();
  });

  it("should be ok", () => {
    opn = (url, opts) => {
      expect(url).to.exist;
      expect(opts.wait).to.equal(false);
    };
    expect(docItem).to.exist;
  });

  it("should open oss doc", () => {
    logs = [];
    const mi = docItem();
    expect(mi.cliCmd).to.equal("docs");
    expect(mi.menuText).to.equal("Electrode official documenations");
    return mi.execute().then(() => {
      expect(logs[0]).to.equal("Electrode Open Source docs opened in your browser, please check.");
    });
  });

  it("should open wml doc", () => {
    logs = [];
    const mi = docItem("http://gitbook.qa.walmart.com/books/electrode-dev-guide/");
    expect(mi.cliCmd).to.equal("docs");
    expect(mi.menuText).to.equal("Electrode official documenations");
    return mi.execute().then(() => {
      expect(logs[0]).to.equal("Electrode Internal docs opened in your browser, please check.");
    });
  });
});
