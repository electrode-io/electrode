import { reduxLoadSubApp } from "subapp-redux";
import { React } from "subapp-react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Products } from "../components/products";
import { Deals } from "../components/deals";
import { Navigation } from "../components/navigation";
import { reducers } from "../redux-store/reducers/root-reducer";
import { decNumber, incNumber } from "../redux-store/actions/number-actions";
import logger from "redux-logger";
const mapStateToProps = (state) => state;

const HomeComp = (props) => {
  const unmountSubapp = ({ subappName }) => {
    const subapp = xarcV1.getSubApp(subappName);
    const { subappRoot } = subapp.info;
    subappRoot.unmount();
  };
  return (
    <div className="container-fluid text-center">
      <p>HOME</p>
      <button onClick={() => unmountSubapp({ subappName: "Header" })}> Unmount Header</button>
      <button onClick={() => unmountSubapp({ subappName: "Footer" })}> Unmount Footer</button>

      <div>
        <span style={{ color: "orange", fontSize: "large" }}>
          Redux State Demo
          <br />
          Check out the number below and footer's submit.
          <br />
          You can do the same on other tabs too, if available.
          <br />
          <button onClick={() => props.dispatch(decNumber())}>&#8810;</button>
          <span style={{ color: "black", fontWeight: "bold", padding: "0 1rem 0 1rem" }}>
            {props.numberReducer.number}
          </span>
          <button onClick={() => props.dispatch(incNumber())}>&#8811;</button>
        </span>
      </div>
    </div>
  );
};

const Stores = () => `Stores`;
const Contact = () => `Contact`;

const MainBody = (props) => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/deals" element={<Deals />} {...props} />
        <Route path="/stores" element={<Stores />} {...props} />
        <Route path="/contact" element={<Contact />} {...props} />
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
  middleware: () => [logger],
  reduxShareStore: true,
  reduxReducers: reducers,
  StartComponent: (props) => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  },
});
