#Electrode Demo Index

A shared demo component for Electrode components.

## Installation

`npm i --save-dev electrode-demo-index`

## Usage

Components should implement a `demo/demo.jsx` file as follows (there should be no
`demo/index.jsx`).

`demo/demo.jsx`

```js
import React from "react";
import Demo from "electrode-demo-index";

import * as libraryScope from "../src/index";

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

export default () => <Demo libraryScope={libraryScope} components={components} />;
