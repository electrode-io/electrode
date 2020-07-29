/* eslint-disable @typescript-eslint/no-var-requires, callback-return */

const { EventEmitter } = require("events");
const WebpackDevRelay = require("../../../src/lib/dev-admin/webpack-dev-relay");
const isomorphicConfig = require("isomorphic-loader/lib/config");
const { asyncVerify } = require("run-verify");
const _ = require("lodash");
import { describe, it } from "mocha";
import { expect } from "chai";

describe("webpack-dev-relay", function() {
  it("should clear webpack dev data if dev server exits", () => {
    const wdr = new WebpackDevRelay();
    const wds = new EventEmitter();

    wdr.setWebpackServer(wds);
    wds.emit("message", { name: "webpack-report", valid: true, id: 3 });
    expect(wdr._webpackData).to.have.property("webpack-report");
    wds.emit("exit");
    expect(wdr._webpackData).to.deep.equal({});
    expect(wdr._servers._wds).equal(undefined);
  });

  it("should clear app if app server exits", () => {
    const wdr = new WebpackDevRelay();
    const app = new EventEmitter();

    wdr.setAppServer(app);
    app.emit("exit");
    expect(wdr._webpackData).to.deep.equal({});
    expect(wdr._servers._app).equal(undefined);
  });

  it("should ignore unknown WDS message", () => {
    const wdr = new WebpackDevRelay();
    const wds = new EventEmitter();

    wdr.setWebpackServer(wds);
    wds.emit("message", { name: "unknown" });
    expect(wdr._webpackData).to.deep.equal({});
  });

  // wds started and ready
  // then app start
  // expect app to receive results from wds
  it("should send exist webpack data to new app", () => {
    const wdr = new WebpackDevRelay();
    const wds = new EventEmitter();
    wdr.setWebpackServer(wds);
    wds.emit("message", { name: "webpack-report", valid: true, id: 1 });
    wds.emit("message", { name: "webpack-report", valid: true, id: 2 });
    wds.emit("message", { name: "webpack-report", valid: true, id: 3 });
    wds.emit("message", { name: isomorphicConfig.configName, valid: true });
    wds.emit("message", { name: "webpack-stats", valid: true });
    const app = new EventEmitter();
    app.send = data => app.emit("message", data);
    const recv = [];
    return asyncVerify(
      next => {
        app.on("message", data => {
          recv.push(data);
          if (recv.length === 3) next(null, recv);
        });
        wdr.setAppServer(app);
      },
      r => {
        const s = _.sortBy(r, "name");
        expect(s[0]).to.include({ name: isomorphicConfig.configName, valid: true });
        expect(s[1]).to.include({ name: "webpack-report", valid: true, id: 3 });
        expect(s[2]).to.include({ name: "webpack-stats", valid: true });
      }
    );
  });

  it("should relay webpack message to app", () => {
    const wdr = new WebpackDevRelay();
    const wds = new EventEmitter();
    const app = new EventEmitter();
    app.send = data => app.emit("message", data);

    wdr.setWebpackServer(wds);
    wdr.setAppServer(app);

    wds.emit("message", { name: "webpack-report", valid: true, id: 1 });
    wds.emit("message", { name: "webpack-report", valid: true, id: 2 });
    wds.emit("message", { name: "webpack-report", valid: true, id: 3 });
    wds.emit("message", { name: isomorphicConfig.configName, valid: true });
    wds.emit("message", { name: "webpack-stats", valid: true });
    const recv = [];
    return asyncVerify(
      next => {
        app.on("message", data => {
          recv.push(data);
          if (recv.length === 3) next(null, recv);
        });
      },
      r => {
        const s = _.sortBy(r, "name");
        expect(s[0]).to.include({ name: isomorphicConfig.configName, valid: true });
        expect(s[1]).to.include({ name: "webpack-report", valid: true, id: 3 });
        expect(s[2]).to.include({ name: "webpack-stats", valid: true });
      }
    );
  });
});
