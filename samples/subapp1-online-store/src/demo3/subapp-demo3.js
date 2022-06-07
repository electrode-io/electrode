import { React, loadSubApp } from "subapp-react";
// import { Route, Routes } from "react-router-dom";
// import { StaticRouter } from "react-router-dom/server";
import Spinner from "../components/Spinner";
// import Navigation from "../components/Navigation";

const Comments = React.lazy(() => import("../components/Comments"));

const Home = () => (  
  <div>
    <h4>This subapp demonstrates React 18 Suspense feature</h4>
  <React.Suspense fallback={<Spinner />}>
    <Comments />
  </React.Suspense>
  </div>
);

const Demo3 = () => {
  return (
    <div className="container-fluid text-center">
      <h2>Demo 3</h2>      
      {/* <StaticRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </StaticRouter> */}
      <Home />
    </div>
  );
};

export default loadSubApp({
  name: "Demo3",
  Component: Demo3,
  useReactRouter: true
});
