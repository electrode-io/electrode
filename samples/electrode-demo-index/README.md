#Electrode Demo Index

An extendable class for demos in Electrode components.

## Installation

`npm i --save-dev @walmart/electrode-demo-index`

## Usage

Components should implement a `demo/demo.jsx` file as follows (there should be no
`demo/index.jsx`).

`demo/demo.jsx`

```js
import React from "react";
import ElectrodeDemoIndex from "@walmart/electrode-demo-index";

import * as libraryScope from "../src/index";

const components = [{
  title: "Component Title",
  examples: [
    {
      title: "Example Title",
      type: "playground",
      code: require("./examples/EXAMPLE_FILE.example")
    } // any additional examples here
  ],
  options: {
    image: require("PATH_TO_IMAGE"),
    ux: () => (
      <ul>
        // etc etc
      </ul>
    )
  }
} // any additional components here
];

export default () => <ElectrodeDemoIndex libraryScope={libraryScope} components={components} />;

```

## Migration

In past incarnations, a component's `demo` directory contained a `demo.jsx` which
imported and rendered the contents of `index.jsx` in the same directory. Each component
duplicated the contents of `index.jsx`.

For consistency and ease of maintenance, existing components should now add this module as a
`devDependency`:

`npm i --save-dev @walmart/electrode-demo-index`

 and remove the existing `demo.jsx`:

`git rm demo/demo.jsx`

then renaming the existing `index.jsx` to `demo.jsx`:

`git mv demo/index.jsx demo/demo.jsx`

 and making the following changes:

```js
// These are the only imports required now
import React from "react";
import ElectrodeDemoIndex from "@walmart/electrode-demo-index";

import * as libraryScope from "../src/index";
```

If `export default class Index extends React.Component` or similar is present, or any JSX or
markup for the demo display, remove it. Similarly remove any `Index.PropTypes` definition.

Locate `Index.Components = [`... and replace `Index.Components =` with `const components =`.

Then create the new export:

```js
export default () => <ElectrodeDemoIndex libraryScope={libraryScope} components={components} />;
```

The `demo/demo.jsx` file should now resemble the example in **Usage** above.
