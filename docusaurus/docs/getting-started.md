---
id: getting-started
title: Getting Started
---

## Web Applications with node.js and React

Welcome! This is the documentation for building web application using Electrode X for node.js and React.

In this quick start guide, we will show you how to create and run your first app.

### Requirements

1. Install the [node.js] version 12.x.x or later

   - We recommend a tool such as [nvm] for managing node.js installations.
   - If you are on Windows, then [universal nvm] is recommended.

### Creating Your First App

> Note: our packages are published under the npm scope `@xarc`

1. To create your first Electrode X app:

```bash
npx @xarc/create-app my-app
```

2. Wait for this to complete. The console will display the following with some instructions:

```
Created react/node webapp in directory 'my-app'. To start development, please run:
```

3. Follow the instructions outlined in the console.
4. When complete, open your browser to [http://localhost:3000](http://localhost:3000)
5. To stop the DEV server, press `Q`

Your new electrode app will appear as shown below.

![Hello from Electrode](/img/getting-started/first-app.png)

### The Packages

#### Essentials

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
[react]: https://reactjs.org/
