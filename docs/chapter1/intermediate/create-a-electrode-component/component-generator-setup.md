# Component Generator Setup

From previous section [Get Started](/chapter1/quick-start/get-started.md), we've already build our electrode applications through [Electrode Generator](https://github.com/electrode-io/electrode/tree/master/packages/generator-electrode). Moreover, electrode generator can also help to build electrode components, with support from [Electrode Component Archetype.](https://github.com/electrode-io/electrode/tree/master/packages/electrode-archetype-react-component)

Are you ready to build your first Electrode Component?

## Installation

First, install [Yeoman](http://yeoman.io/) and [xclap-cli] if you haven't yet. Install  [generator-electrode](https://github.com/electrode-io/electrode/tree/master/packages/generator-electrode) using npm (we assume you have pre-installed node.js (> 4.2.x required)).

```bash
$ npm install -g yo xclap-cli generator-electrode
```

> Note: You may need sudo depending on your machine permissions.

Then create a completely new folder and run the generator:

```bash
$ mkdir your-awesome-component-folder
$ cd your-awesome-component-folder
$ yo electrode:component
```

Fill out the Electrode Component generator with your information (below is a sample):

```bash
Welcome to the Electrode Component Generator

We're going to set up a new Electrode component, ready for development with
[xclap], webpack, demo, electrode component archetype, and live-reload
? What is your Package/GitHub project name? (e.g., 'wysiwyg-component') your-awesome-component
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
```

After the installation finished, your new Electrode component is ready!

## Example and Preview

Preview your component by using the demo-app. This is an electrode app which uses your newly created component:

```bash
$ cd <your-awesome-component>/demo-app
$ clap dev
```

A webserver will be started on localhost:3000. Your new component will be used in `demo-app/src/client/components/home.jsx`

## Adding More Components to the Packages

If you want to add one more component to your project, you can run `yo electrode:component-add` within the packages directory.

```bash
$ cd packages
$ yo electrode:component-add
```

And follow the prompts.

This will generate a new package and also update the demo-app. Don't get panic if you saw conflicts, the `demo-app/src/client/components/home.jsx` and `demo-app/package.json` expected to be overwritten during the update.

<hr>

Let's continue to take a look what's inside of our component at [What is inside](/chapter1/intermediate/create-a-electrode-component/what-is-inside.md)
