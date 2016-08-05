/*@flow*/
/*global document:false*/
import React from "react";
import Playground from "component-playground";
import assign from "object-assign";
import { addLocaleData, IntlProvider } from "react-intl";

import * as libraryScope from "../src/index";

const locale = "en";
const messages = require(`../src/lang/${locale}.json`);
const localeData = require(`react-intl/locale-data/${locale}`);

addLocaleData(localeData);

const getCodeText = (example) => {
  return example.noRender ? [
    "<IntlProvider locale={locale} messages={messages}>\n",
    ` ${example.code}`,
    "</IntlProvider>\n"
  ].join("") : example.code;
};

export default class Index extends React.Component {
  render() {
    const localScope = assign(
      { React },
      libraryScope,
      {IntlProvider, messages, locale},
      this.props.scope || {}
    );
    return (
      <div className="component-documentation">
        {Index.Components.map((component, index) => (
          <div key={index}>
            <h3 id={component.title}>{component.title}</h3>
            {component.examples.map((example, subindex) => (
              <div key={subindex}>
                {example.title ? <h4>{example.title}</h4> : null}
                <Playground codeText={getCodeText(example)}
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
