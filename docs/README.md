<p align="center">
<a><img src="https://raw.githubusercontent.com/electrode-io/electrode/cc4ea3e1851cee3333ecca08fdbf5534f51b1ae7/samples/universal-react-node/client/images/logo-192x192.png" alt="Electrode Logo"></a>
<br>
<b>Electrode</b>
</p>

[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/electrode-io/electrode)
[![Build Status][travis-image]][travis-url] [![devDependencies Status][daviddm-image]][daviddm-url]

### A Platform for building Universal React/Node.js applications

> Built at @WalmartLabs powering the walmart.com eCommerce site, Electrode is a platform for building universal React/Node.js applications with a standardized structure, best practices, and modern technologies baked in. Electrode focuses on performance, component reusability, and simple deployment to multiple cloud providers—so you can focus on what makes your app unique.

Read the [Announcement Blog] Post.

## Report a bug or request a feature

https://github.com/electrode-io/electrode/issues

## Report an issue or help out with the docs

https://github.com/electrode-io/electrode-io.github.io/issues


# Packages

This repo uses [Lerna] to manage multiple related packages that are part of the Electrode Core.

## App Archetype

[electrode-archetype-react-app] is a NPM module that provides for common patterns across all app projects so that each app project can standardize on common development behavior and patterns. Its essentially pre-made patterns for build scripts.  It also requires a companion module [electrode-archetype-react-app-dev] that's meant for your app's `devDependencies`.

## Yeoman Generator

The Yeoman [generator-electrode] NPM module allows you to quickly create an Universal React App with support from the app archetype, and server in Node with Hapi or Express.

# Sample Applications

Some sample applications can be found under the [`samples`](https://github.com/electrode-io/electrode/tree/master/samples) directory.

## Boilerplate Universal React Node

Under [`samples/universal-react-node`](samples/universal-react-node) is a sample Electrode app that was created with the Electrode generator and consumes the Electrode App archetype modules.  We've added other demos and features to it to serve as examples.  It demonstrates usage with the following Electrode modules:

  - [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
  - [Electrode Electrify](https://github.com/electrode-io/electrify)
  - [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
  - [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
  - [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
  - [Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render)
  - [Electrode Bundle Analyzer](https://github.com/electrode-io/electrode-bundle-analyzer)

See its [README](samples/universal-react-node/README.md) for more details.
  
## Sample Universal React Node with [material-ui]

Under [`samples/universal-material-ui`](samples/universal-material-ui) is a sample Electrode app that uses the [material-ui] React components.

See its [README](samples/universal-material-ui/README.md) for more details.

# More Samples

We have more separate Electrode Sample Apps at https://github.com/electrode-samples that you can use as references.

Built with ♡ by [Team Electrode] @WalmartLabs.

[Team Electrode]: https://github.com/orgs/electrode-io/people
[Announcement Blog]: https://medium.com/walmartlabs/introducing-electrode-an-open-source-release-from-walmartlabs-14b836135319#.pwbddxg1z
[material-ui]: http://www.material-ui.com
[Lerna]: https://lernajs.io/
[electrode-archetype-react-app]: packages/electrode-archetype-react-app
[electrode-archetype-react-app-dev]: packages/electrode-archetype-react-app-dev
[generator-electrode]: packages/generator-electrode
[travis-image]: https://travis-ci.org/electrode-io/electrode.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/electrode
[daviddm-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg
[daviddm-url]: https://david-dm.org/electrode-io/electrode?type=dev
