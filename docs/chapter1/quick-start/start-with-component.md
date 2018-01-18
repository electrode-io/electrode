# Get Started With Electrode Component

> Note: If you have not done so yet, please check [Requirements](/overview/requirements.md) for setting up your development environment.

## Quick Guide

There are two ways to start your component:

-   Ignite Menu

```bash
$ ignite
```

And choose the option for `Generate an Electrode component`.

-   Ignite Single task

```bash
$ ignite generate-component
```

Fill out the information for your component. You can press enter for all the defaults, except for specifying a name for your component.

For example:

![Hello Electrode Component](/images/component-dev-started.png)

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

> Note: You can skip this section if you do not need extra components.

There are two ways to add more components to your project: invoke ignite menu or specifying the task name.
Please make sure you are under `packages` directory before you run the commands below:

-   Ignite Menu

```bash
$ ignite
```

And specify option `5` for `Add a component to your existing component repo`.

-   Ignite Single task

```bash
$ ignite add-component
```

Follow the prompts as above, for example:

![](/images/generator-component-add.png)

This will generate a new package and also update the demo-app. Don't get panic if you saw conflicts, the `demo-app/src/client/components/home.jsx` and `demo-app/package.json` expected to be overwritten during the update.

> Note: If you have installed `yo` at version 2.0.0 or higher, you can specify the `a` option for `overwrite this and all others`, or you need to specify the `y` option for `overwrite` each time.

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

```markdown
electrode-component
    ├── demo-app
    │   ├── LICENSE
    │   ├── README.md
    │   ├── config
    │   ├── xclap.js
    │   ├── src
    │   │   ├── client
    │   │   └── server
    │   └── test
    │       ├── client
    │       └── server
    └── packages
        └── <componentName>
            ├── README.md
            ├── xclap.js
            ├── package.json
            ├── demo
            ├── src
            │   ├── components
            │   ├── index.js
            │   ├── lang
            │   └── styles
            └── test
                └── client
```

-   `demo-app` - This directory is a full stack Electrode Application, which used for developing and testing your `packages/<componentName>`. You need to import your `packages/<componentName>` to demo-app, explore and personalize this web application there.
-   `packages/<componentName>/xclap.js` - Entry to Electrode archetype tasks
-   `packages/<componentName>/demo` - Contains examples for how to demo your component
-   `packages/<componentName>/src` - Contains your component source code
-   `packages/<componentName>/test` - Contains unit tests for your component

For further developing your Electrode components, please refer [here.](/chapter1/quick-start/further-develop-component.md)
