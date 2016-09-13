# Archetype: Electrode React Isomorphic App

A Walmart Labs flavored React Universal App archetype.

## tl;dr

#### What is this for?

This "app archetype" provides for common patterns across all app projects so that each app project can standardize on common development behavior and patterns. Its essentially pre-made patterns for build scripts.

#### How do I start developing in my application project after installing?

```bash
# This runs both the node server and webpack (in hot mode)
$ gulp hot

# Also try `dev` mode when running off battery power and you wish to maximize battery life.
$ gulp dev
```

#### What is `hot mode`?

`Hot mode` is where webpack transpiles your javascript and css code and continues to watch for any changes, and, builds and loads only the code that has changed on disk. It allows you to develop without re-loading your browser page as the changes will be automagically piped in.

#### How do I run my application tests?

```bash
# This will run test eslint and your spec tests
$ gulp check
```

#### How do I run my application tests without going through eslint (i.e., while I'm developing)?

```bash
# This will run only your spec tests
$ gulp test-dev
```

#### Why can't my test and code changes get automatically run with the tests?  Why do the tests take so long to start?

```bash
# This will start a webpack-dev-server to hot watch your code and also start a karma test browser that auto-reruns when specs or client code changes.
$ gulp test-watch-all
```

#### How do I use and/or view the final build files without minifying/uglifying but also with sourcemaps?

```bash
# This will build your code and save to disk, and then start a node server (without using webpack-dev-server).
$ gulp dev-static
```

#### Is there anything else that might be nice for my development?

```bash
# This will start the node server in debug mode so that you can place breakpoints, "debugger" statements, or use `node-inspector`.
$ gulp debug
```

#### How do I view my test result in the browser?

Run either of the below commands before opening the link.

```
gulp server-test
gulp dev # (OR) (which includes `server-test`)
gulp hot # (OR) (which includes `server-test`)
```
This will serve the static assets for test.html

open [test.html]((http://localhost:3001/node_modules/electrode-archetype-react-app/config/browser_test/test.html)) to view test result.


## Installation

We use [gulp] as a task invoker.  You should install it globally.

```bash
$ sudo npm install -g gulp
```

###### run the following in your project
```bash
$ npm install --save-dev gulp electrode-archetype-react-app electrode-archetype-react-app-dev
```

###### Add a `gulpfile.js`
The `gulpfile.js` should contain the following and be located in the root of your project

```js
require("electrode-archetype-react-app")();
```

###### Add a `.babelrc` to your project
The `.babelrc` needs to extend
[the archetype's babel configuration](config/babel/.babelrc) in order to apply the presents (ES2015, React) and the plugins like i18n. If your project needs additional Babel settings (like using stage 0 features) you can add them to this file. See the [Babel docs](https://babeljs.io/docs/usage/babelrc/) for more information.

```json
{
  "extends": "./node_modules/electrode-archetype-react-app/config/babel/.babelrc"
}
```

###### Use `babel-core/register` in your server entry point

If you don't have a build step for your server code, then you must transpile
on the fly using `babel-register`. For performance reasons, we recommend
whitelisting the `react` module to be transpiled as well, so that the
`transform-node-env-inline` plugin gets applied to the React codebase:

```js
require("babel-core/register")({
  ignore: /node_modules\/(?!react\/)/
});
```

###### Define client entry points

By default, the archetype uses `client/app.js` or `client/app.jsx` as a client entry point. Alternatively,
you can define multiple entry points for your application, so the Webpack will create bundles for each app
entry point. To do that, place `entry.config.js` module into your app's `client` directory:

Here is an **example** of `entry.config.js`:
```js
module.exports = {
  "web": "./app-web.js",
  "ios": "./app-ios.js",
  "android": "./app-android.js"
};
```

## Tasks

Run `gulp` to see list of tasks.
