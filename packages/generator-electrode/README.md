# generator-electrode

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]
> Generate Electrode ~~Isomorphic~~ Universal React App with NodeJS backend.

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
