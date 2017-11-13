<h1>electrode-ui-logger</h1>

Log well and prosper. Happy Logging!

This is a logger for UI code with an Electrode server as backend support.

When your UI code is running on the browser, the logger will save up your logs and send them to the log API `{basePath}/api/logger` every **10** seconds.

When your UI code is running on the server for SSR, the logger will call `request.log`. This is why the `request` option is required on the server.

# Install

```bash
$ npm install electrode-ui-logger --save
```

# Logger usage

The logging interface provides a simple api for generating developer logs.

```js
import logger from "electrode-ui-logger";

logger.log(tags, data, options);

```

  * **`tags`** - array of strings used to specify log level, transport(s) and to otherwise categorize log entries

  * **`data`** - string or object, for transmitting log message and other information

  * **`options`** - object with additional options. Currently the only option is `request` which is required for SSR. For CSR the options are ignored and can be considered optional.

Examples:

```js
logger.log(["error"], {err: "some error occurred"}, {request: req});

logger.log("info", {msg: "hello, world"}); // you can use a string for tags directly 

logger.info({msg: "info is hello world"});
```

Data objects have some special keys:

  * `msg`: To include a log message along with other data  
    
    `logger.log(["info"], { a: "b", msg: "Log message" });`
    
  * `err`: Errors should be passed in using the `err` field:  
    
    `logger.log(["error"], { err: err });`

Reserved keys (do not use as top-level keys in `data`): `tags`

## Log levels

* To set the log level, include it in the tags.
* Valid log levels: `"trace", "debug", "info", "warn", "error", "fatal"`
  (case insensitive)
* If more than one level is specified, the higher level is used. E.g.
  `logger.log(["info", "warn"], {})` will be logged at `warn`
* Level defaults to `info` if none is specified

## API Aliases

These are the API aliases for different log levels:

  * `logger.info(data, options)`
  * `logger.warn(data, options)`
  * `logger.fatal(data, options)`
  * `logger.error(data, options)`
  * `logger.debug(data, options)`
  * `logger.trace(data, options)`
  