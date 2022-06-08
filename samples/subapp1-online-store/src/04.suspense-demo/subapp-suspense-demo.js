import { React, loadSubApp } from "subapp-react";
import Spinner from "../components/Spinner";
const { Suspense, useState, lazy, useTransition } = React;

/* 
This Suspended component can be imported with the regular import statement 
because it is an SSR component and it loads before Users component.
*/
import Comments from "../components/Comments";

// This component has to be lazy loaded for CSR Suspense to work
const Users = lazy(() => import("../components/Users"));


const SuspenseDemo = () => {
  const [showComments, setShowComments] = useState(true);

  // New React 18 hook to work with transitions
  const [isPending, startTransition] = useTransition();  
  // isPending indicates when a transition is active to show a pending state

  const handleClick = () => {
    // startTransition lets you mark updates in the provided callback as transitions.
    startTransition(() => {
      setShowComments(!showComments);
    });
  };

  return (
    <div className="container-fluid text-center">
      <h2>Suspense Demo</h2>
      <h4>This subapp demonstrates React 18 Suspense feature.</h4>
      <br />        

      {/* Here we are checking isPending value when the transition starts. If true, it changes div's opacity. 
      isPending goes back to false when transition completes and opacity switches back to value of 1 */}
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <Suspense fallback={<Spinner />}>
          <button onClick={handleClick}>{showComments ? `Show Users` : `Show Comments`}</button><br />
          {showComments ? <Comments /> : <Users />}
        </Suspense>
      </div>
    </div>
  );
};

export default loadSubApp({
  name: "SuspenseDemo",
  Component: SuspenseDemo,
});
