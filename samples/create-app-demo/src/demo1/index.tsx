import { React, ReactSubApp } from "@xarc/react";
import { docsLink } from "../info";
// CSS module support for .styl
import styles from "../styles/demo1.mod.styl";
// CSS module support for .css
import styles2 from "../styles/demo1.mod.css";

const Demo1 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p className={styles.demo1}>subapp demo1 (.styl css module blue color)</p>
      <p className={styles2.demo1}>.css module demo blue color</p>
      props: {JSON.stringify(props)}
      <p>
        <a href={docsLink}>Electrode Docs</a>
      </p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo1
};
