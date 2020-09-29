# @xarc/react

xarc web app platform support for React framework.

Example:

`index.ts`:

```ts
import { declareSubApp } from "@xarc/react";

const subAppDef = declareSubApp({
  name: "test",
  getModule: () => import("./subapp-hello")
});
```

`subapp-hello.ts`:

```ts
export const subapp = {
  Component: () => {
    // UI component
  }
};
```
