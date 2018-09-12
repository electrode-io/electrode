# Stateless CSRF Validation

The [electrode-csrf-jwt](https://github.com/electrode-io/electrode-csrf-jwt) plugin enables stateless CSRF protection using [JWT](https://github.com/auth0/node-jsonwebtoken) in Electrode, Express, or Hapi applications.

### Why do we need this module?

Protection against [CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29) is a very important security feature. Traditional anti-CSRF techniques use tokens issued by the server that the client has to post back. The server validates the request by comparing the token with its own, stored copy. But what if your application does not rely on server-side session persistence? Protecting users against CSRF attacks when your application does not use back-end sessions can be tricky. The Stateless CSRF JWT Validation module addresses this need.

This module is a stand-alone module and can be configured to work in any [Electrode](#stateless-validation-electrode), [Express](#stateless-validation-express), or [Hapi](#stateless-validation-hapi) application.

#### How do we validate requests?

_**Double JWT CSRF tokens**_

This Stateless CSRF Validation module is able to validate the authenticity of the client's request by relying on the fact that cross-site requests cannot set headers. Using two JWT CSRF tokens takes advantage of this.

Both tokens are generated on the server side with the same payload but different types: one for the HTTP header, one for the cookie. Note that when a client makes a request, the JWT token must be sent in the headers.

```
headerPayload = { type: "header", UUID: "12345" };
cookiePayload = { type: "cookie", UUID: "12345" };
```

Once\_both\_tokens are received by the server, they are decoded and validated to make sure the payloads match.

The disadvantage is that this method relies on the client making all requests through AJAX.

## Module:[electrode-csrf-jwt](https://github.com/electrode-io/electrode-csrf-jwt)

### Install via `npm`

```
$ npm install --save electrode-csrf-jwt
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode-boilerplate-universal-react-node#electrode-csrf-jwt)

* [Express Example with Standalone Modules](https://github.com/docs-code-examples-electrode-io/express-example-with-standalone-electrode-modules#electrode-csrf-jwt)

* [Hapi Example with Standalone Modules](https://github.com/docs-code-examples-electrode-io/hapijs-example-with-standalone-electrode-modules#electrode-csrf-jwt)

## Usage

### Configuration

This module can be configured to work in any [Electrode](#stateless-validation-electrode), [Express](#stateless-validation-express), or [Hapi](#stateless-validation-hapi) application.

Whichever platform you are using, an `options` property with a secret key is required:

> **options **\* `secret`: **Required**. A string or buffer containing either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.

Other configuration properties are optional and follow the [same usage as jsonwebtoken](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#usage)

* `algorithm`
* `expiresIn`
* `notBefore`
* `audience`
* `subject`
* `issuer`
* `jwtid`
* `subject`
* `noTimestamp`
* `headers`

### Electrode {#stateless-validation-electrode}

All server configurations in [Electrode apps](../../../what-is-electrode.md) are handled by the versatile [confippet](./confippet.md) module. The Stateless CSRF JWT Validation module can be easily configured by adding the following property to `config/default.json`:

```
{
  "plugins": {
    "electrode-csrf-jwt": {
      "options": {
        "secret": "shhhhh",
        "expiresIn": 60
      }
    }
  }
}
```

### Express {#stateless-validation-express}

#### Example`app.js`configuration

```
const csrfMiddleware = require("electrode-csrf-jwt").expressMiddleware;
const express = require("express");

const app = express();

const options = {
  secret: "shhhhh",
  expiresIn: 60
};

app.use(csrfMiddleware(options));
```

### Hapi {#stateless-validation-hapi}

#### Example`server/index.js`configuration

```
const csrfPlugin = require("electrode-csrf-jwt").register;
const Hapi = require("hapi");

const server = new Hapi.Server();
const options = {
  secret: "shhhhh",
  expiresIn: 60
};

server.register({register: csrfPlugin, options}, (err) => {
  if (err) {
    throw err;
  }
});
```

### Usage Example

With the configuration shown above, your app is now ready to use Stateless CSRF JWT Validation. At this point, server endpoints do not require any additional configuration for protection to be enabled. Your`GET`endpoints will automatically return a CSRF cookie\_and\_header, and your`POST`endpoints will require the same.

Let's see a simple [example](https://github.com/electrode-io/electrode/blob/d4142ee0c938cbf973a429ee8467052aa4e1c9be/samples/universal-react-node/README.md#electrode-csrf-jwt) to show how the CSRF tokens are automatically configured:

**Server Endpoint Setup**

```
server.route({
  method: "GET",
  path: "/1",
  handler: (req, reply) => reply("valid")
});

server.route({
  method: "POST",
  path: "/2",
  handler: (req, reply) => reply("valid")
});
```

Here we set up two simple endpoints:

* a `GET` endpoint, `/1`, to which the module automatically adds a csrf token header
* a `POST` endpoint, `/2`, to which the module ensures the presence of a valid token in the request headers

Let's see how to access them from the client:

**Client AJAX Setup**

```
//A simple post Fn that now requires a csrf token to be passed in the header

function doPost(csrfToken) {
  fetch("/2", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "x-csrf-jwt": csrfToken
    },
    body: JSON.stringify({message: "hello"})
  })
  .then((resp) => console.log(resp)
}

function doGet() {
  fetch("/1", {credentials: "same-origin"})
  .then((resp) => {
    if (resp.status === "200") {
      const token = resp.headers.get("x-csrf-jwt");
      if (token !== "") {
        console.log("Got CSRF token OK");
        doPost(token);
      }
    }
  })
}
```

In this example a `POST` request to `/2` can be made using the token retrieved from the `/1` endpoint.

You can checkout our [Electrode Boilerplate React Application](https://github.com/electrode-io/electrode#boilerplate-universal-react-node) for a more detailed example.
