# Electrode

# What is Electrode?

Electrode is a platform for building universal React/Node.js applications with a standardized structure, best practices, and modern technologies baked in. Electrode focuses on performance, component reusability, and simple deployment to multiple cloud providers—so you can focus on what makes your app unique.

Read the [Announcement Blog] Post.

# Go to Electrode Site

http://www.electrode.io

# Docs

http://www.electrode.io/docs/what_is_electrode.html

## Report an issue or help out with the docs

https://github.com/electrode-io/electrode-io.github.io/issues

# Report a bug or request a feature

https://github.com/electrode-io/electrode/issues

# Packages

This repo uses [Lerna] to manage multiple related packages that are part of the Electrode Core.

## App Archetype

This "app archetype" provides for common patterns across all app projects so that each app project can standardize on common development behavior and patterns. Its essentially pre-made patterns for build scripts.

## Yoeman Generator

The Yoeman app generator allow you to quickly create an Universal React App with support from the app archetype, and server in Node with Hapi or Express.

# Sample Applications

Some sample applications can be found under the `samples` directory.

## Boilerplate Universal React Node

Under `samples/universal-react-node`, this is a sample Electrode app that was created with the Electrode generator and consumes the Electrode App archetype modules.  We've added other demos and features to it to serve as examples.  It demonstrates usage with the following Electrode modules:

See its [README](samples/universal-react-node/README.md) for more details.
  
  - [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
  - [Electrode Electrify](https://github.com/electrode-io/electrify)
  - [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
  - [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
  - [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
  - [Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render)
  - [Electrode Bundle Analyzer](https://github.com/electrode-io/electrode-bundle-analyzer)

## Sample Universal React Node with [material-ui]

Under `samples/universal-material-ui`, this is a sample Electrode app that uses the [material-ui] React components.

See its [README](samples/universal-material-ui/README.md) for more details.


Built with :heart: by [Team Electrode] @WalmartLabs.

[Team Electrode]: https://github.com/orgs/electrode-io/people
[Announcement Blog]: https://medium.com/walmartlabs/introducing-electrode-an-open-source-release-from-walmartlabs-14b836135319#.pwbddxg1z
[material-ui]: http://www.material-ui.com
[Lerna]: https://lernajs.io/

