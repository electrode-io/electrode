import { TokenModule } from "../../src";
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
    expect(tk[TOKEN_HANDLER]).to.be.null;
  });

  it("should load if token is a module", function () {
    const tk = new TokenModule("#./token-module-01.ts", 0, {}, templateDir);

    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
    it("should not have to load module twice", function () {
      tk.modPath = null;
      tk.load({});
      expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
    });
  });

  it("should not have to load module twice", function () {
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
    expect(tk.props).to.deep.equal({ _call: "setup" });

    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
  });

  it("should initialize null props to empty object", function () {
    const tk = new TokenModule("test", 0, null, templateDir);
    expect(tk.props).to.deep.equal({});
  });

  it("should set template dir to props[TEMPLATE_DIR] when exists ", function () {
    const props = {};
    props[TEMPLATE_DIR] = templateDir;
    const tk = new TokenModule("test", 0, props, null);

    expect(tk[TEMPLATE_DIR]).to.equal(templateDir); //deep.equal({});
  });

  it("should use process.cwd() as default templatedir ", function () {
    const tk = new TokenModule("test", 0, null, null);

    expect(tk[TEMPLATE_DIR]).to.equal(process.cwd()); //deep.equal({});
  });

  it("should load custom __call function", function () {
    const tk = new TokenModule(
      "#./custom-call-with-params.ts",
      0,
      { _call: "prepare" },
      templateDir
    );
    expect(tk.props).to.deep.equal({ _call: "prepare" });

    tk.load("css");
    expect(tk[TOKEN_HANDLER]({ folder: "dist" })).to.equal("load css from dist folder");
  });
});
