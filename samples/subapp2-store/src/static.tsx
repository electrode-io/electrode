// demo subapp with static props
import { React, staticPropsFeature, createDynamicComponent, ReactSubApp } from "@xarc/react";
import { xarcV2 } from "@xarc/react";
import { demo1 } from "./home";
import custom from "./styles/custom.module.css"; // eslint-disable-line no-unused-vars

const Demo1 = createDynamicComponent(demo1, { ssr: true });

xarcV2.debug("static.tsx");
const StaticHome = props => {
  // TODO: Problem with typescript only.  Need this dummy var assign to reference custom
  // import else something drops it.
  const y = custom; // eslint-disable-line

  return (
    <div styleName="custom.container">
      <h1>Static Props Demo</h1>
      props: {JSON.stringify(props)}
      <h1>Demo1 in static home</h1>
      <Demo1 />
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: StaticHome,
  wantFeatures: [
    staticPropsFeature({
      serverModule: require.resolve("./static-props")
    })
  ]
};
