# Electrode Webpack DLL Archetype

Electrode Webpack DLL Archetype

# Purpose

This archetype helps with creating a [npm] module that releases JavaScript [webpack] DLLs.

The DLL package then can be consumed by an Electrode application based on the Electrode app archetype.

Other common DLL consumption support:

- Electrode apps will automatically load DLL JS bundles in dev mode.
- Upload your JS to your CDN server and Electrode app archetype will save the URL mapping.
- In production mode, Electrode will auto load the DLL JS bundle from your CDN server.
- If module packed into the DLL has different version than what's installed in your `node_modules`, Electrode app archetype warn you.

# Creating Your DLL module

Steps to create a module for publishing DLLs:

```bash
$ mkdir my-react-dll
$ cd my-react-dll
$ npm init --yes
$ npm install --save react react-dom electrode-archetype-webpack-dll
$ npm install --save-dev electrode-archetype-webpack-dll-dev
```

Then add these files:

`xclap.js`:

```js
require("electrode-archetype-webpack-dll")();
```

`index.js`:

```js
module.exports = {
  entry: {
    react: ["./src/dll-react.js"]
  }
};
```

> Where `src/dll-react.js` should import the modules that should be included in the DLL named `react`.

Add these to `package.json`:

```js
{
  "main": "index.js",
  "scripts": {
    "prepare": "clap build",
    "prepublishOnly": "npm run cdn-publish",
    "prepack": "clap npm:prepack",
    "postpack": "clap npm:postpack",
    "cdn-publish": "my-cdn-publish-task && clap save-cdn-map --file=cdn-assets.json"
  }
}
```

- Where `my-cdn-publish-task` should upload the production JS bundle to your CDN server and create a file `cdn-assets.json` that map the bundle filename to the CDN URL.
