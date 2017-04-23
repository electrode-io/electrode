import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class SSRCachingTemplateTypeWrapper extends React.Component {
  render() {
    const count = this.props.count;
    const elements = [];

    for (let i = 0; i < count; i++) {
      elements.push(
        <SSRCachingTemplateType key={i} name={`name${i}`}
          title={`title${i}`} rating={`rating${i}`} />
      );
    }

    return (
      <div>
        {elements}
      </div>
    );
  }
}

SSRCachingTemplateTypeWrapper.propTypes = {
  count: PropTypes.number
};

class SSRCachingTemplateType extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name} and {this.props.title} and {this.props.rating}</p>
      </div>
    );
  }
}

SSRCachingTemplateType.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.string
};

const mapStateToProps = (state) => ({
  count: state.count
});

export default connect(
  mapStateToProps
)(SSRCachingTemplateTypeWrapper);
