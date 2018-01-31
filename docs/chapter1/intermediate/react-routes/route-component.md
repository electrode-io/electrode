# Creating Components For Your Route

You must create the actual component itself after specifying the [react-router] in the file `src/client/routes.jsx`--what React component to redirect matching routes to.

## Example

For example, here is a Home component for our example routes.

Navigate to `<your-awesome-app>/src/client/components/home.jsx`. Override the existing code by copying, pasting and saving the code below:

```js
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

[react-router]: https://www.npmjs.com/package/react-router
