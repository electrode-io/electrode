declare global {
  namespace NodeJS {
    interface Global {
        _wml: {
            jwt: any
        },
        xarcV1: any;
    }
  }

  interface Window {
    _wml: any;
    xarcV1: any;
  }
}

import * as xaa from "xaa";
import  { expect } from "chai";
import { expectError, asyncVerify } from "run-verify";

describe("async map", function() {
  let xarcV1;

  before(() => {
    const xarc = "../../src/subapp-web.ts";
    delete require.cache[require.resolve(xarc)];
    // @ts-ignore
    global.window = {};
    require(xarc);
    // @ts-ignore
    xarcV1 = global.window.xarcV1;
    delete global.window;
  });

  it("should map empty array", () => {
    return asyncVerify(
      function asyncMap(dummy?: any) {
        return xarcV1.asyncMap([]);
      },
      r => expect(r).deep.equal([])
    );
  });

  it("should map async", async () => {
    return asyncVerify(
      function asyncMap(dummy?: any) {
        return xarcV1.asyncMap([1, 2, 3, 4, 5], async v => {
          await xaa.delay(Math.random() * 20 + 2, null);
          return v * 3;
        })
      },
      r => expect(r).to.deep.equal([3, 6, 9, 12, 15])
    );
  });

  it("should map async with concurrency", async () => {
    const a = Date.now();
    return asyncVerify(
      function asyncMap(dummy?: any) {
        return xarcV1.asyncMap(
          [1, 2, 3, 4, 5],
          async v => {
            await xaa.delay(50, null);
            return v * 3;
          },
          2
        )
      },
      x => {
        expect(x).to.deep.equal([3, 6, 9, 12, 15]);
        expect(Date.now() - a).to.be.below(200);
      }
    );
  });

  it("should continue with free concurrency slots even if one is stuck", async () => {
    const a = Date.now();
    const doneOrder = [];
    return asyncVerify(
      function asyncMap(dummy?: any) {
        return xarcV1.asyncMap(
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          async v => {
            if (v === 2) {
              await xaa.delay(120, null);
            } else if (v === 7) {
              await xaa.delay(85, null);
            }
            await xaa.delay(50, null);
            doneOrder.push(v);
            return v * 3;
          },
          3
        )
      },
      x => {
        expect(x).to.deep.equal([3, 6, 9, 12, 15, 18, 21, 24, 27]);
        expect(Date.now() - a).to.be.below(280);
        expect(doneOrder).to.deep.equal([1, 3, 4, 5, 6, 2, 8, 9, 7]);
      }
    );
  });

  it("should return partial for concurrency 1", () => {
    return asyncVerify(
      expectError(function asyncMap(dummy?: any) {
        return xarcV1.asyncMap([1, 2, 3, 4], v => {
          if (v === 3) throw new Error("oops");
          return v * 3;
        })
      }),
      err => {
        expect(err).to.be.an("Error");
        expect(err.partial.filter(x => x)).to.deep.equal([3, 6]);
      }
    );
  });

  it("should handle mix result for concurrency", async () => {
    const a = Date.now();
    const doneOrder = [];
    function asyncMap(dummy?: any) {
      return xarcV1.asyncMap(
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        v => {
          if (v === 2 || v === 7) {
            doneOrder.push(v);
            return v * 3;
          }
          return xaa.delay(50, null).then(() => {
            doneOrder.push(v);
            return v * 3;
          });
        },
        3
      );
    }
    return asyncVerify(asyncMap, x => {
      expect(x).to.deep.equal([3, 6, 9, 12, 15, 18, 21, 24, 27]);
      expect(Date.now() - a).to.be.below(250);
      expect(doneOrder).to.deep.equal([2, 1, 3, 4, 7, 5, 6, 8, 9]);
    });
  });

  it("should handle error from an item", async () => {
    const a = Date.now();
    const doneOrder = [];

    return asyncVerify(
      expectError(function asyncMap(dummy?: any) {
        return xarcV1.asyncMap(
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          async v => {
            if (v === 2) {
              await xaa.delay(120, null);
            } else if (v === 7) {
              await xaa.delay(75, null);
            }
            await xaa.delay(50, null);
            if (v === 5) {
              throw new Error("Test error");
            }
            doneOrder.push(v);
            return v * 3;
          },
          3
        );
      }),
      err => {
        expect(err).to.be.an("Error");
        expect(err.message).to.equal("Test error");
        expect(Date.now() - a).to.be.below(150);
        expect(doneOrder).to.deep.equal([1, 3, 4]);
      }
    );
  });

  it("should handle immediate error from an item for concurrency", async () => {
    const a = Date.now();
    const doneOrder = [];

    return asyncVerify(
      expectError(function asyncMap(dummy?: any) {
        return xarcV1.asyncMap(
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          v => {
            if (v === 2 || v === 7) {
              doneOrder.push(v);
              return v * 3;
            }
            if (v === 5) {
              throw new Error("Test error");
            }
            return xaa.delay(50, null).then(() => {
              doneOrder.push(v);
              return v * 3;
            });
          },
          3
        );
      }),
      async err => {
        expect(Date.now() - a).to.be.below(100);
        await xaa.delay(50, null);
        expect(err).to.be.an("Error");
        expect(err.message).to.equal("Test error");
        expect(doneOrder).to.deep.equal([2, 1, 3, 4]);
      }
    );
  });
});
