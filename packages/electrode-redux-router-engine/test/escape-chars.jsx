"use strict";

import { createStore } from "redux";

export default () => {
  //
  // If a top route is known to have no child routes or no child routes with
  // their own reducer/initialState, then the top route can just return a
  // redux store directly to skip the redux router engine's behavior of
  // using redux combineReducers and createStore to stitch redux reducers and
  // initial states together.
  //
  // Or if the a completely custom logic to stitch them together is desired, then
  // the top route can do that in its init and return the final store directly.
  //

  return {
    store: createStore(state => state, {
      scriptTag: '</script><script>console.log("Welcome to an XSS attack!")</script>',
      troublesomeEndings: "LineSeparator: \u2028 ParagraphSeprator: \u2029"
    })
  };
};
