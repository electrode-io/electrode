"use strict";

import { RenderContext } from "../../src";

import { expect } from "chai";

describe("render-context", function () {
  it("should handle setting all stop modes", () => {
    const context = new RenderContext({}, {});
    context.stop = RenderContext.FULL_STOP;
    expect(context.isFullStop).to.equal(true);
    context.softStop();
    expect(context.isSoftStop).to.equal(true);
    context.voidStop();
    expect(context.isVoidStop).to.equal(true);
    context.fullStop();
    expect(context.isFullStop).to.equal(true);
  });
});
