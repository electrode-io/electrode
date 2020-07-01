---
id: welcome-to-electrode
title: Welcome to Electrode
---

Electrode is a platform for building large scale Universal React web applications with a standardized structure that follows best practices and has modern technologies built in. Electrode focuses on performance, component reusability, and simple deployment to multiple cloud providers—so you can focus on what makes your app unique.

### Electrode Core

When building your React application with the Electrode Platform, you get an out-of-the-box app with defaults that make sense for the most typical use case, but if you need it, you have all of the following features ready to use with available options.

- Everything you need to build a Universal React application with ES6 and JSX.
- Prime support for building and sharing reusable React components.
- Styling with CSS Module using [PostCSS].
- Writing and running Unit Test with [Mocha], [Karma], and [PhantomJS] or [Chrome Headless]
- Highly optimized Server-Side Rendering for your React App
- Build a Progressive Web App out of box

## Subapps

Introducing Sub-apps, a powerful way to express small pieces of code as independent applications in the context of an uber main application. Sub-apps are just components, and if React is used, a React component. The goal is to not limit subapps to a framework, but at the moment React is the primary focus. Sub-apps help developers breakdown complex web applications into small units for them to be independently maintained and easily managed in large engineering organizations.

### Subapp features

| Feature            | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| Code splitting     | Automatically detect subapps and configure webpack to split your JS by subapps    |
| Composability      | Create routes/pages that are composed of multiple subapps                         |
| Concurrency        | Multiple subapps will be rendered concurrently on the server to compose your page |
| Lazy loading       | Dynamically lazy load and create multiple instances of subapps on a page          |
| Initial Props      | Automatically retrieve initial props before rendering subapps                     |
| Async data fetch   | Use React suspense to enable single pass async data fetch within components       |
| Server Side Render | Independently enable server side render for each subapp                           |
| Redux              | Automatically facilitate, initialize, and hydrate SSR data using Redux            |
| React Router       | Automatically setup component routing using react-router                          |
| Hot module Reload  | Automatically support Hot Module Reload during development                        |

## electrode frontend components

![Frontend Components](/electrode/img/fe-components.png)

electrode is based on these technologies and understanding them is essential for working with electrode.

| Technology                         | Description           |
| ---------------------------------- | --------------------- |
| [Node](https://nodejs.org/en/)     | JS server runtime     |
| [Hapi](https://hapijs.com/)        | Node.js Web framework |
| [React](https://reactjs.org/)      | UI library            |
| [Redux](https://redux.js.org/)     | UI state management   |
| [Babel](https://babeljs.io/)       | Javascript transpiler |
| [Webpack](https://webpack.js.org/) | Asset bundler         |
| [PostCSS](https://postcss.org/)    | CSS with Javascript   |
| [ESLint](https://eslint.org/)      | Javascript linter     |
| [Karma]                            | Test Runner           |
| [Mocha](https://mochajs.org/)      | Test framework        |

:::important
New users, proceed to [Getting started](getting-started)
:::

[karma]: https://karma-runner.github.io/latest/index.html
