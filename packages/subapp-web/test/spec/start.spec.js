"use strict";

const startToken = require("../../lib/start");

describe("start", function() {
  it("should return subapp start HTML", () => {
    expect(startToken().process({ user: {} }, { props: {} })).contains("subapp start");
  });

  it("should call saveSSRInfo on independent group", async () => {
    let called = false;
    const xarcSubappSSR = {
      _: {
        queue: [{
          awaitData: () => Promise.resolve(),
          ready: {
            promise: Promise.resolve()
          },
          saveSSRInfo: () => { called = true; }
        }]
      }
    };
    startToken().process({ user: { xarcSubappSSR } }, { props: {} });
    return new Promise((accept) => {
      setTimeout(() => {
        expect(called).to.equal(true);
        accept();
      }, 100);
    });
  });

  it("should call saveSSRInfo on normal group", async () => {
    let called = false;
    const xarcSubappSSR = {
      "2": {
        queue: [{
          awaitData: () => Promise.resolve(),
          ready: {
            promise: Promise.resolve()
          },
          saveSSRInfo: () => { called = true; }
        }]
      }
    };
    startToken().process({ user: { xarcSubappSSR } }, { props: {} });
    return new Promise((accept) => {
      setTimeout(() => {
        expect(called).to.equal(true);
        accept();
      }, 100);
    });
  });

  it("should call renderSSR on normal group", async () => {
    let called = false;
    const xarcSubappSSR = {
      "2": {
        queue: [{
          awaitData: () => Promise.resolve(),
          ready: {
            promise: Promise.resolve()
          },
          renderSSR: () => { called = true; }
        }]
      }
    };
    startToken().process({ user: { xarcSubappSSR } }, { props: {} });
    return new Promise((accept) => {
      setTimeout(() => {
        expect(called).to.equal(true);
        accept();
      }, 100);
    });
  });

  it("should call realizeReduxStore on normal group", async () => {
    let called = false;
    const xarcSubappSSR = {
      "2": {
        queue: [{
          awaitData: () => Promise.resolve(),
          ready: {
            promise: Promise.resolve()
          },
          lib: {
            realizeReduxStore: () => { called = true; }
          }
        }]
      }
    };
    startToken().process({ user: { xarcSubappSSR } }, { props: {} });
    return new Promise((accept) => {
      setTimeout(() => {
        expect(called).to.equal(true);
        accept();
      }, 100);
    });
  });
});
