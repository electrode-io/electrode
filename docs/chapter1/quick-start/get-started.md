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
