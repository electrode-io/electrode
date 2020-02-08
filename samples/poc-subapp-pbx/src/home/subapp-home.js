/** @jsx h */

import {
  h,
  reduxBundlerLoadSubApp,
  dynamicLoadSubApp,
  AppContext,
  xarc,
  Component
} from "subapp-pbundle";

// import bundleA from "../group-1-a/bundle-a";
// import bundleB from "../group-1-b/bundle-b";

import "tachyons-sass/tachyons.scss";

class SubApp extends Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ ssr }) => {
          if (ssr) {
            const xarcInlineSSR = ssr.request.app.xarcInlineSSR;
            const ssrInfo = xarcInlineSSR && xarcInlineSSR[this.props.name];
            if (ssrInfo) {
              const __html = ssrInfo.lib.handleSSRSync();
              return <div dangerouslySetInnerHTML={{ __html }} />;
            } else {
              return "";
            }
          }

          const { name } = this.props;

          const subapp = xarc.getSubApp(name);
          if (subapp && xarc.getBundle(name)) {
            return subapp.inline({ group: "1", props: this.props });
          } else {
            const onLoad = () => this.setState({ ready: true });
            dynamicLoadSubApp({ name, onLoad });

            // if not, return loadingComponent
            return this.props.fallback || "";
          }
        }}
      </AppContext.Consumer>
    );
  }
}

const Home = () => {
  return (
    <div>
      <h1>Home Page - test hello world</h1>
      <SubApp name="Group1A" />
      <SubApp name="Group1B" />
      <SubApp name="Demo1" />
    </div>
  );
};

export default reduxBundlerLoadSubApp({
  name: "Home",
  Component: Home,
  // TBD: one time props/state initializing hook
  // bootstrap() {},
  // TBD: each instance props/state initializing hook
  // initialize() {},
  reduxBundles: []
});
