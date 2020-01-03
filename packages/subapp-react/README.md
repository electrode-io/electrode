# Electrode Subapp For React

This module mainly serve to setup subapp-web with Facebook React framework.

It basically re-exports the module subapp-web and sets it up with React specific APIs.

For convenience, it also exports the module `react`.

To use, a subapp's code should be doing:

```js
import { React, loadSubApp } from "subapp-react";

import Component from "./component";

export default loadSubApp({ name: "MyComponent", Component });
```

For all pratical purposes, if there's code somewhere else that ensures subapp-web is setup with the proper React framework, then it's equivalent to the following:

```js
import React from "react";
import { loadSubApp } from "subapp-web";

import Component from "./component";

export default loadSubApp({ name: "MyComponent", Component });
```

`react` and `react-dom` are specified as peerDependencies, so you must install them as part of your `package.json` dependencies.

## License

Copyright (c) 2016-present, WalmartLabs

Licensed under the [Apache License, Version 2.0].

[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
