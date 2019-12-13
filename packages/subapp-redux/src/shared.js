const { createStore, combineReducers } = require("redux");

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

let shared = { namedStores: {} };

function setStoreContainer(container) {
  shared = container;
  shared.namedStores = shared.namedStores || {};
}

function clearSharedStore() {
  shared.namedStores = {};
}

function getSharedStore(name) {
  return (name && shared.namedStores[name === true ? "_" : name]) || {};
}

function setSharedStore(name, contents) {
  shared.namedStores[name === true ? "_" : name] = contents;
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

function replaceReducer(newReducers, info) {
  let { store, reducerContainer } = getSharedStore(info.reduxShareStore);
  const reducer = combineSharedReducers(info, reducerContainer, newReducers);
  return store[originalReplaceReducerSym](reducer);
}

function createSharedStore(initialState, info) {
  const sharedStore = info.reduxShareStore;

  if (sharedStore) {
    assert(
      info._genReduxCreateStore || !info.reduxCreateStore,
      `${WHEN_SHARED_MSG}, you cannot have reduxCreateStore`
    );
    let { store, reducerContainer } = getSharedStore(sharedStore);
    if (store) {
      // TODO: redux doesn't have a way to set initial state
      // after store's created?  What can we do about this?
      replaceReducer(info.reduxReducers, info);
    } else {
      reducerContainer = newReducerContainer();
      store = createStore(
        combineSharedReducers(info, reducerContainer, info.reduxReducers),
        initialState
      );
      store[originalReplaceReducerSym] = store.replaceReducer;
      //
      // TODO: monkey patching store is bad
      // since this is share store, reducers must be replaced
      // as object of named reducers also, but patching an API
      // that alters argument type is worst
      // Maybe create a proxy store object, one for each sub-app
      //
      store.replaceReducer = (reducers, info2) => replaceReducer(reducers, info2);
    }
    setSharedStore(sharedStore, { store, reducerContainer });
    return store;
  }

  if (info.reduxCreateStore) {
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
  return createStore(reducer, initialState);
}

function getReduxCreateStore(info) {
  return initialState => createSharedStore(initialState, info);
}

module.exports = {
  setStoreContainer,
  getReduxCreateStore,
  createSharedStore,
  getSharedStore,
  setSharedStore,
  clearSharedStore
};
