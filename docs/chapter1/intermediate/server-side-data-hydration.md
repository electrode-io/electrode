# Server Side Data Hydration

Server side rendering consists of two steps:
1. Create the initial redux store data.
2. Call `ReactDOM.renderToString` with that data.  

Server side data hydration sends the redux initial store data (that was used for `ReactDom.renderToString`) to the browser so React can use the same data to bootstrap rendering on the client side. This helps the client side avoid making additional calls to the server to retrieve data for rendering.

### Server Side Rendering Modes

Although Electrode provides server side rendering by default, it provides modes where it can be turned off by passing an argument as a part of the URI.

#### 1. No Server Side Rendering \(noss\):

This mode completely disables any rendering of HTML and server side data hydration. A typical use of this mode would be when the server load is high.

```
https://localhost:3000?__mode=noss
```

#### 2. Server Side Data Only \(datass\):

This mode provides server side data hydration only but does not provide any server rendered content. The benefit here would be that we are able to cut down on using server resources but are also able to provide data to the client.

```
https://localhost:3000?__mode=datass
```

### Testing

To verify that the mode is working correctly and server side rendering is turned off, once you open the app in your browser, view the page source and check if the div tag `(.js-content)` is empty. If you used the `datass` mode, then you should still be able to see the initialized redux store.

### Auto Server Side Data Hydration

Electrode constantly monitors the performance of your app and turns off server-side rendering if app performance is degrading. The following files in your server are responsible for this optimization and can be customized based on the needs of your application:

```
server/conditions/
├── machine-info.js
├── machine-load.js
├── response-time.js
└── server-load.js
```

As indicated by the file names, we are monitoring the machine load, the server load and the response times of the app. In each file, we define default thresholds that we feel indicate a high load or long enough response time to make a decision that the server is overworked and server side rendering should now be disabled.

#### machine-load.js

We define two thresholds: `DEFAULT_LOAD_THRESHOLD = 4` and the `DEFAULT_MEM_THRESHOLD = 0.8`. Electrode looks at the load averages for the last one minute and five minutes, the memory usage of the server and disables server side rendering if they are higher than the threshold. These default thresholds can be modified as per your needs or can be overridden if passed in the requests. More information on load averages and how a threshold can be calculated can be found [here](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages).

#### response-time.js

The important default thresholds for measuring response time are:

```
DEFAULT_LONG_RESPONSE_THRESHOLD_MS = 5000;
DEFAULT_LONG_RESPONSE_AMOUNT = 6;
DEFAULT_DISABLE_EXPIRY_MINS = 2;
```

The response time is monitored per request. A response that takes over 5 seconds is considered a long response. The app then notes this and checks to see if we have hit the `DEFAULT_LONG_RESPONSE_AMOUNT`. If we have, then server side rendering is disabled for `DEFAULT_DISABLE_EXPIRY_MINS`  minutes. Once the expiration time is reached, we check to see if we are no longer getting long responses and then enable server-side rendering again.

#### server-load.js

We are simply measuring the event loop delay and comparing it against the threshold `DEFAULT_EVENTLOOP_DELAY_MS = 40`. If found to be higher, we disable server-side rendering. For more information, check out this article on [event loops](http://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html).

> NOTE: While generating an Electrode app using the Electrode generator using the `yo electrode` command, you will need to answer "Yes" to `Disable server side rendering based on high load?` in order to enable the above functionality.
