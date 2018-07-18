# Deploy Your App

We're almost finished with our Electrode app development. The final step is to deploy `electrode-app` and share it with your fellow developers using [Heroku](https://devcenter.heroku.com/categories/deployment). We have listed the steps below, but feel free to learn more about [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). These instructions assume you have a GitHub account.

Login to your GitHub account repository and create a new empty repository called 'Electrode-App'. Click `clone electrode-repo` and follow the steps below.

```bash
$ git init
$ git add .
$ git commit -m 'first commit'
$ git remote add origin https://github.com/your-Github-name/electrode-app.git
$ git push -u origin master
```

Navigate to the [Heroku site](https://signup.heroku.com/dc) and set up a free account. This will help streamline our deployment process. Note: We will do this several times.

Next, let's quickly deploy `electrode-app` from the command line. Click [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) to download and install the Heroku CLI for your machine.

When you are finished installing, log in using the email address and password you used when creating your Heroku account.

```bash
$ heroku login
```

Enter your Heroku credentials:

```bash
Email: your-example-email@walmartlabs.com
Password:
```

You should see a terminal message `Logged in as your-example-email@your-email-provider.com` . Now, let's deploy!

You'll need to specify the [version of node](https://devcenter.heroku.com/articles/node-best-practices) and npm you are using on your machine into our `package.json`. Add the code below to your `package.json`. Make sure to change `"node": "4.2.x"`, and `"npm": 3.10.x` to your actual node and npm version. To find out what versions you have, run `node -v` and `npm -v` in the command line

```js
"engines": {
  "node": "4.2.x",
  "npm": "3.10.x"
}
```

It should now look similar to this:

```js
{
  "name": "electrode-app",
  "version": "0.0.1",
  "description": "your-app-description",
  "homepage": "electrode-app",
  "author": {
    "name": "your-name",
    "email": "your-email-address@email.com",
    "url": "your-app-url"
  },
  "engines": {
    "node": "^4.x.x || ^6.x.x",
    "npm": ">= 3.x.x"
  },
  "contributors": [],
  "files": [
    "server",
    "client",
    "test"
  ],
  "main": "server/index.js",
  "keywords": [],
  "repository": {
    "type": "git",
    "url": "your-repo-url"
  },
  "license": "Apache-2.0",
  "scripts": {
    "start": "if test \"$NODE_ENV\" = \"production\"; then npm run prod; else clap dev; fi",
    "test": "clap test",
    "coverage": "clap check",
    "prod": "echo 'Starting standalone server in PROD mode'; node .",
    "heroku-postbuild": "clap build"
  },
  "dependencies": {
    "bluebird": "^3.4.6",
    "electrode-archetype-react-app": "^1.0.0",
    "electrode-confippet": "^1.0.0",
    "electrode-redux-router-engine": "^1.2.2",
    "electrode-server": "^1.0.0",
    "electrode-static-paths": "^1.0.0",
    "lodash": "^4.10.1"
  },
  "devDependencies": {
    "electrode-archetype-react-app-dev": "^1.0.0"
  }
}
```

Use the following commands to commit your changes:

```bash
$ git add .
$ git commit -m "Updates package.json with node version"
```

Create an app on Heroku (which prepares Heroku to receive your source code). This also creates a Git remote repository called `heroku` with a generated random name:

```bash
$ heroku create
```

Alternatively, you can also create an app that is generated with your app's name (if it is available):

```bash
$ heroku create electrode-app
```

Use the command below to set a configuration so that Heroku installs Electrode-App's devDependencies:

```bash
$ heroku config:set NPM_CONFIG_PRODUCTION=false
```

If you intend to serve static files with a CDN, use the command below to set a configuration for [production.js](https://github.com/electrode-io/electrode/blob/148a4f4a2e8d78443eb3bdc1cf62f4d74bf49755/packages/generator-electrode/generators/app/templates/config/production.js#L11).

```bash
$ heroku config:set STATIC_FILES_OFF=true
```

Now deploy your code:

```bash
$ git push heroku master
```

Visit the app at the generated URL by using this command:

```bash
$ heroku open
```

And...you did it! Click [here](https://first-electrode-example-app.herokuapp.com/) for our deployed Heroku version. We will build even more in our [Getting Started: Intermediate](../Intermediate.md) and cover complex topics like routing, server plugins, and other powerful deployment software.
