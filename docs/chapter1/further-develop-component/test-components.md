# Test Components

#### Develop tests for the above components

@WalmartLabs believes that testing is critical to writing great, high performance code. This includes unit testing at both the component and application level. For your component, we are using [Mocha](https://mochajs.org/), a Javascript testing framework that is perfect for running async tests, with [Enzyme](http://airbnb.io/enzyme/docs/guides/mocha.html), Airbnb's awesome testing utility for React, and [Chai](http://chaijs.com/) for assertions.

#### How to run tests

We generate unit test and code coverage check for failure. The app test files are located in the `demo-app/test/` directory, and component test files are located in the  `packages/<componentName>/test/` directory—and you can add additional unit tests for each new method or feature in the future.

To run the test, go to the root level of your repository (ex. your-component), and run the following commands.

```bash
$ npm test
```

This will run `lerna bootstrap && lerna run test` in the background. The process goes into every `packages/` directory and runs the `npm test` for each component.
