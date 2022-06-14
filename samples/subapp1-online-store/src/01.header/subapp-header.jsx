// @subapp@ {name: "Header"}
import { loadSubApp, React } from "subapp-react";

const Header = () => {
  return (
    <div className="text-center">
      <h1>
        SubApp Version 1 with React v18
      </h1>
    </div>
  );
};

export default loadSubApp({ name: "Header", Component: Header });
