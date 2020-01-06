/** @jsx h */
import { h, render, hydrate } from "preact";

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
        hydrate(<Component {...props} />, element);
      } else {
        render(<Component {...props} />, element);
      }
    } else {
      // no DOM element to render into, just return subapp as a component
      return <Component {...props} />;
    }
  }
}

export default FrameworkLib;
