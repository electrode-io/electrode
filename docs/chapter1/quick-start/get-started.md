# Get Started

> **Electrode Environment Setup Requirements:**
>
> -   **Latest **[**Node LTS binary**](https://nodejs.org/en/) **(at least v4.2 required, >= 6 recommended), tip: use **[**nvm**](https://github.com/creationix/nvm) **to manage your nodejs versions. **
>
> -   [**npm v3**](https://github.com/npm/npm/releases/tag/v3.0.0) **- If you are using Node 4, then install the latest **[**npm**](https://www.npmjs.com/) **version **`npm install -g npm`
>
> please checkout [requirements docs](/overview/requirements.md) for detailed setup instructions.

## Quick Guide

```bash
$ npm install -g yo generator-electrode xclap-cli
$ yo electrode
```

Fill out information for you app.  You can press enter for all the defaults, except specifying a name for you app.

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

```text
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

* * *

Let's continue to build by modifying our component and deploying in [Quick Start: Build Component.](/chapter1/quick-start/build-component.md)
