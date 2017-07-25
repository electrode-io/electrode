import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import { connect } from 'react-redux'

class Home extends React.Component {
  render() {
    return <div>Home</div>;
  }
}

class Page extends React.Component {
  render() {
    return <div>Page {this.props.children}</div>;
  }
}

class Test extends React.Component {
  render() {
    return <div>Test</div>;
  }
}

function TestRedux({inc}) {
  inc();

  return (
    <div>Test Redux</div>
  )
}
const ConnectedTestRedux = connect(null, dispatch => ({inc: () => dispatch({type: "INC_NUMBER"})}))(TestRedux)

export default (
  <Route path="/test" component={Page}>
    <IndexRoute component={Home} />
    <Redirect from="source" to="target" />
    <Route path="/test-init" init={true} component={Test} />
    <Route path="/test-init2" init="test-init2" component={Test} />
    <Route path="/test-redux" init="test-redux" component={ConnectedTestRedux} />
  </Route>
);
