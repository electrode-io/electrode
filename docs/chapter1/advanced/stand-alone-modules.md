# Stand Alone Modules

## Leveraging Stand-Alone Modules

Our flexible stand-alone modules are dedicated to optimizing performance in specific areas based on your application's needs. By "stand alone", we mean that these Electrode modules are agnostic of one another and you can use one or all of them in any Node platform to enhance your application's capabilities. Use our guides and examples below to plug them in.

* [Confippet](./stand-alone-modules/confippet.md) is a versatile and flexible utility for managing configurations of Node.js applications.

* [Above the Fold Rendering](./stand-alone-modules/above-the-fold-rendering.md) is a React component wrapper that allows expensive components to skip Server Side Rendering.

* [Server Side Render Cache + Profiling](./stand-alone-modules/server-side-render-caching-+-profiling.md) is a module used to profile React Server Side Rendering performance and then cache expensive components to help you speed up SSR.

* [Stateless CSRF Validation](./stand-alone-modules/stateless-csrf-validation.md) is a Hapi plugin or Express middleware that enables stateless CSRF protection in case your app does not depend on server side persistence.

* [Electrode Redux Router Engine](./stand-alone-modules/redux-router-engine.md) is a Hapi plugin or Express middleware that handles async data for React Server Side Rendering using [react-router](https://github.com/ReactTraining/react-router), Redux and the [Redux Server Rendering](http://redux.js.org/docs/recipes/ServerRendering.html) pattern.

## Bringing It All Together in an Advanced Electrode App

By following the steps in the Getting Started: Advanced section, you will have a fully loaded Electrode application. It will consist of a Universal React and Node core, optimized module, and powerful tools that have solved some of our most challenging problems when it comes to Walmart's scale and market demands. Take a deeper look into our [Electrode Boilerplate](you-can-view-an-example-bundleanalyzetsv-output-using-the-electrode-boilerplate-code.md) after you walk through our Stand Alone Modules and [Tools](powerful-electrode-tools.md).
