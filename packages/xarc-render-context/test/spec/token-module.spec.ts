import { loadTokenModuleHandler, TokenModule } from "../../src";
import { expect } from "chai";
import * as Path from "path";
import { TEMPLATE_DIR, TOKEN_HANDLER } from "../../src/symbols";

describe("TokenModule ", function () {
  const templateDir = Path.join(__dirname, "../fixtures");

  it("should store id, pos, templateDir as props", function () {
    const tk = new TokenModule("test", 0, {}, templateDir);
    expect(tk.id).to.equal("test");
    expect(tk.pos).to.equal(0);
    expect(tk[TEMPLATE_DIR]).to.equal(templateDir);
  });

  it("should load if token is a module", function () {
    const tk = new TokenModule("#./token-module-01.ts", 0, {}, templateDir);

    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
  });

  it("should load if token is a id contains string 'require'", function () {
    const tk = new TokenModule("require(./token-module-01.ts)", 0, {}, templateDir);

    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
  });

  it("should load custom __call function", function () {
    const tk = new TokenModule("#./custom-call.ts", 0, { _call: "setup" }, templateDir);
    expect(tk.props._call).to.equal("setup");

    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
  });
});
