# React Routes

The Electrode platform, by default, is setup to use [react-router] to handle routes for your React application.

[react-router] handles matching a URL to your routes.  Since universal applications are supported, there are two places that you have to handle redirecting the routes.

-   The component your matching route should be redirected to.
-   What action to take on server side for each matched route.

You will also need to define your routes in a common location.

-   [Add your routes](/chapter1/intermediate/react-routes/add-routes.md)
-   [Component for a route](/chapter1/intermediate/react-routes/route-component.md)
-   [Route action on server side](/chapter1/intermediate/react-routes/server-actions.md)

[react-router]: https://www.npmjs.com/package/react-router
