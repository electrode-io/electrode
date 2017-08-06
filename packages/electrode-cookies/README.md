# Electrode Cookies

Electrode isomorphic cookies lib.

## Install

    npm install electrode-cookies --save

## Usage

This module offers reading and setting cookies in React code that works in both the browser or when doing Server Side Rendering.

In your pure server only code, you can also use this module to read and set cookies, but you **MUST** pass the `request` object in the options. Otherwise an assert error will be thrown.

In NodeJS land:

```js
const Cookies = require("electrode-cookies");
```

### Reading cookies

In ReactJS land:

```js
import Cookies from "electrode-cookies";
const value = Cookies.get("test-cookie");
```

In NodeJS land:

> Note the difference is that `request` is passed in options.

```js
const Cookies = require("electrode-cookies");
const value = Cookies.get("test-cookie", { request });
```

### Writing cookies

In ReactJS land:

```js
import Cookies from "electrode-cookies";
Cookies.set( "foo", "bar", { path: "/", domain: ".walmart.com" } );
```

In NodeJS land:

> Note the difference is that `request` is passed in options.

```js
const Cookies = require("electrode-cookies");
Cookies.set( "foo", "bar", { request, path: "/", domain: ".walmart.com" } );
```

## Electrode Server Setup

The cookie writing on server side requires support from a Hapi plugin.  If you use [electrode-server], then it should have setup the plugin for you by default.  Otherwise, you need to register the [hapi plugin](hapi-plugin.js).

## APIs

### [Cookies.get](#cookiesget)

`Cookies.get(key, [options])`

Parameters:

-   `key` - name of the cookie
-   `options` - (optional) **_Available for Server side only._**  options for getting the cookie
    -   `request` - The server `request` object (**Required on server**).
    -   `matchSubStr` - If `true`, then do substring matching of key with all cookie keys.
        -   `skipEncoding` - (applies only if `matchSubStr` is `true`) If `true`, then do not encode the key or decode the value.

Returns the value of the cookie for `key`.

### [Cookies.set](#cookiesset)

`Cookies.set(key, value, [options])`

Set a cookie with `key` and `value`.

Parameters:

-   `key` - name of the cookie
-   `value` - value of the cookie
-   `options` - (optional) options for the cookie
    -   `request` - On the server side, the `request` object (**Required on server**).
    -   `path` - string path of the cookie **_Default:_** `"/"`
    -   `domain` - string domain of the cookie
    -   `expires` - number of seconds the cookie will expire
    -   `secure` - A boolean of whether or not the cookie should only be available over SSL **_Default:_** false
    -   `httpOnly` - A boolean of whether or not the cookie should only be available over HTTP(S) **_Default:_** false
    -   `forceAuthEncoding` - Forces non-standard encoding for `+` and `/` characters, use with auth cookies.
    -   `skipEncoding` - Skip encoding/escaping of the cookie value. See [source](https://gecgithub01.walmart.com/electrode/electrode-cookies/blob/master/lib/index.js) for details.

### [Cookies.expire](#cookiesexpire)

`Cookies.expire(key, [options])`

Expires a cookie specified by `key`.

Parameters:

-   `key` - name of the cookie
-   `options` - (optional) options for the cookie
    -   `path` - string path of the cookie **_Default:_** `"/"`
    -   `domain` - string domain of the cookie
    -   `secure` - A boolean of whether or not the cookie should only be available over SSL **_Default:_** false
    -   `request` - The server request object (**Required on server**)

[electrode-server]: https://gecgithub01.walmart.com/electrode/electrode-server
