# Electrode App Confippet 

## Quickstart guide

- Confippet is built-in to electrode. 
- Scaffold an electrode app using the following commands: 

```
npm install -g yo
npm install -g generator-electrode
yo electrode
```

- Once the scaffolding is complete, open the following config files: 

```
config
|_ default.json
|_ development.json
|_ production.json
```

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
- Start the electrode app in `development` environment: 

```
export NODE_ENV=development
gulp hot
```

- Start the electrode app in `production` environment: 

```
export NODE_ENV=production
gulp hot
```

- Running in the selected environment should load the appropriate configuration settings
- Keys that exist in the `config/default.json` that are also in the other environment configs will be replaced by the environment specific versions
- In Electrode, the configurations are loaded from `server/index.js` at this line: 

```
const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("electrode-server")(config, [staticPathsDecor()]);
```
