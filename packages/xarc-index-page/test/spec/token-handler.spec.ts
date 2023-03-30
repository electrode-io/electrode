"use strict";

import { describe } from "mocha";
import { getNonceValue } from "../../src/token-handlers";
import { expect } from "chai";

describe("subapp-server token-handler", () => {
  describe("getNonceValue", () => {
    const random = "random-text";
    const routeOptions = {
        cspNonceValue: {
          scriptNonce: random,
          styleNonce: random
        }
    };
    expect(getNonceValue(routeOptions).scriptNonce).to.equal(` nonce="${random}"`);
  });
});
