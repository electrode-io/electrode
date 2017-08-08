#### What is this for?

This "component archetype" provides for common patterns across all component projects so that each component project can standardize on common development behavior and patterns. Its essentially pre-made patterns for build scripts.

#### What made this new component archetype different?

The new electrode component is applied by Lerna structure, which can help manage multiple repos within your `packages` directory.

`demo-app` folder is a full stack Electrode application, which used for developing and testing your components. You need to import your `packages/<componentName>` to demo-app, explore and personalize this web application there.

`packages` folder is where your packages located at. Inside, `demo` folder contains examples for how to demo your components, `src`|`test` folder contains your component `source|test` code, and `xclap.js` is the entry to Electrode archetype tasks.

#### How do I start developing in my component project after installing?

Since `demo-app` is a full stack Electrode Application, which used for developing and testing your `packages/component`, to run|demo your packages, please make sure you are in `demo-app` folder.

```bash
# This runs both the node server and webpack (in hot mode)
$ cd demo-app
$ clap hot

# Also try `dev` mode when running off battery power and you wish to maximize battery life.
$ cd demo-app
$ clap dev
```

#### What is `hot mode`?

`Hot mode` enables Hot module reloading(HMR), it is where webpack transpiles your javascript and css code and continues to watch for any changes, and, builds and loads only the code that has changed on disk. It allows you to develop without re-loading your browser page as the changes will be automagically piped in.

#### How do I run my component tests?

```bash
# This will run test eslint and your spec tests
$ clap check
```

#### How do I run my component tests without going through eslint (i.e., while I'm developing)?

```bash
# This will run only your spec tests
$ clap test-dev
```

#### Where can I find a sample of Electrode component?

Please check out the Electrode component demo [here](https://github.com/electrode-io/electrode/tree/master/samples/demo-component).

#### Where can I find a detailed tutorial about Electrode component?

Please check out the Electrode component tutorial [here](https://docs.electrode.io/chapter1/quick-start/start-with-component.html).
