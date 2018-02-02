# What's Inside

#### Explore More

Let's go through the most important files to understand the structure of your new app.

> &lt;electrode-app&gt;/src/client/components/home.jsx

This is the home React component for your app. [React](https://facebook.github.io/react/index.html) is a JavaScript library for building user interfaces. A simplified way to look at React is that it can be used as the _View_ in a _Model-View-Controller_ application. It was created and is actively developed by Facebook.

Building with React lets developers create a modular and reusable component architecture. You can then reuse the business logic in existing _models_ and _controllers_ because React components encapsulate only the _view_ layer. The components you write are self-contained, which aids developers in quickly determining what a component does directly by reading the source. Finally, it is ideally suited to Universal JavaScript \(previously called Isomorphic JavaScript\), the practice of sharing code between the server and the client.

> &lt;electrode-app&gt;/src/client/styles/base.css

We will use [CSS Modules](https://github.com/css-modules/css-modules): a CSS file in which all class names and animation names are scoped locally by default. At WalmartLabs, this helps us tackle large-scale styling requirements by mitigating the issues inherent in the global scope in CSS.

> &lt;electrode-app&gt;/src/client/app.jsx

To help you understand what `src/client/app.jsx` is doing, including the relationship between client and server, we've broken down each part of this file with a brief explanation below, including links to sources where you can learn even more:

```
import React from "react";
import { routes } from "./routes";
import { Router } from "react-router";
```

Any real world web application needs to be able to handle different routes serving different content, so how do we handle the concept of routing in the Electrode platform? The library chosen to take care of this for us is [react-router](https://github.com/ReactTraining/react-router).

Why react-router? The project is mature, well-documented, and integrates well within the Electrode tech stack.

```
import {createStore} from "redux";
import {Provider} from "react-redux";
```

[Redux](http://redux.js.org/) is a state management library where your application data is in a store which contains a single object tree. This store is the single source of truth for your application and holds the state of your application. The store provides api's to access and update the state of your application. [React-Redux](https://github.com/reactjs/react-redux) is the official binding for Redux and React.

The rest of the code in `src/client/app.jsx` sets up the React app to run when the page is loaded. The selector is based on the `<div>` in `electrode-react-webapp/lib/index.html` within your `node_modules`.

```
window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState, enhancer);
  render(
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools />
        </div>
      </Provider>,
    document.querySelector(".js-content")
  );
};
```

If you have a universal application and server-side rendering, [electrode-redux-router-engine](https://github.com/electrode-io/electrode/tree/master/packages/electrode-redux-router-engine) handles async data for React Server Side Rendering using react-router, Redux, and the Redux Server Rendering pattern.

> &lt;electrode-app&gt;/src/client/routes.jsx

We will be sharing our routes between server and client, so obviously we only want to define them in one place. The `src/client/routes.jsx` encapsulates the routing logic accordingly.

> &lt;electrode-app&gt;/config

In this folder we are leveraging one of our most important stand alone modules: [Electrode-Confippet](/chapter1/advanced/stand-alone-modules/confippet.md). Confippet is a versatile utility for managing your NodeJS application configuration. Its goal is customization and extensibility while offering a [preset configuration](https://github.com/electrode-io/electrode-confippet) out of the box.

```
config
    ├── default.json
    ├── development.json
    └── production.json
```

We use this to keep environment-specific configurations manageable. Once you have your configuration files setup accordingly, you can simply pass the configuration object to electrode server.

> &lt;electrode-app&gt;/src/server

```
server/
├── conditions
│   ├── machine-info.js
│   ├── machine-load.js
│   ├── response-time.js
│   └── server-load.js
├── index.js
├── plugins
│   ├── autossr.js
│   ├── csrf.js
│   ├── pwa.js
│   └── updateStorage.js
├── storage.json
└── views
    └── index-view.jsx
```

You are now using [Electrode-Server](https://github.com/electrode-io/electrode-server), a NodeJS module that allows you to start up a Hapi server with a single function call, but gives you a lot of flexibility through configurations. This is the baseline functionality of a [Hapi](http://hapijs.com/) web server that you can extend via configuration.

Before we move on, we should inspect a critical file, `electrode-react-webapp/lib/index.html` located within your `node_modules`. This is where the server-side rendering magic happens, implemented automatically via `generator-electrode`:

```
<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8">
   <title>{{PAGE_TITLE}}</title>
    {{WEBAPP_BUNDLES}}
    {{PREFETCH_BUNDLES}}
  </head>
  <body>
    <div class="js-content">{{SSR_CONTENT}}</div>
   <script>if (window.webappStart) webappStart();</script>
 </body>
</html>
```

All of your content will be served as an HTML string and placed in this unassuming piece of code:

```
<div class="js-content">{{SSR_CONTENT}}</div>
```

This includes React components and Redux. To achieve this, the Electrode team created another powerful module to optimize performance for an out-of-the-box Universal app: [Electrode-Redux-Router-Engine](https://github.com/electrode-io/electrode-redux-router-engine), which takes React routes and requests and returns HTML to be rendered by `electrode-react-webapp`. We have found this to be the [best tool](https://github.com/electrode-io/electrode-redux-router-engine) for dealing with asynchronous redux actions.

> &lt;electrode-app&gt;/src/client/.babelrc

This is where we extend our `electrode-archetype-react-app` [Babel](https://babeljs.io/docs/usage/babelrc/) configuration to use [the ES6 presets](https://babeljs.io/docs/plugins/preset-es2015/), as well as specifying any plugins or projects that need additional Babel settings.

> &lt;electrode-app&gt;/.isomorphic-loader-config.json

This [powerful tool](https://github.com/electrode-io/isomorphic-loader) makes NodeJS `require` work with files such as images for server-side rendering. It contains three elements: a Webpack loader, Webpack plugin, and a library for your NodeJS app.
