# Get Started With Electrode Component

## Quick Guide

```bash
$ npm install -g yo generator-electrode xclap-cli
$ yo electrode:component
```

Fill out information for you component. You can press enter for all the defaults, except specifying a name for you component.

For example:

```markdown
$ yo electrode:component

Welcome to the Electrode Component Generator

We're going to set up a new Electrode component, ready for development with
[xclap], webpack, demo, electrode component archetype, and live-reload
? What is your Package/GitHub project name? (e.g., 'wysiwyg-component') your-component
? What is the ClassName for your component?
? What will be the npm package name?
? What will be the GitHub organization username (e.g., 'walmartlabs')?
? What is your name? (for copyright notice, etc.)
? What is your GitHub Username?
? Use double quotes or single quotes? "
? What is the name of the GitHub repo where this will be published?
? Would you like to create a new directory for your project? Yes
    create .gitignore
    create package.json
    create README.md
    create lerna.json
    create packages/wysiwyg-component/.babelrc
  ...
```

After the installation finished, your new Electrode component is ready!

## Example and Preview

Preview your component by using the demo-app. This is an electrode app which uses your newly created component:

```bash
$ cd <your-component>/demo-app
$ clap dev
```

When it's ready, you should see something like this in your terminal:

![Electrode Component Sample](/images/dev-started.png)

A webserver will be started on localhost:3000. Your new component will be used in `demo-app/src/client/components/home.jsx`. Now open [localhost:3000](http://localhost:3000/) in your browser to access the component.

![Electrode Component Sample](/images/edit-me.png)

## Further: Adding More Components to the Packages

If you want to add more components to your project, go to `packages` directory and run `yo electrode:component-add` within the packages directory. You can skip this section if you do not need extra components.

```bash
$ cd packages
$ yo electrode:component-add
```

Follow the prompts as above, for example:

![](/images/generator-component-add.png)

This will generate a new package and also update the demo-app. Don't get panic if you saw conflicts, the `demo-app/src/client/components/home.jsx` and `demo-app/package.json` expected to be overwritten during the update.

After finished installation, you can preview the multi-components by using demo-app again.

```bash
$ cd ../../demo-app/
$ clap dev
```

And you should see something like this in your terminal:

![Electrode Component Add Sample](/images/dev-started.png)

Now open [localhost:3000](http://localhost:3000/) in your browser to access the component.

![Electrode Component Add Sample](/images/edit-me2.png)

* * *

## Project Structure

The new electrode component is applied by Lerna structure, which can help manage multiple repos within your packages directory.

## Packages

Your component source code is in `packages/<componentName>/src` and test code is in `packages/<componentName>/test`. You can use JSX and ES6 syntax freely in your component source; it will be transpiled to lib with Babel before being published to npm so that your users will simply be able to include it.

Here is the layout of packages/<componentName>:

```markdown
└── packages
    └── <componentName>
        ├── README.md
        ├── xclap.js
        ├── package.json
        ├── demo
        │   ├── examples
        │   │   └── test-component.example
        │   ├── demo.css
        │   ├── demo.jsx
        ├── src
        │   ├── components
        │   │   └── test-component.jsx
        │   ├── index.js
        │   ├── lang
        │   │   ├── default-messages.js
        │   │   ├── en.json
        │   │   └── tenants
        │   │       └── electrodeio
        │   │           └── default-messages.js
        │   └── styles
        │       └── test-component.css
        └── test
            └── client
                └── components
                    ├── helpers
                    │   └── intl-enzyme-test-helper.js
                    └── test-component.spec.jsx
```

## Demo Application

`demo-app` is a full stack Electrode Application, which used for developing and testing your `packages/<component>`. You need to import your `packages/<component>` to demo-app, explore and personalize this web application there.

Here is the layout of demo-app:

```markdown
├── demo-app
│   ├── LICENSE
│   ├── README.md
│   ├── config
│   │   ├── default.js
│   │   ├── development.json
│   │   ├── production.js
│   │   └── production.json
│   ├── xclap.js
│   ├── package.json
│   ├── src
│   │   ├── client
│   │   │   ├── actions
│   │   │   │   └── index.jsx
│   │   │   ├── app.jsx
│   │   │   ├── components
│   │   │   │   └── home.jsx
│   │   │   ├── images
│   │   │   │   └── electrode.png
│   │   │   ├── reducers
│   │   │   │   └── index.jsx
│   │   │   ├── routes.jsx
│   │   │   └── styles
│   │   │       └── base.css
│   │   └── server
│   │       ├── index.js
│   │       └── views
│   │           └── index-view.jsx
│   └── test
│       ├── client
│       │   └── components
│       │       └── home.spec.jsx
│       └── server
```
