# Electrode Subapp For React

This module mainly serve to setup subapp-web with Facebook React framework.

It basically re-exports the module subapp-web and sets it up with React specific APIs.

For convenience, it also exports the module `react`.

To use, a subapp's code should be doing:

```js
import { React, loadSubApp } from "subapp-react";

import Component from "./component";

export default loadSubApp({ name: "MyComponent", Component });
```

For all pratical purposes, if there's code somewhere else that ensures subapp-web is setup with the proper React framework, then it's equivalent to the following:

```js
import React from "react";
import { loadSubApp } from "subapp-web";

import Component from "./component";

export default loadSubApp({ name: "MyComponent", Component });
```

`react` and `react-dom` are specified as peerDependencies, so you must install them as part of your `package.json` dependencies.

## SSR App Context

This module also exports a default React context that SSR uses to pass in server `request` object to your React component.

ie:

```js
import { AppContext } from "subapp-react";

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

If you want to use [react-router] in your application, then you need to install the dependencies:

- [react-router] and [react-router-dom]

ie:

```bash
npm i react-router react-router-dom
```

And then set the `useReactRouter` flag to true in your subapp:

```js
import { React, loadSubApp } from "subapp-react";

export default loadSubApp({ name: "MySubapp", Component, useReactRouter: true });
```

## Support for SSR with Suspense

async server side rendering with React suspense is enabled with [react-async-ssr]

- First, you have to install [react-async-ssr] with `npm i react-async-ssr`

## License

Copyright (c) 2016-present, WalmartLabs

Licensed under the [Apache License, Version 2.0].

[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[react-router]: https://www.npmjs.com/package/react-router
[react-router-dom]: https://www.npmjs.com/package/react-router-dom
[react-async-ssr]: https://www.npmjs.com/package/react-async-ssr
