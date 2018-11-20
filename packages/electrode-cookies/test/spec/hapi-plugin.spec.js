"use strict";

const expect = require("chai").expect;

describe("Hapi plugin", () => {
  beforeEach(() => {
    delete require.cache[require.resolve("../../hapi-plugin")];
  });

  describe("Test Hapi 16 plugin", () => {
    let compatLib;

    beforeEach(() => {
      // fake hapi 16
      compatLib = require("electrode-hapi-compat");
      compatLib._testSetHapi17(false);
    });

    afterEach(() => {
      compatLib._testSetHapi17(true);
      delete require.cache[require.resolve("../../hapi-plugin")];
    });

    it("should support hapi 16 as default", done => {
      const cookiesPlugin = require("../../hapi-plugin");
      expect(cookiesPlugin).a("function");
      expect(cookiesPlugin.attributes.pkg.name).exist;

      let extEvent;
      let continueCalled = false;
      let stateCalled = false;
      const request = {
        app: {
          replyStates: { state: "state" }
        }
      };
      const reply = {
        continue: () => {
          continueCalled = true;
        },
        state: () => {
          stateCalled = true;
        }
      };
      const server = {
        ext: (event, handler) => {
          extEvent = event;
          handler(request, reply);
        }
      };
      cookiesPlugin(server, {}, () => {
        expect(extEvent).to.equal("onPreResponse");
        expect(continueCalled).true;
        expect(stateCalled).true;
        done();
      });
    });
  });

  it("should handle request.app.replyStates not being set", done => {
    const cookiesPlugin = require("../../hapi-plugin");
    const request = { app: {} };
    const reply = { continue: "CONTINUE_SYMBOL" };
    const server = {
      ext: (event, handler) => {
        expect(event).to.equal("onPreResponse");
        const resp = handler(request, reply);
        expect(resp).eq("CONTINUE_SYMBOL");
        done();
      }
    };

    cookiesPlugin.register(server, {});
  });
});
