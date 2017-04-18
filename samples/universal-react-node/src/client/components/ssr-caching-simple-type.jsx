import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SSRCachingSimpleTypeWrapper extends React.Component {
  render() {
    const count = this.props.count;

    const elements = [];

    for (let i = 0; i < count; i++) {
      elements.push(<SSRCachingSimpleType key={i} navEntry={`NavEntry${i}`}/>);
    }

    return (
      <div>
        {elements}
      </div>
    );
  }
}

SSRCachingSimpleTypeWrapper.propTypes = {
  count: PropTypes.number
};

class SSRCachingSimpleType extends React.Component {
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

const mapStateToProps = (state) => ({
  count: state.count
});

export default connect(
  mapStateToProps
)(SSRCachingSimpleTypeWrapper);
