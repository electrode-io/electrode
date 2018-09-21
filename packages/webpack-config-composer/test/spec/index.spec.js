"use strict";

const WebpackConfigComposer = require("../..");
const expect = require("chai").expect;
const fooPartial = require("../fixtures/partial/foo");
const barPartial = require("../fixtures/partial/bar");
const loaderPartial = require("../fixtures/partial/loader");
const _ = require("lodash");
const FooPlugin = require("../fixtures/plugins/foo-plugin");

describe("composer", function() {
  it("should accept partials and generate config", () => {
    const composer = new WebpackConfigComposer({
      partials: {
        test: {
          config: {
            testFoo: "test"
          }
        }
      },

      profiles: {
        b: {
          partials: {
            bar: {
              order: 200
            },
            test: {
              order: 300
            }
          }
        },

        a: {
          partials: {
            foo: {
              order: "100"
            }
          }
        }
      }
    });
    composer.addPartials(fooPartial, barPartial);
    expect(composer.profiles).to.have.keys("a", "b");
    expect(composer.getProfile("a")).to.exist;
    expect(composer.getPartial("test")).to.exist;
    const config = composer.compose(
      {},
      "a",
      "b"
    );
    expect(config.testFoo).to.equal("test");
  });

  it("should keep custom props", () => {
    const composer = new WebpackConfigComposer({
      partials: {
        test: {
          config: {
            _test: "hello",
            foo: "foo"
          }
        }
      }
    });
    const config = composer.compose(
      { keepCustomProps: true },
      {
        partials: { test: {} }
      }
    );
    expect(config._test).to.equal("hello");
  });

  it("should use currentConfig provided", () => {
    const composer = new WebpackConfigComposer({
      partials: {
        test: {
          config: {
            _test: "hello",
            foo: "foo"
          }
        }
      }
    });
    const config = composer.compose(
      { currentConfig: { hello: "world" } },
      {
        partials: { test: {} }
      }
    );
    expect(config.hello).to.equal("world");
  });

  it("instance should have deleteCustomProps", () => {
    const composer = new WebpackConfigComposer();
    expect(
      composer.deleteCustomProps({
        _name: "test",
        hello: "world"
      })
    ).to.deep.equal({ hello: "world" });
  });

  it("should skip adding __name to plugins", () => {
    const composer = new WebpackConfigComposer();
    composer.addPartials({
      foo: {
        config: {
          plugins: [new FooPlugin()]
        }
      }
    });
    const config = composer.compose(
      { skipNamePlugins: true },
      {
        partials: {
          foo: {}
        }
      }
    );
    expect(config.plugins[0].__name).to.equal(undefined);
  });

  it("should call a partial config if it's a function", () => {
    const composer = new WebpackConfigComposer();
    composer.addPartials(fooPartial, loaderPartial);
    const config = composer.compose(
      {},
      [
        {
          partials: {
            foo: {
              order: "100"
            }
          }
        },
        {
          partials: {
            loader: {},
            badButDisabled: {
              enable: false
            }
          }
        }
      ]
    );
    expect(config.module.rules[0]).to.equal("loader-rule1");
  });

  it("should call return function twice to get final partial config", () => {
    const composer = new WebpackConfigComposer();
    composer.addPartials(fooPartial, {
      loader: {
        config: () => require("../fixtures/partial/loader").loader.config
      }
    });
    const config = composer.compose(
      {},
      { partials: { loader: {} } }
    );
    expect(config.module.rules[0]).to.equal("loader-rule1");
  });

  it("should throw if a partial config cannot be processed", () => {
    const composer = new WebpackConfigComposer();
    composer.addPartials({
      test: {
        config: true
      }
    });
    expect(() =>
      composer.compose(
        {},
        { partials: { test: {} } }
      )
    ).to.throw();
  });

  it("should allow a config function to apply the config by returning nothing", () => {
    const composer = new WebpackConfigComposer();
    composer.addPartials(fooPartial, {
      loader: {
        config: options => {
          const config = require("../fixtures/partial/loader").loader.config(options);
          _.merge(options.currentConfig, config);
        }
      }
    });
    const config = composer.compose(
      {},
      { partials: { loader: {} } }
    );
    expect(config.module.rules[0]).to.equal("loader-rule1");
  });

  describe("addProfiles", function() {
    it("should accept multiple profiles", () => {
      const composer = new WebpackConfigComposer();
      composer.addProfiles({ a: { partials: {} }, b: { partials: {} } });
      expect(composer.profiles).to.have.keys("a", "b");
    });

    it("should accept profiles as an array", () => {
      const composer = new WebpackConfigComposer();
      composer.addProfiles([{ a: { partials: {} }, b: { partials: {} } }]);
      expect(composer.profiles).to.have.keys("a", "b");
    });
  });

  describe("addPartials", function() {
    it("should add new partial as class intance", () => {
      const composer = new WebpackConfigComposer();
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
      const composer = new WebpackConfigComposer();
      composer.addPartials([fooPartial, barPartial]);
      expect(composer.getPartial("foo").config).to.deep.equal(fooPartial.foo.config);
      expect(composer.getPartial("bar").config).to.deep.equal(barPartial.bar.config);
    });

    it("should merge into existing partial", () => {
      const composer = new WebpackConfigComposer({
        partials: [fooPartial, barPartial]
      });

      composer.addPartials({
        foo: {
          config: {
            plugins: ["fooTest"]
          },
          addOptions: {
            concatArray: "tail"
          }
        },
        bar: {
          config: {
            plugins: ["barTest"]
          },
          addOptions: {
            concatArray: "head"
          }
        }
      });
      expect(composer.partials.foo.config.plugins[1]).to.equal("fooTest");
      expect(composer.partials.bar.config.plugins[0]).to.equal("barTest");
    });

    it("should repalce existing partial", () => {
      const composer = new WebpackConfigComposer({
        partials: [fooPartial, barPartial]
      });

      composer.addPartials({
        foo: {
          config: {
            plugins: ["fooTest"]
          },
          addOptions: {
            method: "replace",
            concatArray: "no"
          }
        }
      });

      composer.addPartial(
        "bar",
        {
          plugins: ["barTest"]
        },
        {
          concatArray: "head"
        }
      );

      expect(composer.partials.foo.config.plugins.length).to.equal(1);
      expect(composer.partials.foo.config.plugins[0]).to.equal("fooTest");
      expect(composer.partials.bar.config.plugins[0]).to.equal("barTest");
    });
  });
});
