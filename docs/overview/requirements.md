# Requirements

First, let's quickly check your development environment. You will need to have the following set up to generate and deploy your Electrode app|component in under five minutes:

## For Development On Your Local machine

1.  Install the latest [NodeJS LTS binary](https://nodejs.org/) in your machine. (at least v4.2 required, >= 6 recommended).

    -   We recommend a tool like [nvm](https://github.com/creationix/nvm#install-script) for managing NodeJS installations, but see [info here](#globally-installed-nodejs) for cautionary notes.

2.  Install [yo], [generator-electrode], and [xclap-cli] globally:

```bash
npm install -g yo generator-electrode xclap-cli
```

### Globally Installed NodeJS

IMPORTANT: If you install NodeJS globally on your system, then please make sure you re-install `yo` if it's already exist in your Node installation.  A bug in `yo` was causing it to always load generators from your system folders.  The fix was released on 7-31-2017.

### Keep generator-electrode Up to date

We release new version of [generator-electrode] when we add new features.  So make sure you check the versions and update it periodically with the command:

```bash
npm install -g generator-electrode
```

### npm Verion 3

**Electrode requires npm version >= 3**

NodeJS v6.x already comes with npm@3 by default, but if you are using NodeJS 4 for some reason, make sure you install npm@3 with the following command:

```bash
npm install -g npm@3
```

## For Online Deployments

-   A [Heroku](https://signup.heroku.com/dc) account + [CLI tools](https://devcenter.heroku.com/articles/heroku-command-line).
-   A [Github](https://github.com/) account.

Ready? Let's [build](/chapter1/quick-start/build-component.md).

[yo]: http://yeoman.io/

[yeoman]: http://yeoman.io/

[xclap-cli]: https://www.npmjs.com/package/xclap-cli

[generator-electrode]: https://www.npmjs.com/package/generator-electrode
