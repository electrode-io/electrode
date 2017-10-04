"use strict";

const { MenuItem, PromptMenu } = require("../../..");
const helpers = require("../../../lib/util/helpers");
const readline = require("readline");
const _ = require("lodash");
const expect = require("chai").expect;
const sinon = require("sinon");
const Promise = require("bluebird");
const chalk = require("chalk");
chalk.enabled = false;

describe("prompt-menu", function() {
  let answers;
  let rlStub;
  let closed;
  const rl = {
    question: (q, cb) => {
      const x = answers.pop();
      setTimeout(() => cb(x), 1);
    },
    close: () => closed++
  };

  beforeEach(() => {
    closed = 0;
    rlStub = sinon.stub(readline, "createInterface").callsFake(() => rl);
  });

  afterEach(() => {
    rlStub.restore();
  });

  it("should default to console.log and process.exit", () => {
    const pm = new PromptMenu({});
    expect(pm._output).to.equal(console.log);
    expect(pm._exitCb).to.equal(process.exit);
  });

  it("should listen to events done, skip_prompt, prompt", () => {
    let prompted;
    const pm = new PromptMenu({});
    pm.prompt = () => (prompted = true);
    expect(Boolean(pm._exit)).to.equal(false);
    pm.emit("done");
    expect(pm._exit).to.equal(true);
    expect(Boolean(pm._skipPrompt)).to.equal(false);
    pm.emit("skip_prompt");
    expect(pm._skipPrompt).to.equal(true);
    pm.emit("prompt");
    expect(prompted).to.equal(true);
  });

  it("runMenuItem should emit pre and post execute events", () => {
    const pm = new PromptMenu({});
    const mi = new MenuItem({ execute: _.noop });
    let pre;
    let post;
    mi.on("pre_execute", () => {
      pre = true;
    });
    mi.on("post_execute", () => {
      post = true;
    });
    pm.show = () => {
      expect(pre).to.equal(true);
      expect(post).to.equal(true);
    };

    return pm.runMenuItem(mi);
  });

  it("runMenuItem should start and stop spinner", () => {
    let start = 0;
    let stop = 0;
    const makeSpinnerStub = sinon.stub(helpers, "makeSpinner").callsFake(title => {
      expect(title).includes("test spinner");
      return {
        start: () => {
          start++;
        },
        stop: () => {
          stop++;
        }
      };
    });
    const pm = new PromptMenu({});
    const mi = new MenuItem({ execute: _.noop, spinnerTitle: "test spinner" });
    pm.show = () => {
      makeSpinnerStub.restore();
      expect(start).to.equal(1);
      expect(stop).to.equal(1);
    };

    return pm.runMenuItem(mi);
  });

  it("should close existing RL", () => {
    const pm = new PromptMenu({});
    pm.rl = rl;
    pm.getRL().close();
    expect(closed).to.equal(2);
  });

  it("should skip show if skip_prompt event's emitted in pre_show", () => {
    const out = [];
    const mi1 = new MenuItem({
      icon: "@",
      menuText: "item 1",
      execute: _.noop
    });
    const mi2 = new MenuItem({
      menuText: "item 2",
      execute: _.noop
    });
    mi2.on("pre_show", options => options.menu.emit("skip_prompt"));
    answers = ["X", "1", "2", ""];
    const pm = new PromptMenu({
      title: "menu title",
      menu: [mi1, mi2],
      output: function() {
        out.push(Array.prototype.slice.apply(arguments).join("!"));
      }
    });
    pm.show();
    expect(out).to.deep.equal([]);
  });

  it("should show menu and respond to choices", done => {
    const out = [];
    let exited;
    const mi1 = new MenuItem({
      icon: "@",
      menuText: "item 1",
      execute: options => {
        exited = true;
        options.menu.emit("exit");
        return Promise.resolve().delay(150);
      }
    });
    const mi2 = new MenuItem({
      menuText: "item 2",
      execute: options => {
        options.menu.emit("refresh");
      }
    });

    const expectOut = [
      "",
      "---------------------------------------------------------",
      "menu title",
      "---------------------------------------------------------",
      "[1] @ item 1",
      "[2]  item 2",
      "---------------------------------------------------------",
      "You choose!",
      "---------------------------------------------------------",
      "menu title",
      "---------------------------------------------------------",
      "[1] @ item 1",
      "[2]  item 2",
      "---------------------------------------------------------",
      "You choose!2",
      "---------------------------------------------------------",
      "menu title",
      "---------------------------------------------------------",
      "[1] @ item 1",
      "[2]  item 2",
      "---------------------------------------------------------",
      "You choose!1"
    ];
    answers = ["X", "1", "2", ""];
    const pm = new PromptMenu({
      title: "menu title",
      menu: [mi1, mi2],
      output: function() {
        out.push(Array.prototype.slice.apply(arguments).join("!"));
      },
      exitCb: () => {
        expect(exited).to.equal(true);
        expect(out).to.deep.equal(expectOut);
        done();
      }
    });
    pm._idle = true;
    pm.emit("refresh");
  });

  it("should execute item with cli command", () => {
    let executed;
    const mi1 = new MenuItem({
      cliCmd: "mi1",
      icon: "@",
      menuText: "item 1",
      execute: () => (executed = true)
    });
    const mi2 = new MenuItem({
      menuText: "item 2",
      execute: _.noop
    });
    const pm = new PromptMenu({
      title: "menu title",
      menu: [mi1, mi2]
    });
    pm.clap(["mi1"]);
    expect(executed).to.equal(true);
  });
});
