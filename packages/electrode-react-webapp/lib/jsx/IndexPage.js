"use strict";

const Component = require("./Component");

class IndexPage extends Component {
  static memoize(props) {
    return `<!DOCTYPE ${props.DOCTYPE || "html"}>`;
  }
}

module.exports = IndexPage;
