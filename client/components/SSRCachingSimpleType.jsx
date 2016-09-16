import React from "react";
import { connect } from "react-redux";

class SSRCachingSimpleTypeWrapper extends React.Component {
  render() {
    const count = this.props.count;

    var elements = [];

    for(var i = 0; i < count; i++) {
      elements.push(<SSRCachingSimpleType key={i} navEntry={"NavEntry" + i}/>);
    }

    return (
      <div>
        {elements}
      </div>
    );
  }
}

class SSRCachingSimpleType extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.navEntry}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.count
})

export default connect(
  mapStateToProps
)(SSRCachingSimpleTypeWrapper);
