# <%= projectName %>

**COMPONENT DESCRIPTION GOES HERE**

## Demo & Examples

Live demo: [<%= ghUser %>.github.io/<%= packageName %>](http://<%= ghUser %>.github.io/<%= packageName %>/)

To develop and see this component in action, please check the [README](../../README.md) at the top level of this repo for instructions.

If you want to run test for this component locally, please run:

```bash
$ clap check
```

## Installation

The easiest way to use <%= packageName %> is to install it from NPM and include it in your own React build process.

```bash
$ npm install <%= packageName %> --save
```

This component is designed to work with React application built with [Electrode]. 

## Usage

**EXPLAIN USAGE HERE**

```js
var <%= componentName %> = require('<%= packageName %>');

<<%= componentName %>>Example</<%= componentName %>>
```

### Properties

-   **DOCUMENT PROPERTIES HERE**

### Notes

**ADDITIONAL USAGE NOTES**

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

## License

**PUT LICENSE HERE**

Copyright (c) <%= currentYear %> <%= developerName %>.


[Electrode]: https://docs.electrode.io/overview/what-is-electrode.html
