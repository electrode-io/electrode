# Get Started

> **Electrode Environment Setup Requirements:**
>
> -   **Latest **[**Node LTS binary**](https://nodejs.org/en/) **(at least v4.2 required, >= 6 recommended), tip: use **[**nvm**](https://github.com/creationix/nvm) **to manage your nodejs versions. **
>
> -   [**npm v3**](https://github.com/npm/npm/releases/tag/v3.0.0) **- Install the latest **[**npm**](https://www.npmjs.com/) **version **`npm install -g npm`
>
> please checkout [requirements docs](/overview/requirements.md) for detailed setup instructions.

## Quick Guide

Are you ready to build your first Electrode App?

Please make sure to have all the [environment requirements](/overview/requirements.md) ready & setup before proceeding to the next step.

First, install [Yeoman](http://yeoman.io/) and the [Electrode Generator](https://github.com/electrode-io/electrode#yeoman-generator).

```bash
$ npm install -g yo xclap-cli generator-electrode

** NOTE: You may need sudo depending on your machine permissions. **
```

Make a new directory for your awesome app, the generate your new project:

```bash
$ mkdir electrode-app-dir
$ cd electrode-app-dir
$ yo electrode
```

Fill out the Electrode App generator with your information, take `your-awesome-app` as an example of your Application Name:

![](http://www.electrode.io/img/generator-application.png)

Run one simple command to start the server. Presto!

```bash
$ cd your-awesome-app
$ clap dev
```

Now open [localhost:3000](http://localhost:3000/) in your browser to access the app. Hello Electrode!

To view all the clap tasks available type `clap`. To build your app's client bundle for production use.

```bash
$ clap build
```

followed by

```bash
$ npm run prod
```

* * *

## Project Structure

Let's take a quick high level overview of our file structure and what `generator-electrode` gives you out the box. Read through our [What's Inside section](/chapter1/quick-start/whats-inside.md) for a more detailed description.

-   `src/client/`

    Contains your client side code and our favs, React, Redux + CSS modules.

    -   `app.jsx`

        The entry point for the client. It contains powerful Electrode modules that we will leverage as we build out functionality.

    -   `routes.jsx`

        The shared routes between client and server are defined here for use with react-router.

    -   `components/`

        This is the folder for your React components. We love React and how it helps us to manage User Interface complexity. Read more in the Explore section.

    -   `styles/`

        This is the folder for your CSS files. We will use CSS Modules: a CSS file in which all class names and animation names are scoped locally by default.

-   `src/server/`

    Contains your server-side code. Electrode-Server gives you a powerful plugin capable of SSR out the box. Learn more in the [What's Inside section](/chapter1/quick-start/whats-inside.md).

-   `config/`

    Your environment specific configuration files go here and are managed by the versatile [electrode-confippet](http://www.electrode.io/docs/confippet.html) module, including a preset config that you can customize and extend.

-   `node_modules/`

    Other Javascript files contained in modules that we will use in this application, including Electrode modules that create your out-the-box Universal app. This folder is managed directly by`npm`.

-   `.babelrc`

    Where we extend our app babel configuration to allow us to use the presets and any additional babel settings.

-   `.gitignore`

    A file that tell git what files (or patterns) to ignore when you commit.

-   `.ismorphic-loader-config.json`

    A webpack loader, plugin and library to make NodeJS `require` work with complex files like images when we are doing server-side rendering.

-   `.travis.yml`

    A file where you can customize any process in the Travis default build environment.

-   `xclap.js`

    A file that stores all your development tasks. We will explore this more in [Getting Started: Intermediate](/chapter1/Intermediate.md).

-   `package.json`

    Contains the metadata for `your-awesome-app`  and a list of your dependencies to install when running `npm install`.

-   `README.md`

    Info you want users to know about your app (installation instructions, licensing, contributors, etc.).

* * *

Let's continue to build by modifying our component and deploying in [Quick Start: Build Component.](/chapter1/quick-start/build-component.md)
