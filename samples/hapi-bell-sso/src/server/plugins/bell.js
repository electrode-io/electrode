"use strict";

const electrodeCookies = require("electrode-cookies");
const Bell = require("@hapi/bell");

/* eslint-env es6 */

const plugin = {
  pkg: {
    name: "@hapi/bell",
    version: "11.1.0"
  }
};

plugin.register = function(server) {
  server.auth.strategy("twitter", "bell", {
    provider: "twitter",
    password: "cookie_encryption_password_secure",
    isSecure: false,
    clientId: "SHxg66zPFbTwr1kpXQotn4Il7", // Set client id
    clientSecret: "ytwJBGJWigTXUfseSb6koQYFgGxKrsZLh1Jj1K1qEkcdStUG2F" // Set client secret
  });

  server.auth.strategy("github", "bell", {
    provider: "github",
    password: "cookie_encryption_password_secure",
    isSecure: false, // For testing or in environments secured via other means
    clientId: "854560a4dee2e2aac9bf",
    clientSecret: "6820e46efb60f912afb9ad17459ff22b0cbc9010",
    location: "https://example.com",
    scope: []
  });

  server.route({
    method: ["GET", "POST"],
    path: "/auth/twitter/callback",
    options: {
      auth: {
        strategy: "twitter",
        mode: "try"
      },
      handler: (request, reply) => {
        try {
          console.log(request.auth.credentials.profile);
          if (request.auth.credentials) {
            electrodeCookies.set("SSO_CRED", request.auth.credentials, { request });
            // console.log(electrodeCookies);
          }
          // return "<pre>" + JSON.stringify(request.auth.credentials.profile, null, 4) + "</pre>";
          return reply.redirect("/demosso");
        } catch (err) {
          return `Authentication failed due to: ${request.auth.error}`;
        }
      }
    }
  });

  server.route({
    method: ["GET", "POST"],
    path: "/auth/github/callback",
    options: {
      auth: {
        strategy: "github",
        mode: "try"
      },
      handler: (request, reply) => {
        try {
          console.log(request.auth.credentials.profile);
          return "<pre>" + JSON.stringify(request.auth.credentials.profile, null, 4) + "</pre>";
        } catch (err) {
          return `Authentication failed due to: ${request.auth.error}`;
        }
      }
    }
  });
};

module.exports = plugin;
