"use strict";

import {
  setStoreContainer,
  getReduxCreateStore,
  getSharedStore,
  setSharedStore,
  clearSharedStore
} from "../../src/shared";

describe("shared redux store", function() {
  it("setStoreContainer should take a custom container", () => {
    const container = {};
    setStoreContainer(container);
    setSharedStore("hello");
    expect(getSharedStore()).to.equal("hello");
    expect(container).to.have.property("store", "hello");
    clearSharedStore();
    expect(container).to.deep.equal({});
  });

  it("getReduxCreateStore should create redux-bundler store", () => {
    const info1 = {
      reduxBundles: [
        {
          name: "count",
          reducer(state = 0) {
            return state + 1;
          },
          selectCount(state) {
            return state.count;
          }
        }
      ]
    };

    const info2 = {
      reduxBundles: [
        {
          name: "hello",
          reducer() {
            return "world";
          },
          selectHello(state) {
            return state.hello;
          }
        }
      ]
    };

    const container = {};
    const reduxCreateStore = getReduxCreateStore(info1);
    const store = reduxCreateStore({}, container);
    const count = store.selectCount();
    expect(count).to.equal(1);
    // initialize second subapp should inherit store from first subapp
    const create2 = getReduxCreateStore(info2);
    const store2 = create2({}, container);
    const hello = store2.selectHello();
    expect(hello).to.equal("world");
    expect(store2.selectCount()).to.equal(2);
    expect(store).to.equal(store2);
    // should be able to initialize a subapp without bundles
    const create3 = getReduxCreateStore({});
    const store3 = create3({}, container);
    expect(store3.selectHello()).to.equal("world");
  });
});
