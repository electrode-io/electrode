# Add Routes

From working the previous steps, we have our open source friends, the ability to have a resource-list house party, and a working demo. It's time to build our components to handle user interaction and send requests to our Hapi Plugin (for getting more friends to our party). We will use the [React-Router](https://github.com/ReactTraining/react-router) and create separate routes to serve different content to our views.

Now we can integrate your published`<your-awesome-component>`as a node module and build out the app. Make sure you are inside of **Your Awesome App** and follow the steps below:

```bash
$ npm i your-awesome-published-npm-module --save
```

You define your React routes in the file `src/client/routes.jsx`.  The routes definition is from [react-router].

## Example

Navigate to `<your-awesome-app>/src/client/routes.jsx`. Copy, paste, and save the code below into this file. Change from the literal `YourAwesomeComponent` and `your-awesome-node-module` to your actual component name:

```js
import React from "react";
import { Route, IndexRoute } from "react-router";
import { Home } from "./components/home";
import { YourAwesomeComponent } from "your-awesome-published-npm-module";

export const routes = (
  <Route path="/" component={Home}>
    <IndexRoute component={YourAwesomeComponent}/>
    <Route path="/invite" component={YourAwesomeComponent}/>
  </Route>
);
```

[react-router]: https://www.npmjs.com/package/react-router
