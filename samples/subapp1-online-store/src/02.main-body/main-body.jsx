import { reduxLoadSubApp } from "subapp-redux";
import { React } from "subapp-react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import logger from "redux-logger";
import { applyMiddleware } from "redux";
import { Products } from "../components/Products";
import { Navigation } from "../components/Navigation";
import reduxReducers, { decNumber, incNumber } from "./reducers";

const mapStateToProps = (state) => state;

const HomeComp = (props) => {
  return (
    <div className="container-fluid text-center">
      <h2>Home Page Content</h2>
      <br />
      <h4>Redux State Demo</h4>
      <button onClick={() => props.dispatch(decNumber())}>&#8810;</button>
      <span style={{ color: "black", fontWeight: "bold", padding: "0 1rem 0 1rem" }}>
        {props.number}
      </span>
      <button onClick={() => props.dispatch(incNumber())}>&#8811;</button>
    </div>
  );
};

const MainBody = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </div>
  );
};

const Home = connect(mapStateToProps, (dispatch) => ({ dispatch }))(HomeComp);
const Component = connect(mapStateToProps, (dispatch) => ({ dispatch }))(MainBody);

export default reduxLoadSubApp({
  name: "MainBody",
  Component,
  useReactRouter: true,
  reduxEnhancer: () => applyMiddleware(logger),
  StartComponent: (props) => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  },
  prepare: async () => {},
  reduxShareStore: true,
  reduxReducers,
});
