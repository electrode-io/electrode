# Table of Contents

- [Development Setup](#development-setup)
  * [Webpack Dev Server](#webpack-dev-server)
  * [Your application node server](#your-application-node-server)
  * [Dev Admin Console](#dev-admin-console)
  * [Dev Reverse Proxy](#dev-reverse-proxy)
    + [Checklist to set up your reverse proxy server](#checklist-to-set-up-your-reverse-proxy-server)
    + [Enable Reverse Proxy](#enable-reverse-proxy)
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

Electrode will also start your application server from `src/server/index.js`, with `@babel/register` loaded.

By default, Electrode's development server will be hosted from the dev reverse proxy. The port it listens to is ***3000***, which you can change with the env variable `PORT`.

The application server is hosted at ***3100*** by default, which you can change with the env variable `APP_SERVER_PORT`.

## Dev Admin Console

The latest Electrode runs an interactive menu that allows you to restart these two servers on demand, with the `--inspect-brk` flag if you need to attach a debugger to them.

You can access the Electrode Development Dashboard using the URL `http://localhost:3000/__electrode_dev`.

## Dev Reverse Proxy

When your app is built and deployed to production, it will not have a webpack dev server, and that's a very different setup than when your app is running in dev mode.

To make dev mode more similar to production, Electrode offers a reverse proxy server that combines webpack dev server and your app server under a single port.

### Checklist to set up your reverse proxy server

1. [Enable Reverse Proxy](#enable-reverse-proxy) or [Persist APP_SERVER_PORT](#persist-app_server_port) : Specify the env variable `APP_SERVER_PORT` to run the app node server on a different port.
2. [Update your server's port](#update-your-servers-port): Update the app server to listen on the port from `APP_SERVER_PORT`.

### Disable Reverse Proxy

The dev reverse proxy is enabled by default at port ***3000*** forwarding to the application server at ***3100***.

To disable the reverse proxy, specify the empty string `""` to the env variable `APP_SERVER_PORT`.

This will cause the Electrode application server to run directly on the env variable `PORT` (which is ***3000*** by default). 

For example, to serve your app on port ***3000***, which uses webpack dev server at ***2992*** but disable the dev reverse proxy, do this:

```bash
APP_SERVER_PORT= clap dev
```

Now if you point your browser to `http://localhost:3000`, your entire app will appear to be serving from that single port.

### Serving the your application from HTTP port 80

You can also run your app at the standard HTTP port ***80*** while continuing to run your app server at ***3000***:

```bash
PORT=80 APP_SERVER_PORT=3000 clap dev
```

You will need to provide elevated root/admin access for the proxy to listen at port ***80***.

Now you can point your browser to `http://localhost` to access your entire app.

### Persist APP_SERVER_PORT

If you want to set `APP_SERVER_PORT` persistently and always disable the reverse proxy, then you should set it in `xclap.js` with:

```js
process.env.APP_SERVER_PORT="";
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

module.exports = {
  connections: {
    default: {
      port: portFromEnv()
    }
  }
};
```

> Latest version of Electrode ignite should generate that for you already.
