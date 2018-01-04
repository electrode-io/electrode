import React from "react";
import { Route, IndexRoute } from "react-router";

class Home extends React.Component {
  render () {
    return "Home";
  }
}

class Page extends React.Component {
  render () {
    return "Page";
  }
}

export default (
  <Route path="/test" component={Page}>
    <IndexRoute component={Home}/>
  </Route>
);
