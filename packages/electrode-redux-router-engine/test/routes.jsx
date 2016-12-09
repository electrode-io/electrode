import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";

class Home extends React.Component {
  render () {
    return <div>Home</div>;
  }
}

class Page extends React.Component {
  render () {
    return <div>Page</div>;
  }
}

export default (
  <Route path="/test" component={Page}>
    <IndexRoute component={Home}/>
    <Redirect from="source" to="target" />
  </Route>
);
