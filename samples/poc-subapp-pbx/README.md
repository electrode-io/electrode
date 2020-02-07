# Subapp Preact/redux-bundler Extended Sample

Demos

- multiple subapps grouping that wait for bundles prepare before rendering
- Inlining one subapp in another subapp

## Subapp Grouping

It's possible to group multiple subapp together for SSR.

Subapps in the same group will wait for each other's data prepare before rendering start.

Allow multple independent groups.

## Inlining

It's possible to inline a subapp in another, with some limitations.

`Subapp1.js`:

```js
<main>
  <Subapp2 />
  <Subapp3 />
</main>
```

For the above code to work for SSR, the app needs to do the following:

- group all subapps for a route together when initializing them.

To group two subapps, using `routes.js`:

```js
export default {
  "/": {
    subApps: [
      ["./main", { group: "main" }],
      ["./subapp2", { group: "main" }],
      ["./subapp3", { group: "main" }]
    ]
  }
};
```

- Electrode will await for the data `prepare` method from all subapps in the same group to finish before calling start on all of them.
- Additionaly on the browser, Electrode will wait for all JS bundles for all subapps in the same group to load first.
