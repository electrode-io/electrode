import Home from "./components/home";

export const routes = {
  path: "/",
  component: Home,
  childRoutes: [{
    path: "splitting",
    getComponent(nextState, callback) {
      import("./components/demo-code-splitting").then(module => {
        callback(null, module.default);
      });
    }
  }]
};
