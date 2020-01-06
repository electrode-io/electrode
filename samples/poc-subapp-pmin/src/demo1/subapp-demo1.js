import { h, loadSubApp } from "subapp-pbundle"; /** @jsx h */

const Demo1 = () => {
  return (
    <div>
      <h1>Demo1 Page 12344</h1>
    </div>
  );
};

export default loadSubApp({ name: "Demo1", Component: Demo1 });
