---
id: getting-started
title: Getting started
---

## Web Applications with node.js and React

Electrode was developed to make node.js and React.js a primary tech choice for developing applications at Walmart. It has been powering the <http://www.walmart.com> eCommerce website since 2017.

Electrode Web is a rapid application development framework; a full stack, end-to-end platform for developing, deploying, and maintaining JavaScript applications at Walmart.

:::important
**Do you have 5 minutes?** That is how long it takes to scaffold your first app.

Try it now!
:::

### Quick start

#### Development on your local machine

To generate and deploy your Electrode app and Electrode components, install the following (if you have not already):

1. Install the [node.js] version 12.x.x or later

   - We recommend a tool such as [nvm] for managing node.js installations.
   - If you are on Windows, then [universal nvm] is recommended.

2. To build an app scaffold, run the following command in your console/terminal:

```bash
npx @xarc/create-app my-app
```

3. Wait for this to complete. The console will display the following with some instructions:

```bash
Created react/node webapp in directory 'my-app'
```

4. Follow the instructions outlined in the console.
5. When complete, open your browser to [localhost:3000](http://localhost:3000)
6. To stop the DEV server, press `Q`

Your new electrode app will appear as shown below.

![Hello from Electrode](/img/electrode-first-run.png)

:::important Important: Existing electrode users
If you are an existing electrode user, please take note of the following sections
:::

### `@xarc` npm Scope

New Electrode X packages are published under the npm scope `@xarc`, where arc is inspired by <www.twi-global.com/technical-knowledge/faqs/what-is-arc-welding>

### Essentials

| Package       | Description                                              |
| ------------- | -------------------------------------------------------- |
| @xarc/app     | node.js runtime support; should be in `dependencies`     |
| @xarc/app-dev | development only support; should be in `devDependencies` |
| @xarc/react   | react.js support                                         |

#### Optionals

| Package            | Description                           |
| ------------------ | ------------------------------------- |
| @xarc/react-redux  | react redux support                   |
| @xarc/react-query  | react query support                   |
| @xarc/react-router | react router support                  |
| @xarc/create-app   | create a starter app for you with npx |
| @xarc/opt-postcss  | Extra style support                   |
| @xarc/opt-stylus   | stylus support                        |
| @xarc/opt-sass     | sass support                          |
| @xarc/opt-less     | less support                          |
| @xarc/opt-jest     | jest support                          |
| @xarc/opt-karma    | karma support                         |
| @xarc/opt-mocha    | mocha support                         |

## License

Copyright (c) 2016-present, Walmart

Licensed under the [Apache License, Version 2.0]

[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0
[nvm]: https://github.com/nvm-sh/nvm#install-script
[node.js]: https://nodejs.org/en/download
[universal nvm]: https://www.npmjs.com/package/@jchip/nvm
