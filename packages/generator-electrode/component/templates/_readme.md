# <%= projectName %>-component

Welcome to the top level of the repo for React component <%= projectName %>.

This is designed to be a lerna repo with the following two directories:

-   `packages`
-   `demo-app`

`packages` contains the actual component modules.

`demo-app` contains an Electrode App that allows you to test and develop the components.

To start developing, first install the lerna dependencies at the top level:

```bash
npm install
```

And then bootstrap the modules under `packages`:

```bash
npm run bootstrap
```

To start playing with the included demo components:

```bash
cd demo-app
npm install
clap dev
```

Then open your browser to `http://localhost:3000`
