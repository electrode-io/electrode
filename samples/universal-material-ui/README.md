# electrode-react-sample-material-ui

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Electrode Universal React Sample App with material-ui components

## Installation

```sh
$ npm install --save electrode-react-sample-material-ui
```

## About

This app was created with the following steps.

Pre requisite: make sure you have installed NodeJS >= 4.x and npm >= 3.x.

  ```bash
  $ node -v
  v6.6.0
  $ npm -v
  3.10.3
  ```

1. First generate the Electrode Universal App with the following commands:

  ```bash
  $ npm install -g gulp yo generator-electrode
  $ mkdir electrode-react-sample-material-ui
  $ cd electrode-react-sample-material-ui
  $ yo electrode
  # ... answer questions and wait for app to be generated and npm install completed ...
  ```

2. Run `gulp dev` in the newly generated app
3. Navigate to `http://localhost:3000` to make sure app is working.
4. Stop the app and install [material-ui] dependencies

  ```bash
  $ npm install material-ui react-tap-event-plugin --save
  ```

5. Restart `gulp dev` and reload browser to make sure things are still working.
6. Add [material-ui]'s required font *Roboto* to `server/plugins/webapp/index.html`
7. Update `client/styles/base.css` with styles for [material-ui].
8. Test [material-ui] component by adding a [RaisedButton] to `client/components/home.jsx`
9. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
10. Add `global.navigator.userAgent` to `server/index.js` as required by [material-ui] for [Server Rendering].
11. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.

## Usage


## License

Apache-2.0 © [Joel Chen](https://github.com/jchip)


[npm-image]: https://badge.fury.io/js/electrode-react-sample-material-ui.svg
[npm-url]: https://npmjs.org/package/electrode-react-sample-material-ui
[travis-image]: https://travis-ci.org/jchip/electrode-react-sample-material-ui.svg?branch=master
[travis-url]: https://travis-ci.org/jchip/electrode-react-sample-material-ui
[daviddm-image]: https://david-dm.org/jchip/electrode-react-sample-material-ui.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jchip/electrode-react-sample-material-ui
[material-ui]: http://www.material-ui.com/
[RaisedButton]: http://www.material-ui.com/#/components/raised-button
[webpack-dev-server]: https://webpack.github.io/docs/webpack-dev-server.html
[Server Rendering]: http://www.material-ui.com/#/get-started/server-rendering
