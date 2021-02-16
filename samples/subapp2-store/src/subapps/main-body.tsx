import PropTypes from "prop-types";
import { React, ReactSubApp, xarcV2, declareSubApp, createDynamicComponent } from "@xarc/react";
import { connect, reduxFeature, useDispatch, FeatureDecorator } from "@xarc/react-redux";
import { reactRouterFeature, Route, Switch } from "@xarc/react-router";
import { Navigation } from "../components/navigation";
import { Products } from "../components/products";
import { combineEpics } from "redux-observable";
import { filter, delay, mapTo } from "rxjs/operators";
import { reduxObservableDecor } from "@xarc/react-redux-observable";

const pingEpic = action$ =>
  action$.pipe(
    filter((action: any) => action.type === "PING"),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: "PONG" })
  );

const epics = [];
epics.push(pingEpic);
//const dd = new Middlewares();
////console.log(dd.REDUX_OBSERVABLE);

export const rootEpic = combineEpics(...epics);

export const deals = declareSubApp({
  name: "deals",
  getModule: () => import("../subapps/deal")
});

export const recoilTodoApp = declareSubApp({
  name: "recoilTodoApp",
  getModule: () => import("../subapps/recoilTodo")
});

const Deals = createDynamicComponent(deals, { ssr: true });
const RecoilApp = createDynamicComponent(recoilTodoApp, { ssr: true });

const MainBody = props => {
  return <div>Home</div>;
};

MainBody.propTypes = {
  value: PropTypes.number,
  dispatch: PropTypes.func
};

//
// REDUX
//

const mapStateToProps = state => {
  return { value: state.number.value, items: state.items };
};

const ReduxHome = connect(mapStateToProps, dispatch => ({ dispatch }))(MainBody);

//
// ROUTING
//
const Stores = () => `Stores`;
const Contact = () => `Contact`;

const MainRouter = () => {
  const dispatcher = useDispatch();
  React.useEffect(() => {
    // console.log(`ping called`)
    setInterval(() => {
      dispatcher({ type: "PING" });
    }, 2000);
  }, []);
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact component={ReduxHome} />
        <Route path="/products" component={Products} />
        <Route path="/stores" component={Stores} />
        <Route path="/deals" component={Deals} />
        <Route path="/recoil" component={RecoilApp} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </div>
  );
};

//const ReduxHomeRouter = connect(mapStateToProps, dispatch => ({ dispatch }))(HomeRouter);

export const subapp: ReactSubApp = {
  Component: MainRouter,
  wantFeatures: [
    reduxFeature({
      decorators: [reduxObservableDecor({ rootEpic })],
      React,
      shareStore: false,
      reducers: true,
      // provider({ Component, props }) {}
      prepare: async initialState => {
        xarcV2.debug("Home (home.tsx) subapp redux prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return {
            initialState: {
              deals: { value: "My Special Deals from Main Body App" },
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
    reactRouterFeature({ React, history: true })
    // TODO: https://react-query.tanstack.com/docs/overview
    // reactQueryFeature({})
    // TODO: https://recoiljs.org/
    // recoilFeature({})
  ]
};

export const reduxReducers = {
  number: (store, action) => {
    if (action.type === "PING") {
      console.log(`PING called from epic`);
    }
    if (action.type === "PONG") {
      console.log(`PONG called from epic`);
    }
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
  items: s => {
    return s || { items: [] };
  },
  deals: s => {
    return s || { value: "my deals" };
  }
};
