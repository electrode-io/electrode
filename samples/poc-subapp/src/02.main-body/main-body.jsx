import { reduxLoadSubApp } from "subapp-redux";
import { React } from "subapp-react";
import { AppContext } from "subapp-react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Products } from "../components/products";
import { Navigation } from "../components/navigation";
import { Deals } from "../components/deals";
import reduxReducers from "./reducers";

const Home = () => {
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr, subApp }) => {
        return (
          <div className="container-fluid text-center">
            <p>HOME</p>
            <div>SubApp name: {subApp ? subApp.name : "Not Available from context"}</div>
            <div>
              IS_SSR: {`${Boolean(isSsr)}`} HAS_REQUEST: {ssr && ssr.request ? "yes" : "no"}
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

const Stores = () => `Stores`;
const Contact = () => `Contact`;

const MainBody = props => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} {...props} />
        <Route path="/products" element={<Products />} {...props} />
        <Route path="/deals" element={<Deals />} {...props} />
        <Route path="/stores" element={<Stores />} {...props} />
        <Route path="/contact" element={<Contact />} {...props} />
      </Routes>
    </div>
  );
};

const mapStateToProps = state => state;

const Component = connect(mapStateToProps, dispatch => ({ dispatch }))(MainBody);

export default reduxLoadSubApp({
  name: "MainBody",
  Component,
  useReactRouter: true,

  StartComponent: props => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  },

  prepare: async () => {},

  reduxShareStore: true,
  reduxReducers
});
