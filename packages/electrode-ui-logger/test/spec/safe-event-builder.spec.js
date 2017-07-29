"use strict";

const safeEventBuilder = require("../../lib/safe-event-builder");

describe("Client/helpers", () => {
  describe("safeEventBuilder", () => {
    let evt = null;
    let expectedEvt = null;

    describe("event is invalid", () => {
      beforeEach(() => {
        expectedEvt = {
          _type: "undefined",
          state: "undefined"
        };
      });

      describe("when falsy", () => {
        it("should return a safe event object", () => {
          expect(safeEventBuilder()).to.deep.equal(expectedEvt);
          expect(safeEventBuilder(null)).to.deep.equal(expectedEvt);
        });
      });

      describe("when empty", () => {
        it("should return a safe event object", () => {
          expect(safeEventBuilder({})).to.deep.equal(expectedEvt);
        });
      });
    });

    describe("event type is fetch", () => {

      describe("when `extras` attribute exists", () => {
        beforeEach(() => {
          evt = {
            _type: "fetch",
            context: "some foo context",
            props: {},
            extras: {
              request: "foo request",
              response: {
                status: "foo status"
              },
              options: "foo options",
              time: 12345
            },
            state: "all good"
          };

          expectedEvt = {
            _type: "fetch",
            extras: {
              request: "foo request",
              response: {
                status: "foo status"
              },
              options: "foo options",
              time: 12345
            },
            state: "all good"
          };
        });

        it("should make a safe event", () => {
          expect(safeEventBuilder(evt)).to.deep.equal(expectedEvt);
        });
      });

      describe("when `extras` attribute is undefined", () => {
        beforeEach(() => {
          evt = {
            _type: "fetch"
          };

          expectedEvt = {
            _type: "fetch",
            state: undefined,
            extras: {
              response: {
                status: null
              }
            }
          };
        });

        it("should not throw an error", () => {
          expect(() => {
            return safeEventBuilder(evt);
          }).not.to.throw("TypeError: Cannot read property");
        });

        it("should return a safe event", () => {
          expect(safeEventBuilder(evt)).to.deep.equal(expectedEvt);
        });
      });
    });

    describe("event type is NOT fetch", () => {
      let cycle = null;

      beforeEach(() => {
        // setup circular reference in children
        cycle = {};
        cycle.cycle = cycle;
        evt = {
          props: {
            chooserName: "Quantity: ",
            automationId: "Dropdown-ProductQuantity",
            children: [cycle]
          }
        };
      });

      it("should avoid cicular references", () => {
        expect(() => {
          return JSON.stringify(safeEventBuilder(evt));
        }).not.to.throw("JSON.stringify cannot serialize cyclic structures");
      });

      it("should exclude children in props", () => {
        expect(safeEventBuilder(evt).props).to.not.include.keys("children");
      });
    });
  });
});
