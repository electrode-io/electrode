// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

type TypeWrapper = {
  count: number
};

type Type = {
  navEntry: string
};

class SSRCachingSimpleTypeWrapper extends Component<TypeWrapper> {
  render() {
    const count = this.props.count;

    const elements = [];

    for (let i = 0; i < count; i++) {
      elements.push(<SSRCachingSimpleType key={i} navEntry={`NavEntry${i}`} />);
    }

    return <div>{elements}</div>;
  }
}

SSRCachingSimpleTypeWrapper.propTypes = {
  count: PropTypes.number
};

class SSRCachingSimpleType extends Component<Type> {
  render() {
    return (
      <div>
        <p>{this.props.navEntry}</p>
      </div>
    );
  }
}

SSRCachingSimpleType.propTypes = {
  navEntry: PropTypes.string
};

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(SSRCachingSimpleTypeWrapper);
