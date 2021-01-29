import "jsdom-global/register";
import React from "react"; // eslint-disable-line
import { describe, it } from "mocha";
import { expect } from "chai";
import { SubAppDef, SubAppContainer, envHooks, SubAppFeatureResult } from "@xarc/subapp";
import { reactRouterFeature } from "../../src/browser/index";
import { render, waitFor, screen } from "@testing-library/react";
import { _id, _subId } from "../../src/common";
import { createBrowserHistory } from "history";

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

  it("should render subapp when history is true", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React, history: true });
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
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="test" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test <p>{"data":"test"}</p>`);
  });

  it("should render subapp when history is true without input component", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React, history: true });
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
      input: {
        Component: undefined
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="test" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test <p>{"data":"test"}</p>`);
  });

  it("should render subapp when history is an object", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React, history: createBrowserHistory() });
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
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="test-2" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test <p>{"data":"test-2"}</p>`);
  });

  it("should render subapp when history is false", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React, history: false });
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
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="test-3" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test <p>{"data":"test-3"}</p>`);
  });

  it("should render subapp when history is invalid", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reactRouterFeature({ React, history: null });
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
      }
    }) as SubAppFeatureResult).Component;

    render(<Component data="test-4" />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test <p>{"data":"test-4"}</p>`);
  });
});
