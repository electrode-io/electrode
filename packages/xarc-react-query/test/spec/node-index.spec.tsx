/* eslint-disable prefer-arrow-callback */
import React from "react"; // eslint-disable-line
import { describe, it } from "mocha";
import { expect } from "chai";
import { renderToString } from "react-dom/server";
import { SubAppDef, SubAppContainer, envHooks } from "@xarc/subapp";
import { useQuery } from "react-query";
import { reactQueryFeature } from "../../src/node/index";
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

  it("should render subapp with react-query if it successfully fetches data when doing SSR", async () => {
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

  it("should render subapp with react-query if it fails on fetching data when doing SSR", async () => {
    const container = new SubAppContainer({});

    envHooks.getContainer = () => container;

    const factory = reactQueryFeature({
      React,
      serverModule: undefined
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

    (def._features.reactQuery as any).wrap = props => {
      return JSON.stringify(props);
    };

    const result = await def._features.reactQuery.execute({
      input: {
        Component: () => {
          const { data } = useQuery("test", testFetch);
          return <div>test {JSON.stringify(data)}</div>;
        }
      }
    });

    const mockComponentFunc = result.Component;
    expect(mockComponentFunc()).equals(
      `{"queryClient":{"queryCache":{"listeners":[],"config":{},"queries":[],"queriesMap":{}},"mutationCache":{"listeners":[],"config":{},"mutations":[],"mutationId":0},"defaultOptions":{},"queryDefaults":[],"mutationDefaults":[]},"dehydratedState":{"mutations":[],"queries":[]}}`
    );
  });
});
