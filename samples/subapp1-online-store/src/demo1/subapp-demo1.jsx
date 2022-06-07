import { loadSubApp, React } from "subapp-react";

const Demo1 = () => {
  return (
    <div className="text-center">
      <h2>Demo1</h2>
      <h3>Hello World</h3>
      <h4>This subapp demonstrates static message/title</h4>
    </div>
  );
};

export default loadSubApp({ name: "Demo1", Component: Demo1 });
