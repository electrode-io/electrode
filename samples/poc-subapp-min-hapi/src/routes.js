"use strict";

// top level options

/* default title */
// - page title to use in case a route didn't specify one
export const pageTitle = "Online Store";

/* templateFile */
// - override overall template file for all routes
// export const templateFile = "template";

/* favicon */
// - false to turn off favicon
// - a path to the favicon file
// default to look up CWD/static/favicon.ico
export const favicon = "static/favicon.png";

/* routes */

export default {
  "/": {
    /* subApps */
    // The sub apps to load for this route
    // The subapp is either a directory (with leading ./ or /)
    // TBD: or a module name.  it can also be an array with the 2nd element as
    // an object of options, ie: [ "./home", {serverSideRendering: true } ]
    // Ultimately, the resolved path will uniquely identify the subapp
    // TBD: A subapp could potentially be loaded from a remote URL.
    subApps: ["./home", ["./demo1", { serverSideRendering: false }]],

    /* templateFile */
    // - path your own index page template
    // - path will be converted to absolute with path.resolve
    // - will nullify the subApps option because the built-in template handles that
    // templateFile: "index-page",

    /* pageTitle */
    // - title for the route
    pageTitle: "Online Store Home Demo"

    /* methods */
    // - HTTP method this route would support
    // - default to ["get"]
    // methods: []

    /* setup */
    // - a callback that's invoked when routes are loaded the first time
    // setup(server, options) {}

    /* initialize */
    // - a callback that's invoked for every request to this route
    // - it can be an async method
    // - it will be called by the onPreAuth lifecycle ext when using Hapi
    //   after routing occurred and request.route is available
    // initialize(request, h) {}

    /* dir */
    // - dedicate directory for this route's files
    // - it will be resolve to full path using path.resolve
    // dir: ""

    /* options */
    // - pass thru options to the underlying http framework

    /* paths */
    // - array of sub paths for this route, if this route is meant to serve a
    //   SPA web page, then it can specify additional URL paths that will work
    //   with either SSR or on the client side only
    // paths: []
  },

  "/demo1": {
    subApps: ["./demo1"],
    pageTitle: "Online Demo1"
    // templateFile: "index-page"
  }
};
