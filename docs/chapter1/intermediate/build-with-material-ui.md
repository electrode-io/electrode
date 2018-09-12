# Build with material-ui

[material-ui](http://www.material-ui.com/) is a set of React components that implement Google's material design. It's a great choice to help you quickly develop your web app with a sophisticated look and feel UI that is designed to be responsive. It's very simple to add material-ui components to an Electrode app. We've built a sample with step-by-step instructions to show you how.

![](https://cloud.githubusercontent.com/assets/5876741/19024379/377359ec-88b7-11e6-863b-a41133cc42ef.png)

## Installation

### Prerequisites

Make sure the following is installed:

- NodeJS 4.x or later
- npm 3.x or later
- [xclap-cli]

```bash
$ node -v
v6.6.0
$ npm -v
3.10.3
$ npm install -g xclap-cli
```

### Check it out

To try out this existing sample app:

1.  Clone the Git repository.

```bash
$ git clone https://github.com/electrode-io/electrode.git
$ cd electrode/samples/universal-material-ui
$ npm install
$ clap dev
```

2.  Use a browser to navigate to `http://localhost:3000` and view the sample app with material-ui components.

### To Generate the Sample Electrode App

The first part of the process is to generate an Electrode Universal App using the [Yeoman](http://yeoman.io/) generator. Follow the steps below:

1.  Generate the Electrode Universal App:

```bash
$ npm install -g yo generator-electrode
$ mkdir react-sample-material-ui
$ cd react-sample-material-ui
$ yo electrode
# ... answer questions and wait for app to be generated and npm install completed ...
```

1.  Run `clap dev` in the newly generated app
2.  Navigate to `http://localhost:3000` to verify that the app is working.

### Add material-ui

The second part of the process is to add material-ui dependencies.

1.  Stop the app and install the material-ui dependencies: `$ npm install material-ui react-tap-event-plugin --save`

2.  Restart `clap dev` and reload the browser to verify the app is still working.

3.  Add material-ui's required font, _Roboto_, to `server/plugins/webapp/index.html`

4.  Update `client/styles/base.css` with styles for material-ui.

5.  Test your material-ui component by adding a [RaisedButton](http://www.material-ui.com/#/components/raised-button) to `client/components/home.jsx`

6.  Watch the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) update your bundle and refresh your browser to see the changes.

7.  Add `global.navigator.userAgent` to `server/index.js`, as required by material-ui for [Server Rendering](http://www.material-ui.com/#/get-started/server-rendering).

8.  Watch the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) update your bundle and refresh your browser to see the changes.

### Add material-ui Examples

Now we are ready to add some of the [material-ui examples](http://www.material-ui.com/#/components/app-bar) to the app.

#### Enable tapping

First, add the resolution for an [issue in material-ui](https://github.com/callemall/material-ui/issues/4670).

Add the following code to `client/app.jsx`

```js
import injectTapEventPlugin from "react-tap-event-plugin";

window.webappStart = () => {
  injectTapEventPlugin(); // https://github.com/callemall/material-ui/issues/4670
};
```

#### IconMenu AppBar example

First add the IconMenu [AppBar example](http://www.material-ui.com/#/components/app-bar) by following the steps below.

1.  Copy the source from the example into `client/components/AppBarExampleIconMenu.jsx`
2.  Replace the `Hello Electrode` and the RaisedButton content in `client/components/home.jsx` with `<AppBarExampleIconMenu />`;
3.  Watch [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) update your bundle and refresh your browser to see the changes.
4.  If the AppBar shows up, click on the right menu button. You should see a menu pop up.

#### BottomNavigation example

Next, add the [BottomNavigation example](http://www.material-ui.com/#/components/bottom-navigation):

1.  Copy the source from the example into `client/components/BottomNavigationExampleSimple.jsx`
2.  Import the component in `client/components/home.jsx` and add it to `render` after the `AppBarExampleIconMenu`
    component.
3.  Watch [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) update your bundle and refresh your browser to see the changes.
4.  You should see AppBar and BottomNavigation show up. You should be able to interact with the buttons on the BottomNavigation component.

#### Card example

In this section we add the [Card example](http://www.material-ui.com/#/components/card).

1.  Copy the source from the Card example into `client/components/CardExampleWithAvatar.jsx`
2.  Import the component in `client/components/home.jsx` and add it to `render` after the `AppBarExampleIconMenu` component.
3.  Watch [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) update your bundle and refresh your browser to see the changes.
4.  You should see Card show up, but with broken images.

> You can replace the image URLs with full URLs by adding `http://www.material-ui.com/` to them to fix the broken images, but we will explore isomorphic images next.

#### Isomorphic Images

Electrode core comes with isomorphic images support built in using[isomorphic-loader](https://github.com/electrode-io/isomorphic-loader). In this section we explore using that feature to load the images for the[Card example](http://www.material-ui.com/#/components/card).

Create a directory called

1.  `client/images`and copy the following images there:
    - `http://www.material-ui.com/images/nature-600-337.jpg`
    - `http://www.material-ui.com/images/jsa-128.jpg`(Or your own favorite 128x128 Avatar image)
      - In my sample, I use `jchip-128.jpg`as my avatar.
2.  In`client/components/CardExampleWithAvatar.jsx`, import the images:

        import natureJpg from "../images/nature-600-337.jpg";
        import avatarJpg from "../images/jsa-128.jpg";

3.  Replace the URLs for`avatar`and`CarMedia`as follows:

```js
    ...
      avatar={avatarJpg}
    ...
      src={natureJpg}
```

4.  In `server/index.js`, activate [isomorphic-loader](https://github.com/electrode-io/isomorphic-loader)'s `extend-require` by changing the last line to:

```js
supports.isomorphicExtendRequire().then(() => {
  require("electrode-server")(config, [staticPathsDecor()]);
});
```

5.  Watch [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) update your bundle and refresh your browser to see the changes.

> Note that you will see the message `Warning: Unknown prop onTouchTap on <button> tag.` Show up on the server side rendering because of the tapping event plugin, which we don't need on the server.
