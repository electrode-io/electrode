# Build a Progressive Web App

[Progressive Web Apps (PWA) ](https://developers.google.com/web/progressive-web-apps/) use modern web capabilities to deliver an app-like user experience.

PWAs are incredibly powerful and provide functionalities like offline first, push notifications, background sync, GPU rendering, 60FPS scrolling and add to home screen for a native-like app experience.

PWAs are based on [Service Workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers), which work independently in the background without interfering with your web app's life cycle.

## Benefits of using Electrode PWA

### Low distribution friction

If your PWA is online, it's already accessible for Chrome on Android (and other mobile devices). Your customers don't have to download an app from the App Store. 65.5% of US smartphone users don't download any new apps each month. PWAs eliminate the need to go to the app store, search for the app, click Install, wait for the download, then open the app. Each of these steps loses 20% of potential users.

From a developer's point of view, you don't need to rely on the Play Store to publish your app! Push new changes to your web app, and the service worker takes care of updating the app shell.

### Frictionless shopping experience

For an e-commerce business, PWA offers customers a frictionless shopping experience that allows shoppers to search, buy, and checkout quickly without downloading the native app. Furthermore, it allows you to bring app-like experiences to mobile websites, including personalization and targeted offers.

### Faster mobile experience

Web Apps built with Electrode + PWA will be significantly faster. Also, these websites enable an offline mode, allowing customers to continue browsing in areas with poor wireless reception—for example, on public transit. Given the fact that faster websites have higher conversion rates, websites built with PWA could result in increased revenue.

### Personalized push notifications

Electrode push notifications can be used to interact effectively with mobile customers, as these notifications are native to the mobile device and can be personal and timely. Similar notifications can be sent to desktop websites too.

## Getting Started

In the first section, we are going to make your previously built Electrode app into a PWA with content caching, push notifications, and an option for the user to save your web app to their home screen.

_If you are starting out with a new PWA, just answer "Y" to the following question_

```bash
$ yo electrode
# ... answer questions ...
# Would you like to make a Progressive Web App? (Y/n)
# ... answer rest of the questions and wait for app to be generated ...
```

_Follow Prerequisites and skip to _[_Push Notifications_](/chapter1/intermediate/build-a-progressive-web-app.md)

### Prerequisites

We need certain API keys for push notifications. To generate these values, visit [Firebase](https://console.firebase.google.com/):

1. Create a new project.
2. Click on the settings icon
3. Open `Project settings`.
4. Navigate to the `CLOUD MESSAGING` tab and note down your `Server key` and the `Sender ID`.
2.  In the `client/images` directory, add the [logo 192x192](https://github.com/electrode-io/electrode/blob/d4142ee0c938cbf973a429ee8467052aa4e1c9be/samples/universal-react-node/client/images/logo-192x192.png) and [logo 72x72](https://github.com/electrode-io/electrode/blob/d4142ee0c938cbf973a429ee8467052aa4e1c9be/samples/universal-react-node/client/images/logo-72x72.png) icon images. We'll use these logos for the `Add to Homescreen` banner and push notifications.

### Generating a Service Worker

Generating a service worker in an electrode app is as simple as adding a configuration file. Navigate to`<your-awesome-app>/config`and create a new`sw-config.js`:

```js
module.exports = {
  cache: {
    cacheId: "<your-awesome-app>",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: /\/$/
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    title: "<your-awesome-app>",
    logo: "./images/logo-192x192.png",
    short_name: "EPA",
    background: "#FFFFFF",
    theme_color: "#FFFFFF"
  }
};
```

When you build the app, an `sw.js` file is created in the `dist` folder.

### Registering the Service Worker

We need to create a server plugin to access`dist/sw.js`. Create a file called `server/plugins/pwa/index.js`, and add the following code:

```js
"use strict";
exports.register = function (server, options, next) {
  server.route({
    method: "GET",
    path: "/sw.js",
    handler: { file: "dist/sw.js" }
  });
  next();
};
exports.register.attributes = {
  name: "pwa",
  version: "0.0.1"
};
```

Also, add the following to `plugins` inside `config/default.json`:

```js
"pwa": { "module": "./server/plugins/pwa" }
```

To register the service worker on the browser, create a file called `sw-registration.js` inside the `client` directory and add the following code:

```js
module.exports = () => {
  // Exit early if the navigator isn't available
  if (typeof navigator === "undefined") {
    return;
  }
  // Feature check if service workers are supported.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js", { scope: "./" })
      // Service worker registration was successful
      .then((registration) => {
        // The updatefound event is dispatched when the installing
        // worker changes. This new worker will potentially become
        // the active worker if the install process completes.
        registration.onupdatefound = function () {
          const installingWorker = registration.installing;
          // Listen for state changes on the installing worker so
          // we know when it has completed.
          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
            case "installing":
              console.log("Installing a new service worker...");
              break;
            case "installed":
              console.log(navigator.serviceWorker.controller);
              // We check the active controller which tells us if
              // new content is available, or the current service worker
              // is up to date (?)
              // TODO: Figure out why this is the case
              if (navigator.serviceWorker.controller) {
                console.log("New or updated content is available, refresh!");
              } else {
                console.log("Content is now available offline!");
              }
              break;
            case "activating":
              console.log("Activating a service worker...");
              break;
            case "activated":
              console.log("Successfully activated service worker.");
              break;
            case "redundant":
              console.log("Service worker has become redundant");
              break;
            }
          };
        };
      })
      // Service worker registration failed
      .catch((err) => {
        console.log("Service worker registration failed: ", err);
      });
  }
};
```

Import it in `client/app.jsx`:

```js
require.ensure(["./sw-registration"], (require) => {
  require("./sw-registration")();
}, "sw-registration");
```

Let's recap since we completed a couple of tasks:

1.  "Offline First" with the cache property.

    Precache your static assets generated by webpack using the staticFileGlobs property. Or, use the runtimeCaching property to cache specific react routes in `routes.jsx`.

2.  "Add to Home" with the manifest property.

    After visiting your website, users will get a prompt (if the user has visited your site at least twice, with at least five minutes between visits) to add your application to their homescreen. `manifest`gives you control over how your web app is installed on user's home screen with `short_name`, `title`and `logo` properties.

Build your app and start the server with

```bash
$ clap pwa
```

**Note: Service worker currently does not work with webpack-dev-server. You need to build first and then run the server.**

Navigate to `http://localhost:3000`, open `Developer tools`, and click on the `Application` tab. You should see your `Service Worker` activated and running!

![](https://cloud.githubusercontent.com/assets/4782871/20909807/b322e462-bb12-11e6-97af-797c808e11d9.png)

Go ahead and click on the `Offline` checkbox in the Developer tools. Terminate your server. Refresh your web page.

**NOTE: The **`Add to Homescreen` **banner will pop up only on Android devices with Chrome 42+. To simulate the banner on your desktop Chrome, navigate to **`Developer tools` **-> **`Applications` **-> **`Manifest` **and click on **`Add to homescreen`**.**

### Push notifications {#push-notifications}

The [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) requires a registered service worker so it can send notifications in the background when the web application isn't running. We already have our Service Worker generated with the help of `sw-config.js`. We only need to add a `Push` event to it. Create a new file `sw-events.js` inside the `client` directory and add the following to it:

```js
/* eslint-env serviceworker */

import icon from "./images/logo-192x192.png";
import badge from "./images/logo-72x72.png";

self.addEventListener("push", (event) => {
  const title = "It worked!";
  const options = {
    body: "Great job sending that push notification!",
    tag: "electrode-push-notification-test",
    icon,
    badge
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
```

Check out the [Adding Push Notifications to a Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/) Codelab provided by Google for an in-depth guide on how push notifications and service workers work together.

Now we need to add this file to our Webpack bundle by referencing it in the `cache property` of `sw-config.js`:

```js
module.exports = {
  cache: {
    importScripts: ['./sw-events.js']
  }
}
```

Now we have a registered service worker installed, activated and ready to accept `push` from the server. But before we can `push` we need to `request permissions` from the user and `subscribe` them to the notifications.

Navigate to `client/components/home.jsx` and replace it with:

```js
/* eslint-disable react/no-did-mount-set-state */
/* global navigator */

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {toggleCheck, incNumber, decNumber} from "../actions";

class Home extends React.Component {
  constructor() {
      super();
      this.state = {
        // Whether ServiceWorkers are supported
        supported: false,
        // Did something fail?
        error: null,
        // Waiting on the service worker to be ready
        loading: true,
        // Whether we"ve got a push notification subscription
        subscribed: false,
        // The actual subscription itself
        subscription: null,
        title: "",
        body: ""
      };
      this.sendNotification = this.sendNotification.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.subscribe = this.subscribe.bind(this);
    }
    componentDidMount() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          // Check for any existing subscriptions
          registration.pushManager.getSubscription().then((subscription) => {
            // No current subscription, let the user subscribe
            if (!subscription) {
              this.setState({
                loading: false,
                subscribed: false,
                supported: true
              });
            } else {
              this.setState({
                subscription,
                subscribed: true,
                loading: false,
                supported: true
              });
            }
          })
          .catch((error) => {
            this.setState({loading: false, error});
          });
        })
        .catch((error) => {
          this.setState({loading: false, error});
        });
      } else {
        // ServiceWorkers are not supported, let the user know.
        this.setState({loading: false, supported: false});
      }
    }
    subscribe() {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.subscribe({ userVisibleOnly: true })
          .then((subscription) => {
            this.setState({subscription, subscribed: true});
          })
          .catch((error) => {
            this.setState({error});
          });
      });
    }
    handleInputChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    sendNotification() {
      const {title, body} = this.state;
      // you can add badge, icon images in the options.
      const options = {body};
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    }
    render() {
    const props = this.props;
    const {checked, value} = props;
    const {
      error,
      loading,
      supported,
      subscribed,
      subscription
    } = this.state;

    if (!loading && !supported) {
      return (
        <div>Sorry, service workers are not supported in this browser.</div>
      );
    }
    if (error) {
      return (
        <div>Woops! Looks like there was an error:
          <span style=>
            {error.name}: {error.message}
          </span>
        </div>
      );
    }
    if (loading) {
      return (<div>Checking push notification subscription status...</div>);
    }
    if (!subscribed) {
      return (
        <div>Click below to subscribe to push notifications
          <button onClick={this.subscribe}>Subscribe</button>
        </div>
      );
    }

    const API_KEY = "AIzaSyDAL_a1Hswn8QRRICDlh5PIIbEbFN7Aih0";
    const GCM_ENDPOINT = "https://android.googleapis.com/gcm/send";
    const endpointSections = subscription.endpoint.split("/");
    const subscriptionId = endpointSections[endpointSections.length - 1];
    const curlCommand = `curl --header "Authorization: key=${API_KEY}"
    --header Content-Type:"application/json" ${GCM_ENDPOINT} -d
    "{\\"registration_ids\\":[\\"${subscriptionId}\\"]}"`;

    return (
      <div>
        <h1>Hello <a href={"https://github.com/electrode-io"}>{"Electrode"}</a></h1>
        <div>
          <h2>Managing States with Redux</h2>
          <label>
            <input onChange={props.onChangeCheck} type={"checkbox"} checked={checked}/>
            Checkbox
          </label>
          <div>
            <button type={"button"} onClick={props.onDecrease}>-</button>
            &nbsp;{value}&nbsp;
            <button type={"button"} onClick={props.onIncrease}>+</button>
          </div>
        </div>
        <br/>
        <h2>Push Notifications with Service Workers</h2>
        Fill the form below and click on send for a push notification.
        <label htmlFor="title">Title</label>
        <input onChange={this.handleInputChange} name="title"/>
        <label htmlFor="body">Body</label>
        <input onChange={this.handleInputChange} name="body"/>
        <br/>
        <button onClick={this.sendNotification}>Send</button>
        <h3>Subscription Endpoint</h3>
        <code>{this.state.subscription.endpoint}</code>
        <h3>Curl Command</h3>
        <code>{curlCommand}</code>
      </div>
    );
  }
}

Home.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    checked: state.checkBox.checked, value: state.number.value
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCheck: () => {
      dispatch(toggleCheck());
    },
    onIncrease: () => {
      dispatch(incNumber());
    },
    onDecrease: () => {
      dispatch(decNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

Make sure you update the `API_KEY` with the one you previously generated in [Prerequisites](http://www.electrode.io/docs/service_workers.html#prerequisites).

`navigator.serviceWorker.ready` is a promise that will resolve once a service worker is registered, and it returns a reference to the active [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration). The showNotification() method of the ServiceWorkerRegistration interface creates a notification and returns a Promise that resolves to a [NotificationEvent](https://developer.mozilla.org/en-US/docs/Web/API/NotificationEvent).

We also need to update `sw-config.js` with the `sender_id`, so the final `sw-config.js` should look like:

```js
module.exports = {
  cache: {
    cacheId: "electrode",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*'],
    importScripts: ['./sw-events.js']
  },
  manifest: {
    title: "Electrode Progressive App",
    short_name: "EPA",
    background: "#FFFFFF",
    theme_color: "#FFFFFF",
    gcm_sender_id: "YOUR SENDER ID"
  }
};
```

Rebuild your app and run the server using the following commands:

```bash
$ clap pwa
```

With all the code in place, we are ready to see push notifications in action.

Navigate to `http://localhost:3000`. Accept the permission for subscribing and you will see a curl command rendered on the page. You can either run the curl command from a terminal window to see the push notification or fill out the form and click on the `Send` button to trigger it!

For more Electrode PWA code examples checkout the [electrode-pwa-examples](https://github.com/electrode-samples/electrode-pwa-examples/tree/master/examples) repository.
