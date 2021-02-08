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

describe.only("shareStore", function () {
  beforeEach(() => {
    setStoreContainer({ namedStores: {} });
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

  // export function setStoreContainer(storeContainer: any) {
  //   persistentStoreContainer = storeContainer;
  //   initContainer(storeContainer);
  //   return storeContainer;
  // }
  it("should setStoreContainer", () => {
    expect(setStoreContainer({ namedStores: { a: "test" } })).deep.equal({
      namedStores: { a: "test" }
    });

    setStoreContainer({ namedStores: {} });
  });

  it("should getSharedStore", () => {
    expect(getSharedStore(true, { namedStores: { _: "test_" } })).equal("test_");

    expect(getSharedStore("a", { namedStores: { a: "test_a" } })).equal("test_a");

    expect(getSharedStore(false, { namedStores: { b: "test_b" } })).deep.equal({});
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
    const reducerNamesSym = "- reducer owner names -";
    const originalReplaceReducerSym = "- original replace reducer -";

    const info = {
      name: "reducers",
      reduxShareStore: true
    };
    const spy = sinon.spy();

    const storeContainer = {
      namedStores: {
        _: {
          store: { [reducerNamesSym]: x => x, [originalReplaceReducerSym]: spy }, //  TODO find mock function hook
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

  // it("should createSharedStore with shared store", () => {
  //   const reducerNamesSym = "- reducer owner names -";
  //   const originalReplaceReducerSym = "- original replace reducer -";

  //   const info = {
  //     name: "reducers",
  //     reduxShareStore: true
  //   };
  //   const spy = sinon.spy();

  //   const storeContainer = {
  //     namedStores: {
  //       _: {
  //         store: { [reducerNamesSym]: x => x, [originalReplaceReducerSym]: spy }, //  TODO find mock function hook
  //         reducerContainer: {
  //           [reducerNamesSym]: ["test1", "test2"],
  //           test1: { a: "a", b: "b" },
  //           test2: { c: "c", d: "d" },
  //           reducers: {}
  //         }
  //       }
  //     }
  //   };

  //   const mockReducers = { t1: x => x, t2: y => y + 1 };
  //   replaceReducer(mockReducers, info, storeContainer);

  //   expect(spy.called).to.equal(true);
  //   sinon.restore();
  // });
});
