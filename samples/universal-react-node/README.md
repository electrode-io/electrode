# Electrode app with Electrode Modules
- This repo is a sample Electrode app generated from `yo electrode` with Electrode modules


---
## Electrode Confippet ##
- [Confippet](https://github.com/electrode-io/electrode-confippet) is a versatile utility for managing your NodeJS application configuration. Its goal is customization and extensibility, but offers a preset config out of the box.
- Scaffold an electrode app using the following commands:

```
npm install -g yo
npm install -g generator-electrode
yo electrode
```

#### Config Files
- Once the scaffolding is complete, open the following config files:

```
config
|_ default.json
|_ development.json
|_ production.json
```

#### Development Environment
- Update the `config/development.json` to have the following settings:

```
{
  "server": {
    "connections": {
      "compression": false
    },
    "debug": {
      "log": ["error"],
      "request": ["error"]
    }
  },
  "connections": {
    "default": {
      "port": 3000
    }
  }
}
```

- The above settings should show server log errors that may be beneficial for debugging, disable content encoding, and run the server in port 3000

#### Production Environment
- Update the `config/production.json` to have the following settings:

```
{
  "server": {
    "connections": {
      "compression": true
    },
    "debug": {
      "log": false,
      "request": false
    }
  },
  "connections": {
    "default": {
      "port": 8000
    }
  }
}
```

- The above settings should disable server log errors, enable content encoding, and run the server in port 8000
- The `server` key related configs are from hapi.js. More config options can be found here: http://hapijs.com/api
- The `connections` key are electrode server specific: https://github.com/electrode-io/electrode-server/tree/master/lib/config
- Keys that exist in the `config/default.json` that are also in the other environment configs will be replaced by the environment specific versions

#### Confippet Require
- In Electrode, the configurations are loaded from `server/index.js` at this line:

```
const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("electrode-server")(config, [staticPathsDecor()]);
```

#### Running Electrode app
- Start the electrode app in `development` environment:

```
NODE_ENV=development gulp hot
```

- Start the electrode app in `production` environment:

```
NODE_ENV=production gulp hot
```

- Running in the selected environment should load the appropriate configuration settings

---
## Electrode Javascript Bundle Viewer - How to use/integrate guide ##

Electrode Javascript bundle viewer is named [electrify](https://github.com/electrode-io/electrify), it is a tool that helps for analyzing the module tree of webpack based projects. It's especially handy for catching large and/or duplicate modules which might be either bloating up your bundle or slowing down the build/install process.

#### Integration points in your app ####
- [electrify](https://github.com/electrode-io/electrify) dependency `sudo npm install -g electrode-electrify
` and npm task runner integration.
- [electrify](https://github.com/electrode-io/electrify) command line interface (CLI) `electrify <path-to-stats.json> --open`.
- use [electrode-archetype-react-app](https://github.com/electrode-io/electrode-archetype-react-app) which is already integrated with [electrify](https://github.com/electrode-io/electrify), all you have to do is run `gulp electrify` after installing [electrode-archetype-react-app](https://github.com/electrode-io/electrode-archetype-react-app) in your app.

`electrode-boilerplate-universal-react-node` & [electrode-scaffolder](https://github.com/electrode-io/generator-electrode) internally use `electrode-archetype-react-app` hence `gulp electrify` on your terminal will start the bundle viewer in the browser.

When you install electrify globally using `sudo npm install -g electrode-electrify`, `electrify` command-line tool is made available as the quickest means of checking out your bundle. As of `electrode-electrify v1.0.0`, the tool takes any [webpack-stats](http://webpack.github.io/docs/node.js-api.html#stats-tojson) object as input and starts out a standalone HTML page as output in your browser, all you have to do is type `electrify <path to stats.json> --open` on your terminal.

Head over to the electrify [repository](https://github.com/electrode-io/electrify#electrify) for a detailed view of the bundle viewer and checkout the source-code. [electrify](https://github.com/electrode-io/electrify) relies on webpack to generate the application modules/dependency tree and is independent of whichever server framework(hapijs, expressjs, etc.) you choose to use.
