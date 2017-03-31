# How To Become A Contributor And Submit Your Own Code
There are few guidelines that we need contributors to follow so that we can have a chance of keeping on top of things.

## Getting Started
This repo uses Lerna (https://lernajs.io/) as a top level setup, which is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

* Make sure you have installed gulp-cli

````
$ npm install -g gulp-cli
````

* Make sure you have forked the desired repo (https://github.com/electrode-io/electrode.git) for developing and testing your code changes.

````
$ git clone https://github.com/electrode-io/electrode.git
$ cd electrode
````

* Run `npm install` for installing all the dependencies repo needed.

* Run `npm run bootstrap` for bootstrapping the packages in the current repo. It will install all their dependencies and linking any cross-dependencies.

* Run `gulp samples-local` for pulling electrode packages from local under `packages` folder.

* Now you can go to the `samples` folder, pick or create any samples, develop and test your changes over there.

Run samples in dev mode (ex.`samples/universal-react-node`):

```
$ cd samples/universal-react-node
$ npm install
$ gulp dev|hot
```

After running above, you should see a similar text as `Hapi.js server running at http://m-C02SL0GSG8WM.local:3000` in command line.

And when you open the browser at `http://localhost:3000`, you should see a large Electrode icon with a few demonstration components below.

## Contributing Guidelines
1. Push your changes to a topic branch in your fork of the repository.
1. Ensure that your code adheres to the existing style in the sample to which
   you are contributing.
1. Ensure that your code has an appropriate set of unit tests which all pass by running `npm run test` on the project root.
1. Submit a pull request with a proper title and detailed description.
