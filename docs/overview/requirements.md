# Requirements

First, let's quickly check your development environment. You will need to have the following set up to generate and deploy your Electrode app|component in under five minutes:

## For Development On Your Local Machine

1.  Install [Electrode Ignite](https://github.com/electrode-io/electrode/tree/master/packages/electrode-ignite) in your machine to check the Electrode environment.

    > Note: Electrode Ignite is a CLI tool for development with OSS Electrode React/NodeJS Platform.

    ```bash
    $ npm install -g electrode-ignite
    $ ignite install
    ```


2.  Install the latest [NodeJS LTS binary](https://nodejs.org/) in your machine. (at least v4.2 required, >= 6 recommended).

    -   We recommend a tool like [nvm](https://github.com/creationix/nvm#install-script) for managing NodeJS installations, but see [info here](#globally-installed-nodejs) for cautionary notes.
    -   Developers can use [Electrode Ignite](https://github.com/electrode-io/electrode/tree/master/packages/electrode-ignite) to check your NodeJS and npm environment.

    ```bash
    $ ignite check-nodejs
    ```

#### Globally Installed NodeJS

IMPORTANT: If you install NodeJS globally on your system, then please make sure you re-install `yo` if it's already exist in your Node installation.  A bug in `yo` was causing it to always load generators from your system folders.  The fix was released on 7-31-2017.

#### npm Verion 3

**Electrode requires npm version >= 3**

NodeJS v6.x already comes with npm@3 by default, but if you are using NodeJS 4 for some reason, make sure you install npm@3 with the following command:

```bash
npm install -g npm@3
```

#### Headless Chrome

Headless chrome brings all modern web platform features provided by Chromium and the Blink rendering engine to the command line. It is a great tool for automated testing and server environments where you don't need a visible UI shell.

In the Electrode Archetype App and Component, we are using Chrome Headless as the default option for automated testing. Please go to your Chrome browser, update Google Chrome if you see the option, and relaunch.

> Note: Headless mode is available on Mac and Linux in Chrome 59. Windows support is coming in Chrome 60. To check what version of Chrome you have, open chrome://version.

## For Online Deployments

-   A [Heroku](https://signup.heroku.com/dc) account + [CLI tools](https://devcenter.heroku.com/articles/heroku-command-line).
-   A [Github](https://github.com/) account.

Ready? Let's [build](/chapter1/quick-start/build-component.md).

[yo]: http://yeoman.io/

[yeoman]: http://yeoman.io/

[xclap-cli]: https://www.npmjs.com/package/xclap-cli

[generator-electrode]: https://www.npmjs.com/package/generator-electrode

[electrode-ignite]: [https://github.com/electrode-io/electrode/tree/master/packages/electrode-ignite]
