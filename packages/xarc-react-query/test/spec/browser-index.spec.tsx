/* eslint-disable prefer-arrow-callback */
import "jsdom-global/register";
import React from "react"; // eslint-disable-line
import { describe, it } from "mocha";
import { expect } from "chai";
import { SubAppDef, SubAppContainer, envHooks } from "@xarc/subapp";
import { useQuery } from "@tanstack/react-query";
import { reactQueryFeature } from "../../src/browser/index";
import { testFetch } from "../prefetch";
import { render, waitFor, screen } from "@testing-library/react";

const { createElement } = React; // eslint-disable-line

describe("reactQueryFeature browser", function () {
  it("should return a feature factory", async () => {
    const factory = reactQueryFeature({ React });
    expect(factory.id).equal("state-provider");
    expect(factory.subId).equal("@tanstack/react-query");
    expect(factory.add).to.be.a("function");
  });

  it("should add @tanstack/react-query feature to a subapp", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactQueryFeature({ React });
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {},
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);

    expect(def._features.reactQuery).to.be.an("object");
  });

  it("should render subapp with @tanstack/react-query when component exists on input", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reactQueryFeature({ React });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {},
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    const res = await def._features.reactQuery.execute({
      input: {
        Component: () => {
          const { data } = useQuery({
            queryKey: ["test"],
            queryFn: testFetch,
            gcTime: 200,
          });
          return data ? (
            <div>
              test <p>{JSON.stringify(data)}</p>
            </div>
          ) : (
            ""
          );
        },
      },
      csrData: {
        name: "test",
        getInitialState: () => "test",
      },
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), {
      timeout: 500,
    });
    expect(element.innerHTML).contains(
      `<p>{"msg":"foo","queryKey":["test"]}</p>`
    );
  });

  it("should render subapp with @tanstack/react-query when input component does not exist", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reactQueryFeature({ React });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {},
      _getExport: () => {
        return {
          Component: () => (
            <div>
              test <p>text</p>
            </div>
          ),
        };
      },
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    const res = await def._features.reactQuery.execute({
      input: {
        Component: undefined,
      },
      csrData: {
        name: "test",
        getInitialState: () => "test",
      },
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), {
      timeout: 500,
    });

    expect(element.innerHTML).equal(`test <p>text</p>`);
  });
});
