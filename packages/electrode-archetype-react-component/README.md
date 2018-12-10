# Archetype: Electrode React Component

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

Electrode flavored react component archetype.

Have a question? Check the [FAQ](./FAQ.md)

## Installation

You are suppose to start your Electrode component by using our Yeoman generator-electrode.

Electrode team offers a detailed getting started with Electrode Component tutorial.
If you want to check out more on our Electrode component, please use the instructions [here](https://docs.electrode.io/chapter1/quick-start/start-with-component.html) as a guide.

## Usage

The primary interface to the archetype is a list of tasks you can invoke with clap to do your bidding.
To see the tasks, simply run:

```bash
$ clap
```

To demo your `packages/components`, for example, the dev task, go to your `demo-app` directory and run:

```bash
$ clap dev
```

To test your components, go to your root directory and run:

```bash
$ npm run test
```

To test a single component, go to your specific 'packages/component' directory and run:

```bash
$ clap check
```

## Managing Dependencies

The archetypes are split into two parts: `<archetype>` and `<archetype>-dev`. Both archetypes need to be in each component and should be included in the `package.json`'s `devDependencies`.

## Check the archetype configs:

If you are enhancing / refactoring this archetype and have locally checked it out,
please see [`DEVELOPMENT.md`](./DEVELOPMENT.md) for our guidelines.

The main check we provide for the archetype itself is:

```sh
$ clap archetype:check
```


Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

---

[npm-image]: https://badge.fury.io/js/electrode-archetype-react-component.svg

[npm-url]: https://npmjs.org/package/electrode-archetype-react-component

[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/electrode-archetype-react-component

[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-component

[daviddm-dev-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/electrode-archetype-react-component

[daviddm-dev-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-component?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/electrode-archetype-react-component.svg

[npm-downloads-url]: https://www.npmjs.com/package/electrode-archetype-react-component
