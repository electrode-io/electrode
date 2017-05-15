# Electrode Component Example

[Here](https://github.com/didi0613/discovery-component) is a sample electrode component that created by electrode component generator, with support from electrode component archetype.

## Spinner Component

@walmart/wmreact-spinner is a component for walmart internal loading spinner react component for OneWalmart grocery. It is a general-use loading spinner that uses svg paths.

## Demo Applications

Demo applications can be found under `demo-app` directory, which are used for demoing and developing packages/components. They were created with the Electrode generator and consume the Electrode App archetype modules, which has standardize on common development behavior and patterns.

## Installation

### Prerequisites

Make sure you have installed NodeJS >= 4.x and npm >= 3.x.
```
$ node -v
v6.9.4
$ npm -v
3.10.10
```

### Check it out

To try out this ready made demo app, please clone this app:
```
$ git clone https://github.com/didi0613/discovery-component.git
$ cd discovery-component
$ npm install
$ lerna bootstrap
$ cd demo-app/grocery-spinner-demo
$ npm install
$ gulp dev
```

Now navigate your browser to http://localhost:3000 to see the demo app with @walmart/wmreact-spinner components.
