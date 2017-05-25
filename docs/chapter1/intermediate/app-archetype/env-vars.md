# Environment Variables

Some of the app archetype's features can be controlled by envrionment variables.

-   `HTML_WEBPACK_REPORTER_OFF` - If not empty, then turns off the HTML webpack reporter

-   `OPTIMIZE_STATS` - If set to `true`, then generate stats for the optimized webpack output bundle

-   `INSPECTPACK_DEBUG` - If set to `true`, then generate stats for used with the [inspectpack] tool.

-   `WEBPACK_DEV_HOST` - If defined, used as the hostname for webpack dev server.

    -   Default is `localhost`

-   `WEBPACK_DEV_PORT` - If defined, used as the port number for webpack dev server.

    -   Default is 2992

-   `WEBPACK_TEST_PORT` - If defined, used as the port number for webpack tests

    -   Default is 3001

-   `WEBPACK_DEV_HTTPS` - If not empty, then use `https` for webpack dev server
