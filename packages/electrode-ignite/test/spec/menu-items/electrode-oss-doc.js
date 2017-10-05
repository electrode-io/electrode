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

  beforeEach(() => {
    delete require.cache[require.resolve("opn")];
    mockRequire("opn", (url, opts) => opn(url, opts));
    docItem = require("../../../lib/menu-items/electrode-oss-doc");
  });

  afterEach(() => {
    mockRequire.stopAll();
  });

  it("should be ok", () => {
    const logs = [];
    const logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
    opn = (url, opts) => {
      expect(url).to.exist;
      expect(opts.wait).to.equal(false);
    };
    expect(docItem).to.exist;
    const mi = docItem();
    expect(mi.cliCmd).to.equal("docs");
    expect(mi.menuText).to.equal("Electrode official documenations");
    return mi.execute().then(() => {
      logStub.restore();
      expect(logs[0]).to.equal("Electrode docs opened in your browser, please check.");
    });
  });
});
