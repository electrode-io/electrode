# generator-react-component

> [Yeoman](http://yeoman.io) generator for [React](http://facebook.github.io/react/) Components

Builds a React Component project with useful gulp tasks for development, build and publishing.

See [react-component-gulp-tasks](https://github.com/JedWatson/react-component-gulp-tasks) for documentation on how to use the gulp tasks.


## Getting Started

Install the generator:

```bash
npm install -g generator-react-component
```

Then run the generator:

```bash
yo react-component
```

... and follow the prompts.


## How to develop your component

### Source

Your component source code is in `src`. You can use JSX and ES6 syntax freely in your component source; it will be transpiled to `lib` with Babel before being published to npm so that your users will simply be able to include it.

It's a great idea to add a description, documentation and other information to your `README.md` file, to help people who are interested in using your component.

### Example & Preview

Preview your component with LiveReload:

```bash
npm start
```

A webserver will be started on [localhost:8000](http://localhost:8000) running the examples in `example/src`.

You can use this playpen to test your component, and then publish it as live examples to GitHub Pages, which is a great way to let potential users try out your component and see what it can do.

### Lint your code!

```bash
npm run lint
```

Your code will be linted with ESLint, using the Babel parser and the React plugin. You can customise the settings by editing the `.eslintrc` file.

### Build and Publish

```bash
npm run build
```

This will build your `lib`, `dist` and `example/dist` folders ready for release.

You can then publish your component to npm and GitHub Pages by running:

```bash
npm run release
```

### Other npm scripts

#### `examples`

Just run the examples server; no code will be built or watched, everything in `example/dist` will be served on [localhost:8000](http://localhost:8000).

#### `publish:site`

Usually run as part of the `release` script, this will copy the contents of `example/dist` to your `gh-pages` branch and push it.

#### `watch`

This task watches the `src` folder for changes, and builds automatically into `lib`. This is useful if you are developing your component in another project using `npm link`.


## Feedback?

I'd love to hear it. Open an issue or submit a PR.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License). Copyright (c) 2016 Jed Watson.
