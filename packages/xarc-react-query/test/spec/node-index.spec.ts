//
import { reactQueryFeature } from "../../src/node/index";
import { describe, it } from "mocha";
import { expect } from "chai";
import React from "react";
import { SubAppDef, envHooks } from "@xarc/subapp";
import { SubAppContainer } from "@xarc/subapp";

describe("reactQueryFeature", function () {
  it("should return a feature factory", async () => {
    const factory = reactQueryFeature({ React });
    expect(factory.id).equal("state-provider");
    expect(factory.subId).equal("react-query");
    expect(factory.add).to.be.a("function");
  });

  it("should add react-query feature to a subapp", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactQueryFeature({ React });
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);
    expect(def._features.reactQuery).to.be.an("object");
  });
});
