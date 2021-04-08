# Contributing

PRs and issues are always welcome! We appreciate your interest in Electrode and offer to help.

There are [few guidelines](#contributing-guidelines) that we request contributors to follow.

## Getting Started

This repo uses a custom [Lerna] mono-repo setup with [fyn] as package manager to install and local linking node modules.

### Setup

This is a mono-repo and we use [fyn] to install and local linking packages when doing development. You can use `npm run`, but never use `npm install` in our repo else things will break. Below, `fun` is an alias for `npm run` that [fyn] provides.

Install some CLI tools globally for convenience:

```bash
$ npm install -g xclap-cli @xarc/run-cli fyn
```

Fork and clone the repo at <https://github.com/electrode-io/electrode.git> and bootstrap all the packages.

```bash
$ git clone https://github.com/<your-github-id>/electrode.git
$ cd electrode
$ fyn # install node_modules
$ fun bootstrap # run npm script bootstrap
```

### Try a sample

Now you can go to the `samples` folder and try the `create-app-demo` sample app, develop and test your changes over there. This is the exact same app that our create-app package generates.

```bash
$ cd samples/create-app-demo
$ fyn
$ fun dev
```

You should see some output in the console with `[DEV ADMIN]`. You can press `M` for the dev menu.

And when you open the browser at `http://localhost:3000`, you should see the demo web page.

### **Useful** Notes

- You should bootstrap the entire repo at the top dir at least once with `fun bootstrap`
- After you make changes to any module under packages, if you want to test them in one of the samples, just run [fyn] in that sample and it will ensure all changed local packages are properly rebuilt and installed.

#### Test with `@xarc/create-app`

You can quickly use the `xarc-create-app` package to create an app for testing.

```bash
$ cd samples
$ node ../packages/xarc-create-app/src my-test-app
$ cd my-test-app
$ fyn
$ fun dev
```

## Contributing Guidelines

### Submitting Pull Request

We appreciate any help you can offer. Please follow the guidelines on styling and commit messages here.

#### Styling

We are using [prettier] to format all our code with only one custom setting: `--print-width 100`. We are switching to version 2.

> If you are making changes to a file that has not been updated yet, please commit the format first before making your changes.

#### PR and Commit messages

Since we use independent lerna mode, to help keep the changelog clear, please format all your commit message with the following guideline:

`[<semver>][feat|bug|chore] <message>`

- `<semver>` can be:
  - `major` - `maj` or `major`
  - `minor` - `min` or `minor`
  - `patch` - `pat` or `patch`
- Only include `[feat|bug|chore]` if it's applicable.
- Please format your PR's title with the same format.

> **_Please do everything you can to keep commits for a PR to a single package in `packages`._**

A sample commit and PR message should look like:

```text
[minor][feat] implement support for react-query
```

### Filing Issues

If you need help or found an issue, please [submit a github issue](https://github.com/electrode-io/electrode/issues/new/choose).

## Updating Docs

Our docs use [docusaurus]. The source is in the directory `/docusaurus`. It's generated to `/docs` and published as github docs at <https://www.electrode.io/electrode>.

To edit the docs:

```bash
$ cd docusaurus
$ fyn
$ fun start
```

And open your browser to `http://localhost:4000` to view the docs locally.

## Releasing

The versioning of modules in the this repo are all automatically controlled by the commit message.

It's important that commits are isolated for the package they affected only and contains the version tags `[major]`, `[minor]`, or `[patch]`. `[patch]` is the default if tag is not found in commit message.

To release, follow these steps:

1. Use `xrun update-changelog` to detect packages that changed and their version bumps.
1. Verify and check the file `CHANGELOG.md`, add a summary of key changes under the date.
1. Amend the commit for `CHANGELOG.md` with summary changes.
1. Run `npx fynpo prepare --no-tag` to prepare packages for release.
1. Run `git tag -a rel-v<#>-<date>` where `<#>` is the major archetype version, and `<date>` as `YYYYMMDD`. (ie: `rel-v9-20210301`)
1. Publish the packages that has version bumps.
1. Push the release commits.

[prettier]: https://www.npmjs.com/package/prettier
[lerna]: https://lernajs.io/
[xclap-cli]: https://www.npmjs.com/package/xclap-cli
[fyn]: https://www.npmjs.com/package/fyn
[docusaurus]: https://docusaurus.io/
