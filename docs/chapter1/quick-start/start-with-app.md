# Get Started With Electrode App

> Note: If you have not done so yet, please check [Requirements](/overview/requirements.md) for setting up your development environment.

## Quick Guide

There are two ways to start your app:

-   Ignite Menu

```bash
$ ignite
```

And choose the option for `Generate an Electrode application`.

-   Ignite Single task

```bash
$ ignite generate-app
```

Fill out the information for your app. You can press enter for all the defaults, except for specifying a name for your app.

For example:

![](/images/generator-app-quick-start.png)

After the app's been created and `npm install` completed, you can start the app in dev mode:

```bash
$ cd electrode-app
$ clap dev
```

When it's ready, you should see something like this in your terminal:

![Hello Electrode](/images/dev-started.png)

Now open [localhost:3000](http://localhost:3000/) in your browser to access the app. Hello Electrode!

![Hello Electrode](/images/hello-electrode.png)

Go ahead and play around with the app.  View the page source to see the Server Side Rendered HTML.  Refresh the page to see the SSR content load immediately before React starts running.

## Further Explorations

To view all the development tasks available type `clap`.

To start in hot mode:

```bash
$ clap hot
```

To build your app for production deployment:

```bash
$ clap build
```

To start your app in production mode:

```bash
$ npm run prod
```

* * *

## Project Structure

Here is a basic top level view of the application's structure:

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

-   `config` - This directory contains the configuration for your application.
-   `src/client` - Contains your React application
-   `src/server` - Contains your NodeJS server application with SSR support.
-   `test` - Contains unit test for your application
-   `xclap.js` - entry to Electrode's archetype tasks

The application generated included a few demo components to show you how to use Redux, CSS Modules, and React JSX.  Feel free to play with them and remove or replace them when you are ready to add your application.

For continuing build React components for your Electrode Application, please continue [here.](/chapter1/quick-start/further-develop-app.md)
