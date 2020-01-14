# Electrode Subapp For Preact and Redux Bundler

This module mainly serve to setup subapp-web with [Preact] framework, and the support for [redux-bundler] for Electrode subapps.

It basically re-exports the module subapp-web and sets it up with [Preact] specific APIs.

- For convenience, it also exports [preact]'s `h`, `Component`, and `render` APIs.
- It adds a new `reduxBundlerLoadSubApp` API for loading subapps that use [redux-bundler].

## ES Modules

This package only export its code for node.js with `main` field and ES modules with `module` field.

This is neccessary for webpack to do treeshaking when bundling code.

## Usage

To use, a subapp's code should be doing:

```js
/** @jsx h */
import { h, reduxBundlerLoadSubApp } from "subapp-pbundle";

import Component from "./component";

export default reduxBundlerLoadSubApp({ name: "MyComponent", Component });
```

`preact` and `preact-render-to-string` are specified as peerDependencies, so you must install them as part of your `package.json` dependencies.

## SSR App Context

This module also exports a default Preact context that SSR uses to pass in server `request` object to your React component.

ie:

```js
import { AppContext } from "subapp-pbundle";

const Component = () => {
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr, subApp }) => {
        return (
          <div>
            IS_SSR: {`${Boolean(isSsr)}`} HAS_REQUEST: {ssr && ssr.request ? "yes" : "no"}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};
```

## Support for React Router

TBD

## Support for SSR with Suspense

[Preact] Suspense support is still experimental. TBD.

## License

Copyright (c) 2016-present, WalmartLabs

Licensed under the [Apache License, Version 2.0].

[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[preact-router]: https://www.npmjs.com/package/preact-router
[preact]: https://preactjs.com/
[redux-bundler]: https://reduxbundler.com/
