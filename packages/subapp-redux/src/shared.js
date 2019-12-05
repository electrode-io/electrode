const { combineReducers, createStore } = require("redux");

const shared = typeof window !== "undefined" ? window : global;

function clearSharedStore() {
  delete shared.namedStores;
}

function getSharedStore(name) {
  name = name === true ? "" : name;
  shared.namedStores = shared.namedStores || {};
  return shared.namedStores[name] || {};
}

function setSharedStore(name, contents) {
  name = name === true ? "" : name;
  shared.namedStores = shared.namedStores || {};
  shared.namedStores[name] = contents;
}

function getReduxCreateStore(info) {
  return function(initialState) {
    if (info.reduxShareStore) {
      let { store, reducers } = getSharedStore(info.reduxShareStore);
      if (store) {
        if (info.reduxReducers) {
          if (typeof info.reduxReducers !== "object") {
            throw "When using reduxShareStore to share stores, reduxReducers must be an object of named reducers.";
          }
          reducers = { ...reducers, ...info.reduxReducers };
          const rootReducer = combineReducers(reducers);
          store.replaceReducer(rootReducer);
        }
      } else if (info.reduxCreateStore) {
        if (!store) {
          store = info.reduxCreateStore(initialState);
        }
      } else {
        if (typeof info.reduxReducers !== "object") {
          throw "When using reduxShareStore to share stores, reduxReducers must be an object of named reducers.";
        }
        reducers = info.reduxReducers;
        const rootReducer = combineReducers(reducers);
        store = createStore(rootReducer, initialState);
      }
      setSharedStore(info.reduxShareStore, { store, reducers });
      return store;
    }

    if (info.reduxCreateStore) {
      return info.reduxCreateStore(initialState);
    }

    let reducer;
    if (typeof info.reduxReducers === "function") {
      reducer = info.reduxReducers;
    } else if (typeof info.reduxReducers === "object") {
      reducer = combineReducers(info.reduxReducers);
    } else {
      reducer = x => x;
    }
    return createStore(reducer, initialState);
  };
}

module.exports = { getReduxCreateStore, getSharedStore, setSharedStore, clearSharedStore };
