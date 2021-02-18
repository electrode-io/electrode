import { ClientRenderPipeline } from "../../../src/subapp/client-render-pipeline";
import { describe, it } from "mocha";
import { expect, assert } from "chai";

describe("ClientRenderPipeline", () => {
  it("should ClientRenderPipeline constructor throw error when be called", () => {
    let clientRP;
    assert.throw(() => {
      clientRP = new ClientRenderPipeline({ name: "pipeline" });
    }, "src/subapp/client-render-pipeline.ts should not be used by anything");
    expect(clientRP).equal(undefined);
  });
});
