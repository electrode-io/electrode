# <%= projectName %>

__COMPONENT DESCRIPTION GOES HERE__


## Demo & Examples

Live demo: [<%= ghUser %>.github.io/<%= packageName %>](http://<%= ghUser %>.github.io/<%= packageName %>/)

To build the package locally, please go to the root level and run:

```
$ npm install
$ npm run bootstrap
```

To test the package locally, please run:

```bash
$ clap check
```

To preview the package demo locally by using `demo-app`:

```bash
$ cd ../../demo-app
$ clap dev

```

Then open [`localhost:3000`](http://localhost:3000) in a browser.


## Installation

The easiest way to use <%= packageName %> is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/<%= packageName %>.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```bash
$ npm install <%= packageName %> --save
```


## Usage

__EXPLAIN USAGE HERE__

```js
var <%= componentName %> = require('<%= packageName %>');

<<%= componentName %>>Example</<%= componentName %>>
```

### Properties

* __DOCUMENT PROPERTIES HERE__

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

## License

__PUT LICENSE HERE__

Copyright (c) <%= currentYear %> <%= developerName %>.
