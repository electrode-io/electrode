# Table of Contents

- [Development Setup](#development-setup)
  * [Webpack Dev Server](#webpack-dev-server)
  * [Your application node server](#your-application-node-server)
  * [Dev Admin Console](#dev-admin-console)
  * [Dev Reverse Proxy](#dev-reverse-proxy)
    + [Persist APP_SERVER_PORT](#persist-app_server_port)
    + [Proxy Admin](#proxy-admin)
    + [Update your server's port](#update-your-servers-port)

# Development Setup

When you run your app in dev mode with `clap dev`, Electrode starts two servers for you:

- The webpack dev server
- Your application node server

## Webpack Dev Server

This is webpack's development server that compiles and bundles your browser code and serve them in memory.

It starts a node server that listens at port ***2992***, which you can change with the env variable `WEBPACK_DEV_PORT`.

## Your application node server

Electrode will also starts your application server from `src/server/index.js`, with `@babel/register` loaded.

The port it listens to is ***3000***, which you can change with the env variable `PORT`.

If you want to use Electrode's dev reverse proxy, then you should set `APP_SERVER_PORT` to run your app server at another port, so the proxy can listens at `PORT` (`3000`) and forward to it.

## Dev Admin Console

The latest Electrode runs an interactive menu that allows you to restart these two servers on demand, with the `--inspect-brk` flag if you need to attach a debugger to them.

Electrode will activate the admin console if you set env `WEBPACK_DEV_MIDDLEWARE` to `true`.

Typically you should set that in `xclap.js` with:

```js
process.env.WEBPACK_DEV_MIDDLEWARE = true;
```

> It's already there if you generated your app with Electrode ignite.

You can access the Electrode Development Dashboard using the URL `http://localhost:3000/__electrode_dev`.

## Dev Reverse Proxy

When your app is built and deployed to production, it will not have a webpack dev server, and that's a very different setup than when your app is running in dev mode.

To make dev mode more similar to production, Electrode offers a reverse proxy server that combines webpack dev server and your app server under a single port.

To enable the reverse proxy, you have to let Electrode run your app node server on a different port.

To do that, specify the env variable `APP_SERVER_PORT`.  When Electrode detects that, it assumes you want to run your development with the reverse proxy.  You also need to update your app server's startup code to get its port number from that.

For example, to continue to serve your app on port ***3000***, which redirects to webpack dev server at ***2992*** and your app server at ***3100***, do this:

```bash
APP_SERVER_PORT=3100 clap dev
```

Now if you point your browser to `http://localhost:3000`, your entire app will appear to be serving from that single port.

You can also run your app at the standard HTTP port ***80*** while continue to run your app server at ***3000***:

```bash
PORT=80 APP_SERVER_PORT=3000 clap dev
```

You will need to provide elevated root/admin access for the proxy to listen at port ***80***.

Now you can point your browser to `http://localhost` to access your entire app.

### Persist APP_SERVER_PORT

If you want to set `APP_SERVER_PORT` persistently and always use the reverse proxy, then you should set it in `xclap.js` with:

```js
process.env.APP_SERVER_PORT=3100;
```

### Proxy Admin

The reverse proxy has an admin route that you can access at `/__proxy_admin/status`.

### Update your server's port

If your app was generated with Electrode ignite, then it reads the port number in the file `config/default.js`:

Make sure its code for that look like this:

```js
const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.APP_SERVER_PORT || process.env.PORT, 10);
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};
```

> Latest version of Electrode ignite should generate that for you already.
