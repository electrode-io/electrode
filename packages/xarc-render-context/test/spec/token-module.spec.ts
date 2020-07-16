import { TokenModule, loadTokenModuleHandler } from "../../src";
import { expect } from "chai";
import * as Path from "path";
import { TEMPLATE_DIR, TOKEN_HANDLER } from "../../src/index";

const templateDir = Path.join(__dirname, "../fixtures");

describe("TokenModule ", function () {
  it("should have laoded symbols TEMPLATE_DIR TOKEN_HANDLER", function () {
    expect(TOKEN_HANDLER).to.not.be.undefined;
    expect(TEMPLATE_DIR).to.not.be.undefined;
  });

  it("should store id, pos, templateDir as props", function () {
    const tk = new TokenModule("test", 0, {}, templateDir);
    expect(tk.id).to.equal("test");
    expect(tk.pos).to.equal(0);
    expect(tk[TEMPLATE_DIR]).to.equal(templateDir);
    expect(tk[TOKEN_HANDLER]).to.be.null;
  });

  it("not a module and custom is defined", function () {
    const tk = new TokenModule("custom", 0, { _call: "setup" }, templateDir);
    tk.load({});
    expect(tk[TOKEN_HANDLER]).to.be.null;
    //    expect(Object.keys(tk[TOKEN_HANDLER]).length).to.equal(0);
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

  it("should allow explicitly setting the token module", () => {
    const tk = new TokenModule("#testSetModule", 0, null, null);
    tk.tokenMod = () => null;
    expect(tk.custom).equal(undefined);
    tk.load();
    expect(tk.custom).equal(null);
  });

  it("should handle token module that's null (no handler)", function () {
    const tk = new TokenModule("require(./token-module-null.ts)", 0, {}, templateDir);
    tk.load();
    expect(tk.custom).equal(null);
  });
});

describe("require from modPath", function () {
  const tk = new TokenModule("require(./token-module-01.ts)", 0, {}, templateDir);

  it("should load as modPath if token.id contains string 'require'", function () {
    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
  });

  it("should load as modPath if token.id contains string 'require'", function () {
    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
  });

  it("should have same result when called with load()", function () {
    tk.load();
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from token 01");
  });
});

describe("_call in options ", function () {
  it("should load custom __call ggg function", function () {
    const tk = new TokenModule("#./custom-call.ts", 0, { _call: "setup" }, templateDir);
    expect(tk.props).to.deep.equal({ _call: "setup" });

    tk.load({});
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
    //  tk.custom = null;
    tk.modPath = null;
    tk.load({ a: 11 });
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
  });

  it("should load custom params", function () {
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

  it.skip("should set default for options when calling load", function () {
    const tk = new TokenModule("test", 0, null, templateDir);
    expect(tk.props).to.deep.equal({});

    console.log(tk._modCall);
    tk.load();
    expect(tk.custom).to.deep.equal({});
    console.log(tk.custom);
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
    tk.load(null);
  });

  it("should load custom _modCall", function () {
    const tk = new TokenModule("#./custom-call.ts", 0, { _call: "setup" }, templateDir);
    expect(tk.props).to.deep.equal({ _call: "setup" });

    tk.load(null);
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");

    tk.modPath = null;

    tk.load({ a: 11 });
    expect(tk[TOKEN_HANDLER]()).to.equal("hello from custom setup");
  });

  it("should load custom params", function () {
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
