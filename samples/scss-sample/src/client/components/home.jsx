import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleCheck, incNumber, decNumber } from "../actions";
import electrodePng from "../images/electrode.jpg";
import Counter from "./counter";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="scss-demo">
        <section className="banner">
          <img src={electrodePng} />
          <h1>Electrode SCSS Demo</h1>
          <p>
            The new main syntax (as of Sass 3) is known as SCSS, and is a superset of
            CSS3's syntax. This means that every valid CSS3 stylesheet is valid SCSS as well.
            SCSS files use the extention .scss.
          </p>
          <p>
            For more information,
            please refer <a target="_blank" href="http://sass-lang.com/">here</a>.
          </p>
        </section>

        <Counter
           value={this.props.store.counter}
           onIncrement={()=> this.props.dispatch({type: 'INCREMENT'})}
           onDecrement={()=> this.props.dispatch({type: 'DECREMENT'})}
        />
      </div>
      );
    }
  }


  const mapStateToProps = (state) => {
    return {
      store: state
    }
  };

  export default connect(mapStateToProps)(Home);
