# Requirements

First, let's quickly check your development environment. You will need to have the following set up to generate and deploy your Electrode app|component in under five minutes:

## For Development On Your Local Machine

1.  Install the latest [NodeJS LTS binary](https://nodejs.org/) in your machine. (at least v4.2 required, >= 6 recommended).

    -   We recommend a tool like [nvm](https://github.com/creationix/nvm#install-script) for managing NodeJS installations.

2.  Install [electrode-ignite] that helps bootstrapping your development with Electrode.

    ```bash
    npm install -g electrode-ignite
    ```

    -   You can Run the tool with just `ignite` and get an interactive menu or you can run it with command line arguments.
    -   Two examples of command line arguments:
        -   `ignite check-nodejs` - To verify your NodeJS and npm versions.
        -   `ignite generate-app` - To generate a new Electrode React app.

#### npm Verion 3

**Electrode requires npm version >= 3**

NodeJS v6.x already comes with npm@3 by default, but if you are using NodeJS 4 for some reason, make sure you install npm@3 with the following command:

```bash
npm install -g npm@3
```

> Run `ignite check-nodejs` to verify.

#### Headless Chrome

Headless chrome brings all modern web platform features provided by Chromium and the Blink rendering engine to the command line. It is a great tool for automated testing and server environments where you don't need a visible UI shell.

In the Electrode Archetype App and Component, we are using Chrome Headless as the default option for automated testing. Please go to your Chrome browser, update Google Chrome if you see the option, and relaunch.

> Note: Headless mode is available on Mac and Linux in Chrome 59. Windows support is coming in Chrome 60. To check what version of Chrome you have, open chrome://version.

## For Online Deployments

-   A [Heroku](https://signup.heroku.com/dc) account + [CLI tools](https://devcenter.heroku.com/articles/heroku-command-line).
-   A [Github](https://github.com/) account.

Ready? Let's [build](/chapter1/quick-start/build-app.md).

[yo]: http://yeoman.io/

[yeoman]: http://yeoman.io/

[xclap-cli]: https://www.npmjs.com/package/xclap-cli

[generator-electrode]: https://www.npmjs.com/package/generator-electrode

[electrode-ignite]: https://www.npmjs.com/package/electrode-ignite
