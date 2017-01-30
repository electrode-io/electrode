# generator-electrode-component

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

A [Yeoman](http://yeoman.io) generator for Electrode
[React](http://facebook.github.io/react/) components.

Builds a React component project with useful gulp tasks for development,
building, and publishing.

See [electrode-archetype-react-component-component-gulp-tasks] for complete
documentation of the gulp tasks.


## Contents

* [Getting Started](#getting-started)
* [Developing Your Component](#developing-your-component)
    * [Source](#source)
    * [Example and Preview](#example-and-preview)
    * [Linting and Unit Testing](#linting-and-unit-testing)
    * [Building and Publishing](#building-and-publishing)
* [License](#license)

## Getting Started

Install the generator:

```bash
npm install -g generator-electrode-component
```

Then run the generator:

```bash
yo electrode-component
```

...and follow the prompts.


## Developing Your Component

### Source

Your component source code is in `src`. You can use JSX and ES6 syntax freely in
your component source; it will be transpiled to `lib` with Babel before being
published to npm so that your users will simply be able to include it.

It's a great idea to add a description, documentation and other information to
your `README.md` file, to help people who are interested in using your
component.

### Example and Preview

Preview your component with LiveReload:

```bash
gulp demo ; gulp open-demo
```

A webserver will be started on [localhost:4000](http://127.0.0.1:4000) running
the examples in `demo/examples/*`

You can use this code-playground to test your component, then publish it to let
potential users try out your component and see what it can do.

### Linting and Unit Testing

```bash
gulp check
```

Your code will be linted with ESLint, using the Babel parser and the React
plugin. You can customise the settings by editing the `.eslintrc` file.

### Building and Publishing

```bash
gulp build
```

This will build your `lib`, `dist` and `example/dist` folders for release.

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[npm-image]: https://badge.fury.io/js/generator-electrode-component.svg
[npm-url]: https://npmjs.org/package/generator-electrode-component
[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/generator-electrode-component
[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/generator-electrode-component
[daviddm-dev-image]:https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/generator-electrode-component
[daviddm-dev-url]:https://david-dm.org/electrode-io/electrode?path=packages/generator-electrode-component?type-dev
[npm-downloads-image]:https://img.shields.io/npm/dm/generator-electrode-component.svg
[npm-downloads-url]:https://www.npmjs.com/package/generator-electrode-component
