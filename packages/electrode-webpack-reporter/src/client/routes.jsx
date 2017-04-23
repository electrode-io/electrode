import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import Home from "./components/home";
import Report from "./components/report";
import Legacy from "./components/legacy";
import RoutePaths from "../../lib/route-paths";

const Routes = (props) => (
  <Router history={browserHistory}>
    <Route path={RoutePaths.BASE} component={Home}>
      <IndexRoute component={() => (<Report webpackInfo={props} />)} />
      <Route path={RoutePaths.REPORT} component={() => (<Report webpackInfo={props} />)} />
      <Route path={RoutePaths.LEGACY} component={() => (<Legacy legacy={props.legacy} />)} />
    </Route>
  </Router>);

const mapStateToProps = (state) => state;

Routes.propTypes = {
  legacy: PropTypes.object
};


export default connect(
  mapStateToProps
)(Routes);
