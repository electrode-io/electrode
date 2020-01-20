# Electrode Subapps

Electrode Subapps is a mechanism for code splitting within a larger application. There are several advantages to creating a web application using subapps:

- Superior code isolation is conducive to development across multiple teams
- Smaller initial payloads loads through lazy-loadable subapps
- Better application scalability

## Getting Started

To easily start using the npm initializer, run the following command:

```bash
mkdir my-app # Create a new directory for the project
cd my-app # Change to our new project directory
npm init -y @xarc/app # Run npm init for Electrode apps
npm i # Install npm requirements
npm run dev # Run our project in development mode
```

This will create, install, and run an Electrode web application with a few simple subapps.

## What is a subapp?

- What is a subapp?

  At its core, a subapp is simply a display component. Currently, this can be either a React or Preact component, but more UI libraries may be supported in the future.

- What makes a subapp special?

  Electrode provide enhancements to make subapps special:

  - `Code splitting` - Automatically detect subapps and configure webpack to split your JS by subapps.
  - `Composable` - Create routes/pages that are composed of multiple subapps.
  - `Lazy loading` - Dynamically lazy load and create multiple instances of subapps on a page.
  - `Initial Props` - Automatically retrieve initial props before rendering subapps.
  - `Async data fetch` - Use React suspense to enable single pass async data fetch within components.
  - `Server Side Rendering` - Independently enable server side render for each subapp.
  - `Redux` - Automatically facilitate, initialize, and hydrate SSR data using Redux.
  - `Redux Bundler` - Alternatively, `redux-bundler` may be use to aggregate redux functionality across subapps.
  - `React Router` - Automatically setup component routing using [react-router].
  - `Hot module Reload` - Automatically support Hot Module Reload during development.

## Loading Subapps

First, observe the file structure in your newly created example application, particularly the subapps (demo1, demo2, and home). There are three important rules you must always obey when creating subapps that the subapps:
- Subapp directories must be created in the `src` directory. This is because the Electrode subapp scanner will only look in the `src` directory.
- Each subapp directory must contain a file with `subapp-` prefix, or just `subapp.js`
- In this file, you must define the subapp using a subapp loader such as `loadSubApp`.

There are several subapp loaders available depending on how you want the subapps to function and what technologies you want your subapp to use. This section will provide an overview of some of those loaders.

### subapp-react

To create a subapp that represents a React component, you may use `subapp-react`. This module exports a function called `loadSubApp` that will allow the subapp to define its behavior. Also, `subapp-react` exports `React` for convenience (feel free to use this rather than importing `React` separately).

#### Options

The `loadSubApp` takes the following options:

- `name` (string): The name of the subapp (can be referenced from layouts or dynamic loaders)
- `Component` (React component): The React component that renders this subapp (can be functional or class-based)
- `useReactRouter` (boolean, default `false`): Specifies whether to wrap your component with a React router
- `prepare` (function, optional): Retrieves `props` that are sent to the component (useful for server-side rendering)

#### Examples

```js
import { React, loadSubApp } from "subapp-react";

const Demo1 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo1</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="http://docs.electrode.io">Electrode Docs</a>
      </p>
    </div>
  );
};

export default loadSubApp({
  Component: Demo1,
  name: "Demo1",
  prepare: () => {
    return { data: "hello from demo1" };
  }
});
```

### subapp-redux

To create a subapp that has redux functionality, you may use `subapp-redux`. This module exports a function called `reduxLoadSubApp` that will allow the subapp to define redux store creation behavior. Additionally, `reduxLoadSubApp` will automatically wrap your subapp with a `react-redux` provider to facilitate usage of the `connect` function.

#### Options

The `reduxLoadSubApp` takes the following options:

- `name` (string): The name of the subapp (can be referenced from layouts or dynamic loaders)
- `Component` (React component): The React component that renders this subapp (can be functional or class-based)
- `reduxShareStore` (boolean/string, default `false`): Enables store sharing between subapps. If it's true, a common global store will be used. If it's a string, a named store will be used. If it's false, a private store will be used
- `reduxReducers` (object): An object of named reducers (identical to the object one would pass into Redux's `combineReducers`). If multiple subapps pass the same reducer name to this option for the same store, the first subapp that loads and initializes "wins" and all subapps loaded after will use the initial state from its reducer.
- `prepare` (function, optional): Retrieves `props` that are sent to the component (useful for server-side rendering)

#### Examples

```js
import { React } from "subapp-react";
import { connect } from "react-redux";
import { reduxLoadSubApp } from "subapp-redux";
import reduxReducers from "./reducers";

const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Demo2 = props => {
  const { value, dispatch } = props;

  return (
    <div>
      <div
        style={{
          padding: "5px",
          marginTop: "15px",
          border: "solid",
          marginLeft: "15%",
          marginRight: "15%"
        }}
      >
        <p>subapp demo2</p>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        &nbsp;{value}&nbsp;
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </div>
      <p style={{ textAlign: "center" }}>© {new Date().getFullYear()} Your (Company) Name Here</p>
    </div>
  );
};

const mapStateToProps = state => state;

export default reduxLoadSubApp({
  Component: connect(mapStateToProps, dispatch => ({ dispatch }))(Demo2),
  name: "Demo2",
  reduxReducers,
  prepare: ({ initialData }) => {
    return Promise.resolve(initialData || { value: 999 });
  }
});
```

### subapp-pbundle

To create a subapp that represents a Preact component, you may use `subapp-pbundle`. This is similar to `subapp-react` except it supports Preact and `redux-bundler`. This module exports a function called `loadSubApp` (similar to `subapp-react`), but it also supports `reduxBundlerLoadSubApp` that additionally loads the `redux-bundler` functionality. Additionally, `reduxBundlerLoadSubApp` will automatically wrap your component in a `redux-bundler-preact` Provider.

#### Options for loadSubApp

The `loadSubApp` takes the following options:

- `name` (string): The name of the subapp (can be referenced from layouts or dynamic loaders)
- `Component` (Preact component): The Preact component that renders this subapp (can be functional or class-based)
- `prepare` (function, optional): Retrieves `props` that are sent to the component (useful for server-side rendering)

#### Options for reduxBundlerLoadSubApp

The `reduxBundlerLoadSubApp` is similar to `loadSubApp` but also supports `redux-bundler`. It takes the following options:

- `name` (string): The name of the subapp (can be referenced from layouts or dynamic loaders)
- `Component` (Preact component): The Preact component that renders this subapp (can be functional or class-based)
- `prepare` (function, optional): Retrieves `props` that are sent to the component (useful for server-side rendering)
- `bundles` (array): An array of `redux-bundler` bundles that are integrated into the redux store.
- `reduxCreateStore` (function, optional): Creates (and returns) the redux store that will be shared among all subapps. Note that `reduxCreateStore` will only be called once per application, so the first loaded subapp will get priority.

#### Examples

A simple `loadSubApp` example:

```js
import { h, loadSubApp } from "subapp-preact";

const Demo5 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo5</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="http://docs.electrode.io">Electrode Docs</a>
      </p>
    </div>
  );
};

export default loadSubApp({
  Component: Demo5,
  name: "Demo5",
  prepare: () => {
    return { data: "hello from demo5" };
  }
});
```

An example using `reduxBundlerLoadSubApp`:

```js
import { h, reduxBundlerLoadSubApp } from "subapp-preact";
import usersBundle from "./bundles/user";
import { connect } from "redux-bundler-preact";

const Demo6 = p({ doUpdateUser, activeUsers }) => (
  <div>
    {activeUsers.map(user => (
      <div>
        name: {user.name}
        <button
          onClick={() =>
            doUpdateUser({
              isAwesome: true
            })
          }
        />
      </div>
    ))}
  </div>
);

export default loadSubApp({
  Component: connect("doUpdateUser", "selectActiveUsers", Demo6),
  name: "Demo6",
  bundles: [usersBundle]
});
```

## Layout and Server Routing

Electrode Subapps comes with several mechanisms for creating the main application layout.

### Simple Routing

In the simplest case, you can create a route definition in `src/routes.js` that specifies each route and a list of subapps that will be appended to the page:

```js
export const favicon = "static/favicon.png";

export default {
  "/": {
    pageTitle: "Home",
    subApps: ["./home", "./demo1"]
  },
  about: {
    pageTitle: "About us",
    subApps: ["./about"]
  }
};
```

### Simple Routing with Server Side Rendering

Starting with the example above (in our `src/routes.js` file), let's imagine we want to enable server side rendering for our "Home" subapp:

```js
export const favicon = "static/favicon.png";

export default {
  "/": {
    pageTitle: "Home",
    subApps: [["./home", { serverSideRendering: true }], "./demo1"]
  },
  about: {
    pageTitle: "About us",
    subApps: ["./about"]
  }
};
```
