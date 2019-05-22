"use strict";

class Component {
  constructor(props, context) {
    this.props = props;
    this.context = context;
  }

  isComponent() {
    return true;
  }

  render() {
    return "component";
  }
}

module.exports = Component;
