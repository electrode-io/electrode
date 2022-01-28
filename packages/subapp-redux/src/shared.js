import { createStore, combineReducers } from "redux";

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

let persistenStoreContainer = { namedStores: {} };

function initContainer(storeContainer) {
  storeContainer = storeContainer || persistenStoreContainer;
  if (!storeContainer.namedStores) {
    storeContainer.namedStores = {};
  }
  return storeContainer;
}

function setStoreContainer(storeContainer) {
  persistenStoreContainer = storeContainer;
  initContainer(storeContainer);
}

function clearSharedStore() {
  persistenStoreContainer.namedStores = {};
}

function getSharedStore(name, storeContainer) {
  storeContainer = initContainer(storeContainer);
  return (name && storeContainer.namedStores[name === true ? "_" : name]) || {};
}

function setSharedStore(name, contents, storeContainer) {
  storeContainer = initContainer(storeContainer);
  storeContainer.namedStores[name === true ? "_" : name] = contents;
}

const assert = (flag, msg) => {
  if (!flag) {
    throw new Error(msg);
  }
};

const reducerNamesSym = "- reducer owner names -";
const originalReplaceReducerSym = "- original replace reducer -";

const newReducerContainer = () => ({ [reducerNamesSym]: [] });

const WHEN_SHARED_MSG = "When using reduxShareStore to share stores";
const errReducersMustBeObject = `${WHEN_SHARED_MSG}, reduxReducers must be an object of named reducers.`;

const addSharedReducer = (info, container, reducers) => {
  assert(typeof reducers === "object", errReducersMustBeObject);
  const names = container[reducerNamesSym];
  if (!container.hasOwnProperty(info.name)) {
    names.push(info.name);
  }
  container[info.name] = reducers;
  const merged = names.reduce((m, n) => Object.assign(m, container[n]), {});

  return merged;
};

const combineSharedReducers = (info, container, reducers) => {
  return combineReducers(addSharedReducer(info, container, reducers));
};

function replaceReducer(newReducers, info, storeContainer) {
  let { store, reducerContainer } = getSharedStore(info.reduxShareStore, storeContainer);
  const reducer = combineSharedReducers(info, reducerContainer, newReducers);
  return store[originalReplaceReducerSym](reducer);
}

function createSharedStore(initialState, info, storeContainer) {
  const sharedStoreName = info.reduxShareStore;

  if (sharedStoreName) {
    assert(
      info._genReduxCreateStore || !info.reduxCreateStore,
      `${WHEN_SHARED_MSG}, you cannot have reduxCreateStore`
    );
    let { store, reducerContainer } = getSharedStore(sharedStoreName, storeContainer);
    if (store) {
      // TODO: redux doesn't have a way to set initial state
      // after store's created?  What can we do about this?
      replaceReducer(info.reduxReducers, info, storeContainer);
    } else {
      reducerContainer = newReducerContainer();
      if (info.reduxEnhancer && info.reduxEnhancer instanceof Function) {
        store = createStore(
          combineSharedReducers(info, reducerContainer, info.reduxReducers),
          initialState,
          info.reduxEnhancer()
        );
      } else {
        store = createStore(
          combineSharedReducers(info, reducerContainer, info.reduxReducers),
          initialState
        );
      }
      store[originalReplaceReducerSym] = store.replaceReducer;
      //
      // TODO: better handling of a replaceReducer that takes extra params
      //
      // Since this is share store, reducers must be replaced
      // as object of named reducers also.
      //
      // Maybe create a proxy store object, one for each sub-app
      //
      // NOTE: It's only on SSR that we need to share store within the
      // request and replaceReducer doesn't make sense for SSR, but it's
      // taking a storeContainer here anyways.
      //
      store.replaceReducer = (reducers, info2, storeContainer2) => {
        return replaceReducer(reducers, info2, storeContainer2);
      };
    }
    setSharedStore(sharedStoreName, { store, reducerContainer }, storeContainer);
    return store;
  }

  // call user provided reduxCreateStore
  if (info.reduxCreateStore && !info._genReduxCreateStore) {
    // TODO: given the complexities of dealing with and maintaining store
    // allowing user reduxCreateStore is not a good idea.  Consider for removal.
    return info.reduxCreateStore(initialState);
  }

  let reducer;
  const reducerType = typeof info.reduxReducers;
  if (reducerType === "function") {
    reducer = info.reduxReducers;
  } else if (reducerType === "object") {
    reducer = combineReducers(info.reduxReducers);
  } else {
    reducer = x => x;
  }

  if (info.reduxEnhancer && info.reduxEnhancer instanceof Function) {
    return createStore(reducer, initialState, info.reduxEnhancer());
  }
  return createStore(reducer, initialState);
}

function getReduxCreateStore(info) {
  return (initialState, storeContainer) => createSharedStore(initialState, info, storeContainer);
}

export {
  setStoreContainer,
  getReduxCreateStore,
  createSharedStore,
  getSharedStore,
  setSharedStore,
  clearSharedStore
};
