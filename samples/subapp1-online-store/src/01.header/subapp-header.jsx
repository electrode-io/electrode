// @subapp@ {name: "Header"}
import { loadSubApp, React } from "subapp-react";

const Header = () => {
  return (
    <div className="text-center">
      <h1>Online Store</h1>
      <p>Mission, Vision & Values</p>
    </div>
  );
};

export default loadSubApp({ name: "Header", Component: Header });
