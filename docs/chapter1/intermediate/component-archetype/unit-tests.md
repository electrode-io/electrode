# Unit Tests Runner

Electrode Component Archetype supports Karma and Jest as its javascript unit tests runners. It allows Karma and Jest unit tests to coexist, and will automatically detect and run both. Component Archetype offers developers with different options for the productive testing environments.

## Karma

Component Archetype supports Karma as its Javascript test runner with the Mocha testing framework. It has two options for the headless website testing: Chrome and PhantomJS. Headless Chrome is the default option. You can specify the browser by setting the `KARMA_BROWSER` env to `chrome` or `phantomjs`.

### Run your karma tests

To run your karma unit tests, simply place your component tests inside `packages/[component]/test` folder. And run `npm run test`.

## Jest

The Component Archetype also takes Jest as its delightful javascript testing option. It has a built-in Jest configuration, and you can also extend it from your app level. Jest parallelizes test runs across workers to maximize performance. 

### Run your jest tests

To run your jest unit tests, simply place your tests in the `packages/[component]/__test__` folder, or name your test files with a `.spec.js` or `.test.js` extension along with your `packages/[component]/src` folder. Whatever you prefer, Jest will find and run your tests.

### Extend your jest config

The Component Archetype also takes customized Jest config from your component level. To do that, create a file `packages/[component]/archetype/config/index.js`, and put the contents below:

```
module.exports = {
    jest: {
        // sepcify your jest config here
    }
};
```