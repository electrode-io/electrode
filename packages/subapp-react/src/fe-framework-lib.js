import React from "react";
import {  createRoot, hydrateRoot } from 'react-dom/client';

class FrameworkLib {
  constructor(ref) {
    this.ref = ref;
  }

  renderStart() {
    const { subApp, element, options } = this.ref;

    const props = { ...options._prepared, ...options.props };
     const Component = subApp.info.StartComponent || subApp.info.Component;
    if (element) {
      if (options.serverSideRendering) {
          hydrateRoot(element, <Component {...props} />);
      } else {
        createRoot(element).render(<Component {...props} />);
      }
    } else {
      // no DOM element to render into, just return subapp as a component
      return <Component {...props} />;
    }
  }
}

export default FrameworkLib;
