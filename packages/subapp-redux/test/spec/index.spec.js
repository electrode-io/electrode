"use strict";

const subappRedux = require("../..");
const { getReduxCreateStore, clearSharedStore, setStoreContainer } = require("../../src/shared");
const { getSubAppContainer } = require("subapp-util");

const SimpleReducer = (x = true) => x;

describe("subapp-redux", function() {
  afterEach(() => {
    clearSharedStore();
  });

  it("should load redux subapp", () => {
    subappRedux.reduxLoadSubApp({ name: "foo" });
    expect(getSubAppContainer().foo).to.exist;
  });

  it("should create store based on reduxCreateStore if it is passed", () => {
    const store = getReduxCreateStore({
      reduxCreateStore: () => 5
    })({});

    expect(store).to.equal(5);
  });

  it("should use true reduxShareStore to name and persist primary store instance", () => {
    const defaultStore = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: true
    })({});

    const defaultStore2 = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: true
    })({});

    expect(defaultStore).to.equal(defaultStore2);
  });

  it("should not conflate true reduxShareStore with named reduxShareStore", () => {
    const defaultStore = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: true
    })({});

    const green = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: "green"
    })({});

    expect(defaultStore).to.not.equal(green);
  });

  it("should use string reduxShareStore to name and persist store instances", () => {
    const blue = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: "blue"
    })({});

    const blue2 = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: "blue"
    })({});

    expect(blue).to.equal(blue2);
  });

  it("should not conflate two different reduxShareStore keys", () => {
    const blue = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: "blue"
    })({});

    const green = getReduxCreateStore({
      reduxReducers: { a: SimpleReducer },
      reduxShareStore: "green"
    })({});

    expect(blue).to.not.equal(green);
  });

  it("should not allow reduxCreateStore when share store is used", () => {
    expect(() =>
      getReduxCreateStore({
        reduxCreateStore: () => 5,
        reduxShareStore: true
      })({})
    ).throws("cannot have reduxCreateStore");
  });

  it("should not allow functional reducers in a shared store", () => {
    expect(() => {
      getReduxCreateStore({
        reduxReducers: x => x,
        reduxShareStore: true
      })({});
    }).to.throw();
  });

  it("should combine named reducers when sharing a store", () => {
    getReduxCreateStore({
      name: "app1",
      reduxReducers: { pi: (x = 3.146) => x },
      reduxShareStore: true
    })({});

    const store = getReduxCreateStore({
      name: "app2",
      reduxReducers: { sqrt2: (x = 1.414) => x },
      reduxShareStore: true
    })({});

    const state = store.getState();
    expect(state.pi).to.equal(3.146);
    expect(state.sqrt2).to.equal(1.414);
  });

  it("should replace one app's reducers in share store", () => {
    getReduxCreateStore({
      name: "app1",
      reduxReducers: { pi: (x = 3.146) => x },
      reduxShareStore: true
    })({});

    const app2 = {
      name: "app2",
      reduxReducers: {
        sqrt2: (x = 1.414) => {
          return x;
        }
      },
      reduxShareStore: true
    };
    const store = getReduxCreateStore(app2)({});

    const state = store.getState();
    expect(state.pi).to.equal(3.146);
    expect(state.sqrt2).to.equal(1.414);
    store.replaceReducer(
      {
        sqrt2: () => {
          return 11;
        }
      },
      app2
    );
    store.dispatch({ type: 1 });
    const state2 = store.getState();
    expect(state2.sqrt2).to.equal(11);
  });

  it("should use user container to hold share stores", () => {
    const container = {};
    setStoreContainer(container);
    const store = getReduxCreateStore({
      name: "app1",
      reduxReducers: { pi: (x = 3.146) => x },
      reduxShareStore: true
    })({});

    expect(container.namedStores._.store).equals(store);
  });

  it("should create private store if not share with function reducer", () => {
    const container = {};
    setStoreContainer(container);
    const store = getReduxCreateStore({
      name: "app",
      reduxReducers: () => {
        return { v: 1 };
      }
    })({});
    expect(container.namedStores).to.deep.equal({});
    const state = store.getState();
    expect(state.v).equals(1);
  });

  it("should create private store if not share with named reducer", () => {
    const container = {};
    setStoreContainer(container);
    const store = getReduxCreateStore({
      name: "app",
      reduxReducers: {
        a: () => {
          return 2;
        }
      }
    })({});
    expect(container.namedStores).to.deep.equal({});
    const state = store.getState();
    expect(state.a).equals(2);
  });

  it("should create private store with default reducer if no reducer provided", () => {
    const container = {};
    setStoreContainer(container);
    const store = getReduxCreateStore({
      name: "app"
    })({ a: 1 });
    expect(container.namedStores).to.deep.equal({});
    const state = store.getState();
    expect(state).to.deep.equal({ a: 1 });
  });
});
