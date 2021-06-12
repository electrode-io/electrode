import { loadSubApp } from "subapp-react";

const Demo3 = () => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo3</p>
      <p>
        <a href="https://wmlink.wal-mart.com/electrode">Electrode Docs</a>
      </p>
    </div>
  );
};

export default loadSubApp({
  Component: Demo3,
  name: "Demo3"
});
