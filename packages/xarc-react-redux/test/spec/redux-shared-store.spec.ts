import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import {
  initContainer,
  setStoreContainer,
  clearSharedStore,
  getSharedStore,
  setSharedStore,
  replaceReducer,
  createSharedStore,
  getReduxCreateStore
} from "../../src/common/redux-shared-store";

describe("shareStore", () => {
  beforeEach(() => {
    clearSharedStore();
  });

  describe("should initContainer", () => {
    beforeEach(() => {
      clearSharedStore();
    });

    it("should initContainer with store container input", () => {
      const storeContainerWithNamedStore = { namedStores: { a: "test" } };

      expect(initContainer(storeContainerWithNamedStore)).equal(storeContainerWithNamedStore);
      const storeContainerWithoutNamedStore = { a: "test" };

      expect(initContainer(storeContainerWithoutNamedStore)).equal(storeContainerWithoutNamedStore);
    });

    it("should initContainer without store container", () => {
      expect(initContainer(undefined)).eql({ namedStores: {} });
    });
  });

  it("should setStoreContainer", () => {
    expect(setStoreContainer({ namedStores: { a: "test" } })).to.eql({
      namedStores: { a: "test" }
    });

    setStoreContainer({ namedStores: {} });
  });

  it("should clearSharedStore", () => {
    expect(setStoreContainer({ namedStores: { a: "test" } })).to.eql({
      namedStores: { a: "test" }
    });
    clearSharedStore();

    expect(getSharedStore("namedStores", null)).to.eql({});
  });

  it("should getSharedStore", () => {
    expect(getSharedStore(true, { namedStores: { _: "test_" } })).equal("test_");

    expect(getSharedStore("a", { namedStores: { a: "test_a" } })).equal("test_a");

    expect(getSharedStore(false, { namedStores: { b: "test_b" } })).eql({});
  });

  it("should setSharedStore", () => {
    let obj = {};
    setSharedStore(true, { test_: { a: "test_" } }, obj);
    expect((obj as any).namedStores._).eqls({ test_: { a: "test_" } });

    obj = {};
    setSharedStore("store", { store1: { product: "test_product1" } }, obj);
    expect((obj as any).namedStores.store).eqls({ store1: { product: "test_product1" } });

    obj = {};
    setSharedStore(false, { store2: { product: "test_product2" } }, obj);
    expect((obj as any).namedStores.false).eqls({ store2: { product: "test_product2" } });
  });

  it("should replaceReducer", () => {
    const spy = sinon.spy();

    const reducerNamesSym = "- reducer owner names -";
    const originalReplaceReducerSym = "- original replace reducer -";

    const info = {
      name: "reducers",
      reduxShareStore: true
    };

    const storeContainer = {
      namedStores: {
        _: {
          store: { [reducerNamesSym]: x => x, [originalReplaceReducerSym]: spy },
          reducerContainer: {
            [reducerNamesSym]: ["test1", "test2"],
            test1: { a: "a", b: "b" },
            test2: { c: "c", d: "d" },
            reducers: {}
          }
        }
      }
    };

    const mockReducers = { t1: x => x, t2: y => y + 1 };
    replaceReducer(mockReducers, info, storeContainer);

    expect(spy.called).to.equal(true);
    sinon.restore();
  });

  describe("should createSharedStore", () => {
    beforeEach(() => {
      clearSharedStore();
    });

    it("should createSharedStore throw error when using reduxShareStore to share stores with reduxCreateStore", () => {
      const info = {
        reduxShareStore: true,
        _genReduxCreateStore: undefined,
        reduxCreateStore: x => x
      };

      try {
        expect(createSharedStore({}, info, {})).throws(
          "Error: When using reduxShareStore to share stores, you cannot have reduxCreateStore"
        );
      } catch (e) {
        //  eslint-disable-next-line
        console.log("This Error is expected \n" + e);
      }
    });

    it("should createSharedStore with shared store", () => {
      const reducerNamesSym = "- reducer owner names -";
      const originalReplaceReducerSym = "- original replace reducer -";

      const info = {
        name: "reducers",
        reduxShareStore: true,
        reduxReducers: { t1: x => x || "1", t2: y => y + 1 || "2" }
      };

      const storeContainer = {
        namedStores: {
          _: {
            store: { [reducerNamesSym]: x => x || "1", [originalReplaceReducerSym]: y => y || "2" },
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      expect(createSharedStore({ a: "test" }, info, storeContainer)).to.equal(
        storeContainer.namedStores._.store
      );
    });

    it("should createSharedStore without named store", () => {
      const reducerNamesSym = "- reducer owner names -";
      const originalReplaceReducerSym = "- original replace reducer -";

      const info = {
        name: "reducers",
        reduxShareStore: true,
        reduxReducers: { t1: x => x || "1", t2: y => y + 1 || "2" }
      };

      const storeContainer = {
        namedStores: {
          _: {
            store: undefined,
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      const store = createSharedStore({ a: "test" }, info, storeContainer);
      expect(store[originalReplaceReducerSym]).to.be.a("function");

      const spy = sinon.spy();

      const info2 = {
        name: "reducers",
        reduxShareStore: true
      };

      const storeContainer2 = {
        namedStores: {
          _: {
            store: { [reducerNamesSym]: x => x, [originalReplaceReducerSym]: spy },
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      const mockReducers = { t1: x => x, t2: y => y + 1 };
      store.replaceReducer(mockReducers, info2, storeContainer2);

      expect(spy.called).to.equal(true);
      sinon.restore();
    });

    it("should createSharedStore with reduxCreateStore", () => {
      const reducerNamesSym = "- reducer owner names -";
      const spy = sinon.spy();
      const info = {
        name: "reducers",
        reduxShareStore: false,
        reduxReducers: { t1: x => x || "1", t2: y => y + 1 || "2" },
        reduxCreateStore: spy,
        _genReduxCreateStore: undefined
      };

      const mockInitState = { a: "test" };
      const storeContainer = {
        namedStores: {
          _: {
            store: undefined,
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      createSharedStore(mockInitState, info, storeContainer);
      expect(spy.calledOnceWith(mockInitState)).to.equal(true);
      sinon.restore();
    });

    it("should createSharedStore with function reducer type", () => {
      const reducerNamesSym = "- reducer owner names -";
      const info = {
        name: "reducers",
        reduxShareStore: false,
        reduxReducers: x => x || "1",
        reduxCreateStore: undefined,
        _genReduxCreateStore: true
      };

      const mockInitState = { a: "test" };
      const storeContainer = {
        namedStores: {
          _: {
            store: undefined,
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      expect(createSharedStore(mockInitState, info, storeContainer)).to.be.an("object");
    });

    it("should createSharedStore with object reducer type", () => {
      const reducerNamesSym = "- reducer owner names -";
      const info = {
        name: "reducers",
        reduxShareStore: false,
        reduxReducers: { a: x => x || "1", b: y => y || "2" },
        reduxCreateStore: undefined,
        _genReduxCreateStore: true
      };

      const mockInitState = { a: "test" };
      const storeContainer = {
        namedStores: {
          _: {
            store: undefined,
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      expect(createSharedStore(mockInitState, info, storeContainer)).to.be.an("object");
    });

    it("should createSharedStore with non-object, non-function reducer type", () => {
      const reducerNamesSym = "- reducer owner names -";
      const info = {
        name: "reducers",
        reduxShareStore: false,
        reduxReducers: undefined,
        reduxCreateStore: undefined,
        _genReduxCreateStore: true
      };

      const mockInitState = { a: "test" };
      const storeContainer = {
        namedStores: {
          _: {
            store: undefined,
            reducerContainer: {
              [reducerNamesSym]: ["test1", "test2"],
              test1: { a: "a", b: "b" },
              test2: { c: "c", d: "d" },
              reducers: {}
            }
          }
        }
      };

      expect(createSharedStore(mockInitState, info, storeContainer)).to.be.an("object");
    });
  });

  it("Should getReduxCreateStore", () => {
    expect(getReduxCreateStore("test")).to.be.a("function");
  });
});
