# Electrode Explorer

> An [electrode application](https://github.com/electrode-io/electrode-explorer) that allows you to view all the components in your organization, play with the components, read the component docs, view the different versions of the component, and more - All in your browser.
>
> [View The Live Demo](https://electrode-explorer.herokuapp.com/)

![](http://www.electrode.io/img/electrode-explorer.png)

## Source

[View source code on GitHub](https://github.com/electrode-io/electrode-explorer)

## Prerequisites

-   node: ">=4.2.0"
-   npm: ">=3.0.0"
-   Github access token

## Overview

This is a central place where you can view the following resources.

-   Demos of all the components under the organizations you specified
-   Documentation of your components
-   Dependencies your components have (dependencies)
-   Additional components and applications that depend on your components (usages)

There are two ways the components can update dynamically:

1.  Add GitHub hooks to send POST requests to `/api/update/{org}/{repoName}` when a new tag is created
2.  Enable `./server/poll` plugin to set up cron job that sends the POST requests every day

To see updates in near real time, use Method #1.

After the server receives the POST request, it  fetches the `package.json` file under `{yourGithubUrl}/{org}/{repoName}`, and updates [data/orgs.json](https://github.com/electrode-io/electrode-explorer/blob/master/data/orgs.json) and `data/{org}/{repoName}.json`files. If there is a newer version, it will try to download the new component using npm ([scripts/install-module.sh](https://github.com/electrode-io/electrode-explorer/blob/master/scripts/install-module.sh)) after a waiting period, babel transpile, and webpack the demo module ([scripts/post-install-module.sh](https://github.com/electrode-io/electrode-explorer/blob/master/scripts/post-install-module.sh)).

To make the server update immediately or force an update, add a URL parameter to the POST request,`/api/update/{org}/{repoName}?updateNow=1`.

This post processing script works well with all electrode components. These are components that use our [archetype](https://github.com/electrode-io/electrode-archetype-react-component). If you have non-electrode components, you can modify your [scripts/post-install-module.sh](https://github.com/electrode-io/electrode-explorer/blob/master/scripts/post-install-module.sh) to babel transpile and bundle your demo files.

## Configuration Example

```js
// config/default.json
{
  "plugins": {
    "./server/poll": {
      "options": {
        "enable": true
      }
    }
  },

  "githubApi": {
    "version": "3.0.0",
    "pathPrefix": "/api/v3",
    "protocol": "https",
    "host": "github.com"
  },

  "ORGS": [
    // org/user names under which components will be included in the explorer
    // for example, put ["xxx", "yyy"] to include every repo under github.com/xxx and github.com/yyy
  ],

  "REPOS_USAGE_INCLUDE": [
    // consumers need to contain one of these substrings to be included in usages
    // for example, put ["react"] so consumers named /*react*/ will be included in usages
  ],

  "REPOS_USAGE_EXCLUDE": [
    // consumers containing any of these substrings won't be included in usages
    // for example, put ["training"] so consumers named /*training*/ will be excluded in usages
  ],

  "MODULE_PREFIXES_INCLUDE": [
    // only module names beginning with one of these strings will be included in dependencies
    // for example, put ["react"] so only modules with name starting with "react" will be included in dependencies
  ],

  "NPM_WAITING_TIME": 300000, // wait for 5 minutes before `npm install`

  "GHACCESS_TOKEN_NAME": "GHACCESS_TOKEN" // github token variable name, your token would be accessible via `process.env["GHACCESS_TOKEN"]`
}
```

## Start the server

1. Install the dependencies.

```bash
$ npm install
```

2. Export the Github access token or set it as an environment variable.

```bash
export GHACCESS_TOKEN=YOUR_GITHUB_TOKEN
```

For development mode, use the following command:

```bash
$ clap dev
```

Or you can enter the following command:

```bash
GHACCESS_TOKEN=YOUR_GITHUB_TOKEN clap dev
```

For production mode, use the following commands:

```bash
$ clap build
```

and

```bash
NODE_ENV=production node .
```

Or you can enter the following command:

```bash
GHACCESS_TOKEN=YOUR_GITHUB_TOKEN NODE_ENV=production node .
```

## Deploy

Since this is an Electrode application, it can be deployed the same way as any other Electrode app. You can use [Heroku](/chapter1/further-develop-app/deploy-your-app.md) by following the steps in our Quick Start or use the [More Deployments](/chapter1/intermediate/more-deployments.md) as a resource.

\*Just remember to set your GitHub token as an environment variable.

## Learn more

Want to learn more? Check out our [wiki](https://github.com/electrode-io/electrode-explorer/wiki) page!
