# FAQs

### You Ask...We Answer!

#### 1. Is Electrode really used to power walmart.com?

In less than one year, [Walmart.com](http://walmart.com/) has completed its migration to React/Node.js and we are proud of that accomplishment! The goal was to build a new application platform to help @WalmartLabs and its engineers scale for the future.

As part of that migration, [Electrode](http://www.electrode.io/) served as the platform for enabling the fast paced transformation. Now we have an open source release of [Electrode](http://www.electrode.io/), the application platform powering Walmart.com.

#### 2. What are archetypes?

Electrode archetypes are a way for every Electrode module to share common scripts, dependencies, and best practices that can be updated in real time—and have that update propagate to every module that inherits from that specific archetype.  
For a detailed description of archetypes, see [what are archetypes?](../chapter1/quick-start/what-are-archetypes.md).

#### 3. Why is my server throwing a "cannot find module ..." error on start up?

Most likely you are using npm@2. Upgrade to npm@3 by running command `npm i -g npm@3` and redo `npm i`.

#### 4. What is the difference between creating a new Electrode app using yo electrode vs cloning/forking Electrode Boilerplate?

[Electrode Boilerplate](../chapter1/advanced/you-can-view-an-example-bundleanalyzetsv-output-using-the-electrode-boilerplate-code.md) was created using the `yo electrode` command. `yo electrode` gives you a bare bones Electrode Isomorphic Universal React App with NodeJS backend.

[Electrode Boilerplate](../chapter1/advanced/you-can-view-an-example-bundleanalyzetsv-output-using-the-electrode-boilerplate-code.md) includes all the bells and whistles for the SSR optimizations using the following modules configured and integrated for your use:

-   [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
-   [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
-   [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
-   [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
-   [Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render)

Head over to this amazing [blog](https://medium.com/walmartlabs/using-electrode-to-improve-react-server-side-render-performance-by-up-to-70-e43f9494eb8b#.9qjftiinq) written by [Alex Grigoryan](https://twitter.com/lexgrigoryan) about How Electrode improved Server Render performance by 70% using the [stand alone modules](../chapter1/advanced/stand-alone-modules.md) listed above.

#### 5. What do you mean by reusable electrode components?

Electrode reusable components are for reusing across different apps, so they are made for being developed independently, consumed via electrode-explorer. These reusable components can take extra disk space to be able to develop & run independently in the browser, but when bundled/compiled the footprint is very small.

>If you just have one app, they probably shouldn't follow this model and instead, embed the components in your app directly.

#### 6. Why do we focus on Universal JavaScript?

-   SEO - Because [Walmart.com](www.walmart.com) is an eCommerce site, SEO is critical for our business model. To benefit from search indexing, SSR allows us to return an HTML string to search engines and our search analytics.

-   Reusability - At [Walmart.com](www.walmart.com) we handle highly complex user interactions at an unbelievable scale. [ReactJS](https://facebook.github.io/react/) is the chosen framework to deal with this so our developers can create reusable components that we can then run universally—on the client and the server. Creating modular and reusable components has helped us to share the same code across several different pages and even different brands. The shared components all have one single source of truth and are easy to read, debug and implement, so our engineers can focus on building great features to enrich user experience.

-   Maintainability - "[Code is a liability](https://medium.com/capital-one-developers/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905#.y7cy5jki3)". Universal javascript allows developers to use modular components that are sharable, self-contained, and easy to reason about. We mentioned that we have thousands of components shared by thousand of developers at WalmartLabs. Creating strict best practices and tools like [Electrode-Explorer](../chapter1/advanced/powerful-electrode-tools/electrode-explorer.md) help us to strengthen and increase maintainability that Universal JS gives us.

#### 7. Any plan with Graphql and React Native in the future ?

We have plans for GraphQL, but it’s a bit further out. Regarding React Native, we recently released [Electrode Native](http://www.electrode.io/site/native.html).  

Electrode Native is a mobile platform that simplifies development and streamlines the integration of React Native components into existing mobile applications. Electrode Native requires minimal changes to the existing mobile code base and infrastructure. Using Electrode Native, you can leverage React Native potential in your mobile application.

#### 8. Does electrode support hot reloading?

hot-reloading of jsx is already built in electrode. `clap hot` will enable hot-reloading.
