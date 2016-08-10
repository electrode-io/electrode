[![Build Status](https://travis-ci.com/electrode-io/generator-electrode-component.svg?token=9dyHRhqfyW5wqcpfkeLr&branch=master)](https://travis-ci.com/electrode-io/generator-electrode-component)

# generator-electrode-component

> [Yeoman](http://yeoman.io) generator for Electrode [React](http://facebook.github.io/react/) Components

Builds a React Component project with useful gulp tasks for development, build and publishing.

See [electrode-archetype-react-component-component-gulp-tasks] for documentation on how to use the gulp tasks.


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
gulp demo ; gulp open-demo
```

A webserver will be started on [localhost:4000](http://127.0.0.1:4000) running the examples in `demo/examples/*`

You can use this code-playground to test your component, and then publish it which is a great way to let potential users try out your component and see what it can do.

### Lint & unit-test code!

```bash
gulp check
```

Your code will be linted with ESLint, using the Babel parser and the React plugin. You can customise the settings by editing the `.eslintrc` file.

### Build and Publish

```bash
gulp build
```

This will build your `lib`, `dist` and `example/dist` folders ready for release.

### Other npm scripts

#### `examples`

Just run the examples server; no code will be built or watched, everything in `example/dist` will be served on [localhost:4000](http://localhost:4000)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
