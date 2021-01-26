/* eslint-disable prefer-arrow-callback */
import React from "react"; // eslint-disable-line
//
import { reactQueryFeature } from "../../src/node/index";
import { describe, it } from "mocha";
import { expect } from "chai";
import { renderToString } from "react-dom/server";
import { SubAppDef, envHooks } from "@xarc/subapp";
import { SubAppContainer } from "@xarc/subapp";
import { useQuery } from "react-query";
import { testFetch } from "../prefetch";

const { createElement } = React; // eslint-disable-line

describe("reactQueryFeature node.js", function () {
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

  it("should render subapp with react-query", async () => {
    const container = new SubAppContainer({});

    envHooks.getContainer = () => container;

    const factory = reactQueryFeature({
      React,
      serverModule: require.resolve("../prefetch")
    });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);
    const result = await def._features.reactQuery.execute({
      input: {
        Component: () => {
          const { data } = useQuery("test", testFetch);
          return <div>test {JSON.stringify(data)}</div>;
        }
      }
    });

    const str = renderToString(<result.Component />);

    expect(str).equals(
      `<div>test <!-- -->{&quot;msg&quot;:&quot;foo&quot;,&quot;queryKey&quot;:[&quot;test&quot;]}</div>`
    );
  });
});
