"use strict";

import {
  setStoreContainer,
  getReduxCreateStore,
  getSharedStore,
  setSharedStore,
  clearSharedStore
} from "../../src/shared";

describe("shared redux store", function() {
  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  it("setStoreContainer should take a custom container", () => {
    const container = {};
    setStoreContainer(container);
    setSharedStore("hello");
    expect(getSharedStore()).to.equal("hello");
    expect(container).to.have.property("xarcReduxStore", "hello");
    clearSharedStore();
    expect(container).to.deep.equal({ xarcReduxStore: null });
  });

  it("getReduxCreateStore should create redux-bundler store", () => {
    const countBundle = {
      name: "count",
      reducer(state = 0) {
        return state + 1;
      },
      selectCount(state) {
        return state.count;
      }
    };

    const helloBundle = {
      name: "hello",
      reducer() {
        return "world";
      },
      selectHello(state) {
        return state.hello;
      }
    };

    const info1 = { reduxBundles: [countBundle] };
    const info2 = { reduxBundles: [countBundle, helloBundle] };

    const container = {};
    const reduxCreateStore = getReduxCreateStore(info1);
    let store = reduxCreateStore({ count: 0, hello: "foo" }, container);
    // initialize second subapp should inherit store from first subapp
    const create2 = getReduxCreateStore(info2);
    let store2 = create2({ count: 1 }, container);

    expect(store).to.equal(store2);

    // store should have collected only two bundles
    expect(store.bundles.length).to.equal(2);
    // store should have combined initial states
    expect(store.initialState).to.deep.equal({ count: 1, hello: "foo" });

    // realize the actual store

    store = store.realize();
    store2 = store2.realize();

    const count = store.selectCount();
    expect(count).to.equal(2);

    const hello = store2.selectHello();
    expect(hello).to.equal("world");
    expect(store2.selectCount()).to.equal(2);
    expect(store).to.equal(store2);
    // should be able to initialize a subapp without bundles
    const create3 = getReduxCreateStore({});
    const store3 = create3({}, container);
    expect(store3.selectHello()).to.equal("world");
  });

  it("should default empty initialState", () => {
    const countBundle = {
      name: "count",
      reducer(state = 0) {
        return state + 1;
      },
      selectCount(state) {
        return state.count;
      }
    };

    const info1 = { reduxBundles: [countBundle] };

    const container = {};
    const reduxCreateStore = getReduxCreateStore(info1);
    const store = reduxCreateStore(null, container);
    expect(store.initialState).to.deep.equal({});
    expect(store.realize).to.be.a("function");
  });
});
