"use strict";

const { combineReducers } = require("redux");

module.exports = async function(options) {
  const name = options.route.name || "top";

  await options.awaitInits();

  //
  // top route manually combine reducers from all matched child routes
  //
  const allReducers = Object.assign.apply(
    null,
    [
      {},
      {
        [name]: () => "top-reducer"
      }
    ].concat(options.inits.map(x => x.reducer))
  );

  //
  // The primary purpose of returning a reducer function directly is when
  // the behavior of redux's combineReducers is not desirable, it's possible to
  // replace that with a custom implementation here.
  //
  // See these docs from redux for details:
  // - https://redux.js.org/api-reference/combinereducers#notes
  // - https://redux.js.org/api-reference/combinereducers#tips
  //
  const reducer = combineReducers(allReducers);

  return {
    reducer, // returning this as a function make redux router engine skip combineReducers
    initialState: {
      [name]: "blah" // reducer above should replace this with "top-reducer" always
    }
  };
};
