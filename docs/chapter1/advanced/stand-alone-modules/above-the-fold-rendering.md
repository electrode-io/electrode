# Above The Fold Rendering

The [above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) module is a React component for optionally skipping server side rendering of components outside above-the-fold \(or inside of the viewport\). This component helps render your components on the server that are above the fold and the remaining components on the client.

This module is a stand-alone module and can be configured to work in any [Electrode](#stateless-validation-electrode), [Express](#stateless-validation-express), or [Hapi](#stateless-validation-hapi) application.

### Why do we need this module?

The table below outlines a clear performance increase in the example app by skipping server rendering of the `Footer` component and several other below-the-fold zones on [Walmart.com](http://www.walmart.com/):

![](http://www.electrode.io/img/above-the-fold-table.png)

## Module: [above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render)

### Install via`npm`

```
$ npm install --save above-the-fold-only-server-render
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode-boilerplate-universal-react-node#above-the-fold-only-server-render)

* [Express React Redux Webpack Example](https://github.com/docs-code-examples-electrode-io/express-react-redux-webpack#above-the-fold-only-server-render)

* [Hapi React Redux Example](https://github.com/docs-code-examples-electrode-io/hapi-react-redux#above-the-fold-only-server-render)

## Usage

The Above-the-fold component is used as a wrapper. After wrapping your react components in the AboveTheFoldOnlyServerRender wrapper, you can skip server side rendering on those components and save on CPU render time by passing a `skip={true}` property to the wrapper component:

```
const SomeComponent = () => {
  return (
    <AboveTheFoldOnlyServerRender skip={true}>
      <div>This will skip server side rendering.</div>
    </AboveTheFoldOnlyServerRender>
  );
};
```

Alternatively, you can set up `aboveTheFoldOnlyServerRender`  in your app context and pass the AboveTheFoldOnlyServerRender wrapper a `contextKey` property:

```
const SomeComponent = () => {
    return (
      <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.SomeComponent">
        <div>This will not be server side rendered based on the context.</div>
      </AboveTheFoldOnlyServerRender>
    );
};

class SomeApp extends React.Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        SomeComponent: true
      }
    };
  }

  render() {
    return (
      <SomeComponent />
    );
  }
}

SomeApp.childContextTypes = {
  aboveTheFoldOnlyServerRender: React.PropTypes.shape({
    AnotherComponent: React.PropTypes.bool
  })
};
```

By default, the [above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) component is an exercise in simplicity; at a high-level it returns the child component that it wraps around.

## Supported Platforms

This module is web-server platform agnostic and can be used with your favorite node.js server framework [Electrode](https://github.com/electrode-io/electrode), [Express.js](https://github.com/electrode-samples/express-example-with-standalone-electrode-modules), or [Hapi.js](https://github.com/electrode-samples/hapijs-example-with-standalone-electrode-modules).
