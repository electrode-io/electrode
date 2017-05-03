# Test Components

#### Develop tests for the above components

@WalmartLabs believes that testing is critical to writing great, high performance code. This includes unit testing at both the component and application level. For your component, we are using [Mocha](https://mochajs.org/), a Javascript testing framework that is perfect for running async tests, with [Enzyme](http://airbnb.io/enzyme/docs/guides/mocha.html), Airbnb's awesome testing utility for React, and [Chai](http://chaijs.com/) for assertions.

#### How to run tests

```
# Basic testing and linting
$ gulp check

# Continous Testing
## In one terminal
$ gulp server-test
## In a different terminal
$ gulp test-frontend-dev-watch
```



