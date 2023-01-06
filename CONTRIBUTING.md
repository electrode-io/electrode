# Contributing

PRs and issues are always welcome! We appreciate your interest in Electrode and offer to help.

There are [few guidelines](#contributing-guidelines) that we request contributors to follow.

## Getting Started

This is a mono-repo and we use [rushjs] for mono-repo management. Also, we use [pnpm] as the package manager along with [rushjs].
To read more about [rushjs with pnpm]

### Setup

Fork and clone the repo at <https://github.com/electrode-io/electrode.git> and bootstrap all the packages.

```bash
$ git clone https://github.com/<your-github-id>/electrode.git
$ cd electrode
$ npm install -g @microsoft/rush # install rush
$ rush install # installs package dependencies for all packages, based on the shrinkwrap file (pnpm-lock) that got created/updated using rush update.
$ rush build # Run build command on all projects whose source files have changed since the last successful build
```

### Try a sample

Now you can go to the `samples` folder and try the `create-app-demo` sample app, develop and test your changes over there. This is the exact same app that our create-app package generates.

```bash
$ cd samples/create-app-demo
$ rushx dev
```

You should see some output in the console with `[DEV ADMIN]`. You can press `M` for the dev menu.

And when you open the browser at `http://localhost:3000`, you should see the demo web page.

### **Useful** Notes

- You should bootstrap the entire repo at the top dir at least once with `rush install`
- After you make changes to any module under packages, if you want to test them in one of the samples, just run `` rushx <command>`` in that sample and it will ensure all changed local packages are properly rebuilt and installed.

#### Test with `@xarc/create-app`

You can quickly use the `xarc-create-app` package to create an app for testing.

```bash
$ cd samples && node ../packages/xarc-create-app/src my-test-app
$ cd ../ && rush update
$ cd samples/my-test-app
$ 
$ rushx dev
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

### To run the docs locally:

```bash
$ cd docusaurus
$ pnpm install
$ pnpm start
```

And open your browser to `http://localhost:4000` to view the docs locally.

### To generate documentations to `/docs`:

```bash
$ cd docusaurus
$ pnpm run deploy
```

## Releasing

- Run `rush change` for any PRs with changes that needs to get released
  This will provide an interactive screen to add Change description. Please provide details here about the changes you are making thorugh this PR
  This will generate a change files in JSON format which are later used to generate changelogs
- Commit the generated change files (JSON).

> NOTE: Rush by default does NOT support conventional commits and developers needs to decide on the version bump (major/minor/patch). 

Read more about [best practices]
### To publish
- https://rushjs.io/pages/maintainer/publishing/#dry-run-mode



[prettier]: https://www.npmjs.com/package/prettier

[xclap-cli]: https://www.npmjs.com/package/xclap-cli
[docusaurus]: https://docusaurus.io/
[rushjs]: https://rushjs.io/pages/intro/welcome/
[rushjs with pnpm]: https://rushjs.io/pages/maintainer/package_managers/
[best practices]:  https://rushjs.io/pages/best_practices/change_logs/#recommended-practices
[pnpm]: https://pnpm.io/
