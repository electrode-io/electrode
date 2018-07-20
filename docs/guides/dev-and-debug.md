# Developing and Debugging

With Electrode, it's simple to create and start developing your application.

In this guide, I will go through some simple steps on what to expect when developing and debugging your app.

## Getting Started

### Check and Install

- Check your node and npm version with `node -v` and `npm -v`.
- Install [electrode-ignite] and [xclap-cli].
- Create a new empty directory and `cd` into it.
- Run `ignite` and choose option 2 to create app.

![Check and Install][ignite-1]

### Create App

After the app generator starts, go through the questions and let it finish generating the app:

- Answer questions. You can hit Enter for defaults and update them in your `package.json` and `README.md` later.

![Answering Questions][ignite-2]

- Wait for App generation to finish and `npm install` to complete.

![Generating App][ignite-3]

![Finish with npm install][ignite-4]

**And app is ready! Let's try it out.**

---

- `cd` to the directory of the app that was generated, and run `clap dev`. You should see app loads in the browser:

![Hello Electrode][hello-electrode]

## Debugging Webapp

As you start writing your own code for your app, you will likely run into errors and issues.

The common error could be you have a syntax error in your code. In this case, webpack won't be able to compile and bundle your code for the browser.

There are two stages this could occur:

1.  You haven't started your app server yet.
2.  You already started your app server and loaded it into the browser, with Hot Module Reload (HMR) activated.

### Starting with error

If you start your app server while there are existing errors in your code, then webpack can't even compile your code for the browser, so HMR won't be able to start also.

In this case, to protect itself, the app server will not try to execute your web app through Server Side Rendering because that will crash it.

- So the app server will serve the webpack status report to the browser with the errors:

![Webpack Error Starting][error-start]

In this case, you just need to fix your code according to the error and reload the browser. There's no need to restart the app server.

Once webpack's able to compile your code, your app will show in the browser.

### Error in HMR

If your app started OK and HMR was loaded, and then you make some changes that have errors, then HMR will detect it and overlay your app with the errors displaying:

![HMR Error Overlay][error-hmr]

In this case, fix your code and HMR will automatically update the browser.

---

## Debugging App Server

If you need to debug your Node server, then the process will be different.

The easiest way is to use [Chrome]'s node debugger.

First add a debugger statement like below somewhere in your server code so the debugger can stop as your app server starts.

```js
debugger;
```

Then start the app server in inspect break mode.

```bash
$ clap devbrk
```

This will start your app server waiting for [Chrome] debugger to connect to it.

- Open [Chrome] to `chrome://inspect` and click on **Open dedicated DevTools for Node**.

![Chrome Inspect][chrome-inspect]

- Chrome Node debugger will show your app waiting at the very beginning. Click the continue button and the debugger will execute your app until it hit the `debugger;` statement you added.

![Chrome Debugger][chrome-debugger]

Now you can open the sources browser on the left panel and navigate to the sources you want to debug.

The caveat of using the [Chrome] debugger is that your source file will not show until your app first reach it. This is a bit tricky.

- Generally, I'd run the debugger with the app fully started, and then navigate to the file I want and set a breakpoint around the lines I want to debug. Then I restart the app server and [Chrome] debugger will remember the breakpoints and stop there.

- Alternatively, I'd go to the files I want to debug and just add `debugger;` statements near the lines I want to debug.

---

## Summary

In this guide I showed you steps on how to start your React webapp with Electrode and the common means to debug your code.

This is just a start. As you work on your app and your code, I am sure you will find your own way that you are comfortable with.

Feel free to share in [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/electrode-io/electrode) if you have questions or cool tricks that you found.

Have fun coding and building!

[ignite-1]: ../images/dev-debug/ignite-1.png
[ignite-2]: ../images/dev-debug/ignite-2.png
[ignite-3]: ../images/dev-debug/ignite-3.png
[ignite-4]: ../images/dev-debug/ignite-4.png
[hello-electrode]: ../images/hello-electrode.png
[error-start]: ../images/dev-debug/error-start.png
[error-hmr]: ../images/dev-debug/error-hmr.png
[chrome]: https://www.google.com/chrome/
[chrome-inspect]: ../images/dev-debug/chrome-inspect.png
[chrome-debugger]: ../images/dev-debug/chrome-debugger.png
[electrode-ignite]: https://www.npmjs.com/package/electrode-ignite
[xclap-cli]: https://www.npmjs.com/package/xclap-cli
