import { React, loadSubApp } from "subapp-react";
import Spinner from "../components/Spinner";
const { Suspense, useState, lazy, useTransition } = React;

const Comments = lazy(() => import("../components/Comments"));
const Users = lazy(() => import("../components/Users"));

const SuspenseDemo = () => {
  const [showComments, setShowComments] = useState(true);

  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setShowComments(!showComments);
    });
  };

  return (
    <div className="container-fluid text-center">
      <h2>Suspense Demo</h2>
      <h4>This subapp demonstrates React 18 Suspense feature.</h4>
      <br />            
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
