# Test Components

#### Develop tests for the above components

@WalmartLabs believes that testing is critical to writing great, high performance code. This includes unit testing at both the component and application level. For your component, we are using [Mocha](https://mochajs.org/), a Javascript testing framework that is perfect for running async tests, with [Enzyme](http://airbnb.io/enzyme/docs/guides/mocha.html), Airbnb's awesome testing utility for React, and [Chai](http://chaijs.com/) for assertions.

#### How to run tests

We generate unit test and code coverage check for failure. The app test files are located at `demo-app/test/` folder, and component test files are located at `packages/<componentName>/test/` folder which you can add on more unit tests for each new method or feature in the future.

To run the test, please go to the root level of your repo (ex. your-component), and run

```bash
$ npm test
```

This will run `lerna bootstrap && lerna run test` behind, which goes into every `packages/` folder and run `npm test` for each component.
