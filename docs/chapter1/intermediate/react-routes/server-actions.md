# Route action on server side

When your react app is being rendered on the server side, the module [react-redux-router-engine] will handle these chores:

-   use [react-router] to match the URL to your routes in `src/client/routes.jsx`
-   call your async actions to retrieve data and create a [redux] store
-   matching the HTTP method that's allowed for the route
-   use ReactDom's `renderToString` to render your React Component into HTML

See [Redux Router Engine](/chapter1/advanced/stand-alone-modules/redux-router-engine.md) for details on its APIs and options.

[react-router]: https://www.npmjs.com/package/react-router

[react-redux-router-engine]: https://www.npmjs.com/package/electrode-redux-router-engine
