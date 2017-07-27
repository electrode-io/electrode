# electrode-ui-config

Makes the `ui` section from your app config and the filtered CCM settings available to your UI code. It works isomorphically.

## Install

```
npm install electrode-ui-config --save
```

## Usage

To access the `ui` section from your app config, use `electrode-ui-config.ui`.

For example.

```js
import Config from "electrode-ui-config";

export default class MyComponent extends React.Component {
  render() {
    if (Config.ui.doThis) {
      return <This></This>
    } else {
      return <That></That>
    }
  }
}
```

To access the filtered CCM from, use `electrode-ui-config.ccm`.

For example.

```js
import Config from "electrode-ui-config";

export default class MyComponent extends React.Component {
  render() {
    const ccmSetting = Config.ccm.someConfig["setting-key-1"];
  }
}
```

## Utilities

This module provides the following utilities:

### [fullPath](#fullpath)

`fullPath(path)`

It will join `config.ui.basePath` with `path` to make a full UI route path.

Params

  - `path` - the path to join with basePath

Returns

  - A full UI route path with basePath.
  - if `path` is empty, then `basePath` is returned.

### fullApiPath

`fullApiPath(path)`

Joins `config.ui.basePath`, `config.ui.apiPath` and `path` to make a full API route path.  
`basePath` defaults to `""`, `apiPath` defaults to `"/api"`.

Params

  - `path` - the path to join with basePath and apiPath

Returns

  - A full API route path. If `path` is empty, then `/<basePath>/<apiPath>` is returned.

## How it works

This package utilize a webpack feature which looks at the `browser` field in `package.json` and use that when bundling.

When running on server side, NodeJS require looks at the `main` field, which points to another file.

## Other Requirements

The client side simply uses `window.config` to retrieve the config values.  Your application needs to be an Electrode app that uses [electrode-server] and [electrode-react-webapp], which sends `ui` section from your app config to the browser in the Index template.

See [electrode server configuration] for details on setting up config files for your app.

### Configuration files

Sample:

```js
{
  connections: {
    ...
  },
  plugins: {
    ...
  },
  ui: {

  }
}
```

[electrode-server]: https://github.com/electrode-io/electrode-server
[electrode-react-webapp]: https://github.com/electrode-io/electrode/tree/master/packages/electrode-react-webapp
[electrode server configuration]: https://github.com/electrode-io/electrode-server#configuration


## Server side render specific config

Occasionally apps or components need access to different config on server and client. To do this,
add a `ssrUi` property to the root level of the config object:

```js
{
  ...
  ssrUi {
    foo: "ServerOnlyValue"
  },
  ui: {
    foo: "ClientOnlyValue"
  }
}
```

`ssrUi` properties will overwrite any matching properties defined in `ui`. Isomorphic code can use `Config.ui` and properties defined in both `ssrUi` and `ui` will only be available in the respective environments.
