import { React, ReactSubApp, AppContext, xarcV2 } from "@xarc/react";
import custom from "../components/bootstrap.css";
const Header = (props) => {

  return (
    <div className={custom["text-center"]} style={{ backgroundColor: 'cyan' }}>
      <h1>Online Store</h1>
      <p>Mission, Vision & Values</p>
      <p>{props.value}</p>
    </div>
  );
};


export { Header as Component };

export const subapp: ReactSubApp = {
  Component: Header
};


