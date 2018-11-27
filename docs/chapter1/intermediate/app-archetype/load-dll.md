# Loading Webpack DLL

Webpack DLL allows you to put common libraries in a separate bundle. For example, a React app can put all the React core modules in a DLL. See our sample [react-vendor-dll].

[react-vendor-dll]: https://github.com/electrode-io/electrode/tree/master/samples/react-vendor-dll

Electrode makes it easy for you to create and consume common bundle DLLs.

It's easy to load a webpack DLL generated using [Electrode DLL archetype].

- The DLL should be published to a npm package.

For example, to load `my-vendor-dll`:

In `archetype/config/index.js`:

```js
module.exports = {
  webpack: {
    loadDlls: {
      "my-vendor-dll": true
    }
  }
};
```

In development mode with `clap dev`, Electrode will ensure your DLL is properly loaded from your local.

[electrode dll archetype]: ./chapter1/dll-archetype
