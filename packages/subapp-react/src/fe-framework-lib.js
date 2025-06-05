import { createRoot, hydrateRoot } from "react-dom/client";

class FrameworkLib {
  constructor(ref) {
    this.ref = ref;
  }

  renderStart() {
    const { subApp, element, options } = this.ref;

    const props = { ...options._prepared, ...options.props };
    const Component = subApp.info.StartComponent || subApp.info.Component;
    let subappRoot;
    if (element) {
      if (options.serverSideRendering) {
        subappRoot = hydrateRoot(element, <Component {...props} />);
      } else {
        subappRoot = createRoot(element);
        subappRoot.render(<Component {...props} />);
      }

      subApp.info.subappRoot = subappRoot;
    } else {
      // no DOM element to render into, just return subapp as a component
      return <Component {...props} />;
    }
  }
}

export default FrameworkLib;
