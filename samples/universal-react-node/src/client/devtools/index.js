// @flow

//  Note: This is need to prevent the production bundle js from being bloated
//  with excess stuff from Devtools.
const DevTools =
  process.env.NODE_ENV !== "production"
    ? require("./devtools.dev").default
    : require("./devtools.prod").default;

export default DevTools;
