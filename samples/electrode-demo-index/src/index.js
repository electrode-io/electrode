import React, { Component } from "react";
import Playground from "component-playground";
import assign from "object-assign";

export default class ElectrodeDemoIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      libraryScope: null,
      components: []
    };
  }

  _setDemoContext(libraryScope, components) {
    this.setState({
      libraryScope,
      components
    });
  }

  render() {

    const localScope = assign({ React }, this.props.scope || {}, this.state.libraryScope);
    const components = this.state.components;

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
              <a name={title.replace(/\s/g, "").toLowerCase()}/>
              <h3 id={title}>{title}</h3>
              {examples.map((example, subindex) => (
                <div key={subindex}>
                  {example.title ? <h4>{example.title}</h4> : null}
                  <Playground codeText={example.code}
                    scope={localScope}
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
  scope: React.PropTypes.object
};