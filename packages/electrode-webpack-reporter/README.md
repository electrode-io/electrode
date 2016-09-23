# Electrode Webpack Reporter

A HTML based reporter for [webpack-dev-server].  Adds a new route `/reporter` to your [webpack-dev-server] HTTP server.

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

[webpack-dev-server]: https://webpack.github.io/docs/webpack-dev-server.html
