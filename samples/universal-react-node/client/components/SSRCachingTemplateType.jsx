import React from "react";
import { connect } from "react-redux";

class SSRCachingTemplateTypeWrapper extends React.Component {
  render() {
    const count = this.props.count;
    var elements = [];

    for(var i = 0; i < count; i++) {
      elements.push(<SSRCachingTemplateType key={i} name={"name"+i} title={"title"+i} rating={"rating"+i}/>);
    }

    return (
      <div>
        { elements }
      </div>
    );
  }
}

class SSRCachingTemplateType extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name} and {this.props.title} and {this.props.rating}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.count
})

export default connect(
  mapStateToProps
)(SSRCachingTemplateTypeWrapper);
