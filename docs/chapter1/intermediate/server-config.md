# Server Config

### Server Config and Confippet

Out of the box we're given [Confippet](https://github.com/electrode-io/electrode-confippet), a versatile utility for managing your NodeJS application configuration. Its goal is customization and extensibility, but it offers a preset config out of the box inside **Your Awesome (Electrode) App**:

    config
        ├── default.json
        ├── development.json
        └── production.json

We'll need to extend our default.json to include our `friends` plugin and module `./src/server/plugins/friends`.

Navigate to `<your-awesome-app>/config/development.json`. Copy, paste and save `friends` plugin:

    {
      "plugins": {
        "friends": {
          "module": "./src/server/plugins/friends"
        }
      }
    }

You can learn more about Confippet and ways to extend your config in our Advanced Electrode App with the [Confippet](https://github.com/electrode-io/electrode-confippet) stand alone module.

We should update our app test to reflect the changes we have made. Navigate to `<your-awesome-app>/test/client/components/home.spec.jsx`. Override the existing code by copying and pasting the code below:

    require("isomorphic-fetch");

    import React from "react";
    import ReactDOM from "react-dom";
    import { Home } from "client/components/home";

    class ChildComponent extends React.Component {
      render() {
        return (
          <div />
        );
      }
    }

    describe("Home", () => {
      let component;
      let container;
      let location;

      beforeEach(() => {
        container = document.createElement("div");
        location = { pathname: "/" };
      });

      it("has expected content with deep render", () => {
        component = ReactDOM.render(
          <Home location={location}>
            <ChildComponent />
          </Home>,
          container);
        expect(component).to.not.be.false;
      });
    });

Let's check it out! We'll run through our steps to test, run the app and view it in the browser. We'll need your GitHub API token as well:

    $ clap check
    $ token='your-token-here' clap hot

Navigate to  `localhost:3000`. Check it out! This is the `Index route` which renders our `Home component` using Server Side Rendering:

![](http://www.electrode.io/img/app-home-view.png)  
When you click the  `Click Here to Make it a Party`  link, Your Awesome App routes to the `/invite`  route, which renders the guest list component.

![](http://www.electrode.io/img/app-guest-list-view.png)

By checking the guest list, you are setting the invitee object's key to `{invited: true}`, which tells `renderFriends` to render.

When all of our guests are invited to the House Party, our CSS modules kick in and launch an Electrode House Party!

![](http://www.electrode.io/img/party-collabos.png)

Feel free to add your own personal touch and build out your Resource List House Party. You can compare your work to our [Heroku deployed example app](https://electrode-example-app.herokuapp.com/).

When you're ready, you can deploy Your Awesome App to [Heroku](https://devcenter.heroku.com/categories/deployment) by following the previous steps in our [Getting Started: Build More](/chapter1/quick-start/build-app.md) section. If you choose this step, make sure you set all of the Heroku configurations, including the one for our [GitHub Api](/chapter1/intermediate/build-a-server-plugin.md).

You can also navigate to [Intermediate: More Deployments](/chapter1/intermediate/more-deployments.md) to learn how to deploy with [Docker](/chapter1/intermediate/more-deployments/docker.md) and [Kubernetes](/chapter1/intermediate/more-deployments/kubernetes.md).
