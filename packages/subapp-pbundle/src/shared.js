import { composeBundlesRaw } from "redux-bundler";
//
// - stores can be shared between subapps with reduxShareStore flag
//  - if it's true, then a common global store is used
//  - if it's a string, then it's use to name a store for sharing.
//  - otherwise subapp gets its own private store
// - state sharing is made possible through redux-bundler
//

let shared = {};

function setStoreContainer(container) {
  shared = container;
}

function setSharedStore(store, container) {
  (container || shared).store = store;
}

function getSharedStore(container) {
  return (container || shared).store;
}

function clearSharedStore(container) {
  setSharedStore(null, container);
}

//
// create a proxy store to aggregate bundles and initial states
// from subapps, until realize is called, which would create the
// actual redux store with all combined bundles and initial state
//
function createDeferStore(bundles, initialState, storeContainer) {
  const store = { bundles, initialState };
  store.realize = () => {
    let real = store.real;
    if (!real) {
      // Using apply to destruct bundles array as arguments
      // not doing ... because babel would intro some toConsumableArray call
      store.real = real = composeBundlesRaw.apply(undefined, store.bundles)(store.initialState);
      setSharedStore(real, storeContainer);
    }
    return real;
  };

  return store;
}

function getReduxCreateStore(info) {
  const bundles = info.reduxBundles || [];
  return function reduxCreateStore(initialState, storeContainer) {
    let store = getSharedStore(storeContainer);
    if (!store) {
      store = createDeferStore(bundles, initialState || {}, storeContainer);
      setSharedStore(store, storeContainer);
    } else if (store.realize) {
      bundles.forEach(b => {
        if (store.bundles.indexOf(b) < 0) {
          store.bundles.push(b);
        }
      });
      Object.assign(store.initialState, initialState);
    } else {
      const integratedBundleNames = store.meta.chunks[0].bundleNames;
      const unintegratedBundles = bundles.filter(
        bundle => integratedBundleNames.indexOf(bundle.name) < 0
      );
      // using apply to destruct bundles array into arguments
      store.integrateBundles.apply(undefined, unintegratedBundles);
    }
    return store;
  };
}

export { setStoreContainer, getReduxCreateStore, getSharedStore, setSharedStore, clearSharedStore };
