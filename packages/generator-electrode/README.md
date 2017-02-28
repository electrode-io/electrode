# generator-electrode

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]
> Generate Electrode ~~Isomorphic~~ Universal React App with NodeJS backend or a React component with useful gulp tasks for development, building and publishing.

## Installation

First, install [Yeoman], [gulp], and generator-electrode using [npm] (we assume you have pre-installed [node.js] (> 4.2.x required)).

```bash
$ npm install -g yo gulp generator-electrode
```

> Note: You may need add `sudo` to the command.

Then generate your new project:

```bash
$ mkdir your-project-name
$ cd your-project-name
$ yo electrode
```
> Note: If the app is not properly generated at the correct destination, make sure you do not have a .yo-rc.json file hidden in your CWD.

## Running the app

Once the application is generated and `npm install` is completed, you are ready to try it out.

```bash
$ npm start
```

Wait for webpack to be ready and navigate to `http://localhost:3000` with your browser.

You can run [gulp] to see the list of tasks available.

Some common ones:

  - `gulp dev` - start in webpack-dev-server development mode
  - `gulp hot` - start in webpack-dev-server hot mode
  - `gulp build` - build production `dist` files
  - `gulp server-prod` - start server in production mode
  - `gulp check` - run unit tests with coverage

## Generating a React Component
  Install the generator if you haven't already:

  ```bash
  npm install -g generator-electrode
  ```

  Then run the generator:

  ```bash
  yo electrode:component
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

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

## License

Apache-2.0 © WalmartLabs


[npm-image]: https://badge.fury.io/js/generator-electrode.svg
[npm-url]: https://npmjs.org/package/generator-electrode
[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/generator-electrode
[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/generator-electrode
[daviddm-dev-image]:https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/generator-electrode
[daviddm-dev-url]:https://david-dm.org/electrode-io/electrode?path=packages/generator-electrode?type-dev
[npm-downloads-image]:https://img.shields.io/npm/dm/generator-electrode.svg
[npm-downloads-url]:https://www.npmjs.com/package/generator-electrode
[gulp]: http://gulpjs.com/
[Yeoman]: http://yeoman.io
[npm]: https://www.npmjs.com/
[node.js]: https://nodejs.org/
