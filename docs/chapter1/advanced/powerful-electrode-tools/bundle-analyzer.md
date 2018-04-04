# Bundle Analyzer

You can install a [webpack](https://webpack.github.io/) bundle analyzer that gives you a detail list of all the files that went into your deduped and minified bundle JS file.

## Installation

The Bundle Analyzer lives on [npm](https://www.npmjs.com/package/electrode-bundle-), so if you haven't already, make sure you have [node](http://nodejs.org/) installed on your machine first.

You can easily install the Bundle Analyzer by issuing the following sudo command.

```
$ sudo npm install -g electrode-bundle-analyzer
```

## Module: [electrode-bundle-analyzer](https://github.com/electrode-io/electrode-bundle-analyzer)

### Install via `npm`

```
$ npm install --save electrode-bundle-analyzer
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode-boilerplate-universal-react-node#electrode-bundle-analyzer)

## Usage

Bundle Analyzer expects a particular set of data for it to work.

Bundle Analyzer looks for the webpack module ID comment that normally looks something like this:

```
/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {
```

You can find more information about it in the Bundle Analyzer [Readme](https://github.com/electrode-io/electrode-bundle-analyzer#generating-the-necessary-data) file.

## Command-Line Interface

```
Usage: analyze-bundle --bundle [bundle.js] --stats [stats.json] --dir
[output_dir] --rewrite

Options:
  -b, --bundle   JS bundle file from webpack                          [required]
  -s, --stats    stats JSON file from webpack[default: "dist/server/stats.json"]
  -r, --rewrite  rewrite the bundle file with module ID comments removed
  -d, --dir      directory to write the analyze results       [default: ".etmp"]
  -h, --help     Show help                                             [boolean]
```

When you install Bundle Analyzer globally, the  `analyze-bundle` command-line tool is available as the quickest means of checking out your bundle.

If you don't specify an output directory, a default directory named `.etmp` will be created and a `.gitignore` file is also added in the directory to avoid Git picking it up.

The following two files will be written to the output directory:

* `bundle.analyze.json`
* `bundle.analyze.tsv`

The `tsv` file is a Tab Separated Values text file that you can easily import into a spreadsheet for viewing.

For example:

```
Module ID       Full Path       Identity Path   Size (bytes)
0       ./client/app.jsx        ./client/app.jsx  328
1       ./~/react/react.js      ~/react/react.js        46
2       ./~/react/lib/React.js  ~/react/lib/React.js    477
3       ./~/object-assign/index.js      ~/object-assign/index.js        984
4       ./~/react/lib/ReactChildren.js  ~/react/lib/ReactChildren.js    1344
```

You can view an example [`bundle.analyze.tsv`](https://docs.google.com/spreadsheets/d/1IomT2fYCKEwVY0CO-0jImc7CBj_uAmgy70Egsm4CnVE/edit?usp=sharing&rm=minimal) output file using the [Electrode Boilerplate](https://github.com/electrode-io/electrode/tree/d4142ee0c938cbf973a429ee8467052aa4e1c9be/samples/universal-react-node#electrode-bundle-analyzer) code.
