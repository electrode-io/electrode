import PropTypes from "prop-types";
import { React, declareSubApp, createDynamicComponent, ReactSubApp, xarcV2, AppContext } from "@xarc/react";
import { connect, reduxFeature } from "@xarc/react-redux";
import { reactRouterFeature, Route, Switch } from "@xarc/react-router";
import { Component as Demo2 } from "./demo2";
import { message } from "./message";
import electrodePng from "../static/electrode.png";
import custom from "./styles/custom.module.css"; // eslint-disable-line no-unused-vars
import Navigation from "./components/navigation";
import { Component as Products } from "./components/products"
export const demo1 = declareSubApp({
  name: "demo1",
  getModule: () => import("./demo1")
});

export const demo1B = declareSubApp({
  name: "demo1b",
  getModule: () => import("./demo1")
});

const Demo1 = createDynamicComponent(demo1, { ssr: true });
const Demo1B = createDynamicComponent(demo1B, { ssr: true });

const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Home = props => {
  // TODO: Problem with typescript only.  Need this dummy var assign to reference custom
  // import else something drops it.
  const y = custom; // eslint-disable-line
  const { dispatch } = props;

  return (
    <AppContext.Consumer>
      {({ isSsr, ssr }) => {
        return (
          <div styleName="custom.container">
            <h1 style={{ textAlign: "center" }}>
              Hello from{" "}
              <a href="https://www.electrode.io">
                Electrode <img src={electrodePng} />
              </a>
            </h1>
          PROPS (Different between server and client): {JSON.stringify(props)}
            <p>
              Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
              <input style={{ textAlign: "center" }} readOnly size="6" value={props.value} />
              <button onClick={() => dispatch(incNumber())}>&#8811;</button>
            </p>
            <p>message: {message}</p>


          </div>
        );

      }}
    </AppContext.Consumer>
  );

};

Home.propTypes = {
  value: PropTypes.number,
  dispatch: PropTypes.func
};

export const reload = msg => {
  console.log("reload", msg, message); // eslint-disable-line
};

//
// REDUX
//

const mapStateToProps = state => {
  return { value: state.number.value, items: state.items };
};

const ReduxHome = connect(mapStateToProps, dispatch => ({ dispatch }))(Home);

//
// ROUTING
//
const Stores = () => `Stores`;
const Contact = () => `Contact`;

const HomeRouter = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact component={ReduxHome} />
        <Route path="/home" component={ReduxHome} />
        <Route path="/products" component={Products} />
        <Route path="/stores" component={Stores} />
        <Route path="/contact" component={Contact} />

      </Switch>
    </div>
  );
};

//const ReduxHomeRouter = connect(mapStateToProps, dispatch => ({ dispatch }))(HomeRouter);

export const subapp: ReactSubApp = {
  Component: HomeRouter,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true,
      // provider({ Component, props }) {}
      prepare: async initialState => {
        xarcV2.debug("Home (home.tsx) subapp redux prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return {
            initialState: {
              number: { value: -1 },
              items: [
                {
                  heading: "BLACK FRIDAY DEAL",
                  imageUrl:
                    "https://i5.walmartimages.com/asr/eb17a965-39fc-4f78-9512-ed9e8535cb3f_2.a3bc9a314bb6bf1d7c323ea038f181b8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                  footer: `VIZIO 50” Class 4K Ultra HD LED TV`,
                  type: "danger"
                },
                {
                  heading: "BLACK FRIDAY DEAL",
                  imageUrl:
                    "https://i5.walmartimages.com/asr/7da972fa-166b-4e32-a59e-eb99d932f97e_1.98742f6c14fb6ecc1feed8c1b2c7d340.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                  footer: `Sharp 40" Class FHD (1080p) LED TV`,
                  type: "success"
                },
                {
                  heading: "BLACK FRIDAY DEAL",
                  imageUrl:
                    "https://i5.walmartimages.com/asr/38ee580a-8e54-48fa-8f0d-4ca6be5b4c29_3.57548f072dc4d4eb3833b7b2837c5f35.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                  footer: `Sceptre 32" Class HD (720P) LED TV`
                },
                {
                  heading: "BLACK FRIDAY DEAL",
                  imageUrl: "https://placehold.it/150x80?text=IMAGE",
                  footer: "Buy 50 mobiles and get a gift card",
                  type: "success"
                },
                {
                  heading: "BLACK FRIDAY DEAL",
                  imageUrl: "https://placehold.it/150x80?text=IMAGE",
                  footer: "Buy 50 mobiles and get a gift card"
                },
                {
                  heading: "BLACK FRIDAY DEAL",
                  imageUrl: "https://placehold.it/150x80?text=IMAGE",
                  footer: "Buy 50 mobiles and get a gift card",
                  type: "success"
                }
              ]
            }
          };
        }
      }
    }),
    // https://reactrouter.com/
    reactRouterFeature({ React })
    // TODO: https://react-query.tanstack.com/docs/overview
    // reactQueryFeature({})
    // TODO: https://recoiljs.org/
    // recoilFeature({})
  ]
};

//
// REDUX reducer
//

export const reduxReducers = {
  number: (store, action) => {
    if (action.type === "INC_NUMBER") {
      return {
        value: store.value + 1
      };
    } else if (action.type === "DEC_NUMBER") {
      return {
        value: store.value - 1
      };
    }

    return store || { value: 999 };
  },
  items: (s) => {
    console.log(`redux reducer called here in home.tsx`)
    return s || { items: [] };
  }
};
