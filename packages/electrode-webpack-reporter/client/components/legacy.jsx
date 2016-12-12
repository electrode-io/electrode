import React, {PropTypes} from "react";

const style = {
  whiteSpace: "pre-wrap"
};

const Legacy = (props) => (
  <pre style={style} dangerouslySetInnerHTML={{__html: props.legacy}} />
);

Legacy.propTypes = {
  legacy: PropTypes.string
};

export default Legacy;
