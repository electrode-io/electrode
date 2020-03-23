# Localhost HTTPS Setup

These instructions are for MacOS, verified on macOS Mojave version 10.14.6

## SSL Key and Certificate

1. Generate SSL key and cert

Copy and paste these commands in the terminal to run them.

> Make sure to change the hostname `dev.mydomain.com` in both places to your desired value.

```bash
openssl req -new -x509 -nodes -sha256 -days 3650 \
 -newkey rsa:2048 -out dev-proxy.crt -keyout dev-proxy.key \
 -extensions SAN -reqexts SAN -subj /CN=dev.mydomain.com \
 -config <(cat /etc/ssl/openssl.cnf \
    <(printf '[ext]\nbasicConstraints=critical,CA:TRUE,pathlen:0\n') \
    <(printf '[SAN]\nsubjectAltName=DNS:dev.mydomain.com,IP:127.0.0.1\n'))
```

2. Add cert to your system keychain

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain dev-proxy.crt
```

3.  Put the files `dev-proxy.key` and `dev-proxy.crt` in your app's dir.

    > Alternatively, you can put them in one of the directories listed below:

    - `src`
    - `test`
    - `config`

## Development in HTTPS

After everything's setup, you can start development in HTTPS with the following steps:

1.  Using your favorite editor, add this line to your `/etc/hosts` file.

    > Change the hostname `dev.mydomain.com` accordingly if you used a different one.

```
127.0.0.1       dev.mydomain.com
```

2.  Now to run app dev in HTTPS, set the env `ELECTRODE_DEV_HTTPS` to `8443` and `HOST` to the domain name you created your cert for.

    - Example: `HOST=dev.mydomain.com ELECTRODE_DEV_HTTPS=8443 npm run dev`

    - And point your browser to `https://dev.mydomain.com:8443`

    - If you have access to listen on the standard HTTPS port `443`, then you can set it to `443` or `true`, and use the URL `https://dev.mydomain.com` directly.

    - Another way to trigger HTTPS is with the env `PORT`. If that is set to `443` exactly, then the dev proxy will enter HTTPS mode even if env `ELECTRODE_DEV_HTTPS` is not set.

## Elevated Privilege

Generally, normal users can't run program to listen on network port below 1024.

> but that seems to have changed for MacOS Mojave https://news.ycombinator.com/item?id=18302380

So if you want to set the dev proxy to listen on the standard HTTP port 80 or HTTPS port 443, you might need to give it elevated access.

The recommended approach to achieve this is to run the dev proxy in a separate terminal with elevated access:

```bash
sudo HOST=dev.mydomain.com PORT=443 npx clap dev-proxy
```

And then start normal development in another terminal:

```bash
HOST=dev.mydomain.com npm run dev
```

### Automatic Elevating (optional)

Optional: for best result, please use the manual approach recommended above.

If your machine requires elevated access for the proxy to listen at a port, then a dialog will pop up to ask you for your password. This is achieved with the module https://www.npmjs.com/package/sudo-prompt

This requirement is automatically detected, but if you want to explicitly trigger the elevated access, you can set the env `ELECTRODE_DEV_ELEVATED` to `true`.

> However, due to restrictions with acquiring elevated access, this automatic acquisition has quirks. For example, the logs from the dev proxy can't be shown in your console.

## Custom Proxy Rules

The dev proxy is using a slightly modified version of [redbird] with some fixes and enhancements that are pending PR merge.

You can provide your own proxy rules with a file `dev-proxy-rules.js` in one of these directories:

- `src`
- `test`
- `config`

The file should export a function `setupRules`, like the example below:

```js
export function setupRules(proxy, options) {
  const { host, port, protocol } = options;
  proxy.register(
    `${protocol}://${host}:${port}/myapi/foo-api`,
    `https://api.myserver.com/myapi/foo-api`
  );
}
```

Where:

- `proxy` - the redbird proxy instance.
- `options` - all configuration for the proxy:

  - `host` - hostname proxy is using.
  - `port` - primary port proxy is listening on.
  - `appPort` - app server's port the proxy forward to.
  - `httpPort` - HTTP port proxy is listening on.
  - `httpsPort` - Port for HTTPS if it is enabled.
  - `https` - `true`/`false` to indicate if proxy is running in HTTPS mode.
  - `webpackDev` - `true`/`false` to indicate if running with webpack dev.
  - `webpackDevPort` - webpack dev server's port the proxy is forwarding to.
  - `webpackDevPort` - webpack dev server's host the proxy is forwarding to.
  - `protocol` - primary protocol: `"http"` or `"https"`.
  - `elevated` - `true`/`false` to indicate if proxy should acquire elevate access.

- The primary protocol is `https` if HTTPS is enabled, else it's `http`.

- `appPort` is the port your app server is expected to listen on. It's determined as follows:

1. env `APP_SERVER_PORT` or `APP_PORT_FOR_PROXY` if it's a valid number.
2. fallback to `3100`.

- Even if HTTPS is enabled, the proxy always listens on HTTP also. In that case, `httpPort` is determined as follows:

1. env `PORT` if it's defined
2. if `appPort` is not `3000`, then fallback to `3000`.
3. finally fallback to `3300`.

The primary API to register your proxy rule is [`proxy.register`](https://www.npmjs.com/package/redbird#redbirdregistersrc-target-opts).

[redbird]: https://www.npmjs.com/package/redbird
