# electrode-sample-react-jest-app

[![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url]

> Electrode Universal React Sample App with Jest testing

## Installation

### Prerequisites

Make sure you have installed NodeJS >= 4.x and npm >= 3.x, and [clap-cli].

```bash
$ node -v
v6.6.0
$ npm -v
3.10.3
$ npm install -g clap-cli
```

### Check it out

To try out this ready made sample app, use git to clone the repo:

```sh
$ git clone https://github.com/electrode-io/electrode.git
$ cd electrode
$ npm install
$ npm run bootstrap
$ clap samples-local
$ cd samples/react-jest-app
$ npm install
$ npm run test
```

### Check your lib

The common way to test with jest is to embed the tests next to
the source of the component they are testing. 

This project was partially created as a test for a pull request 
to ensure test/spec files were not ending up 
in the `/lib` directory on build.  As such, a couple of helper scripts were added.

```sh
$ cd samples/react-jest-app
$ npm run nuke-lib
$ npm run build
$ npm run check-test-in-lib
```

This should output a PASS or FAIL depending on if it finds a spec file in the `/lib` directory.

### Check your electrode changes

If you're making changes to electrode itself,
you can use this sample app to check if your react client tests 
are ending up in your `/lib` directory.

```sh
$ cd samples/react-jest-app
$ fyn
$ npm run nuke-lib
$ npm run build
$ npm run check-test-in-lib
```

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
[clap-cli]: https://www.npmjs.com/package/clap-cli
[material-ui examples]: http://www.material-ui.com/#/components/app-bar
[AppBar example]:  http://www.material-ui.com/#/components/app-bar
[BottomNavigation example]: http://www.material-ui.com/#/components/bottom-navigation
[yeoman]: http://yeoman.io/
[Card example]: http://www.material-ui.com/#/components/card
[isomorphic-loader]: https://github.com/electrode-io/isomorphic-loader
[screenshot]: https://cloud.githubusercontent.com/assets/4782871/22477359/996f3d36-e79a-11e6-8d93-377b1ad1f2f3.png
