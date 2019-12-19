# Electrify

[Electrify](https://github.com/electrode-io/electrify) is an Electrode Javascript bundle viewer.  

Electrify is a stunning visual tool for analyzing the module tree of [electrode-io + webpack](https://github.com/webpack/docs/wiki/node.js-api#stats) project bundles. It's especially handy for catching large and/or duplicate modules which might be either bloating your bundle or slowing down the build process.

![](https://cloud.githubusercontent.com/assets/360041/18318796/ea0ddae4-74d7-11e6-89cb-08e02e4b1683.gif)

## Installation

Electrify lives on [npm](https://www.npmjs.com/package/electrode-electrify), so if you haven't already, make sure you have [node](http://nodejs.org/) installed on your machine first.

You can easily install Electrify by issuing the following sudo command.

```
$ sudo npm install -g electrode-electrify
```

## Module: [electrode-electrify](https://github.com/electrode-io/electrode-electrify)

### Install via `npm`

```
$ npm install --save electrode-electrify
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode/tree/master/samples/universal-react-node#electrode-electrify)

## Usage

## Command-Line Interface

```
electrify [stats-bundle(s)...] {options}

Options:
  -h, --help    Displays these instructions.
  -O, --open    Opens viewer in a new browser window automatically
  -m, --mode    the default file scale mode to display: should be
                either "count" or "size". Default: size
```

When you install Electrify globally, the `electrify` command-line tool is available and can be used to quickly check out your bundle. As of `electrode-electrify@v1.0.0`, the tool takes any [webpack-stats](https://github.com/webpack/docs/wiki/node.js-api#stats) object [example](https://github.com/webpack/analyse/blob/master/app/pages/upload/example.json) as input and creates a standalone HTML page as output.

You can easily chain the stats file into another command, or use the `--open` flag to open Electrify in your browser automatically. For example:

```
$ electrify build/stats.json --open
```

## Palettes

You can switch between multiple color palettes, most of which serve to highlight specific features of your bundle.

### Structure Highlights

![](http://i.imgur.com/Ajp20Jxm.png)

Structure highlights show `node_modules` directories as green and`lib` directories as orange. This makes it easy to scan for "kitchen sink" modules or modules with lots of dependencies.

### File Types

![](http://i.imgur.com/oY5euGAm.png)

File type highlights show each file type \(e.g.`.js`,`.css`, etc.\) in a different color. This is helpful for identifying code generated from a transform that's bloating your bundle more than expected.

### Original and Pastel Highlights

![](http://i.imgur.com/ajAoqePm.png)

The original or pastel highlights simply provide a means for easier reading and viewing on screen.

### Other useful bundle and stats generators

The following resources and tools can be used.

* [disc-browserify](https://github.com/hughsk/disc) \(Helpful for analyzing **browserify **projects and a huge inspiration for electrify, used _disc_
  extensively in my past **browserify **based projects\)
* [webpack-bundle-size-analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)
* [webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer)
* [webpack-chart](https://github.com/alexkuz/webpack-chart)
* [stats-webpack-plugin](https://github.com/unindented/stats-webpack-plugin)
