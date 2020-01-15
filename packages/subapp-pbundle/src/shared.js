import { composeBundles } from "redux-bundler";
//
// - stores can be shared between subapps with reduxShareStore flag
//  - if it's true, then a common global store is used
//  - if it's a string, then it's use to name a store for sharing.
//  - otherwise subapp gets its own private store
// - state sharing is made possible through named reducers
//  - each subapp must provide named reducers for states
//  - other subapps can then provide the same reducer under the same name
//  - all the reducers are then merged into a single object and then combined
// - initial state handling follow these rules
//  - the first subapp that loads and initializes wins and all subapps load
//    after will use the initial state from it
//  - a top level initializer can be specified to do this
//

let shared = {};

function setStoreContainer(container) {
  shared = container;
}

function clearSharedStore() {
  delete shared.store;
}

function getSharedStore() {
  return shared.store;
}

function setSharedStore(store) {
  shared.store = store;
}

function getReduxCreateStore(info) {
  const bundles = info.reduxBundles || [];
  return function reduxCreateStore(initialState) {
    let store = getSharedStore();
    if (store) {
      store.integrateBundles.apply(this, bundles);
    } else {
      store = composeBundles.apply(this, bundles)(initialState);
      setSharedStore(store);
    }
    return store;
  };
}

export { setStoreContainer, getReduxCreateStore, getSharedStore, setSharedStore, clearSharedStore };
