import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import Home from "./components/home";
import Report from "./components/report";
import Legacy from "./components/legacy";

const Routes = (props) => (
  <Router history={browserHistory}>
    <Route path="/reporter" component={Home}>
      <IndexRoute component={() => (<Report webpackInfo={props} />)} />
      <Route path="/reporter/report" component={() => (<Report webpackInfo={props} />)} />
      <Route path="/reporter/legacy" component={() => (<Legacy legacy={props.legacy} />)} />
    </Route>
  </Router>);

const mapStateToProps = (state) => state;

Routes.propTypes = {
  legacy: PropTypes.object
};


export default connect(
  mapStateToProps
)(Routes);
