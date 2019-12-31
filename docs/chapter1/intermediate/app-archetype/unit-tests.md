# Unit Tests Runner

Electrode Application Archetype supports Karma and Jest as its javascript unit tests runners. It allows Karma and Jest unit tests to coexist, and will automatically detect and run both. App Archetype offers developers with different options for the productive testing environments.

## Karma

App Archetype supports Karma as its Javascript test runner with the Mocha testing framework. It has two options for the headless website testing: Chrome and PhantomJS. Headless Chrome is the default option. You can specify the browser by setting the `KARMA_BROWSER` env to `chrome` or `phantomjs`.

### Run your karma tests

To run your karma unit tests, simply place your tests in the `test` folder. And run `npm run test`.

### Disabling Karma

If you prefer [Jest](#jest) only for writing your unit tests, then you can explicitly turn off Karma support and skip installing the dependencies required. To do that, use the `clap features` interactive command or use npm:

```sh
npm r electrode-archetype-opt-karma
```

## Jest

The App Archetype also takes Jest as its delightful javascript testing option. It has a built-in Jest configuration, and you can also extend it from your app level. Jest parallelizes test runs across workers and runs slowest tests first to maximize performance.

### Run your jest tests

To run your jest unit tests, simply place your tests in the `__test__` folder, or name your test files with a `.spec.js` or `.test.js` extension along with your src folder. Whatever you prefer, Jest will find and run your tests.

### Extend your jest config

The App Archetype also takes customized Jest config from your app level. To do that, create a file `archetype/config/index.js`, and put the contents below:

```js
module.exports = {
  jest: {
    // specify your jest config here
  }
};
```

### Disabling Jest

If you prefer [Karma](#Karma) only for writing your unit tests, then you can explicitly turn off Jest support and skip installing the dependencies required. To do that, use the `clap features` interactive command or use npm:

```sh
npm r electrode-archetype-opt-jest
```
