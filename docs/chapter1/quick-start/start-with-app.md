# Getting Started With Your Electrode App

>Before proceeding, be sure to verify the [Requirements](/overview/requirements.md) for setting up your development environment.

## Quick Guide

You can start your app using the Ignite Menu or using the Ignite Single task.

-   Ignite Menu

```bash
$ ignite
```

Choose the option for `Generate an Electrode application`.

-   Ignite Single task

```bash
$ ignite generate-app
```

Fill out the information for your app. You can press enter to select all the defaults, except for specifying a name for your app.

For example:

![](/images/generator-app-quick-start.png)

After the app is created and the `npm install` is completed, you can start the app in dev mode:

```bash
$ cd electrode-app
$ clap dev
```

When the app starts, you should see the status in your terminal:

![Hello Electrode](/images/dev-started.png)

Now open [localhost:3000](http://localhost:3000/) in your browser to access the app Hello Electrode!

![Hello Electrode](/images/hello-electrode.png)

Go ahead and play around with the app.  View the page source to see the Server Side Rendered HTML.  Refresh the page to see the SSR content load immediately before React starts running.

## Additional Commands

To view all the development tasks available enter the following:  
 `clap`.

To start in hot mode, enter the following command:

```bash
$ clap hot
```

To build your app for a production deployment:

```bash
$ clap build
```

To start your app in production mode:

```bash
$ npm run prod
```

* * *

## Project Structure

A basic top-level view of the application's structure is shown below.

```markdown
electrode-app
├── package.json
├── LICENSE
├── README.md
├── config
├── src
│   ├── client
│   └── server
├── test
│   ├── client
│   └── server
└── xclap.js
```

-   `config` - Contains the configuration for your application.
-   `src/client` - Contains your React application.
-   `src/server` - Contains your NodeJS server application with SSR support.
-   `test` - Contains the unit test for your application.
-   `xclap.js` - Entry to the Electrode archetype tasks.

The generated application included a few demo components to show you how to use Redux, CSS Modules, and React JSX.  Feel free to play with them and remove or replace them when you are ready to add your application.

To continue to build React components for your Electrode Application, see [Developing Your Electrode App.](/chapter1/quick-start/further-develop-app.md)
