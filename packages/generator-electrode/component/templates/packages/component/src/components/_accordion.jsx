import React from "react";
import propTypes from "prop-types";
import styles from "../../src/styles/accordion.css";

export default class Accordion extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const stateStyle = this.state.active ? styles.active : styles.inactive;

    return (
      <section>
        <a onClick={this.handleToggle}>
          {this.props.summary}
        </a>
        <p className={stateStyle}>
          {this.props.details}
        </p>
      </section>
    );
  }
}

Accordion.propTypes = {
  summary: propTypes.string.isRequired,
  details: propTypes.string.isRequired
};
