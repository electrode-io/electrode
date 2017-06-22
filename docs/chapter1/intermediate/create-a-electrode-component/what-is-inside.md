# What's Inside

The new electrode component is applied by Lerna structure, which can help manage multiple repos within your packages directory.

## Packages

Your component source code is in `packages/<componentName>/src` and test code is in `packages/<componentName>/test`. You can use JSX and ES6 syntax freely in your component source; it will be transpiled to lib with Babel before being published to npm so that your users will simply be able to include it.

Here is the layout of packages/<componentName>:

```text
└── packages
    └── <componentName>
        ├── README.md
        ├── xclap.js
        ├── package.json
        ├── src
        │   ├── components
        │   │   └── test-component.jsx
        │   ├── index.js
        │   ├── lang
        │   │   ├── default-messages.js
        │   │   ├── en.json
        │   │   └── tenants
        │   │       └── electrodeio
        │   │           └── default-messages.js
        │   └── styles
        │       └── test-component.css
        └── test
            └── client
                └── components
                    ├── helpers
                    │   └── intl-enzyme-test-helper.js
                    └── test-component.spec.jsx
```

## Demo Application

`demo-app` is a full stack Electrode Application, which used for developing and testing your `packages/<component>`. You need to import your `packages/<component>` to demo-app, explore and personalize this web application there. Detailed explanations already provided in previous [Quick Start: What's Inside](/chapter1/quick-start/whats-inside.md)

Here is the layout of demo-app:

```text
├── demo-app
│   ├── LICENSE
│   ├── README.md
│   ├── config
│   │   ├── default.js
│   │   ├── development.json
│   │   ├── production.js
│   │   └── production.json
│   ├── xclap.js
│   ├── package.json
│   ├── src
│   │   ├── client
│   │   │   ├── actions
│   │   │   │   └── index.jsx
│   │   │   ├── app.jsx
│   │   │   ├── components
│   │   │   │   └── home.jsx
│   │   │   ├── images
│   │   │   │   └── electrode.png
│   │   │   ├── reducers
│   │   │   │   └── index.jsx
│   │   │   ├── routes.jsx
│   │   │   └── styles
│   │   │       └── base.css
│   │   └── server
│   │       ├── index.js
│   │       └── views
│   │           └── index-view.jsx
│   └── test
│       ├── client
│       │   └── components
│       │       └── home.spec.jsx
│       └── server
```
