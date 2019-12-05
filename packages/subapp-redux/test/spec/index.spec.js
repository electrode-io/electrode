"use strict";

const subappRedux = require("../..");
const { getReduxCreateStore, clearSharedStore } = require("../../src/shared");
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

  it("should create and share a store based on reduxCreateStore", () => {
    getReduxCreateStore({
      reduxCreateStore: () => 5,
      reduxShareStore: true
    })({});

    const store = getReduxCreateStore({
      reduxShareStore: true
    })({});

    expect(store).to.equal(5);
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
      reduxReducers: { pi: (x = 3.146) => x},
      reduxShareStore: true
    })({});

    const store = getReduxCreateStore({
      reduxReducers: { sqrt2: (x = 1.414) => x},
      reduxShareStore: true
    })({});

    const state = store.getState();
    expect(state.pi).to.equal(3.146);
    expect(state.sqrt2).to.equal(1.414);
  });
});
