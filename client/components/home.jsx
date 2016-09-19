import React, { PropTypes } from "react";
import { connect } from "react-redux";

class HomeWrapper extends React.Component {
  render() {
    return (
     <Home data={this.props.data}/>
    );
  }
}

HomeWrapper.propTypes = {
  data: PropTypes.object
};

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello <a href="https://github.com/electrode-io">Electrode</a></h1>
        <h2>Demonstration Components</h2>
        <ul>
          <li><a href="/csrf">CSRF protection using electrode-csrf-jwt</a></li>
          <li>
            <a href="/above-the-fold">
            Above the Fold Render - increase your App's performance by using a skip prop
            </a>
          </li>
          <li><a href="/ssrcachingsimpletype">SSR Caching Simple Type Example</a></li>
          <li><a href="/ssrcachingtemplatetype">SSR Caching Template Type Example</a></li>
        </ul>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps
)(HomeWrapper);
