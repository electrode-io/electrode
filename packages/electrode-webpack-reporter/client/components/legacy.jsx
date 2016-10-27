import React, {PropTypes} from "react";

const Legacy = (props) => (
  <pre dangerouslySetInnerHTML={ {__html: props.legacy} }></pre>
);

Legacy.propTypes = {
  legacy: PropTypes.string
};

export default Legacy;
