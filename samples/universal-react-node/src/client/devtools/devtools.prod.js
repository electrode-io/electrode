// @flow

import React from "react";
import identity from "lodash/identity";

const DevTools = () => <div />;

DevTools.instrument = () => identity;

export default DevTools;
