/* eslint-disable max-statements */

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

let persistentStoreContainer = { namedStores: {} };

/**
 * Initialize a container for saving shared redux stores
 *
 * - a field `namedStores` will be added to the container
 *
 * @param storeContainer - container
 * @returns the store container
 */
export function initContainer(storeContainer: any) {
  storeContainer = storeContainer || persistentStoreContainer;
  if (!storeContainer.namedStores) {
    storeContainer.namedStores = {};
  }
  return storeContainer;
}

/**
 * Set a global container for saving shared redux stores
 *
 * - a field `namedStores` will be added to the container
 * - Typically `window` on the browser
 *
 * @param storeContainer - container for shared redux stores
 * @returns the container passed in
 */
export function setStoreContainer(storeContainer: any) {
  persistentStoreContainer = storeContainer;
  initContainer(storeContainer);
  return storeContainer;
}

/**
 * Remove all saved redux stores
 *
 * @returns none
 */
export function clearSharedStore() {
  persistentStoreContainer.namedStores = {};
}

/**
 * Get a saved redux store by name
 * @param name - name of redux store to get
 *             - if this is `true` then return the default global redux store
 * @param storeContainer - the container of redux stores
 *
 * @returns
 */
export function getSharedStore(name: boolean | string, storeContainer: any) {
  storeContainer = initContainer(storeContainer);
  return (name && storeContainer.namedStores[name === true ? "_" : name]) || {};
}

/**
 * Save a redux store into the shared container by name
 *
 * @param name - name of redux store
 *             - if this is `true`, then set as the global redux store
 * @param contents - store content
 * @param storeContainer - store container
 * @returns none
 */
export function setSharedStore(name: boolean | string, contents, storeContainer: any) {
  storeContainer = initContainer(storeContainer);
  storeContainer.namedStores[name === true ? "_" : (name as string)] = contents;
}

/**
 * assert condition
 *
 * @param condition - must be truthy
 * @param msg - error message if condition fail assert
 * @returns none
 * @throws Error if assertion fail
 */
const assert = (flag: any, msg: string) => {
  if (!flag) {
    throw new Error(msg);
  }
};

const reducerNamesSym = "- reducer owner names -";
const originalReplaceReducerSym = "- original replace reducer -";

const newReducerContainer = () => ({ [reducerNamesSym]: [] });

const WHEN_SHARED_MSG = "When using reduxShareStore to share stores";
const errReducersMustBeObject = `${WHEN_SHARED_MSG}, reduxReducers must be an object of named reducers.`;

/**
 * Add a reducer to a shared redux store
 *
 * @param info
 * @param container
 * @param reducers
 */
const addSharedReducer = (info: any, container: any, reducers: Record<string, any>) => {
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

export function replaceReducer(newReducers, info, storeContainer) {
  const { store, reducerContainer } = getSharedStore(info.reduxShareStore, storeContainer);

  const reducer = combineSharedReducers(info, reducerContainer, newReducers);

  return store[originalReplaceReducerSym](reducer);
}

/**
 * Create a new redux store with an initial state for sharing
 *
 * @param initialState - initial state to create the store with
 * @param info -
 * @param storeContainer - optional container for the store.
 */
export function createSharedStore(initialState, info, storeContainer?: any) {
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
      store = createStore(
        combineSharedReducers(info, reducerContainer, info.reduxReducers),
        initialState
      );
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
  return createStore(reducer, initialState);
}

export function getReduxCreateStore(info: any) {
  return (initialState, storeContainer) => createSharedStore(initialState, info, storeContainer);
}
