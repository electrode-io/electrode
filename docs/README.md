<p align="center">
<a><img src="https://raw.githubusercontent.com/electrode-io/electrode/cc4ea3e1851cee3333ecca08fdbf5534f51b1ae7/samples/universal-react-node/client/images/logo-192x192.png" alt="Electrode Logo"></a>
<br>
<b>Electrode</b>
</p>

[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/electrode-io/electrode)
[![Build Status][travis-image]][travis-url] [![devDependencies Status][daviddm-image]][daviddm-url]

### Building large scale universal React Web Applications

> Built at @WalmartLabs powering the <http://www.walmart.com> eCommerce site, Electrode is a platform for building small to large scale universal ReactJS/NodeJS web applications with a standardized structure, best practices, and modern technologies baked in. Electrode focuses on performance, component reusability, and simple deployment to multiple cloud providers—so you can focus on what makes your app unique.

# Getting Started

-   [Getting Started with Electrode](https://electrode.gitbooks.io/electrode/content/chapter1/quick-start/get-started.html)

-   Visit our site at <http://www.electrode.io>.

-   See [What is Electrode] for more details on features and technologies supported.

## Contributing

See our [contributing guide] for instructions on [submitting a PR] or [reporting an issue].

# Packages

The [Electrode main repo] uses [Lerna] to manage multiple related packages that are part of the Electrode Core.

## App Archetype

[electrode-archetype-react-app] is a pair of complementing NPM modules that provides for common patterns across all app projects so that each app project can standardize on common development behavior and patterns. Its essentially pre-made patterns for build scripts.  It also requires a companion module [electrode-archetype-react-app-dev] that's meant for your app's `devDependencies`.

## Component Archetype

[electrode-archetype-react-component] is a pair of comlementing NPM modules that makes developing reusable React components as easy as possible with all the latest tools and technologies configured for you.

## Yeoman Generator

The Yeoman [generator-electrode] NPM module allows you to quickly create an Universal React App or Component with support from the archetypes, and server in Node with Hapi or Express.

You can learn how to use them [here](https://docs.electrode.io/chapter1/quick-start/get-started.html).

# Sample Applications

Some sample applications can be found under the [`samples`](https://github.com/electrode-io/electrode/tree/master/samples) directory.

# Other Standalone Modules

In addition to the archetypes and the generators, Electrode platform also comes with a fleet of battle tested enterprise grade modules that're designed to make up a solution for developing and deploying NodeJS applications to power sites like <http://www.walmart.com>:

-   [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
-   [Electrode Electrify](https://github.com/electrode-io/electrify)
-   [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
-   [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
-   [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
-   [Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render)
-   [Electrode Bundle Analyzer](https://github.com/electrode-io/electrode-bundle-analyzer)

## Boilerplate Universal React Node

Under [`samples/universal-react-node`](https://github.com/electrode-io/electrode/tree/master/samples/universal-react-node) is a sample Electrode app that was created with the Electrode generator and consumes the Electrode App archetype modules.  We've added other demos and features to it to serve as examples.  It demonstrates usage with the standalone NodeJS modules listed above.

See its [README](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/README.md) for more details.

## Sample Universal React Node with [material-ui]

Under [`samples/universal-material-ui`](https://github.com/electrode-io/electrode/tree/master/samples/universal-material-ui) is a sample Electrode app that uses the [material-ui] React components.

See its [README](https://github.com/electrode-io/electrode/blob/master/samples/universal-material-ui/README.md) for more details.

# More Samples

We have more separate Electrode Sample Apps at <https://github.com/electrode-samples> that you can use as references.

# Support and Acknowledgement

We'd like to thank our employer @WalmartLabs because we can work on the development of Electrode platform and associated modules as Open Sourced Software for the needs of our internal teams and projects.  We love the public community and the support we get, and we address your requests as much as we could, even on our off hours.  We are always excited to get feedbacks, bug reports, and PRs.  Even if you just show us your support and encouragements, or help us promote Electrode, and we love to make Electrode work better for everyone.  Thank you.

# License

Copyright 2016 WalmartLabs

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

[what is electrode]: https://docs.electrode.io/overview/what-is-electrode.html
