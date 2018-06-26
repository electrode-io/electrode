// @flow

import * as React from "react";
import PropTypes from "prop-types";

type LinkType = {
  onClick: () => void,
  active: boolean,
  children: React.Node
};

const Link = ({ onClick, active, children }: LinkType) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
