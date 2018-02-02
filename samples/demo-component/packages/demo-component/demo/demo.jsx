import React from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import * as libraryScope from "../src/index";

import Demo from "electrode-demo-index";

const locale = "en";
const messages = require(`../src/lang/${locale}.json`);
const localeData = require(`react-intl/locale-data/${locale}`);

addLocaleData(localeData);

const components = [
  {
    examples: [
      {
        type: "playground",
        code: require("raw-loader!./examples/demo-component.example"),
        noRender: true
      } // any additional examples here
    ]
  } // any additional components here
];

const localScope = { IntlProvider, messages, locale };
const demo = () => <Demo scope={localScope} libraryScope={libraryScope} components={components} />;

export default demo;