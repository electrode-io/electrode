# Design of the index.html rendering flow

## Considerations

The design of the rendering flow took the following into consideration.

- A simple token base template rendering

- The document output to be a stream and allow any token to trigger a flush at any time.

- Allow tokens to be async so it can call services etc to produce the data.

- Allow token proccessor to open a spot in the output for update later. A flush will wait for open spots to close. This enables concurrently processing tokens that can send text to fixed spots in the output doc.

## Tokens

- Within your template file, special tokens can be specified with `<!--%{token}-->`.

  - Where `token` is the string referring to a token or name of a processor module.

  - To specify a processor module, start the token with `#`. ie: `<!--%{#module_name}-->`, where `module_name` specifies a name for a [Custom Processor Module](#custom-processor-module). The module will be loaded with `require`. If the `module_name` starts with `.`, then the module is loaded from CWD. For example, `<!--${#./lib/custom}-->` will load the module `./lib/custom` from under CWD.

  - Tokens can also be multi lines.

  - Comments can be added as lines that start with `//`.

  - Comments must be in their own lines only.

For example:

```html
<!--{
  // my custom token
  custom-token-name
}-->
```

### Token Props

- You can specify Key Value Pair props for your tokens in the form of `name=value`

  - ie: `<!--%{my-token prop1="test" prop2=false prop3=[a, b, c]}-->`

  - String prop values must be enclosed in `"` or `'`.

  - Values started with `[` will be parsed with [string-array](https://www.npmjs.com/package/string-array)

  - Any other values will be parsed with `JSON.parse`, so only `false`, `true`, numbers, `null`, or a stringified JSON that has absolutely no spaces anywhere.

- If you want, you can specify a single JSON object following the token to act as the props object.

For example:

```html
<!--{ token-with-json
  {
    "foo": "bar",
    "hello": [ "world" ],
    "test": [ 1, 2, 3, 4 ]
  }
}-->
```

### Internal Props

Some props with leading `_` may be used to control the template engine. These are supported:

- `_call="function_name"` - Tells the template engine what function from a token module to call.

  - Expect your token loads a custom processor module that instead of exporting a setup funtion, exports an object with setup functions.
  - The `_call` prop specifies the name of a function from that module to call.

For example:

```html
<!--{#./my-token-module _call="setup1" }-->
```

You can also use a [string-array](https://www.npmjs.com/package/string-array) to have additional strings params passed to the function.

For example:

```html
<!--{#./my-token-module _call=[setup1, [param1, param2]] }-->
```

This will call the function `setup1(options, tokenInstance, a, b)` from your module like this:

```js
tokenModule.setup1(options, tokenObj, "param1", "param2");
```

Where `tokenObj` is the your token's instance object.

Your token's `props` object is accesible through `tokenObj.props`.

## Predefined Tokens and Handler

These are tokens that are automatically processed internally:

- `INITIALIZE`
- `META_TAGS`
- `PAGE_TITLE`
- `CRITICAL_CSS`
- `WEBAPP_HEADER_BUNDLES`
- `HEAD_CLOSED`
- `SSR_CONTENT`
- `AFTER_SSR_CONTENT`
- `PREFETCH_BUNDLES`
- `WEBAPP_BODY_BUNDLES`
- `BODY_CLOSED`
- `HTML_CLOSED`

A builtin token handler is used to process these.

If you've registered your own [handler](#handler) for any of them, you can still access the builtin token handler as `context.$.routeData.tokenHandler`.

## Custom Processing

There are two ways to provide your own processor for tokens.

1.  Provide a handler that can process tokens
2.  Provide a custom processor module

### Handler

You can register a token handler for each route. The token handler should export a function `setup` that returns an object with the names of your custom tokens each associated with its own handler function.

For example, you can replace the predefined `SSR_CONTENT` token with your own handler, and define a new token `MY_NEW_TOKEN`.

```js
module.exports = function setup(options, tokenObj) {
  return {
    SSR_CONTENT: (context, [next]) => {},
    MY_NEW_TOKEN: context => `hello from MY_NEW_TOKEN`
  };
};
```

- `options` will contain the following:

  - `routeOptions` - original options passed in
  - `routeData` - global data for the route

- `tokenObj` is the instance object for your token.

  - Your token's `props` object is accesible through `tokenObj.props`.

### Custom Processor Module

- The custom processor module should export an initialize function as below:

```js
module.exports = function setup(options, tokenObj) {
  return {
    process: function(context, [next]) {}
  };
};
```

- You can also export an object with multiple setup functions and use the `_call` prop to call specific ones:

```js
function setup1(options, tokenObj) {
  return {
    process: function(context, [next]) {}
  };
}

function setup2(options, tokenObj) {
  return {
    process: function(context, [next]) {}
  };
}

module.exports = {
  setup1,
  setup2
};
```

And you can load the same module but call different setup function with the `_call` prop.

```html
Calling setup1 of lib/my-handlers.js
<!--%{#./lib/my-handlers _call="setup1"}-->

Calling setup2 of lib/my-handlers.js
<!--%{#./lib/my-handlers _call="setup2"}-->
```

### The Process Function

As shown above, the token handler or custom process function should have the following signature:

```js
function (context, [next]) {}
```

> Note that the setup is only called once for each route. The instance returned is reused for every request. So be sure to avoid any global state. Everything should operate on the `context` passed in.

Parameters:

- If `next` is specified then it's async and rendering will only continue when it's called.

- The function can return a Promise to be async if it doesn't want to take a next callback.

- If function returns a string it will be added to the output stream.

- Other return values are ignored.

### `context`

`context` will contain an `output` object with the following methods:

- `add(string)` - Adds `string` to the output stream.
- `reserve()` - Reserves a spot in the output stream. Returns a Spot object.
- `flush()` - Flush output stream. Will wait for all open spots to close.

Spot object has the follow methods:

- `add(string)` - Adds `string` to the spot.
- `close()` - Close the spot. Must be called once done else rendering will be stuck.

`context.$` will contain the following:

- `request` - the server request object
- `routeOptions` - options for the route
- `routeData` - global data for the route
- `data` - data specific to a single request for the route
- `user` - an empty object that you can store your data
- `content` - the content from your route

> You may store your data in `context.$` but future updates could conflict with your data.

### Concurrent Token

Note that a token handler that takes `next` or returns Promise is only async, but not concurrent. Meaning the renderer will still wait for it to finish before continuing to the next token.

If you want the renderer to continue while your token generates output concurrently, you have to reserve a spot with `context.output.reserve()` and use `process.nextTick` to invoke another async function.

For example:

```js
module.exports = function setup(options) {
  return {
    process: (context, token) => {
      const spot = context.output.reserve();
      const concurrentProc = async () => {
        const myData = await getMyData();
        spot.add(myData.stringify());
        spot.close();
      };
      process.nextTick(concurrentProc);
    }
  };
};
```

#### routeData

The `context.$.routeData` contains the following:

- WEBPACK_DEV - true if webpack dev server running
- RENDER_JS - render JS bundle (could be override by request)
- RENDER_SS - do SSR (could be override by request)
- html - The html template
- assets - The webpack bundle assets
- devBundleBase - URL base for dev bundle
- prodBundleBase - URL base for prod bundle
- chunkSelector - callback to select webpack bundle
- iconStats - webpack icon stats
- htmlTokens - html template parsed into tokens

#### data

The `context.$.data` contains data specific to the single request.

It contains the following:

- mode - Render Mode (nojs, noss, datass)
- renderJs - Render JS bundle
- renderSs - Do SSR
- paddedNonce - nonce for script tags
- criticalCSS - critical css
- chunkNames - webpack asset chunks
- devCSSBundle
- devJSBundle
- jsChunk
- cssChunk
