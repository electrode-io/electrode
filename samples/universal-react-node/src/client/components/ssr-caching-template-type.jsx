// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

type TypeWrapperProps = {
  count: number
};

type TypeProps = {
  name: string,
  title: string,
  rating: string
};

class SSRCachingTemplateTypeWrapper extends Component<TypeWrapperProps> {
  render() {
    const count = this.props.count;
    const elements = [];

    for (let i = 0; i < count; i++) {
      elements.push(
        <SSRCachingTemplateType
          key={i}
          name={`name${i}`}
          title={`title${i}`}
          rating={`rating${i}`}
        />
      );
    }

    return <div>{elements}</div>;
  }
}

SSRCachingTemplateTypeWrapper.propTypes = {
  count: PropTypes.number
};

class SSRCachingTemplateType extends Component<TypeProps> {
  render() {
    return (
      <div>
        <p>
          {this.props.name} and {this.props.title} and {this.props.rating}
        </p>
      </div>
    );
  }
}

SSRCachingTemplateType.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.string
};

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(SSRCachingTemplateTypeWrapper);
