import React from "react";
import PostCSS from "./demo";
import styles from "./postcssDemo.css";
import css from "./demo.css";

const PostCSSDemo = () => (
  <div>
    <h3>The Output:</h3>
    <PostCSS />
    <h3>The Files: </h3>
    <pre className={styles.outline}>{JSON.stringify(css)}</pre>
  </div>
);

export default PostCSSDemo;
