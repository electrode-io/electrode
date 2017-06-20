Development
===========

We use `clap` and `npm` to control all aspects of development and
publishing.


## Build

Build for production use (NPM, bower, etc) and create `dist` UMD bundles
(min'ed, non-min'ed)

```
$ clap build
```

Note that `dist/` files are only updated and committed on **tagged releases**.


## Development

All development tasks consist of watching the demo bundle, the test bundle
and launching a browser pointed to the demo page.

Run the `demo` application with watched rebuilds either doing:

### Basic Watched Builds

```bash
$ clap dev       # dev test/app server
$ clap open-dev  # (OR) dev servers _and a browser window opens!_
```

### Watched Builds + Hot Reloading

Same as above, but with hot reloading of React components.

```bash
$ clap hot       # hot test/app server
$ clap open-hot  # (OR) hot servers _and a browser window opens!_
```

From there, using either `dev` or `hot`, you can see:

* Demo app: [127.0.0.1:4000](http://127.0.0.1:4000/)

<!-- TODO: Add `test.html`
  https://gecgithub01.walmart.com/electrode/electrode-archetype-react-component/issues/79
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)
-->

## Testing in Dev

Testing is an important part of the development process at Walmart. The technologies involved with our testing include:

- [Mocha](https://mochajs.org/) is our testing framework. This is how we write our tests and Mocha provides the API that our tests suites follow.
- [Chai](http://chaijs.com/) is our assertion framework. This is how we tell the testing framework if the test passes or fails. Specifically we use the [expect](http://chaijs.com/api/bdd/) syntax.
- [Karma](https://karma-runner.github.io/0.13/index.html) is a test runner. Karma takes your specs and allows you to run them in a browser.
- [Enzyme](airbnb.io/enzyme/) is a wrapper for React's TestUtils. Enzyme greatly reduces boilerplate for tests and makes tests easier to write. See examples below. Do not use React.TestUtils, instead rely upon Enzyme to do your assertions, unless you have a really good reason to go against this convention. New tests added will be required to use enzyme (even if that file did not previously use enzyme).
- [Chai-Shallowly](https://github.com/walmartlabs/chai-shallowly) is a plugin for Chai to help with testing React. Chai Shallowly is a wrapper around Enzyme for our assertion framework. See examples below.
- [Sinon](sinonjs.org/docs/) is a mocking framework for Javascript. It allows you to stub and spy on functions as well as a fake server.
- [Sinon-chai](https://github.com/domenic/sinon-chai) is a plugin for chai to allow us to directly assert against sinon in chai.

[Here is an example of chai-shallowly and Enzyme's shallow functionality](https://gecgithub01.walmart.com/react/product-higher-order-components/blob/master/test/client/spec/components/detailed-hero-image.spec.jsx)


## Quality

### In Development

During development, you are expected to be running either:

```bash
$ clap dev
```

to build the lib and test files. With these running, you can run the faster

```bash
$ clap check-dev
```

Command. It is comprised of:

```bash
$ clap lint
$ clap test-dev
```

Note that the tests here are not instrumented for code coverage and are thus
more development / debugging friendly.

### Hot Test Running
Assuming you have one terminal with `clap hot` you can have your tests run hot as well:

```bash
$ clap test-watch # if you already have hot running on a tab.
$ clap concurrent-test-watch # If you want to run in only 1 terminal window.
```

**NOTE: ** This feature is relatively new and occasionally your tests will run _before_ the new
webpack build is completed. This is okay, just try saving a file to reload all of your tests.

### Continuous Integration

CI doesn't have source / test file watchers, so has to _build_ the test files
via the commands:

```bash
$ clap check     # PhantomJS only
$ clap check-cov # (OR) PhantomJS w/ coverage
$ clap check-ci  # (OR) PhantomJS,Firefox + coverage - available on Travis.
```

Which is currently comprised of:

```bash
$ clap lint  # AND ...

$ clap test      # PhantomJS only
$ clap test-cov  # (OR) PhantomJS w/ coverage
$ clap test-ci   # (OR) PhantomJS,Firefox + coverage
```

Note that `(test|check)-(cov|ci)` run code coverage and thus the
test code may be harder to debug because it is instrumented.

### Client Tests

The client tests rely on webpack dev server to create and serve the bundle
of the app/test code at: http://127.0.0.1:3001/assets/main.js which is done
with the task `clap server-test` (part of `npm dev`).

### Code Coverage
Code coverage is generated via the commands:

```bash
$ clap check-cov # part of `clap check` task
```

Code coverage reports are outputted to:

```
coverage/
  client/
    BROWSER_STRING/
      lcov-report/index.html  # Viewable web report.
```

### Browser client test
Test results are output to test.html which can view by opening
[test.html](http://localhost:3001/node_modules/%40walmart/electrode-archetype-react-component/config/browser_test/test.html)

Run either of the below commands before opening the link.

```bash
clap server-test
clap dev            # (OR) (which includes `server-test`)
clap hot            # (OR) (which includes `server-test`)
```
## Releases

**IMPORTANT - NPM**: To correctly run `preversion` your first step is to make
sure that you have a very modern `npm` binary:

```bash
$ npm install -g npm
```

Built files in `dist/` should **not** be committed during development or PRs.
Instead we _only_ build and commit them for published, tagged releases. So
the basic workflow is:

```bash
# Make sure you have a clean, up-to-date `master`
$ git pull
$ git status # (should be no changes)

# Choose a semantic update for the new version.
# If you're unsure, read about semantic versioning at http://semver.org/
$ npm version major|minor|patch -m "Version %s - INSERT_REASONS"

# ... the `dist/` and `lib/` directories are now built, `package.json` is
# updated, and the appropriate files are committed to git (but unpushed).
#
# *Note*: `lib/` is uncommitted, but built and must be present to push to npm.

# Check that everything looks good in last commit and push.
$ git diff HEAD^ HEAD
$ git push && git push --tags
# ... the project is now pushed to GitHub and available to `bower`.

# And finally publish to `npm`!
$ npm publish
```

And you've published!
