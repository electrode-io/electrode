/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from "react";
import { IntlProvider, intlShape } from "react-intl";
import { mount, shallow } from "enzyme";

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require("src/lang/en.json"); // en.json

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: "en", messages }, {});
const { intl } = intlProvider.getChildContext();

/*
  When using React-Intl `injectIntl` on components, props.intl is required.
*/
const nodeWithIntlProp = node => {
  return React.cloneElement(node, { intl });
};

const shallowWithIntl = node => {
  return shallow(
    nodeWithIntlProp(node),
    {
      context: {intl}
    }
  );
};

const mountWithIntl = node => {
  return mount(
    nodeWithIntlProp(node),
    {
      context: {intl},
      childContextTypes: { intl: intlShape }
    }
  );
};

export { nodeWithIntlProp, shallowWithIntl, mountWithIntl };
