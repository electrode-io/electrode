import React, {PropTypes} from "react";
import styles from "../styles/base.css";

const Legacy = (props) => (
  <div className={styles.legacy}>
    <pre dangerouslySetInnerHTML={{__html: props.legacy}} />
  </div>
);

Legacy.propTypes = {
  legacy: PropTypes.string
};

export default Legacy;
