import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { renderFlatRoutes } from "./render-flat-routes";

class Home extends React.Component {
  render() {
    const { search } = this.props.location;
    const query = search ? ` - Query: ${search}` : "";
    return <div>Home{query}</div>;
  }
}

class Page extends React.Component {
  render() {
    const { route, children } = this.props;
    return (
      <div>
        Page
        {renderFlatRoutes(route.routes)}
        {children}
      </div>
    );
  }
}

class Test extends React.Component {
  render() {
    return <div>Test</div>;
  }
}

class TestBasename extends React.Component {
  render() {
    return <Link to="/to-target">Test</Link>;
  }
}

class TestRedirect extends React.Component {
  render() {
    return (
      <div>
        <Test />
        <Redirect to="/redirect-target" />
      </div>
    );
  }
}

function TestRedux({ inc }) {
  inc();

  return <div>Test Redux</div>;
}

const ConnectedTestRedux = connect(
  null,
  dispatch => ({ inc: () => dispatch({ type: "INC_NUMBER" }) })
)(TestRedux);

//
// Similar React Router 3 routes
//
// import { Route, IndexRoute, Redirect } from "react-router";
//
// export default (
//   <Route path="/test" component={Page}>
//     <IndexRoute component={Home} />
//     <Redirect from="source" to="target" />
//     <Route path="/test-init" init={true} component={Test} />
//     <Route path="/test-init2" init="test-init2" component={Test} />
//     <Route path="/test-redux" init="test-redux" component={ConnectedTestRedux} />
//   </Route>
// );
//

//
// - server only listens to top level routes
// - each matching route can independently supply its own handler for preparing the
//   initial redux store and reducers
// - the router engine will take the store and combine all reducers from all matched routes
//   to create a redux store
// - each route should have a name if it supplies redux reducer
// - the name must be unique or routes with the same name must have mutually exclusive paths
// -- ie: a url cannot match multiple routes that have the same name
// - any route that supplies redux reducer should have a init for initializing its initialState on server
// - all reducers are combined with combineReducers or the top level route can provide init that returns rootReducer
//

// init will be passed an object with:

// - request object
// - location which is the url extracted from request object
// - match array
// - route itself
// - inits that is an array of current list of results from other route init so far

// init should return:

const init1 = {
  reducer: { foo: function() {} },
  initialState: { foo: {} }
};

// if init is decorated with async or returns a Promise, then it will be awaited

// - the reducers are combined with redux's combineReducers
// - initialState are merged into a single new object with Object.assign

// - if top level init wants to, it can override the behavior as follows:

// 1. return a reducer that's a function to be use as the sole reducer to create the
//    redux store and to skip the combineReducers behavior

const init2 = {
  reducer: function() {},
  initialState: {}
};

// 2. return a redux store that's to be used directly

const init3 = {
  store: {}
};

const routes = [
  {
    name: "Page",
    path: "/test",
    methods: "get",
    init: null,
    component: withRouter(Page),
    routes: [
      {
        // Default, equivalent of RR3's IndexRoute
        path: "/test",
        exact: true,
        component: Home
      },
      {
        // Default, equivalent of RR3's IndexRoute
        path: "/test/basename",
        exact: true,
        component: TestBasename
      },
      {
        path: "/test/init",
        exact: false,
        init: "./test-init",
        component: Test
      },
      {
        name: "woo",
        path: "/test/redux",
        init: "./test-redux",
        component: ConnectedTestRedux
      },
      {
        path: "/test/component-redirect",
        component: TestRedirect
      },
      {
        path: "/test/init-not-found",
        init: "./test-init-not-found"
      }
    ]
  },
  {
    name: "Page",
    path: "/test-init-nm",
    init: "test-init-nm",
    component: Page,
    routes: [
      {
        // Default, equivalent of RR3's IndexRoute
        path: "/test-init-nm",
        exact: true,
        component: Home
      }
    ]
  },
  {
    path: "/top-reducer",
    component: withRouter(Page),
    init: true,
    routes: [
      {
        path: "/top-reducer/init",
        init: "./test-init",
        component: Test
      },
      {
        name: "woo",
        path: "/top-reducer/redux",
        init: "./test-redux",
        component: ConnectedTestRedux
      }
    ]
  },
  {
    path: "/top-wait",
    component: withRouter(Page),
    init: true,
    useSwitch: false,
    routes: [
      {
        name: "bar",
        path: "/top-wait/init",
        init: "./test-init",
        component: Test
      },
      {
        //
        // Not sure why, but potentially it is valid to have another
        // route component that uses the same path.
        // Doing it here to demo that current react-router-config
        // doesn't handle this use case.
        //
        name: "koo",
        path: "/top-wait/init",
        init: "./test-redux",
        component: ConnectedTestRedux
      }
    ]
  },
  {
    path: "/post-only",
    method: "post"
  },
  {
    path: "/invalid-component",
    component: () => {}
  },
  {
    path: "/error-component",
    component: () => {
      throw { status: 404 };
    }
  },
  {
    path: "/throw-error",
    init: "./test-init",
    component: () => {
      throw new Error("failed error");
    }
  },
  {
    path: "/escape-chars",
    init: "./escape-chars",
    component: () => <div>Hello</div>
  },
  {
    path: "/test-init2",
    init: true,
    component: Test
  }
];

export { routes as default };
