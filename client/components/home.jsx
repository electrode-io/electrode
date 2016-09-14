import React from "react";
import { connect } from "react-redux";

class HomeWrapper extends React.Component {
  render() {
    return (
     <Home data={this.props.data}/>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello <a href="https://github.com/electrode-io">Electrode</a></h1>
        <h2>Demonstration Components</h2>
        <ul>
          <li><a href="/csrf">CSRF protection using electrode-csrf-jwt</a></li>
        </ul>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(
  mapStateToProps
)(Home);
