/* eslint-disable max-statements */

import { configureStore, combineReducers, Reducer, UnknownAction } from "@reduxjs/toolkit";

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
 * Initialize a container for saving shared Redux stores.
 *
 * - Adds a `namedStores` field to the container.
 *
 * @param storeContainer - The container to initialize (optional).
 * @returns The initialized store container.
 */
export function initContainer(storeContainer: any): any {
  const storeCon = storeContainer || persistentStoreContainer;
  if (!storeCon.namedStores) {
    storeCon.namedStores = {};
  }
  return storeCon;
}

/**
 * Set a global container for saving shared Redux stores.
 *
 * - Adds a `namedStores` field to the container.
 * - Typically, `window` is used as the store container in the browser.
 *
 * @param storeContainer - The container for shared Redux stores.
 * @returns The provided store container.
 */
export function setStoreContainer(storeContainer: any): any {
  persistentStoreContainer = storeContainer;
  initContainer(storeContainer);
  return storeContainer;
}

/**
 * Remove all saved Redux stores from the container.
 *
 * @returns {void}
 */
export function clearSharedStore(): void {
  persistentStoreContainer.namedStores = {};
}

/**
 * Get a saved Redux store by name.
 *
 * @param name - The name of the Redux store to retrieve.
 *               - If `true`, return the default global Redux store.
 * @param storeContainer - The container of Redux stores (optional).
 *
 * @returns {object} - The named Redux store.
 */
export function getSharedStore(name: boolean | string, storeContainer: any): any {
  const storeCon = initContainer(storeContainer);
  return (name && storeCon.namedStores[name === true ? "_" : name]) || {};
}

/**
 * Save a Redux store into the shared container by name.
 *
 * @param name - The name of the Redux store.
 *               - If `true`, set as the global Redux store.
 * @param contents - The content of the store to save.
 * @param storeContainer - The container to store the Redux store (optional).
 * @returns {void}
 */
export function setSharedStore(
  name: boolean | string,
  contents: any,
  storeContainer: any
): void {
  const storeCon = initContainer(storeContainer);
  storeCon.namedStores[name === true ? "_" : (name as string)] = contents;
}

/**
 * Assert a condition and throw an error if the assertion fails.
 *
 * @param flag - The condition to assert (must be truthy).
 * @param msg - The error message to throw if the assertion fails.
 * @returns {void}
 * @throws Error if the assertion fails.
 */
const assert = (flag: any, msg: string): void => {
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
 * Add a reducer to a shared Redux store.
 *
 * @param info - Information about the shared store.
 * @param container - The container to hold the store.
 * @param reducers - The reducers to add.
 * @returns {object} - The combined reducers.
 */
const addSharedReducer = (
  info: any,
  container: any,
  reducers: Record<string, Reducer<any, UnknownAction>>
) => {
  assert(typeof reducers === "object", errReducersMustBeObject);

  const names = container[reducerNamesSym];

  if (!container.hasOwnProperty(info.name)) {
    names.push(info.name);
  }

  container[info.name] = reducers;

  const merged = names.reduce((m, n) => Object.assign(m, container[n]), {});

  return merged;
};

/**
 * Combine shared reducers into a single reducer.
 *
 * @param info - Information about the shared store.
 * @param container - The container holding the reducers.
 * @param reducers - The reducers to combine.
 * @returns {object} - The combined reducers.
 */
const combineSharedReducers = (info, container, reducers) => {
  return combineReducers(addSharedReducer(info, container, reducers));
};

/**
 * Replace a reducer in the shared Redux store.
 *
 * @param newReducers - The new reducers to set.
 * @param info - Information about the Redux shared store.
 * @param storeContainer - The container holding the shared store.
 * @returns {object} - The shared store's original replaced reducer.
 */
export function replaceReducer(
  newReducers: Reducer<any, UnknownAction> | Record<string, Reducer<any, UnknownAction>>,
  info: any,
  storeContainer: any
): any {
  const { store, reducerContainer } = getSharedStore(info.reduxShareStore, storeContainer);

  const reducer = combineSharedReducers(info, reducerContainer, newReducers);

  return store[originalReplaceReducerSym](reducer);
}

/**
 * Create a new Redux store with an initial state for sharing.
 *
 * @param initialState - The initial state to create the store with.
 * @param info - Information about the shared store.
 * @param storeContainer - The container to store the Redux store (optional).
 * @returns {object} - The shared Redux store.
 */
export function createSharedStore(
  initialState: any,
  info: any,
  storeContainer?: any
): any {
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
      store = configureStore({
        reducer: combineSharedReducers(info, reducerContainer, info.reduxReducers),
        preloadedState: initialState,
      });
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

  // Call user-provided reduxCreateStore function if defined
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
    reducer = (state = initialState) => state;
  }
  return configureStore({
    reducer,
    preloadedState: initialState,
  });
}

/**
 * Get a function to create a Redux shared store.
 *
 * @param info - Information about the shared store.
 * @returns {Function} - A function to create the shared store.
 */
export function getReduxCreateStore(info: any): any {
  return (initialState, storeContainer) =>
    createSharedStore(initialState, info, storeContainer);
}
