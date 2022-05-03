// @subapp@ {name: "Header"}
import { loadSubApp, React } from "subapp-react";

const Header = () => {
  return (
    <div className="text-center">
      <h2>SubApp Header</h2>
      <h3>Hello World</h3>
    </div>
  );
};

export default loadSubApp({ name: "Header", Component: Header });
