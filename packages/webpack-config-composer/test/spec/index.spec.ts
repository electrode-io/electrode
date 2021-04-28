import WebpackConfigComposer from "../../src/index";
import { expect } from "chai";
import fooPartial from "../fixtures/partial/foo";
import barPartial from "../fixtures/partial/bar";
import loaderPartial from "../fixtures/partial/loader";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");
import { FooPlugin } from "../fixtures/plugins/foo-plugin";
import Partial from "../../src/partial";
import CONSTANT from "../../src/constants";
const { PARTIALS } = CONSTANT;

/* eslint-disable max-statements */
describe("composer", () => {
  it("should accept partials and generate config", () => {
    const composer = new WebpackConfigComposer({
      partials: {
        test: {
          config: {
            testFoo: "test",
          },
        },
      },

      profiles: {
        b: {
          partials: {
            bar: {
              order: 200,
            },
            test: {
              order: 300,
            },
          },
        },

        a: {
          partials: {
            foo: {
              order: "100",
            },
          },
        },
      },
    });
    composer.addPartials([fooPartial, barPartial]);
    expect(composer.profiles).to.have.keys("a", "b");
    /*  eslint-disable no-unused-expressions */
    expect(composer.getProfile("a")).to.exist;
    expect(composer.getPartial("test")).to.exist;
    /*  eslint-enable no-unused-expressions */
    const config = composer.compose({}, "a", "b");
    expect(config.testFoo).to.equal("test");
  });

  it("should keep custom props", () => {
    const composer = new WebpackConfigComposer({
      partials: {
        test: {
          config: {
            _test: "hello",
            foo: "foo",
          },
        },
      },
    });
    const config = composer.compose(
      { keepCustomProps: true },
      {
        partials: { test: {} },
      },
      {} // test empty profile
    );
    expect(config._test).to.equal("hello");
  });

  it("should use currentConfig provided", () => {
    const composer = new WebpackConfigComposer({
      partials: {
        test: {
          config: {
            _test: "hello",
            foo: "foo",
          },
        },
      },
    });
    const config = composer.compose(
      { currentConfig: { hello: "world" } },
      {
        partials: { test: {} },
      }
    );
    expect(config.hello).to.equal("world");
  });

  it("instance should have deleteCustomProps", () => {
    const composer = new WebpackConfigComposer({});
    expect(
      composer.deleteCustomProps({
        _name: "test",
        hello: "world",
      })
    ).to.deep.equal({ hello: "world" });
  });

  it("should skip adding __name to plugins", () => {
    const composer = new WebpackConfigComposer({});
    composer.addPartials({
      foo: {
        config: {
          plugins: [new FooPlugin()],
        },
      },
    });
    const config = composer.compose(
      { skipNamePlugins: true },
      {
        partials: {
          foo: {},
        },
      }
    );
    expect(config.plugins[0].__name).to.equal(undefined);
  });

  it("should call a partial config if it's a function", () => {
    const composer = new WebpackConfigComposer({});
    composer.addPartials([fooPartial, loaderPartial]);
    const config = composer.compose({}, [
      {
        partials: {
          foo: {
            order: "100",
          },
        },
      },
      {
        partials: {
          loader: {},
          badButDisabled: {
            enable: false,
          },
        },
      },
    ]);
    expect(config.module.rules[0]).to.equal("loader-rule1");
  });

  it("should call return function twice to get final partial config", () => {
    const composer = new WebpackConfigComposer({});
    composer.addPartials([
      fooPartial,
      {
        loader: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          config: () => require("../fixtures/partial/loader").default.loader.config,
        },
      },
    ]);
    const config = composer.compose({}, { partials: { loader: {} } });
    expect(config.module.rules[0]).to.equal("loader-rule1");
  });

  it.skip("should throw if a partial config cannot be processed", () => {
    const composer = new WebpackConfigComposer({});
    composer.addPartials({
      test: {
        config: true,
      },
    });
    expect(() => composer.compose({}, { partials: { test: {} } })).to.throw();
  });

  it("should allow a config function to apply the config by returning nothing", () => {
    const composer = new WebpackConfigComposer({});
    composer.addPartials([
      fooPartial,
      {
        loader: {
          config: (options) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const config = require("../fixtures/partial/loader").default.loader.config(options);
            _.merge(options.currentConfig, config);
          },
        },
      },
    ]);
    const config = composer.compose({}, { partials: { loader: {} } });
    expect(config.module.rules[0]).to.equal("loader-rule1");
  });

  it("compose should correct config module when meta is enabled", () => {
    const composer = new WebpackConfigComposer({});
    composer.addPartials([
      fooPartial,
      {
        loader: {
          config: (options) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const config = require("../fixtures/partial/loader").default.loader.config(options);
            _.merge(options.currentConfig, config);
          },
        },
      },
    ]);
    const config = composer.compose({ meta: true }, { partials: { loader: {} } });

    expect(config.config).to.eql({
      module: {
        rules: ["loader-rule1"],
      },
    });
  });

  it("instance should created with null input", () => {
    const composer = new WebpackConfigComposer(null);
    // eslint-disable-next-line no-unused-expressions
    expect(composer).to.exist;
  });

  describe("addProfiles", () => {
    it("should accept multiple profiles", () => {
      const composer = new WebpackConfigComposer({});
      composer.addProfiles({ a: { partials: {} }, b: { partials: {} } });
      expect(composer.profiles).to.have.keys("a", "b");
    });

    it("should accept profiles as an array", () => {
      const composer = new WebpackConfigComposer({});
      composer.addProfiles([{ a: { partials: {} }, b: { partials: {} } }]);
      expect(composer.profiles).to.have.keys("a", "b");
    });
  });

  describe("addProfile", () => {
    it("should take list of partial names for new profile", () => {
      const composer = new WebpackConfigComposer({});
      composer.addProfile("test", "a");
      const prof = composer.getProfile("test");
      expect(prof.partials).to.deep.equal({
        a: {},
      });
    });

    it("should add profile with an object of partials", () => {
      const composer = new WebpackConfigComposer({});
      composer.addProfile("test", {
        a: {},
        b: {},
        c: {},
      });
      const prof = composer.getProfile("test");
      expect(prof.partials).to.deep.equal({
        a: {},
        b: {},
        c: {},
      });
    });
  });

  describe("addPartialToProfile", () => {
    it("should create profile if it doesn't exist", () => {
      const composer = new WebpackConfigComposer({});
      composer.addPartialToProfile("user", "test", { plugins: [] }, {});
      const user = composer.getPartial("user");
      //  eslint-disable-next-line no-unused-expressions
      expect(user).to.exist;
      expect(user.config).to.deep.equal({ plugins: [] });
      expect(user.options).to.deep.equal({});
      //  eslint-disable-next-line no-unused-expressions
      expect(composer.getProfile("test")).to.exist;
    });

    it("should add the partial", () => {
      const composer = new WebpackConfigComposer({});
      composer.addPartialToProfile("user", "test", { plugins: [] }, {});
      const user = composer.getPartial("user");
      //  eslint-disable-next-line no-unused-expressions
      expect(user).to.exist;
      expect(user.config).to.deep.equal({ plugins: [] });
      expect(user.options).to.deep.equal({});
    });

    it("should use existing profile", () => {
      const composer = new WebpackConfigComposer({});
      composer.addProfile("test", "foo");
      composer.addPartialToProfile("user", "test", { plugins: [] }, {});
      const prof = composer.getProfile("test");
      //  eslint-disable-next-line no-unused-expressions
      expect(prof).to.exist;
      expect(prof.getPartial("foo")).to.deep.equal({});
    });
  });

  describe("addPartials", () => {
    it("should add new partial as class intance", () => {
      const composer = new WebpackConfigComposer({});
      composer.addPartials(fooPartial);
      const foo = composer.getPartial("foo");
      expect(foo.config).to.deep.equal(fooPartial.foo.config);
      // test class set/get methods
      foo.config = {};
      expect(foo.config).to.deep.equal({});
      expect(foo.options).to.deep.equal({});
      foo.options = { a: 1 };
      expect(foo.options).to.deep.equal({ a: 1 });
    });

    it("should add new partials as an array", () => {
      const composer = new WebpackConfigComposer({});
      composer.addPartials([fooPartial, barPartial]);
      expect(composer.getPartial("foo").config).to.deep.equal(fooPartial.foo.config);
      expect(composer.getPartial("bar").config).to.deep.equal(barPartial.bar.config);
    });

    it("should merge into existing partial", () => {
      const composer = new WebpackConfigComposer({
        partials: [fooPartial, barPartial],
      });

      composer.addPartials({
        foo: {
          config: {
            plugins: ["fooTest"],
          },
          addOptions: {
            concatArray: "tail",
          },
        },
        bar: {
          config: {
            plugins: ["barTest"],
          },
          addOptions: {
            concatArray: "head",
          },
        },
      });
      expect(composer.partials.foo.config.plugins[1]).to.equal("fooTest");
      expect(composer.partials.bar.config.plugins[0]).to.equal("barTest");
    });

    it("should repalce existing partial", () => {
      const composer = new WebpackConfigComposer({
        partials: [fooPartial, barPartial],
      });

      composer.addPartials({
        foo: {
          config: {
            plugins: ["fooTest"],
          },
          addOptions: {
            method: "replace",
            concatArray: "no",
          },
        },
      });

      composer.addPartial(
        "bar",
        {
          plugins: ["barTest"],
        },
        {
          concatArray: "head",
        }
      );

      expect(composer.partials.foo.config.plugins.length).to.equal(1);
      expect(composer.partials.foo.config.plugins[0]).to.equal("fooTest");
      expect(composer.partials.bar.config.plugins[0]).to.equal("barTest");
    });

    it("should addPartial when given name does not exist but options having replace method", () => {
      const composer = new WebpackConfigComposer({});
      composer.addPartial(
        "bar",
        {
          plugins: ["barTest"],
        },
        {
          method: "replace",
        }
      );

      expect(composer[PARTIALS].bar).to.deep.equal(new Partial("bar", { plugins: ["barTest"] }));
    });

    it("should addPartial when given name does not exist but options having replace method", () => {
      const composer = new WebpackConfigComposer({});
      const testPartialInstance = new Partial("foo", {});
      composer._addPartial("bar", testPartialInstance, {
        method: "replace",
      });

      expect(composer[PARTIALS].bar).to.deep.equal(testPartialInstance);
    });
  });

  describe("enablePartial", () => {
    it("should find partial enabled", () => {
      const testName = "test_9527";
      const composer = new WebpackConfigComposer({});
      expect(composer.getPartial(testName)).to.equal(undefined);
      composer.addPartial(testName, { foor: "bar" }, null);
      expect(composer.getPartial(testName).enable).to.equal(undefined);
      composer.enablePartial(testName, true);
      expect(composer.getPartial(testName).enable).to.equal(true);
    });

    it("should find partial not enabled", () => {
      const testName = "test_9527";
      const composer = new WebpackConfigComposer({});
      composer.addPartial(testName, { foor: "bar" }, null);
      expect(composer.getPartial(testName).enable).to.equal(undefined);
      composer.enablePartial("abc", true);
      expect(composer.getPartial(testName).enable).to.equal(undefined);
    });
  });

  describe("replacePartial", () => {
    it("should replacePartial", () => {
      const testName = "test_9528";
      const composer = new WebpackConfigComposer({});
      expect(composer.getPartial(testName)).to.equal(undefined);
      composer.addPartial(testName, { foo1: "bar1" }, null);
      expect(composer.getPartial(testName)).to.deep.equal(
        new Partial(testName, { config: { foo1: "bar1" } })
      );
      composer.replacePartial(testName, { foo2: "bar2" }, null);
      expect(composer.getPartial(testName)).to.deep.equal(
        new Partial(testName, { config: { foo2: "bar2" } })
      );
    });
  });
});
/* eslint-enable max-statements */
