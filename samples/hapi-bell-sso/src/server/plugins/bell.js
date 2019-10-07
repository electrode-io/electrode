"use strict";

const Bell = require("@hapi/bell");

/* eslint-env es6 */

const plugin = {
  pkg: {
    name: "@hapi/bell",
    version: "9.6.0"
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

  server.route({
    method: ["GET", "POST"],
    path: "/auth/twitter/callback",
    options: {
      auth: {
        strategy: "twitter",
        mode: "try"
      },
      handler: function(request, h) {
        if (!request.auth.isAuthenticated) {
          return `Authentication failed due to: ${request.auth.error.message}`;
        }
        // const profile = request.auth.credentials.profile;

        // request.cookieAuth.set({
        //   twitterId: profile.id,
        //   username: profile.username,
        //   displayName: profile.displayName
        // });

        // return reply.redirect("/");
        return "<pre>" + JSON.stringify(request.auth.credentials, null, 4) + "</pre>";
      }
    }
  });

  server.route({
    method: "GET",
    path: "/",
    config: {
      // auth: {
      //   strategy: "session", //<-- require a session for this, so we have access to the twitter profile
      //   mode: "try"
      // },
      handler: function(request, reply) {
        // Return a message using the information from the session
        // return reply("Hello, " + request.auth.credentials.displayName + "!");
        return "Congrats you are logged in to Twitter!";
      }
    }
  });
};

module.exports = plugin;
