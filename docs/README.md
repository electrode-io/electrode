<p align="center">
<a><img src="https://raw.githubusercontent.com/electrode-io/electrode/cc4ea3e1851cee3333ecca08fdbf5534f51b1ae7/samples/universal-react-node/client/images/logo-192x192.png" alt="Electrode Logo"></a>
<br>
<b>Electrode</b>
</p>

[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/electrode-io/electrode)
[![Build Status][travis-image]][travis-url] [![devDependencies Status][daviddm-image]][daviddm-url]

### Building large scale universal React Web Applications

> Built at @WalmartLabs powering the <http://www.walmart.com> eCommerce site, Electrode is a platform for building small to large scale universal ReactJS/NodeJS web applications with a standardized structure, best practices, and modern technologies built in. Electrode focuses on performance, component reusability, and simple deployment to multiple cloud providers—so you can focus on what makes your app unique.

**It takes 5 minutes and a single command to get your own Universal React app to customize:**

![Hello from Electrode][hello-electrode]

## Getting Started

- To jump right in and create an app with the Electrode App Generator, see [Create an Electrode App](chapter1/quick-start/start-with-app.md).

- For all the information you need about Electrode (and Electrode Native!), visit <http://www.electrode.io>.

- For details about features and supported technologies, see [What is Electrode].

### Contributing

Do you find Electrode useful? Please send us your encouragement with a github star.

Did you find an issue? Would you like to help with the project?
Please See our [contributing guide] for instructions on [submitting a PR] or [reporting an issue].

## Packages

The [Electrode main repo] uses [Lerna] to manage multiple related packages that are part of the Electrode Core.

### App Archetype

[electrode-archetype-react-app] is a pair of complementing npm modules that allows common patterns across all app projects so that each app project can standardize on common development behavior and patterns. Its essentially pattern templates for build scripts. It also requires a companion module [electrode-archetype-react-app-dev] that's meant for your app's `devDependencies`.

### Component Archetype

[electrode-archetype-react-component] is a pair of complementing npm modules that makes developing reusable React components as easy as possible with all the latest tools and technologies configured for you.

### Electrode Ignite

Electrode Ignite allows you to quickly create a Universal React App or Component with support from the archetypes, and server in Node with Hapi or Express.

For information on how to use the modules,
check out [Get Started With Electrode App](chapter1/quick-start/start-with-app.html).

## Sample Applications

You can find sample applications in the [`samples`](https://github.com/electrode-io/electrode/tree/master/samples) directory.

## Other Standalone Modules

In addition to the archetypes and the generators, Electrode includes a fleet of battle-tested enterprise modules that are designed as a framework for developing and deploying NodeJS applications to power sites like <http://www.walmart.com>:

- [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
- [Electrode Electrify](https://github.com/electrode-io/electrify)
- [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
- [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
- [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
- [Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render)
- [Electrode Bundle Analyzer](https://github.com/electrode-io/electrode-bundle-analyzer)

### Boilerplate Universal React Node

The [`samples/universal-react-node`](https://github.com/electrode-io/electrode/tree/master/samples/universal-react-node) directory includes a sample Electrode app. The app was created with the Electrode generator using the Electrode App archetype modules. We've also added other demos and features to it to serve as examples. This app demonstrates how you can use the standalone NodeJS modules listed above.

For more information, see the [README](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/README.md) file.

### Sample Universal React Node with [material-ui]

You can find a sample Electrode app that uses the [material-ui] React components located here: [`samples/universal-material-ui`](https://github.com/electrode-io/electrode/tree/master/samples/universal-material-ui).

For more information, see the [README](https://github.com/electrode-io/electrode/blob/master/samples/universal-material-ui/README.md) file.

## Additional Samples

We included additional Electrode Sample Apps in the <https://github.com/electrode-samples> directory. You can use the sample apps as references.

## Support and Acknowledgement

We would like to thank @WalmartLabs for the opportunity to develop the Electrode platform and associated modules as open source software. We know that Electrode provides an important advancement for our internal teams and projects as well as for the open source community.

We value the open source community and the support we receive and we are committed to addressing all requests as soon as possible—even on our off hours. We look forward to your feedback, bug reports, and PRs. Even if your feedback is simply a sign of your support and encouragement, or to help us promote Electrode.

We are committed to continuing our efforts to improve open source projects and most importantly, to continue improving Electrode so that it works better for everyone.

Thank you!

## License

©️ 2018 WalmartLabs

Licensed under the [Apache License, Version 2.0].

[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[electrode main repo]: https://github.com/electrode-io/electrode
[material-ui]: http://www.material-ui.com
[lerna]: https://lernajs.io/
[electrode-archetype-react-app]: https://github.com/electrode-io/electrode/tree/master/packages/electrode-archetype-react-app
[electrode-archetype-react-app-dev]: https://github.com/electrode-io/electrode/tree/master/packages/electrode-archetype-react-app-dev
[electrode-archetype-react-component]: https://github.com/electrode-io/electrode/tree/master/packages/electrode-archetype-react-component
[generator-electrode]: https://github.com/electrode-io/electrode/tree/master/packages/generator-electrode
[travis-image]: https://travis-ci.org/electrode-io/electrode.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/electrode
[daviddm-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg
[daviddm-url]: https://david-dm.org/electrode-io/electrode?type=dev
[contributing guide]: https://github.com/electrode-io/electrode/blob/master/CONTRIBUTING.md
[submitting a pr]: https://github.com/electrode-io/electrode/pulls
[reporting an issue]: https://github.com/electrode-io/electrode/issues
[what is electrode]: /overview/what-is-electrode.md
[getting started with electrode]: https://docs.electrode.io/chapter1/quick-start/start-with-app.html
[hello-electrode]: images/hello-electrode.png
