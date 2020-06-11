---
id: getting-started
title: Getting started
---

## Building large scale universal React Web Applications

Electrode was developed as the engine that has been powering the <http://www.walmart.com> eCommerce website since 2016.

Electrode Web is a rapid application development framework; a full stack, end-to-end platform for developing, deploying, and maintaining JavaScript applications at Walmart.

:::important
**Do you have 5 minutes?** That is how long it takes to scaffold your first app.

Try it now!
:::

### Quick start

#### Development on your local machine

To generate and deploy your Electrode app and Electrode components, install the following (if you have not already): 

1. Install the [NodeJS package installer] version 10.x.x or later
   + Electrode uses `async/await` directly so Node 10 or later is required.
   + We recommend a tool such as [nvm] for managing NodeJS installations.

2. Enter the following commands

```bash
npm init @xarc/app
npm install
npm run dev
```

3. Open your browser to <http://localhost:3000> to view the application running:

![Hello from Electrode](../static/img/electrode-first-run.png)

:::important Important: Existing electrode users
If you are an existing electrode user, please take note of the following sections
:::

### @xarc npm Scope

With `electrode-archetype` and `electrode-ignite` removed from electrode, a leaner application framework has emerged with only the required packages and default settings. All other configs are optional; the developer will be given complete control to choose exactly what add-ons they want, ensuring the electrode X codebase remains lean and grokable. All essentials are published as new modules built ground up under the "@xarc npm scope", where arc is inspired by <www.twi-global.com/technical-knowledge/faqs/what-is-arc-welding>

:::warning
All 'electrode-archetype-opt-_______' packages have been deprecated and renamed to '@xarc/opt-_______'
:::

Most opt packages are no longer necessary because they could be part of the packages broken up above, ie: opt-jest would all go into @xarc/config-jest
Also, @xarc/app-dev would only include minimum required @xarc/config-* packages like babel, webpack, and dev-admin, everything else is up to the app to include in its devDependencies.

### Essentials

| Package               | Description                               |
| ----------------------| ----------------------------------------- |
| @xarc/app             | JS server runtime support for electrode X |
| @xarc/app             | dev support for electrode X               |
| @xarc/dev-admin       | dev admin server for webpack, etc.        |
| @xarc/config-webpack  | default webpack configs                   |
| @xarc/config-babel    | default babel configs

#### Optionals

| Package               |
| ----------------------|
|  @xarc/config-jest    |
|  @xarc/config-karma   |
|  @xarc/config-mocha   |
|  @xarc/ui-config      |
|  @xarc/ui-logger      |
|  @xarc/dll            |
|  @xarc/dll-dev        |
|  @xarc/config-eslint  |
|  @xarc/create-app     |

## License

Copyright (c) 2016-present, Walmart

Licensed under the [Apache License, Version 2.0]

[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[nvm]: https://github.com/nvm-sh/nvm#install-script
[NodeJS package installer]: https://nodejs.org/en/download