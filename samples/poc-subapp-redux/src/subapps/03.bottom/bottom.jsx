import { React } from "subapp-react";
import { reduxLoadSubApp } from "subapp-redux";
import { Route, BrowserRouter, Routes } from "react-router";
import { createStore } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// eslint-disable-next-line
const MoreProducts = props => {
  return (
    <div className="container">
      <h1 className="display-4">More Products</h1>
    </div>
  );
};

MoreProducts.propTypes = {
  imagesData: PropTypes.array.isRequired
};

const MoreDeals = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">More Deals</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  );
};

const Bottom = props => {
  return (
    <Routes>
      <Route path="/products" element={<MoreProducts {...props} imagesData={[]} />} />
      <Route path="/deals" element={<MoreDeals />} />
    </Routes>
  );
};

const Component = connect(
  state => state,
  dispatch => ({ dispatch })
)(Bottom);

export default reduxLoadSubApp({
  name: "Bottom",
  useReactRouter: true,
  Component,
  StartComponent: props => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  },
  reduxCreateStore: initialState => {
    return createStore(s => s, initialState);
  }
});
