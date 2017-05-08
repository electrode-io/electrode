# Add Routes

From previous steps we have our open source friends, the ability to have a resource-list house party, and a working demo. It's time to build out our components to handle user interaction and send requests to our Hapi Plugin \(for getting more friends to our party\). We will use [React-Router](https://github.com/ReactTraining/react-router) and create separate routes to serve different content to our views.

Now we can integrate your published`<your-awesome-component>`as a node module and build out the app. Make sure you are inside of **Your Awesome App **and follow the steps below:

```
$ npm i your-awesome-published-npm-module --save
```

Navigate to `<your-awesome-app>/src/client/routes.jsx`. Copy, paste and save the code below into this file. Change from the literal `YourAwesomeComponent` and `your-awesome-node-module` to your actual component name:

```
import React from "react";
import { Route, IndexRoute } from "react-router";
import { Home } from "./components/home";
import { YourAwesomeComponent } from "your-awesome-published-npm-module";

export const routes = (
  <Route path="/" component={Home}>
    <IndexRoute component={YourAwesomeComponent}/>
    <Route path="/invite" component={YourAwesomeComponent}/>
  </Route>
);
```

Navigate to `<your-awesome-app>/src/client/components/home.jsx`. Override the existing code by copying, pasting and saving the code below:

```
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ourFriends: [],
      invitees: []
    };
    this.toggleGuest = this.toggleGuest.bind(this);
  }

  componentDidMount() {
    fetch("/friends", {method: "GET"})
    .then((res) => res.json())
    .then((json) => {
      const ourFriends = json.friends;
      const invitees = ourFriends.map(({name}) => {
        return { name, invited: false};
      });
      this.setState({ourFriends, invitees}); //eslint-disable-line
    });
  }

  componentView({ location: { pathname } }) {
    return {
      intro: pathname === "/",
      invite: pathname === "/invite"
    };
  }

  toggleGuest({name, invited}) {
    const invitees = this.state.invitees.map((invitee) => {
      if (invitee.name === name) {
        invitee.invited = !invited;
      }
      return invitee;
    });
    this.setState({invitees});
  }

  introMessage(className) {
    return (
      <div className={className}>
        <p>We should have a house party and invite all of our friends!</p>
        <Link to="/invite">Click Here to Make it a Party!</Link>
      </div>
    );
  }

  render() {
    const { ourFriends, invitees } = this.state;
    const toggleGuest = this.toggleGuest;
    const view = this.componentView(this.props);
    const message = this.introMessage;

    return (
      <div>
        {React.cloneElement(this.props.children, {
          ourFriends, invitees, toggleGuest, view, message
        })}
      </div>
    );
  }
}

Home.propTypes = {
  children: PropTypes.node
};
```

Navigate to [Intermediate: Server Config](/chapter1/intermediate/server-config.md) to learn about [Confippet](http://www.electrode.io/docs/confippet.html) and add our Hapi plugin to our server config.

