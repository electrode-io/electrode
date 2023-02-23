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

### Useful Commands

`rush install` - Installs package dependencies for all
packages, based on the shrinkwrap file that is created/updated using "rush update". 
It is recommended to use this if you do not want to make changes to *lock files. CI jobs use this command for the same reason.

`rush update` - Installs the dependencies described in the package.
json files, and updates the shrinkwrap file as needed. 

`rush build` - Run this command after install step to perform build on all packages. These are incremental builds. In other words, it only builds projects whose source files have changed since the last successful build.

`rush test` - Runs test on all packages. A `test` script is required in package.json for all packages.

`rushx <command>` - Executes `scripts` mentioned in individual packages. This command should be ran within a package directory.

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

Since we use commitlint, keep the changelog clear, please format all your commit message with the following guideline:

- Only include `feat|bug|chore` if it's applicable.
- Please format your PR's title with the same format.

> **_Please do everything you can to keep commits for a PR to a single package in `packages`._**

A sample commit and PR message should look like:

```text
feat: implement support for react-query
```

Read more about commitlint - https://github.com/conventional-changelog/commitlint/#what-is-commitlint

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

## Process to publish packages

### Developer flow
- Developers commit all code changes.
- Run `rush change --target-branch <targetBranchWhichIsUsualyMaster>` 
  - This generates *change files*
- Commit *change files*
- Push the PR and get it reviewd and merged

### Publish flow
When its time to publish packages (as per release schedule)
- Pull latest from `master` branch
- Run `rush publish —apply`
    - This is [dry run mode]. 
    - Changes are added to the changelog files for each package.
    - The `package.json` files are updated with new version numbers and written to disk. Nothing is actually committed to the source repository or published at this point
    - Review the CHANGELOG.md updates at this point
- Run `rush publish --apply --target-branch main --publish --add-commit-details`
    - This will create a branch with `publish-*`
    - Publish the packages
    - And finally checkout back to *target branch* (`master` in this case)
- Checkout to publish branch that got created above 
- Push the changes as PR to get the `CHANGELOG.md` updated to `master`.

Read more about [rush publishing] and [best practices]


[prettier]: https://www.npmjs.com/package/prettier

[xclap-cli]: https://www.npmjs.com/package/xclap-cli
[docusaurus]: https://docusaurus.io/
[rushjs]: https://rushjs.io/pages/intro/welcome/
[rushjs with pnpm]: https://rushjs.io/pages/maintainer/package_managers/
[best practices]:  https://rushjs.io/pages/best_practices/change_logs/#recommended-practices
[pnpm]: https://pnpm.io/
[rush publishing]: https://rushjs.io/pages/maintainer/publishing/#dry-run-mode
