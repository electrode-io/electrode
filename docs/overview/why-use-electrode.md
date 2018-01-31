# Why Use Electrode?

> If you're writing a Universal React/Node.js application, then Electrode is for you!

At [@WalmartLabs](http://www.walmartlabs.com/), we recently migrated [walmart.com](http://walmart.com/) to a [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.k3j9fruyn) stack using React/Node.js.

### Universal JavaScript

Universal JavaScript allows us to use the same view rendering code from the server and client. When a user requests a page, they immediately receive the fully rendered HTML on initial page load. They will not have to wait for the client side JavaScript code to load and render the page.

Rich app-like experiences are possible without requiring a full page load when navigating or responding to user actions within the same page. The client-side code handles all the rendering of the view changes within the page. Only the data changes are sent between the client and the server.

This approach provides for an optimized user experience resulting in fast page loads with an even faster navigation experience. In the world of eCommerce where every millisecond counts, we believe this is the best way forward.

### Code and UI Reuse

We reuse React components across all of our brands, which means our developers need to be able to search through thousands of components, view their documentation, and see them rendered, and use another developer's component secure in the knowledge that its structure and implementation is consistent with our standards. We needed a way to ensure that all components were built according to modern best practices, without slowing our developers down with a lot of manual configuration.

### Server-Side Rendering and Performance

We serve millions of customers a day—so performance is critical to our business. React's server-side rendering  \(SSR\) support is vital for Search Engine Optimization \(SEO\) and has the potential to improve performance, but it's intensive on the server CPUs. We needed a platform with SSR built-in with a default configuration that's optimized for performance.

### Fast Startup and Deployment

We don't have time to create an application structure, configuration files, and Docker containers from scratch every time we start a project. We need to start fast and to deploy fast, with a consistent structure and optimal configuration every time.

### Three Pillars

To solve these problems, we created the Electrode platform. Electrode consists of three pillars: Electrode Core, Electrode Modules, and Electrode Tools.

**Electrode Core** provides a set of modules that get you started with a simple, consistent structure that follows modern best practices. When you're ready to take your app into production, Electrode automatically deploys to your favorite cloud provider.

**Electrode Modules** improve performance, efficiency, and security by adding features like [above the fold rendering](/chapter1/advanced/stand-alone-modules/above-the-fold-rendering.md), [configuration management](/chapter1/advanced/stand-alone-modules/confippet.md), and [cross-site request forgery protection](/chapter1/advanced/stand-alone-modules/stateless-csrf-validation.md). These modules can even be used with your existing React/Node.js application—so there's no need to migrate to Electrode Core.

**Electrode Tools** help [organize](/chapter1/advanced/powerful-electrode-tools/electrode-explorer.md) reusable components and [optimize large JavaScript bundles](/chapter1/advanced/powerful-electrode-tools/electrify.md). Like the modules, our tools can be used with any React/Node.js app.

### Future Investment

[Electrode](https://github.com/electrode-io) will continue to improve as we continue to solve problems at [@WalmartLabs](http://www.walmartlabs.com/). Future enhancements will include more [progressive web app features](https://developers.google.com/web/progressive-web-apps/) for web and mobile, bigger investments in performance, and much more.

We're committed to open source, which means our investment is your investment.

### Take a Look

So let's go! Check out the developer environment [requirements](/overview/requirements.md), dive into [Electrode's features in detail](/overview/what-is-electrode.md), or use our [Getting Started: Quick Guide](/chapter1.md) to start building Electrode apps now.
