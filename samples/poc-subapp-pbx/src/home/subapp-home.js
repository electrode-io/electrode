/** @jsx h */

import {
  h,
  reduxBundlerLoadSubApp,
  lazyLoadSubApp,
  AppContext,
  xarc,
  Component
} from "subapp-pbundle";

// import bundleA from "../group-1-a/bundle-a";
// import bundleB from "../group-1-b/bundle-b";

import "tachyons-sass/tachyons.scss";

// ssr inline subapp
const SSRSubApp = props => {
  return (
    <AppContext.Consumer>
      {({ ssr }) => {
        let __html;
        if (!ssr) {
          __html = `<!-- SSRSubApp did not get ssr from AppContext: ${props.name} -->`;
        } else if (props.dynamic) {
          // everything on SSR is static so we can't handle dynamic render subapp into
          // a DOM element.
          return "";
        } else {
          const xarcInlineSSR = ssr.request.app.xarcInlineSSR;
          const ssrInfo = xarcInlineSSR && xarcInlineSSR[props.name];
          if (ssrInfo) {
            __html = ssrInfo.lib.handleSSRSync();
          } else {
            __html = `<!-- SSRSubApp did not find ssrInfo: ${props.name} -->`;
          }
        }

        return <div dangerouslySetInnerHTML={{ __html }} />;
      }}
    </AppContext.Consumer>
  );
};

// client side inlining subapp
class ClientSubApp extends Component {
  constructor() {
    super();
    this.state = { ready: false };
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

const SubApp = xarc.IS_BROWSER ? ClientSubApp : SSRSubApp;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showDemo2: true };
  }

  render() {
    return (
      <div>
        <h1>Home Page - test hello world</h1>
        <SubApp name="Group1A" />
        <SubApp name="Group1B" />
        Demo1 inlined in Home
        <SubApp name="Demo1" />
        <button onClick={() => this.setState({ showDemo2: !this.state.showDemo2 })}>
          Toggle Demo2 inlined in Home
        </button>
        {this.state.showDemo2 && " - Now including Demo 2!"}
        {this.state.showDemo2 && <SubApp dynamic name="Demo2" />}
        <p>End of SubApp Home</p>
      </div>
    );
  }
}

export default reduxBundlerLoadSubApp({
  name: "Home",
  Component: Home,
  // TBD: one time props/state initializing hook
  // bootstrap() {},
  // TBD: each instance props/state initializing hook
  // initialize() {},
  reduxBundles: []
});
