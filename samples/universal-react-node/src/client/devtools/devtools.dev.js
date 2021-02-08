// @flow

import React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

let DevTools;

if (window.devToolsExtension) {
  DevTools = () => <div />;
  DevTools.instrument = window.devToolsExtension;
} else {
  DevTools = createDevTools(
    <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  );
}

export default DevTools;
