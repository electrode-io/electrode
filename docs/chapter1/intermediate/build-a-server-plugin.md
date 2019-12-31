# Build a Server Plugin

## Be Hapi and build a server plugin!

At WalmartLabs, we use [Hapi](http://hapijs.com/) because of its flexible and robust plugin system. It allows us to modularize our application into isolated pieces of business logic and reusable utilities.

Let's make a plugin! Plugins are way to extend our server's functionality. Building upon our open source theme, let's make a plugin that retrieves our tech friends for our "resource party." First, head back to Your Awesome App.

We'll use the [GitHub API](https://developer.github.com/v3/) to grab the latest 10 contributors of our open source friends, and display them in Your Awesome App.

GitHub has [great documentation](https://developer.github.com/v3/) and awesome libraries to help jumpstart our plugin. Let's begin there by installing a Node.js wrapper for the GitHub Api called [node-github](https://github.com/mikedeboer/node-github) in Your Awesome App:

```
$ npm install github
```

At their core, plugins are a simple `register object` that has the signature `function (server, options, next)`. Read more about building plugins from scratch in the [Hapi documentation](http://hapijs.com/tutorials/plugins).

Navigate to the `<your-awesome-app>/src/server/plugins` folder. Make a folder called `friends`, `cd` into your new `friends` folder, and create an empty `index.js` file:

```
$ touch index.js
```

Your Server file pattern should now look like this:

```
server
    ├── index.js
    ├── plugins
    │   ├── friends
    │   │   └── index.js
    │   └── webapp
    │       ├── index.html
    │       └── index.js
    └── views
        └── index-view.jsx
```

Navigate to `<your-awesome-app>/src/server/plugins/friends/index.js`. This is where we make an external API call to Github and request the last ten contributors of our selected Open Source 'friend' using the URL `https://api.github.com/ + /repos/:user/:repo/contributors`. Our GitHub wrapper [library](https://github.com/mikedeboer/node-github) allows us to use a built-in method, `github.repos.getContributors({})`, to streamline this process and return an array of open source contributors. We will also use [Bluebird](http://bluebirdjs.com/docs/getting-started.html), a Promise library that makes working with our async API calls much more manageable. Copy, paste, and save the code below:

```
"use strict";

//a very simple plugin

const Promise = require("bluebird");
const GitHubApi = require("github");
const github = new GitHubApi();
const AUTH_TOKEN = process.env.token;
github.authenticate({
  type: "oauth",
  token: AUTH_TOKEN
});

const githubGetContributors = Promise.promisify(github.repos.getContributors);

exports.register = (server, options, next) => {

  const friendsArr = [ /*eslint-disable max-len */
    {name: "Electrode", img: "//goo.gl/I9utJF", size: 8, github: "https://github.com/electrode-io/electrode"},
    {name: "React", img: "//goo.gl/xwbqlB", size: 8, github: "https://github.com/facebook/react"},
    {name: "Redux", img: "//goo.gl/MGQ3lp", size: 8, github: "https://github.com/reactjs/redux"},
    {name: "node", img: "//goo.gl/hxmCEE", size: 8, github: "https://github.com/nodejs/node"}
  ]; /*eslint-enable max-len */

  const getContributorsPromises = friendsArr.map((friend) => { /*eslint-disable camelcase */
    const githubUrl = friend.github.split("/");
    const githubInfo = {
      repo: githubUrl.pop(),
      owner: githubUrl.pop(),
      anon: true,
      page: 1,
      per_page: 10
    };
    return githubGetContributors(githubInfo)
      .then((response) => {
        friend.friends = response.data.map(({ login, avatar_url, html_url }) => (
          {name: login, img: avatar_url, profile: html_url}
        ));
        return friend;
      });
  }); /*eslint-enable camelcase */

  const getFriendsAndContributors = (reply) => {
    return Promise.all(getContributorsPromises)
      .then((response) => reply(null, JSON.stringify({friends: response})))
      .catch((err) => reply(err));
  };

  server.route({
    method: "GET",
    path: "/friends",
    handler: (request, reply) => getFriendsAndContributors(reply)
  });

  next();
};

exports.register.attributes = {
  name: "getFriends",
  version: "1.0.0"
};
```

If you plan on building out Your Awesome App even further, you'll need to \[generate a GitHub Api oAuth token\] to remove the preset limit for API requests. We have already added the code to accept and use the token in our Hapi server plugin above `const AUTH_TOKEN = process.env.token`.

Set a new [personal access token](https://docs.electrode.io/) \(you may be prompted to login to your GitHub account if you haven't already\), create your`token description` in the form given, and for `Select scopes` simply check `public repo`. Then hit the green `Generate token` button.

You will be redirected to the next page to retrieve your token. Keep your token private and secure; do not copy and paste it directly into your app. Instead, set your token as a Node [environment variable](https://nodejs.org/api/process.html#process_process_env). Copy and save this token in a secure place; we will use it several times. Use this token in your command line as follows:

Set the token locally:

```
$ token='your-token-here'
```

Set your token for heroku deployment:

```
heroku config:set token='your-token-here'
```

A great tool for testing your server requests is [Postman](https://www.getpostman.com/). Its user interface for viewing response objects and errors is incredible. For now, we will build out Your Awesome App. Navigate to [Intermediate: Add Routes](/chapter1/intermediate/react-routes/add-routes.md) to add routing to the app and extend our UI to display our contributor array.
