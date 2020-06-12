import {
  RenderContext,
  BaseOutput,
  MainOutput,
  SpotOutput,
  TEMPLATE_DIR,
  TOKEN_HANDLER
} from "../../src/index";
import { expect } from "chai";

describe("index.tsc", function () {
  it("should export RenderContext, BaseOutput, MainOutput, SpotOutput etc ", function () {
    expect(RenderContext).to.exist;
    expect(BaseOutput).to.exist;
    expect(MainOutput).to.exist;
    expect(SpotOutput).to.exist;
    expect(TEMPLATE_DIR).to.exist;
    expect(TOKEN_HANDLER).to.exist;
  });
});
