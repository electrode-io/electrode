---
id: the-application
title: The Application
---

The application generated is setup to use typescript.

While typescript is used to validate your `.ts` code, Electrode X actually uses Babel to transpile your code.

## The Files and Directories

Your app consists of these essential top level directories and files:

| Files and Dirs    | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `package.json`    | node.js/npm package.json                                                   |
| `xrun-tasks.ts`   | The file that loads Electrode X's development tasks for `xrun` task runner |
| `tsconfig.json`   | Typescript config                                                          |
| `babel.config.js` | Babel config                                                               |
| `.browserslistrc` | configuration for [browserslist]                                           |
| `static`          | static web assets                                                          |
| `src`             | Directory for your app's source code                                       |

## The `src` Directory

The `src` directory is where your app's code is. The sample app we created for you contains these files:

```
src
├── app.tsx
├── demo1
│   └── index.tsx
├── demo2
│   ├── index.tsx
│   └── reducers.ts
├── demo3
│   ├── index.tsx
│   └── react-query-fetch.ts
├── home
│   ├── index.tsx
│   ├── message.ts
│   └── static-props.tsx
├── import-assets.d.ts
├── info.ts
├── server
│   ├── config.ts
│   ├── index.ts
│   └── routes.ts
└── styles
    ├── demo1.mod.css
    └── demo1.mod.styl
```

- Everything under `src/server` are source for your app's node.js server.

- There are four SubApps defined in the sample app:

| SubApp name | Location    |
| ----------- | ----------- |
| `Demo1`     | `src/demo1` |
| `Demo2`     | `src/demo2` |
| `Demo3`     | `src/demo3` |
| `home`      | `src/home`  |

## Creating a SubApp

A SubApp is just a React Component that can incorporate extra features Electrode X offer, and will be dynamically imported. You can render a page with multiple SubApps on it, each with its own independent behaviors, such as enabling SSR, or using different data models.

To create a SubApp:

1. First create your `.tsx` file, say "hello.tsx", and export a `subapp` that's a `ReactSubApp` type:

```tsx
import { React, ReactSubApp } from "@xarc/react";

const Hello = () => <div>Hello, World</div>;

export const subapp: ReactSubApp = {
  Component: Hello
};
```

2. Next declare your SubApp in another file, say "app.tsx", and use the `declareSubApp` API and dynamic import your subapp.

```tsx
import { declareSubApp } from "@xarc/react";

export const Hello = declareSubApp({
  name: "Hello",
  getModule: () => import("./hello")
});
```

## Rendering A SubApp

After you create a SubApp, you can render it on a page on the node.js server using the `PageRenderer` class API, and then send the result back to the browser.

For example, in `src/server/routes.ts`, declare a fastify plugin to register a route that render the page with the `Hello` SubApp on it.

```ts
import { Hello } from "../app";
import { PageRenderer } from "@xarc/react";
import { ElectrodeFastifyInstance } from "@xarc/fastify-server";

export async function fastifyPlugin(server: ElectrodeFastifyInstance) {
  const helloRenderer: PageRenderer = new PageRenderer({
    pageTitle: "Hello",
    subApps: [{ name: Hello.name, ssr: true }]
  });

  server.route({
    method: "GET",
    url: "/hello",
    async handler(request, reply) {
      const context = await helloRenderer.render({ request });
      reply.type("text/html");
      reply.send(context.result);
    }
  });
}
```

[browserslist]: https://www.npmjs.com/package/browserslist
