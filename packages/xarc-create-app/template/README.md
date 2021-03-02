# my-x-app

Welcome to your React application using Electrode X.

## Development

Some initial things to do and try:

1. Update your `package.json` to fill in some information.

   - `name`, `description`, `homepage`, `author`

2. Start doing some testing and development

   - First install dependencies

```
npm install
```

- Then to develop your app, do

```
npm run dev
```

- Once App is running, point browser to <http://localhost:3000>

3. Try adding some simple text to `src/home/index.ts` or `src/demo1/index.ts`.

4. Create some React components and add them to the home or demo subapp.

5. Enable some optional features in `xclap.ts` when calling `loadXarcDevTasks`.

6. Create a repo and push your app to <https://www.github.com>, and update `repository` in `package.json`.

7. Contribute to the [Electrode Platform](https://github.com/electrode-io/electrode/blob/master/CONTRIBUTING.md).

## Styling Support

To enable extra CSS styling processing, install these optional npm packages.

| module              | note                                                             |
| ------------------- | ---------------------------------------------------------------- |
| `@xarc/opt-postcss` | This is the base styling processing using PostCSS. Always needed |
| `@xarc/opt-stylus`  | Install if you want to use `.styl` files                         |
| `@xarc/opt-less`    | Install if you want to use `.less` files                         |
| `@xarc/opt-sass`    | Install if you want to use `.sass` or `.scss` files              |

For example, to support `.styl` files:

`npm i --save-dev @xarc/opt-postcss @xarc/opt-stylus`

And you can just add code to your files that imports style files:

`import from "my-styles.css"`

### CSS Module Support

By default, CSS module is only enabled for `.css` files with name that ends with `.mod.css` or `.module.css`. ie: `my-styles.mod.css`

And you can use CSS modules like this:

```tsx
import styles from "my-styles.mod.css";

export const demoComponent = () => <p className={styles.someStyle}>hello</p>;
```

If you want to enable CSS module support for other files, like `my-styles.mod.styl`,
then set options when calling `loadDevTasks` in `xrun-tasks.ts`:

```ts
loadDevTasks(xrun, {
  // options to customize features
  webpackOptions: {
    cssModuleSupport: "byModExt"
  }
});
```

## Resources

- Check Electrode docs at <https://www.electrode.io/electrode/>
