# electrode-react-sample-material-ui

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Electrode Universal React Sample App with [material-ui] components


## Installation

### Prerequisites

Make sure you have installed NodeJS >= 4.x and npm >= 3.x, and [gulp].

  ```bash
  $ node -v
  v6.6.0
  $ npm -v
  3.10.3
  $ npm install -g gulp
  ```

### Check it out

To try out this ready made sample app, use git to clone the repo:

```sh
$ git clone https://github.com/electrode-io/electrode-react-sample-material-ui.git
$ cd electrode-react-sample-material-ui
$ npm install
$ gulp dev
```

Now navigate your browser to `http://localhost:3000` to see the sample app with [material-ui] components.

## About

This app was created with the following steps.


### Generate Electrode App

First part of the process is to generate an Electrode Universal App using the [yeoman] generator.  Follow the steps below:

1. First generate the Electrode Universal App with the following commands:

  ```bash
  $ npm install -g yo generator-electrode
  $ mkdir electrode-react-sample-material-ui
  $ cd electrode-react-sample-material-ui
  $ yo electrode
  # ... answer questions and wait for app to be generated and npm install completed ...
  ```

2. Run `gulp dev` in the newly generated app
3. Navigate to `http://localhost:3000` to make sure app is working.

### Add [material-ui]

Second part of the process is to add [material-ui] dependencies.  Follow the steps below:

1. Stop the app and install [material-ui] dependencies

  ```bash
  $ npm install material-ui react-tap-event-plugin --save
  ```

1. Restart `gulp dev` and reload browser to make sure things are still working.
1. Add [material-ui]'s required font *Roboto* to `server/plugins/webapp/index.html`
1. Update `client/styles/base.css` with styles for [material-ui].
1. Test [material-ui] component by adding a [RaisedButton] to `client/components/home.jsx`
1. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
1. Add `global.navigator.userAgent` to `server/index.js` as required by [material-ui] for [Server Rendering].
1. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.

### Add [material-ui] Examples

Now we are ready to add some of the [material-ui examples] to the app.

#### Enable tapping

First we have to add the resolution for this issue https://github.com/callemall/material-ui/issues/4670.

Add the following code to `client/app.jsx`

```js
import injectTapEventPlugin from "react-tap-event-plugin";

window.webappStart = () => {
  injectTapEventPlugin(); // https://github.com/callemall/material-ui/issues/4670
  
};
```

#### IconMenu [AppBar example]

First add the IconMenu [AppBar example] by following the steps below.

1. Copy the source from the example into a file `client/components/AppBarExampleIconMenu.jsx`
2. Replace the `Hello Electrode` and the RaisedButton content in `client/components/home.jsx` with `<AppBarExampleIconMenu />`;
3. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
4. If the AppBar shows up, click on the right menu button, you should see a menu pops up.

#### [BottomNavigation example]

Next add the [BottomNavigation example]

1. Copy the source from the example into a file `client/components/BottomNavigationExampleSimple.jsx`
2. Import the component in `client/components/home.jsx` and add it to `render` after the `AppBarExampleIconMenu` component.
3. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
4. You should see AppBar and BottomNavigation show up.  You should be able to interact with the buttons on the BottomNavigation component.

#### [Card example]

In this section we add the [Card example].

1. Copy the source from the [Card example] into a file `client/components/CardExampleWithAvatar.jsx`
2. Import the component in `client/components/home.jsx` and add it to `render` after the `AppBarExampleIconMenu` component.
3. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
4. You should see Card show up but with broken images

> You can replace the image URLs with the full URLs to the images by adding `http://www.material-ui.com/` to them to fix the broken images, but we will explore isomorphic images next.


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
[gulp]: http://gulpjs.com/
[material-ui examples]: http://www.material-ui.com/#/components/app-bar
[AppBar example]:  http://www.material-ui.com/#/components/app-bar
[BottomNavigation example]: http://www.material-ui.com/#/components/bottom-navigation
[yeoman]: http://yeoman.io/
[Card example]: http://www.material-ui.com/#/components/card
