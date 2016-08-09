import React, { Component } from "react";
import ReactDOM from "react-dom";
import Playground from "component-playground";
import assign from "object-assign";
import warning from "warning";

const EMPTY_ARRAY = [];

export default class ElectrodeDemoIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      libraryScope: props.libraryScope,
      components: props.components
    };
  }

  componentWillReceiveProps(props) {
    if (
      props.libraryScope !== this.state.libraryScope ||
      props.components !== this.state.components
    ) {
      this.setState({
        libraryScope: props.libraryScope,
        components: props.components
      });
    }
  }

  _setDemoContext(libraryScope, components) {
    warning(
      false,
      "DEPRECATED! Extending ElectrodeDemoIndex has been deprecated and will be " +
      "removed in the next major version. Please update the code: \n" +
      "```\n" +
      "export default class extends ElectrodeDemoIndex {\n" +
      "  componentDidMount () {\n" +
      "    this._setDemoContext(libraryScope, components);\n" +
      "  }\n" +
      "}\n" +
      "```\n" +
      " to be:\n" +
      "```\n" +
      "export default () => (\n" +
      "  <ElectrodeDemoIndex libraryScope={libraryScope} components={components} />;\n" +
      ");\n" +
      "```\n"
    );

    this.setState({
      libraryScope,
      components
    });
  }

  render() {

    const localScope = assign({ React, ReactDOM }, this.props.scope || {}, this.state.libraryScope);
    const components = this.state.components || EMPTY_ARRAY;

    return (
      <div className="component-documentation">
        {components.map((component, index) => {

          const {
            options,
            title,
            examples
          } = component;

          const ux = options && options.ux ?
            options.ux() : null;

          return (
            <div key={index}>
              <h3 id={title}>{title}</h3>
              {examples.map((example, subindex) => (
                <div className="component-section" key={subindex}>
                  {example.title ?
                    <a name={example.title.replace(/\s/g, "").toLowerCase()}/> : null }
                  {example.title ? <h4>{example.title}</h4> : null}
                  <Playground codeText={example.code}
                    scope={assign(localScope, example.extraScope || {})}
                    noRender={example.noRender}/>
                </div>
              ))}
              {index === 0 && ux ? ux : ""}
            </div>
          );
        })}
      </div>
    );
  }
}

ElectrodeDemoIndex.propTypes = {
  scope: React.PropTypes.object,
  libraryScope: React.PropTypes.object,
  components: React.PropTypes.array
};
