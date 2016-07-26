/*@flow*/
/*global document:false*/
import React from "react";
import Playground from "component-playground";
import assign from "object-assign";

import * as libraryScope from "../src/index.js";

export default class Index extends React.Component {
  render() {
    const localScope = assign({ React }, libraryScope, this.props.scope || {});
    return (
      <div className="component-documentation">
        {Index.Components.map((component, index) => (
          <div key={index}>
            <h3 id={component.title}>{component.title}</h3>
            {component.examples.map((example, subindex) => (
              <div key={subindex}>
                {example.title ? <h4>{example.title}</h4> : null}
                <Playground codeText={example.code}
                  scope={localScope}
                  noRender={example.noRender}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Index.propTypes = {
  scope: React.PropTypes.object
};

Index.Components = [
  {
    title: "<%= componentName %>",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/<%= projectName %>.example"),
        noRender: true
      }
    ]
  }
];
