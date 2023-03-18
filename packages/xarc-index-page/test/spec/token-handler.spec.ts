"use strict";

import { describe } from "mocha";
import { getNonceValue } from "../../src/token-handlers";
import { expect } from "chai";

describe("subapp-server token-handler", () => {
  describe("getNonceValue", () => {
    const random = "random-text";
    const routeOptions = {
        cspNonceValue: random
    };
    expect(getNonceValue(routeOptions)).to.equal(` nonce="${random}"`);
  });
});
