import { React, ReactSubApp } from "@xarc/react";
import { reactRouterFeature, Route, Switch } from "@xarc/react-router";

const MainBody = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact component={Main} {...props} />
        <Route path="/products" component={About} {...props} />
        <Route path="/contact" component={Contact} {...props} />
      </Routes>
    </div>
  );
};

export default loadSubApp({
  name: "MainBody",
  Component: MainBody,
  useReactRouter: true,
});
