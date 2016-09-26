#Electrode Demo Index

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

A shared demo component for Electrode components.

## Installation

`npm i --save-dev electrode-demo-index`

## Usage

Components should implement a `demo/demo.jsx` file as follows.

`demo/demo.jsx`

```js
import React from "react";
import Demo from "electrode-demo-index";

import * as libraryScope from "../src/index";

const locale = "en";
const messages = require(`../src/lang/${locale}.json`);
const localeData = require(`react-intl/locale-data/${locale}`);

addLocaleData(localeData);

const components = [
  {
    title: "Component Title",
    examples: [
      {
        title: "Example Title",
        type: "playground",
        code: require("./examples/EXAMPLE_FILE.example")
      } // any additional examples here
    ]
  } // any additional components here
];
const localScope = {IntlProvider, messages, locale};

const demo = () => <Demo libraryScope={libraryScope} components={components} />;

export default demo;
```

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[npm-image]: https://badge.fury.io/js/electrode-demo-index.svg
[npm-url]: https://npmjs.org/package/electrode-demo-index
[travis-image]: https://travis-ci.org/electrode-io/electrode-demo-index.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/electrode-demo-index
[daviddm-image]: https://david-dm.org/electrode-io/electrode-demo-index.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/electrode-io/electrode-demo-index
