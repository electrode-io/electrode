"use strict";

const installToolsItem = require("../../../lib/menu-items/install-tools");
const expect = require("chai").expect;
const sinon = require("sinon");
const checkModule = require("../../../lib/util/check-module");
const logger = require("../../../lib/util/logger");
const helpers = require("../../../lib/util/helpers");
const _ = require("lodash");

describe("menu-item install-tools", function() {
  this.timeout(10000);
  let logs = [];
  let logStub;
  let spinnerStub;

  before(() => {
    logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
    spinnerStub = sinon.stub(helpers, "makeSpinner").callsFake(() => {
      return { start: _.noop, stop: _.noop };
    });
  });

  after(() => {
    logStub.restore();
    spinnerStub.restore();
  });

  const makeStubs = (name, globalVersion, latestVersion) => {
    name = name || "xclap-cli";
    const stubs = {};
    stubs.globalInstalledStub = sinon.stub(checkModule, "globalInstalled").callsFake(n => {
      expect(n).to.equal(name);
      return globalVersion;
    });
    stubs.latestStub = sinon.stub(checkModule, "latest").callsFake(n => {
      expect(n).to.equal(name);
      return latestVersion;
    });
    stubs.restore = () => {
      stubs.globalInstalledStub.restore();
      stubs.latestStub.restore();
    };
    return stubs;
  };

  const makeYesNoStub = yes => {
    const stubs = {};
    stubs.yesNoStub = sinon.stub(helpers, "yesNoPrompt").callsFake(q => {
      stubs.question = q;
      return Promise.resolve(yes);
    });
    stubs.restore = () => stubs.yesNoStub.restore();
    return stubs;
  };

  const makeNpmInstallStub = resolve => {
    const stubs = {};
    const npmInstallStub = (stubs.npmInstallStub = sinon.stub(helpers, "npmInstall"));
    if (resolve) {
      stubs.npmInstallStub = npmInstallStub.returns(Promise.resolve());
    } else {
      stubs.npmInstallStub = npmInstallStub.callsFake(() => {
        const error = new Error("blah");
        error.output = { stdout: "{}\n" };
        return Promise.reject(error);
      });
    }
    stubs.restore = () => {
      stubs.npmInstallStub.restore();
    };
    return stubs;
  };

  const makeshowManualInstallMsgStub = () => {
    const stubs = {};
    stubs.showManualInstallMsgStub = sinon.stub(helpers, "showManualInstallMsg");
    stubs.restore = () => {
      stubs.showManualInstallMsgStub.restore();
    };
    return stubs;
  };

  it("should create menu item", () => {
    const mi = installToolsItem();
    expect(mi.emit).to.exist;
    expect(mi.icon).to.exist;
    expect(mi.execute).to.exist;
  });

  it("should prompt user to install if latest is newer", () => {
    logs = [];
    const stubs = makeStubs(undefined, "1.0.0", "1.0.1");
    const yesNoStub = makeYesNoStub(true);
    const npmInstallStub = makeNpmInstallStub(true);
    const mi = installToolsItem();
    return mi
      .execute()
      .then(() => {
        expect(logs).to.deep.equal([]);
        expect(yesNoStub.question).to.equal("Update xclap-cli to version 1.0.1");
        expect(npmInstallStub.npmInstallStub.args).to.deep.equal([["xclap-cli", "1.0.1", true]]);
      })
      .finally(() => {
        stubs.restore();
        yesNoStub.restore();
        npmInstallStub.restore();
      });
  });

  it("should show manual install message if the system doesn't support", () => {
    logs = [];
    const stubs = makeStubs(undefined, "1.0.0", "1.0.1");
    const npmInstallStub = makeNpmInstallStub(false);
    const yesNoStub = makeYesNoStub(true);
    const manualInstallStub = makeshowManualInstallMsgStub();
    const mi = installToolsItem();
    return mi
      .execute()
      .then(() => {
        expect(manualInstallStub.showManualInstallMsgStub).to.be.calledOnce;
      })
      .finally(() => {
        stubs.restore();
        yesNoStub.restore();
        npmInstallStub.restore();
        manualInstallStub.restore();
      });
  });

  it("should not install if user answer no", () => {
    logs = [];
    const stubs = makeStubs(undefined, "1.0.0", "1.0.1");
    const yesNoStub = makeYesNoStub(false);
    const mi = installToolsItem();
    return mi
      .execute()
      .then(() => {
        expect(logs).to.deep.equal([]);
        expect(yesNoStub.question).to.equal("Update xclap-cli to version 1.0.1");
      })
      .finally(() => {
        stubs.restore();
        yesNoStub.restore();
      });
  });

  it("should show congrat message if user already has latest", () => {
    logs = [];
    const stubs = makeStubs(undefined, "1.0.0", "1.0.0");
    const mi = installToolsItem();
    return mi
      .execute()
      .then(() => {
        expect(logs[0]).includes(
          "Congratulations, you've already installed the latest xclap-cli@1.0.0 globally."
        );
      })
      .finally(() => {
        stubs.restore();
      });
  });

  it("should prompt messages if xclap-cli is not being installed", done => {
    logs = [];
    let event;
    const stubs = makeStubs(undefined, "0.0.0", "1.0.0");
    const mi = installToolsItem();
    mi.index = 1;
    mi.emit("pre_show", {
      menu: { emit: () => (event = true) }
    });

    setTimeout(() => {
      stubs.restore();
      expect(event).to.equal(true);
      expect(logs[0]).includes("You don't have xclap-cli installed.  Pick option 1 to install it.");
      done();
    }, 30);
  });

  it("should prompt messages if xclap-cli is not being installed", done => {
    logs = [];
    let event;
    const stubs = makeStubs(undefined, "1.0.0", "1.0.1");
    const mi = installToolsItem();
    mi.index = 1;
    mi.emit("pre_show", {
      menu: { emit: () => (event = true) }
    });

    setTimeout(() => {
      stubs.restore();
      expect(event).to.equal(true);
      expect(logs[0]).includes(
        "New version 1.0.1 of xclap-cli available.  Pick option 1 to update it."
      );
      done();
    }, 30);
  });

  it("should not prompt messages if no newer version", done => {
    logs = [];
    let event;
    const stubs = makeStubs(undefined, "1.0.1", "1.0.0");
    const mi = installToolsItem();
    mi.emit("pre_show", {
      menu: { emit: () => (event = true) }
    });

    setTimeout(() => {
      stubs.restore();
      expect(event).to.equal(undefined);
      done();
    }, 30);
  });

  it("should only check for update once", done => {
    let event = 0;
    const stubs = makeStubs("xclap-cli", "1.0.0", "1.0.1");
    const mi = installToolsItem();
    const options = {
      menu: { emit: () => event++ }
    };
    mi.emit("pre_show", options);
    mi.emit("pre_show", options);

    setTimeout(() => {
      stubs.restore();
      expect(event).to.equal(1);
      done();
    }, 30);
  });
});
