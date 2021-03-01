/* eslint-disable prefer-arrow-callback */
import "jsdom-global/register";
import React from "react"; // eslint-disable-line
import { describe, it } from "mocha";
import { expect } from "chai";
import { SubAppDef, SubAppContainer, envHooks } from "@xarc/subapp";
import { Provider } from "react-redux";
import { render, waitFor, screen } from "@testing-library/react";
import sinon from "sinon";
import { createStore, reduxFeature, ReduxFeature } from "../../src/browser/index";

const { createElement } = React; // eslint-disable-line

const mockPrepare = async initialState => {
  return { initialState: "init-state-" + initialState };
};

const options = {
  React,
  prepare: mockPrepare
};

const MockComponent = () => {
  return (
    <div>
      test<p>mock-component-content</p>
    </div>
  );
};

describe("reactReduxFeature", function () {
  it("should return a feature factory", () => {
    const factory = reduxFeature({ React, prepare: mockPrepare });
    expect(factory.id).equal("state-provider");
    expect(factory.subId).equal("react-redux");
    expect(factory.add).to.be.a("function");
  });

  it("should add redux feature to subapp", () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = reduxFeature(options);
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);

    const redux: Partial<ReduxFeature> = def._features.redux;
    expect(redux.Provider).equal(Provider);

    expect(redux.wrap).to.be.an("function");
    expect(redux.createStore).to.be.an("function");
    expect(redux.execute).to.be.an("function");

    expect(redux.options).equal(options);
    expect(redux.options.prepare).equal(options.prepare);

    expect(redux.id).equal("state-provider");
    expect(redux.subId).equal("react-redux");
  });

  it("should render subapp have redux wrapper", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature(options);

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    const redux: Partial<ReduxFeature> = def._features.redux;

    render(
      redux.wrap({
        Component: MockComponent,
        store: createStore(state => state)
      })
    );

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test<p>mock-component-content</p>`);
  });

  it("should subapp2 have create store on redux feature", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature(options);

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    const redux: Partial<ReduxFeature> = def._features.redux;

    sinon
      .stub(require("redux"), "createStore") // eslint-disable-line
      .callsFake((reducer, initalState) => reducer(initalState));

    const mockFn = x => x + "-----withMockFn";

    expect((redux.createStore as any)(mockFn, "test")).equal("test-----withMockFn");

    expect((redux.createStore as any)(undefined, "test")).equal("test");

    sinon.restore();
  });

  it("should render subapp with simple reducer on browser side", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature({ ...options, reducers: true });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    def._module = { reduxReducers: x => x };
    (def._features.redux as any)._store = createStore(x => x);

    const res = await def._features.redux.execute({
      input: {
        Component: MockComponent
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: true
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test<p>mock-component-content</p>`);

    expect(res.props).to.eql({});
  });

  it("should render subapp with combined reducer on browser side", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature({ ...options, reducers: true });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);
    def._module = { reduxReducers: { a: x => x || "1", b: x => x || "2" } };
    (def._features.redux as any)._store = createStore(x => x);
    const res = await def._features.redux.execute({
      input: {
        Component: MockComponent
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: true
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test<p>mock-component-content</p>`);

    expect(res.props).to.eql({});
  });

  it("should render subapp without reducer on browser side", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature({ ...options, reducers: false });

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
              test <p>get-export-mock-content</p>
            </div>
          )
        };
      }
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    (def._features.redux as any)._store = createStore(x => x);
    const res = await def._features.redux.execute({
      input: {
        Component: undefined
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: true
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test <p>get-export-mock-content</p>`);

    expect(res.props).to.eql({});
  });

  it("should render subapp with decorator", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const reduxFeatureOptions = {
      ...options,
      reducers: true,
      decorators: [
        {
          decorate: (reduxFeat, reduxDecoratorParam) => {
            return {
              store: "mock-store1" + JSON.stringify(reduxFeat) + JSON.stringify(reduxDecoratorParam)
            };
          }
        },
        {
          decorate: (reduxFeat, reduxDecoratorParam) => {
            return {
              store: "mock-store2" + JSON.stringify(reduxFeat) + JSON.stringify(reduxDecoratorParam)
            };
          }
        }
      ]
    };
    const factory = reduxFeature(reduxFeatureOptions);
    const spy1 = sinon.spy(reduxFeatureOptions.decorators[0], "decorate");
    const spy2 = sinon.spy(reduxFeatureOptions.decorators[1], "decorate");

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    def._module = { reduxReducers: x => x };
    (def._features.redux as any)._store = createStore(x => x);

    await def._features.redux.execute({
      input: {
        Component: MockComponent
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: false
    });

    expect(spy1.calledOnce && spy2.calledOnce).to.eql(true);
    expect(spy1.calledBefore(spy2)).to.eql(true);
    sinon.restore();
  });

  it("should render subapp without reload and decorator", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const reduxFeatureOptions = {
      ...options,
      reducers: x => x || "1"
    };
    const factory = reduxFeature(reduxFeatureOptions);

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    const stub1 = sinon.stub(def._features.redux as any, "wrap").callsFake(obj => obj);

    const res = await def._features.redux.execute({
      input: {
        Component: MockComponent
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: false
    });
    //  eslint-disable-next-line
    res.Component();
    expect(stub1.calledOnce).to.eql(true);
    expect(
      stub1.calledWith({ Component: MockComponent, store: (def._features.redux as any)._store })
    ).to.eql(true);
  });

  it("should render subapp with simple reducer on node side", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature({ ...options, reducers: true });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);
    def._module = { reduxReducers: x => x };
    (def._features.redux as any)._store = createStore(x => x);

    const res = await def._features.redux.execute({
      input: {
        Component: MockComponent
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: false
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test<p>mock-component-content</p>`);

    expect(res.props).equal("init-state-test");
  });

  it("should render subapp with combined reducer on node side", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature({ ...options, reducers: true });

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);
    def._module = { reduxReducers: { a: x => x || "1", b: x => x || "2" } };
    (def._features.redux as any)._store = createStore(x => x);
    const res = await def._features.redux.execute({
      input: {
        Component: MockComponent
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: false
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test<p>mock-component-content</p>`);

    expect(res.props).equal("init-state-test");
  });

  it("should render subapp without reducer on node side", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = reduxFeature({ ...options, reducers: false });

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
              test <p>get-export-mock-content</p>
            </div>
          )
        };
      }
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    (def._features.redux as any)._store = createStore(x => x);
    const res = await def._features.redux.execute({
      input: {
        Component: undefined
      },
      csrData: {
        name: "test",
        getInitialState: () => "test"
      },
      reload: false
    });

    render(<res.Component />);

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).equal(`test <p>get-export-mock-content</p>`);

    expect(res.props).equal("init-state-test");
  });
});
