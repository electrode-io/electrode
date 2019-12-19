# Confippet

[Confippet](https://github.com/electrode-io/electrode-confippet) is a versatile, flexible utility for managing configurations of Node.js applications. It's simple to get started and can be customized and extended to meet the needs of your app.

[Confippet](https://github.com/electrode-io/electrode-confippet) can be used as a standalone module in your favorite Node.js web server framework or application.

### Features

* **Simple**
  * Confippet's `presetConfig` automatically composes a single configuration object from multiple files. For most applications, no further customization is necessary.
* **Flexible**
  * Supports JSON, YAML, and JavaScript configuration files.
* **Powerful**
  * Handles complex multi-instance enterprise deployments.
* **Platform Agnostic**
  * This module is platform agnostic and can be plugged into any Node.js application, including those run on Electrode, Express.js and Hapi.js

## Module: [electrode-confippet](https://github.com/electrode-io/electrode-confippet)

### Install via `npm`

```
$ npm install --save electrode-confippet
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode/tree/master/samples/universal-react-node#electrode-confippet)

* [Express Example with Standalone Modules](https://github.com/docs-code-examples-electrode-io/express-example-with-standalone-electrode-modules#electrode-confippet)

* [Hapi Example with Standalone Modules](https://github.com/docs-code-examples-electrode-io/hapijs-example-with-standalone-electrode-modules#electrode-confippet)

## Usage

* [Getting Started](#getting-started)
* [configuration Composition](#config-composition)
* [Environment Variables](#environment-variables)
* [Using Templates](#using-templates)
* [Usage in Node Modules](#usage-in-node-modules)
* [Customization](#customization)

### Getting Started

Confippet can be integrated seamlessly into any existing [Express](#express-setup), [Hapi](#hapi-setup) or [Electrode](#electrode-setup) application.

For example, let's say that in our application we need to access a database that is running locally in our development environment but is running on a specific hostname in our production environment. We would like to be able to get the correct hostname in our code based on the current environment. Confippet can help us with this. Follow the setup instructions for this example depending on your app's framework:

* [Electrode](#electrode-setup)
* [Express](#express-setup)
* [Hapi](#hapi-setup)

#### _**Electrode Setup**_

Electrode applications that were generated using `yo electrode`  have already been bootstrapped with the necessary configuration files to set up [Confippet](https://github.com/electrode-io/electrode-confippet). Take a look at the following files:

```
config
|_ default.json
|_ development.json
|_ production.json
```

First, update the default settings for our database connection by adding the following setting to`default.json`:

```
{
  "settings": {
    "db": {
      "host": "localhost",
      "port": 5432,
      "database": "clients"
    }
  }
}
```

Then we will set up the development and production environments.

##### _**Development Environment**_

We want our database to be served from different hostnames depending on the environment. Update `development.json` to include the following settings:

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
  },
  "settings": {
   "db": {
     "host": "dev-db-server"
   }
 }
}
```

Now, while `NODE_ENV=development`:

* Server log errors that may be beneficial for debugging will now be shown with content encoding
  _disabled_
* The server is being run in port 3000
* The database is hosted from dev-db-server

##### _**Production Environment**_

Similarly, update`production.json`to include the following settings:

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
  },
  "settings": {
   "db": {
     "host": "prod-db-server"
   }
 }
}
```

Now, while `NODE_ENV=production`:

* Server log errors are _disabled \_and content encoding is \_enabled_
* Server is run in port 8000
* The database will be hosted from prod-db-server

Additionally, here are some notes about the settings you just copied:

* The server related configs are from hapi.js. Additional configuration options can be found here: [http://hapijs.com/api](http://hapijs.com/api)
* The connections property is specific to [electrode server](https://github.com/electrode-io/electrode-server/tree/master/lib/config)
* Any settings that exist in the `config/default.json`  that are \_also \_in the other environment configs will be replaced by the environment specific versions

##### _**Electrode Configuration**_

Last step! Set up our Electrode application to use the new database settings by adding the following line to `server/index.js`:

```
const db = config.$("settings.db");
```

#### _**Express Setup**_

Confippet requires a configuration directory to pull settings from:

```
$ mkdir config
$ cd config
```

Add the following files to the `config` directory:

```
config
|_ default.json
|_ development.json
|_ production.json
```

Then update `default.json`  to include the following settings:

```
{
  "server": {
    "viewCache": false,
    "xPoweredBy": true,
    "port": 4000
  },
  "settings": {
    "db": {
      "host": "localhost",
      "port": 5432,
      "database": "clients"
    }
  }
}
```

Now we can set up the development and production specific settings.

##### _**Development Environment**_

Update `config/development.json`  to have the following settings:

```
{
  "server": {
    "viewCache": false,
    "xPoweredBy": true,
    "port": 4000
  },
  "settings": {
    "db": {
    "host": "dev-db-server"
    }
  }
}
```

Now, while `NODE_ENV=development`:

* the view cache is _disabled_
* the x-powered-by header is _enabled_
* the server is run in port 4000
* the databse is hosted from dev-db-server

##### _**Production Environment**_

Update `config/production.json` to have the following settings:

```
{
  "server": {
    "viewCache": true,
    "xPoweredBy": false,
    "port": 8000
  },
  "settings": {
    "db": {
    "host": "prod-db-server"
    }
  }
}
```

Now, while `NODE_ENV=production`:

* the view cache is _enabled_
* the x-powered-by header is _disabled_
* the server is run in port 8000
* the database is hosted from prod-db-server

##### _**Express Configuration**_

To require the confippet settings, simply add the following to `app.js`:

```
const {config} = require("electrode-confippet");
const db = config.$("settings.db");

app.set("view cache", config.server.viewCache);
app.set("x-powered-by", config.server.xPoweredBy);
app.listen(config.server.port);
```

#### _**Hapi Setup**_

Confippet requires a configuration directory to pull settings from:

```
$ mkdir config
$ cd config
```

Add the following files to the `config` directory:

```
config
|_ default.json
|_ development.json
|_ production.json
```

Then update `default.json` to include the following settings:

```
{
  "connection": {
    "port": 3000
  },
  "settings": {
    "db": {
      "host": "localhost",
      "port": 5432,
      "database": "clients"
    }
  }
}
```

Now we can set up the development and production specific settings.

##### _**Development Environment**_

Update `config/development.json` to have the following settings:

```
{
  "connection": {
    "port": 4000
  },
  "settings": {
    "db": {
      "host": "dev-db-server"
    }
  }
}
```

Now, while `NODE_ENV=development`:

* The above settings run the server in port 4000
* The database is hosted from dev-db-server

##### _**Production Environment**_

Update the `config/production.json` to have the following settings:

```
{
  "connection": {
    "port": 8000
  },
  "settings": {
    "db": {
      "host": "prod-db-server"
    }
  }
}
```

Now, while `NODE_ENV=production`:

* The above settings run the server in port 8000
* The database is hosted from prod-db-server

##### _**Hapi Configuration**_

To require the confippet settings, simply add the following to `app.js`:

```
const {config} = require("electrode-confippet");
const db = config.$("settings.db");
```

### Config Composition

Confippet's `presetConfig` composes together files in the `config/` directory, in the following order:

1. `default.EXT`
2. `default-{instance}.EXT`
3. `{deployment}.EXT`
4. `{deployment}-{instance}.EXT`
5. `{short_hostname}.EXT`
6. `{short_hostname}-{instance}.EXT`
7. `{short_hostname}-{deployment}.EXT`
8. `{short_hostname}-{deployment}-{instance}.EXT`
9. `{full_hostname}.EXT`
10. `{full_hostname}-{instance}.EXT`
11. `{full_hostname}-{deployment}.EXT`
12. `{full_hostname}-{deployment}-{instance}.EXT`
13. `local.EXT`
14. `local-{instance}.EXT`
15. `local-{deployment}.EXT`
16. `local-{deployment}-{instance}.EXT`

Where:

* `EXT` can be any of `["json", "yaml", "js"]`. Confippet will load all of them, in that order. Each time it finds a configuration file, the values in that file will be loaded and merged into the configuration store. So `js` overrides `yaml`, which overrides `json`. You can add handlers for other file types and change their loading order—see [composeConfig](https://github.com/electrode-io/electrode-confippet/blob/master/compose.md) for further details.
* `{instance}` is your app's instance string in multi-instance deployments \(specified by the `NODE_APP_INSTANCE`
  environment variable\).
* `{short_hostname}` is your server name up to the first dot.
* `{full_hostname}` is your whole server name.
* `{deployment}` is your deployment environment \(specified by the `NODE_ENV` environment variable\).

Overridden values are handled as follows:

* Objects are merged.
* Primitive values \(string, boolean, number\) are replaced.
* **Arrays are replaced**, unless the key starts with `+`_and \_both the source and the target are arrays. In that case, the two arrays are joined together using Lodash's \`_.union\` method.

After Confippet loads all available configuration files, it will look for override JSON strings from the `NODE_CONFIG`and `CONFIPPET*` environment variables. See the next section for details.

### Environment Variables

Confippet reads the following environment variables when composing a configuration store:

* `AUTO_LOAD_CONFIG_OFF`- If this is set, then Confippet will **not **automatically load any configuration into the preset
  `config` store. `Confippet.config` will be an empty store. This enables you to customize the configuration structure before loading.
* `NODE_CONFIG_DIR` - Set the directory to search for configuration files. By default, Confippet looks in the `config` directory for configuration files.
* `NODE_ENV`- By default, Confippet loads `development` configuration files after loading `default`. Set this environment variable to change to a different deployment, such as `production`.
* `NODE_APP_INSTANCE`- If your app is deployed to multiple instances, you can set this to load instance-specific configurations.
* `AUTO_LOAD_CONFIG_PROCESS_OFF`- By default, after composing the configuration from all sources, Confippet will use [processConfig](https://github.com/electrode-io/electrode-confippet/blob/master/templates.md)
  to process [templates](#using-templates). You can set this environment variable to disable template processing.
* `NODE_CONFIG`- You can set this to a valid JSON string and Confippet will parse it to override the configuration.
* `CONFIPPET*`- Any environment variables that starts with `CONFIPPET` will be parsed as JSON strings to override the configuration.

### Using Templates

Values in your configuration files can be templates, which will be resolved with a preset context. See [processConfig](https://github.com/electrode-io/electrode-confippet/blob/master/templates.md) for more information about how to use configuration value templates.

### Usage in Node Modules

If you have a Node.js module that has its own configurations based on environment variables, like`NODE_ENV`, you can use Confippet to load configuration files for your module.

The example below will use the [default compose options](https://github.com/electrode-io/electrode-confippet/blob/master/lib/default-compose-opts.js) to compose configurations from the directory`config`under the script's directory \(`__dirname`\).

```
const Confippet = require("electrode-confippet");

const options = {
  dirs: [Path.join(__dirname, "config")],
  warnMissing: false,
  context: {
    deployment: process.env.NODE_ENV
  }
};

const defaults = Confippet.store();
defaults._$.compose(options);
```

### Customization

The [composeConfig](https://github.com/electrode-io/electrode-confippet/blob/master/compose.md) feature supports a fully customizable and extendable configuration structure. Even Confippet's own preset configuration structure can be extended, since it's composed using the same feature.

If you want to use the preset config, but add an extension handler or insert a source, you can turn off auto loading, and load it yourself with your own options.

> **NOTE: **This has to happen before any other file accesses `Confippet.config`. You should do this in your startup `index.js` file.

For example:

```
process.env.AUTO_LOAD_CONFIG_OFF = true;

const JSON5 = require("json5");
const fs = require("fs");
const Confippet = require("electrode-confippet");
const config = Confippet.config;

const extHandlers = Confippet.extHandlers;
extHandlers.json5 = (fullF) => JSON5.parse(fs.readFileSync(fullF, "utf8"));

Confippet.presetConfig.load(config, {
  extSearch: ["json", "json5", "yaml", "js"],
  extHandlers,
  providers: {
    customConfig: {
      name: "",
      order: 300,
      type: Confippet.providerTypes.required
    }
  }
});
```

The above compose option adds a new provider that looks for a file named by the environment variable `CUSTOM_CONFIG_SOURCE` and will be loaded after all default sources are loaded \(controlled by `order`\).

It also adds a new extension handler, `json5`, to be loaded after `json`.

To further understand the  `_$` and the `compose` options, please see the documentation for [store](https://github.com/electrode-io/electrode-confippet/blob/master/store.md), [composeConfig](https://github.com/electrode-io/electrode-confippet/blob/master/compose.md), and [processConfig](https://github.com/electrode-io/electrode-confippet/blob/master/templates.md).
