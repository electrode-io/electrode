import React from "react";
import { Component } from "react";
import { unmountComponentAtNode } from "react-dom";
import { loadSubApp, xarc, lazyLoadSubApp } from "subapp-react";

async function loadRemoteModule(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");

  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module;
}

function testLoadRemoteModule(scope, module) {
  return new Promise(resolve => {
    if (window[scope]) {
      loadRemoteModule(scope, module).then(x => {
        console.log("loaded module", x, "default", x.default);
        resolve(x);
      });
    } else {
      loadjs("http://localhost:3001/js/_remote_~.poc_subapp.js", "remote_extras", () => {
        console.log("loaded _remote_~.poc_subapp.js");
        loadRemoteModule(scope, module).then(x => {
          console.log("loaded module", x, "default", x.default);
          resolve(x);
        });
      });
    }
  });
}

// client side inlining subapp
class ClientSubApp extends Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  componentWillUnmount() {
    if (this.elementId) {
      const el = window.document.getElementById(this.elementId);
      if (el) {
        unmountComponentAtNode(el);
      }
    }
  }

  render() {
    const { name, group } = this.props;

    const onLoad = () => this.setState({ ready: true });
    const subapp = xarc.getSubApp(name);

    if (this.props.dynamic) {
      // dynamic means we will create a DOM element with an id for the subapp to render itself into later
      if (!this.elementId) {
        this.elementId = Math.random().toString();
      }
      lazyLoadSubApp({ id: this.elementId, group, name, onLoad });

      let fallback;
      if (subapp && xarc.getBundle(name)) {
        fallback = "";
      } else {
        // TODO: figure out why preact.render doesn't remove the fallback content
        // and what's the solution
        fallback = "";
        // fallback = this.props.fallback || `wait for render from subapp ${name}`;
      }
      // if not, return loadingComponent
      return <div id={this.elementId}>{fallback}</div>;
    } else {
      // the subapp should return its component to us to be directly rendered into the component tree
      if (subapp && xarc.getBundle(name)) {
        // subapp instantiated and bundle available, directly execute it to get its component
        // for the component tree.
        return subapp.inline({ group, props: this.props });
      }

      lazyLoadSubApp({ group, name, onLoad });
      // if not, return loadingComponent
      return this.props.fallback || <div>loading bundle for subapp {name}</div>;
    }
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      Deal: () => <div></div>,
      Extras: () => <div></div>
    };
  }
  render() {
    return (
      <div>
        <h1>Home Page - abc hello world</h1>
        <button
          onClick={() => {
            return testLoadRemoteModule("__remote_poc_subapp", "./Deal").then(mod => {
              console.log("setting component", mod.default.Component);
              this.setState({
                ...this.state,
                Deal: () => <ClientSubApp dynamic name="Deal" />
              });
              testLoadRemoteModule("__remote_poc_subapp", "./Extras").then(mod => {
                console.log("extras subapp loaded");
                this.setState({
                  ...this.state,
                  Extras: () => <ClientSubApp dynamic name="Extras" />
                });
              });
            });
          }}
        >
          test load remote module
        </button>
        <this.state.Deal />
        <this.state.Extras />
      </div>
    );
  }
}

export default loadSubApp({
  name: "Home",
  Component: Home
  // TBD: one time props/state initializing hook
  // bootstrap() {},
  // TBD: each instance props/state initializing hook
  // initialize() {},
});
