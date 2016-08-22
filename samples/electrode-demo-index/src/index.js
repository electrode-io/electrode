import React, { Component } from "react";
import ReactDOM from "react-dom";
import Playground from "component-playground";
import assign from "object-assign";

const EMPTY_ARRAY = [];

const getCodeText = (example, localScope) => {
  if (!example.noRender) {
    return example.code;
  }

  const scope = assign(localScope, example.extraScope);
  if (!(scope.IntlProvider && scope.locale && scope.messages)) {
    return example.code;
  }

  return [
    "<IntlProvider locale={locale} messages={messages}>\n",
    ` ${example.code}`,
    "</IntlProvider>\n"
  ].join("");
};

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

  render() {

    const localScope = assign({ React, ReactDOM }, this.props.scope || {}, this.state.libraryScope);
    const components = this.state.components || EMPTY_ARRAY;

    return (
      <div className="component-documentation">
        {components.map((component, index) => {

          const {
            title,
            examples
          } = component;

          return (
            <div key={index}>
              <h3 id={title}>{title}</h3>
              {examples.map((example, subindex) => (
                <div className="component-section" key={subindex}>
                  {example.title ?
                    <a name={example.title.replace(/\s/g, "").toLowerCase()}/> : null }
                  {example.title ? <h4>{example.title}</h4> : null}
                  <Playground codeText={getCodeText(example, localScope)}
                    scope={assign(localScope, example.extraScope || {})}
                    noRender={example.noRender}/>
                  </div>
              ))}
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
