import React from "react";
import styles from "./demo.css";

const Demo = () => (
  <div className={styles.main}>
    Div font-size uses `calc` and `gray()` for background-color.
    <p className={styles.highlighted}>This is a `p` tag highlighted using a variable.</p>
    <ul>
      <li className={styles.danger}>Uses @apply to apply the css.</li>
    </ul>

    <a href="/">Home</a>
  </div>
);

export default Demo;
