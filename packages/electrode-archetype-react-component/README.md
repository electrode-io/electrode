# Archetype: Electrode React Component

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

Electrode flavored react component archetype.

Have a question? Check the [FAQ](./FAQ.md)

## Installation

> NOTE: Generally you don't need to install these modules directly. You should start your component by using our Yeoman generator-electrode or check our Electrode [Get Started With Electrode Component](https://docs.electrode.io/chapter1/quick-start/start-with-component.html) guide.

However, if you are manually creating your component:

###### Install the two complementary modules

```
$ npm install --save electrode-archetype-react-component
$ npm install --save-dev electrode-archetype-react-component-dev
```

###### Add a `xclap.js` to your project

The `xclap.js` needs to extend
[the archetype's clap tasks](/arhcetype-clap.js) in order to apply the shared tasks on your new/existing electrode component. Add this following lines of code to the newly created `xclap.js`

```js
"use strict";

const xclap = require("xclap");

const tasks = {
  "prepublish": ["npm:prepublish"],
  "preversion": ["check-cov"]
}
xclap.load("myprj", tasks);

require("electrode-archetype-react-component")(xclap);
```

## Usage

The primary interface to the archetype is a list of tasks you can invoke with clap to do your bidding.
To see the tasks, simply run:

```bash
$ clap
```

To invoke a task, for example, the dev task, go to your demo-app and run:

```bash
$ cd demo-app
$ clap dev
```

## Get Started With Electrode Component

Electrode team offers a detailed getting started with Electrode Component tutorial.
If you want to check out more on our Electrode component, please use the instructions [here](https://docs.electrode.io/chapter1/quick-start/start-with-component.html) as a guide.

## Managing Dependencies

The archetypes are split into two parts: `<archetype>` and `<archetype>-dev`. Both archetypes need to be in each component and should be included in the `package.json`'s `devDependencies`.

## Check the archetype configs:

If you are enhancing / refactoring this archetype and have locally checked it out,
please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for our guidelines.

The main check we provide for the archetype itself is:

```sh
$ clap archetype:check
```


Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[npm-image]: https://badge.fury.io/js/electrode-archetype-react-component.svg

[npm-url]: https://npmjs.org/package/electrode-archetype-react-component

[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/electrode-archetype-react-component

[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-component

[daviddm-dev-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/electrode-archetype-react-component

[daviddm-dev-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-component?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/electrode-archetype-react-component.svg

[npm-downloads-url]: https://www.npmjs.com/package/electrode-archetype-react-component
