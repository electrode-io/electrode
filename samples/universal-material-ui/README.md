# electrode-react-sample-material-ui

[![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url]

> Electrode Universal React Sample App with [material-ui] components

![screenshot][screenshot]

## Installation

### Prerequisites

Make sure you have installed NodeJS >= 4.x and npm >= 3.x, and [xclap-cli].

```bash
$ node -v
v6.6.0
$ npm -v
3.10.3
$ npm install -g xclap-cli
```

### Check it out

To try out this ready made sample app, use git to clone the repo:

```sh
$ git clone https://github.com/electrode-io/electrode.git
$ cd electrode
$ npm install
$ npm run bootstrap
$ clap samples-local
$ cd samples/universal-material-ui
$ npm install
$ clap dev
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

2. Run `clap dev` in the newly generated app
3. Navigate to `http://localhost:3000` to make sure app is working.

### Add [material-ui]

Second part of the process is to add [material-ui] dependencies.  Follow the steps below:

1. Stop the app and install [material-ui] dependencies

```bash
$ npm install material-ui react-tap-event-plugin --save
```

1. Restart `clap dev` and reload browser to make sure things are still working.
1. Add [material-ui]'s required font *Roboto* to `src/server/views/index-view.js`
1. Update `src/client/styles/base.css` with styles for [material-ui].
1. Test [material-ui] component by adding a [RaisedButton] to `src/client/components/home.jsx`
1. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
1. Add `global.navigator.userAgent` to `src/server/index.js` as required by [material-ui] for [Server Rendering].
1. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.

### Add [material-ui] Examples

Now we are ready to add some of the [material-ui examples] to the app.

> Note that the examples are written with babel stage-1 which is not supported in Electrode so you might have to rewrite some of them.

#### Enable tapping

First we have to add the resolution for this issue https://github.com/callemall/material-ui/issues/4670.

Add the following code to `src/client/app.jsx`

```js
import injectTapEventPlugin from "react-tap-event-plugin";

window.webappStart = () => {
  injectTapEventPlugin(); // https://github.com/callemall/material-ui/issues/4670

};
```

#### IconMenu [AppBar example]

First add the IconMenu [AppBar example] by following the steps below.

1. Copy the source from the example into a file `src/client/components/AppBarExampleIconMenu.jsx`
2. Replace the `Hello Electrode` and the RaisedButton content in `src/client/components/home.jsx` with `<AppBarExampleIconMenu />`;
3. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
4. If the AppBar shows up, click on the right menu button, you should see a menu pops up.

#### [BottomNavigation example]

Next add the [BottomNavigation example]

1. Copy the source from the example into a file `src/client/components/BottomNavigationExampleSimple.jsx`
2. Import the component in `src/client/components/home.jsx` and add it to `render` after the `AppBarExampleIconMenu` component.
3. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
4. You should see AppBar and BottomNavigation show up.  You should be able to interact with the buttons on the BottomNavigation component.

#### [Card example]

In this section we add the [Card example].

1. Copy the source from the [Card example] into a file `src/client/components/CardExampleWithAvatar.jsx`
2. Import the component in `src/client/components/home.jsx` and add it to `render` after the `AppBarExampleIconMenu` component.
3. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.
4. You should see Card show up but with broken images

> You can replace the image URLs with the full URLs to the images by adding `http://www.material-ui.com/` to them to fix the broken images, but we will explore isomorphic images next.

#### Isomorphic Images

Electrode core comes with isomorphic images support built in using [isomorphic-loader].  In this section we explore using that feature to load the images for the [Card example].

1. Create a directory `src/client/images` and copy the following images there
  - http://www.material-ui.com/images/nature-600-337.jpg
  - http://www.material-ui.com/images/jsa-128.jpg (Or your own favorite 128x128 Avatar image)
    - Note that in my sample I use `jchip-128.jpg` as my avatar.
1. In `src/client/components/CardExampleWithAvatar.jsx`, import the images:

  ```js
  import natureJpg from "../images/nature-600-337.jpg";
  import avatarJpg from "../images/jsa-128.jpg";
  ```

1. Replace the URLs for `avatar` and `CarMedia` img `src`, as follows:

```
...
  avatar={avatarJpg}
...
  src={natureJpg}
```

1. In `src/server/index.js`, activate [isomorphic-loader]'s `extend-require` by changing the last line to:

```js
const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");
const support = require("electrode-archetype-react-app/support");

support.load({
  isomorphicExtendRequire: true
}).then(() => {
  require("electrode-server")(config, [staticPathsDecor()]);
});

```

1. Watch [webpack-dev-server] update your bundle and refresh browser to see changes.

> Note that you will see the message `Warning: Unknown prop onTouchTap on <button> tag.` show up on the server side rendering because of the tapping event plugin, which we don't need on server anyways.

## License

Apache-2.0 © [Joel Chen](https://github.com/jchip)

[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=samples/universal-material-ui
[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=samples/universal-material-ui
[daviddm-dev-image]:https://david-dm.org/electrode-io/electrode/dev-status.svg?path=samples/universal-material-ui
[daviddm-dev-url]:https://david-dm.org/electrode-io/electrode?path=samples/universal-material-ui?type-dev
[material-ui]: http://www.material-ui.com/
[RaisedButton]: http://www.material-ui.com/#/components/raised-button
[webpack-dev-server]: https://webpack.github.io/docs/webpack-dev-server.html
[Server Rendering]: http://www.material-ui.com/#/get-started/server-rendering
[xclap-cli]: https://www.npmjs.com/package/xclap-cli
[material-ui examples]: http://www.material-ui.com/#/components/app-bar
[AppBar example]:  http://www.material-ui.com/#/components/app-bar
[BottomNavigation example]: http://www.material-ui.com/#/components/bottom-navigation
[yeoman]: http://yeoman.io/
[Card example]: http://www.material-ui.com/#/components/card
[isomorphic-loader]: https://github.com/electrode-io/isomorphic-loader
[screenshot]: https://cloud.githubusercontent.com/assets/4782871/22477359/996f3d36-e79a-11e6-8d93-377b1ad1f2f3.png
