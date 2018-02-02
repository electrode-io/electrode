# Route Action on the Server Side

When your React app is rendered on the server side, the module [react-redux-router-engine] handles the following tasks:

-   Use [react-router] to match the URL to your routes in `src/client/routes.jsx`
-   Call your async actions to retrieve data and create a [redux] store
-   Match the HTTP method that's allowed for the route
-   Use ReactDom's `renderToString` to render your React Component into HTML

See [Redux Router Engine](/chapter1/advanced/stand-alone-modules/redux-router-engine.md) for details on its APIs and options.

[react-router]: https://www.npmjs.com/package/react-router

[react-redux-router-engine]: https://www.npmjs.com/package/electrode-redux-router-engine
