// @flow

import { defineMessages } from "react-intl";

const $tenant: any = "electrodeio";
let tenantMessages;

try {
  tenantMessages = require(`./tenants/${$tenant}/default-messages`); //eslint-disable-line
} catch (err) {
  tenantMessages = {};
}

const messages = defineMessages({
  editMe: {
    description: "Edit this description",
    defaultMessage: "Edit me!",
    id: "DemoComponent.defaultTenant.editMe"
  }
});

export default Object.assign({}, messages, tenantMessages);
