# Design of the index.html rendering flow

## Considerations

The design of the rendering flow took the following into consideration.

-   A simple token base template rendering

-   The HTML output to be a stream and allow any token to trigger a flush at any time.

-   Allow tokens to be async so it can call services etc to produce the data.

-   Allow token proccessor to open a spot in the output for update later.  A flush will wait for open spots to close.

## Tokens

Within the HTML file, special tokens can be specified with `<!--%{token}-->`.

-   Where `token` is the string referring to a token or name of a processor module.

-   To specify a processor module, start the token with `#`.  ie: `<!--%{#module_name}-->`, where `module_name` specifies a name for a [Custom Processor Module](#custom-processor-module).  The module will be loaded with `require`.  If the `module_name` starts with `.`, then the module is loaded from CWD.  For example, `<!--${#./lib/custom}-->` will load the module `./lib/custom` from under CWD.

## Predefined Tokens and Handler

These are tokens that are automatically processed internally:

-   `INITIALIZE`
-   `META_TAGS`
-   `PAGE_TITLE`
-   `CRITICAL_CSS`
-   `WEBAPP_HEADER_BUNDLES`
-   `HEAD_CLOSED`
-   `SSR_CONTENT`
-   `AFTER_SSR_CONTENT`
-   `PREFETCH_BUNDLES`
-   `WEBAPP_BODY_BUNDLES`
-   `BODY_CLOSED`
-   `HTML_CLOSED`

A builtin token handler is used to process these.

If you've registered your own [handler](#handler) for any of them, you can still access the builtin token handler as `context.$.routeData.tokenHandler`.

## Custom Processing

There are two ways to provide your own processor for tokens.

1.  Provide a handler that can process tokens
2.  Provide a custom processor module

### Handler

You can register a token handler for each route.  The token handler should export a function `setup` that returns an object with a process function for each token it can handle.

For example:

```js
module.exports = function setup(options) {
  return {
    SSR_CONTENT: (context, [next]) => {}
  };
}
```

`options` will contain the following:

-   `routeOptions` - original options passed in
-   `routeData` - global data for the route

### Custom Processor Module

The custom processor module should export an initialize function as below:

```js
module.exports = function setup(options) {
  return {
    process: function (context, [next]) {}
  };
};
```

`options` will contain the following:

-   `routeOptions` - original options passed in
-   `routeData` - global data for the route

### The Process Function

As shown above, the token handler or custom process function should have the following signature:

```js
function (context, [next]) {}
```

> Note that the setup is only called once for each route.  The instance returned is reused for every request.  So be sure to avoid any global state.  Everything should operate on the `context` passed in.

Parameters:

-   If `next` is specified then it's async and rendering will only continue when it's called.

-   The function can return a Promise to be async if it doesn't want to take a next callback.

-   If function returns a string it will be added to the output stream.

-   Other return values are ignored.

### `context`

`context` will contain an `output` object with the following methods:

-   `add(string)` - Adds `string` to the output stream.
-   `reserve()` - Reserves a spot in the output stream.  Returns a Spot object.
-   `flush()` - Flush output stream.  Will wait for all open spots to close.

Spot object has the follow methods:

-   `add(string)` - Adds `string` to the spot.
-   `close()`   - Close the spot.  Must be called once done else rendering will be stuck.

`context.$` will contain the following:

-   `request` - the server request object
-   `routeOptions` - options for the route
-   `routeData` - global data for the route
-   `data` - data specific to a single request for the route
-   `user` - an empty object that you can store your data
-   `content` - the content from your route

> You may store your data in `context.$` but future updates could conflict with your data.

#### routeData

The `context.$.routeData` contains the following:

-   WEBPACK_DEV - true if webpack dev server running
-   RENDER_JS - render JS bundle (could be override by request)
-   RENDER_SS - do SSR (could be override by request)
-   html - The html template
-   assets - The webpack bundle assets
-   devBundleBase - URL base for dev bundle
-   prodBundleBase - URL base for prod bundle
-   chunkSelector - callback to select webpack bundle
-   iconStats - webpack icon stats
-   htmlTokens - html template parsed into tokens

#### data

The `context.$.data` contains data specific to the single request.

It contains the following:

-   mode - Render Mode (nojs, noss, datass)
-   renderJs - Render JS bundle
-   renderSs - Do SSR
-   paddedNonce - nonce for script tags
-   criticalCSS - critical css
-   chunkNames - webpack asset chunks
-   devCSSBundle
-   devJSBundle
-   jsChunk
-   cssChunk
