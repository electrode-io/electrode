# Contributing

PRs and issues are always welcome! We appreciate your interest in Electrode and offer to help.

There are [few guidelines](#contributing-guidelines) that we request contributors to follow so that we can keep things well maintained.

## Getting Started

This repo uses [Lerna] as a top level setup and [fyn] to manage Node Modules.

* Install these CLI tools globally: [xclap-cli] and [fyn]

```bash
$ npm install -g xclap-cli fyn
```

* Fork and clone the repo at <https://github.com/electrode-io/electrode.git>

```bash
$ git clone https://github.com/<your-github-id>/electrode.git
$ cd electrode
```

* Quick Test

Run at the top level:

```bash
$ eval `fyn bash`
$ fyn
$ npm run bootstrap
```

* Now you can go to the `samples` folder and try the `universal-react-node` sample app, develop and test your changes over there.

```bash
$ cd samples/universal-react-node
$ fyn
$ clap dev
```

After running above, you should see a similar text as `Hapi.js server running at http://localhost:3000` in command line.

And when you open the browser at `http://localhost:3000`, you should see a large Electrode icon with a few demonstration components.

You can also run in `hot` mode. However, `hot` mode is still experimental and there may be issues.

```bash
$ clap hot
```

## Contributing Guidelines

### Submitting Pull Request

We love PRs and appreciate any help you can offer. Please follow the guidelines on styling and commit messages here.

#### Styling

We've now switched to use [prettier] to format all our code.

Our [prettier] settings are: `--print-width 100`

> If you are making changes to a file that has not been updated yet, please commit the format first before making your changes.

#### PR and Commit messages

Since we use independent lerna mode, to help keep the changelog clear, please format all your commit message with the following guideline:

`[<semver>][feat|bug|chore] <message>`

* `<semver>` can be:
  * `major` - `maj` or `major`
  * `minor` - `min` or `minor`
  * `patch` - `pat` or `patch`
* Only include `[feat|bug|chore]` if it's applicable.
* Please format your PR's title with the same format.

> **_Please do everything you can to keep commits for a PR to a single package in `packages`._**

A sample commit and PR message should look like:

```text
[minor][feat] implement SSR support for Inferno
```

> Note: Branching is recommended on Publish commits only so it's possible to rely on lerna to publish from that branch.

### Filing Issues

We love to hear about your experience using Electrode and bug reports. Electrode has many features and it's hard for us to test everything under all scenarios and setup, so your help is very important to us.

When you submit a bug report, please include the following information:

* NodeJS/npm versions by doing `nodev -v` and `npm -v`
* Your OS and version
* Electrode package versions
* Any errors output
* If possible, sample code and steps on how to reproduce the bug

## Updating Docs

This repo has a [gitbook] documentation under `docs`. To review the docs as a gitbook locally:

* Install [gitbook-cli] and the plugins for our docs

```bash
$ npm install gitbook-cli -g
$ gitbook install
```

* Serve the book locally

```bash
$ gitbook serve --no-watch --no-live
```

And open your browser to `http://localhost:4000` to view the docs.

Here is the documentation on a [gitbook] structure: <https://toolchain.gitbook.com/structure.html>

> Without the `--no-watch --no-live` options it becomes unusably slow on my machine.

[gitbook-cli]: https://www.npmjs.com/package/gitbook-cli
[prettier]: https://www.npmjs.com/package/prettier
[lerna]: https://lernajs.io/
[gitbook]: https://www.gitbook.com
[xclap-cli]: https://www.npmjs.com/package/xclap-cli
[fyn]: https://www.npmjs.com/package/fyn
