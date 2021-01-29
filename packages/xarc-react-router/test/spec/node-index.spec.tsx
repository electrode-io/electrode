import "jsdom-global/register";
import React from "react"; // eslint-disable-line
import { describe, it } from "mocha";
import { expect } from "chai";
import { SubAppDef, SubAppContainer, envHooks, SubAppFeatureResult } from "@xarc/subapp";
import { reactRouterFeature } from "../../src/node/index";
import { render, waitFor, screen } from "@testing-library/react";
import { _id, _subId } from "../../src/common";

const { createElement } = React; // eslint-disable-line

describe("reactRouterFeature browser", () => {
  it("should return a feature factory", async () => {
    const factory = reactRouterFeature({ React });
    expect(factory.id).equal(_id);
    expect(factory.subId).equal(_subId);
    expect(factory.add).to.be.a("function");
  });

  it("should add react-router feature to a subapp", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React });
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);

    expect(def._features.reactRouter).to.be.an("object");
    expect(def._features.reactRouter.id).equal(_id);
    expect(def._features.reactRouter.subId).equal(_subId);
    expect(def._features.reactRouter.execute).to.be.a("function");
  });

  it("should render subapp with input component", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React });
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);

    const Component = (def._features.reactRouter.execute({
      input: {
        Component: props => (
          <div>
            test <p>{JSON.stringify(props)}</p>
          </div>
        )
      },
      ssrData: {
        context: {
          user: {
            routerContext: "test-context"
          }
        },
        subapp: def,
        options: {
          name: "test-subapp-def-option"
        },
        path: "test-path-1"
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="don't expect it be rendered" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test <p>{}</p>`);
  });

  it("should render subapp without input component", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React });
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {},
      _getExport: () => {
        return {
          Component: props => (
            <div>
              test <p>{JSON.stringify(props)}</p>
            </div>
          )
        };
      }
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);

    const Component = (def._features.reactRouter.execute({
      input: { Component: undefined },
      ssrData: {
        context: {
          user: {
            routerContext: "test-context"
          }
        },
        subapp: def,
        options: {
          name: "test-subapp-def-option"
        },
        path: "test-path-2"
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="don't expect it be rendered" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test <p>{}</p>`);
  });
});
