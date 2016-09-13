# Electrode App with Electrode Modules
A sample Electrode app generated using `yo electrode` that demonstrates the usage of several Electrode modules.

## Install and Run

If cloning or forking this repo, simply install via `npm` and run with `gulp`:

```bash
$ npm install
$ NODE_ENV=development gulp hot
```

The app should be accessible at http://127.0.0.1:3000/

## Starting from Scratch

This app was generated using [yeoman](yeoman.io) and instructions for recreating it from scratch are provided below.

First, install `yeoman` and `electrode-generator`:

```bash
$ npm install -g yo
$ npm install -g generator-electrode
```

Scaffold a new app using `yeoman`:

```bash
$ mkdir electrode-app-csrf-jwt
$ cd electrode-app-csrf-jwt
$ yo electrode
```

At this point, you should be able to run the server locally:

```bash
$ npm install
$ NODE_ENV=development gulp hot
```

## Electrode Module Demos

This application already contains demonstration code for the following modules. If you're starting from scratch using scaffolding, you can find instructions for adding and configuring individual modules below.

- [Electrode Confippet](#electrode-confippet)
- [Electrode CSRF-JWT](#electrode-csrf-jwt)

## Electrode Confippet

[Confippet](https://github.com/electrode-io/electrode-confippet) is a versatile utility for managing your NodeJS application configuration. Its goal is customization and extensibility, but offers a preset config out of the box.

### Installation

```bash
$ npm install electrode-confippet --save
```

### Config Files

Open the following config files:

```
config
|_ default.json
|_ development.json
|_ production.json
```

### Development Environment
- Update the `config/development.json` to have the following settings:

```json
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

### Production Environment
- Update the `config/production.json` to have the following settings:

```json
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

### Confippet Require
- In Electrode, the configurations are loaded from `server/index.js` at this line:

```
const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("electrode-server")(config, [staticPathsDecor()]);
```

### Running Electrode app
- Start the electrode app in `development` environment:

```bash
$ NODE_ENV=development gulp hot
```

- Start the electrode app in `production` environment:

```bash
$ NODE_ENV=production gulp hot
```

- Running in the selected environment should load the appropriate configuration settings

## Electrode CSRF-JWT

[CSRF-JWT](https://github.com/electrode-io/electrode-csrf-jwt) is an Electrode plugin that allows you to authenticate HTTP requests using JWT in your Electrode applications.

### Installation

Add the `electrode-csrf-jwt` component:

```bash
$ npm install electrode-csrf-jwt --save
```

Next, register the plugin with the Electrode server. Add the following configuration to the `plugins` section of `config/default.json`:

```json
    "electrode-csrf-jwt": {
      "options": {
        "secret": "test",
        "expiresIn": 60
      }
    }
```

That's it! CSRF protection will be automatically enabled for endpoints added to the app. CSRF JWT tokens will be returned in the headers of every `GET` response and must be provided as a header in every `POST` request.

> You can read more about options and usage details on [the component's README page](https://github.com/electrode-io/electrode-csrf-jwt#usage)

### CSRF-JWT Demonstration code

In addition to the above steps, the following modifications were made in order to demonstrate functionality:

* A plugin with two endpoints was added as `server/plugins/csrf.js` and registered via `config/default.json`
* AJAX testing logic was added to `client/components/csrf.jsx`
