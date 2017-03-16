# Electrode Webpack Reporter

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

An HTML based reporter for [webpack-dev-server].  Adds a new route `/reporter` to your [webpack-dev-server] HTTP server.

![screenshot][screenshot]

# Usage

```js
const WebpackReporter = require("electrode-webpack-reporter");

const webpackConfig = {
  devServer: {
  }
};

const reporter = new WebpackReporter();
reporter.apply(webpackConfig);

//
// optional extra handling
//

reporter.on("report", (reporterOptions) => {
  if (reporterOptions.state) {
    // ... bundle is VALID
  }
});
```

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[webpack-dev-server]: https://webpack.github.io/docs/webpack-dev-server.html
[npm-image]: https://badge.fury.io/js/electrode-webpack-reporter.svg
[npm-url]: https://npmjs.org/package/electrode-webpack-reporter
[travis-image]: https://travis-ci.org/electrode-io/electrode-webpack-reporter.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/electrode-webpack-reporter
[daviddm-image]: https://david-dm.org/electrode-io/electrode-webpack-reporter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/electrode-io/electrode-webpack-reporter
[screenshot]: https://cloud.githubusercontent.com/assets/5876741/19782792/49d63a1e-9c44-11e6-8dbb-8287352f1822.gif
