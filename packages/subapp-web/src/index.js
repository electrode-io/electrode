import { createBrowserHistory } from "history";
import makeSubAppSpec from "./make-subapp-spec";
import xarc from "./xarc";

export { default as makeSubAppSpec } from "./make-subapp-spec";

export { default as xarc } from "./xarc";

let FrameworkLib;

export function setupFramework(frameworkLib) {
  FrameworkLib = frameworkLib;
}

export function loadSubApp(info, renderStart) {
  info = makeSubAppSpec(info);

  const name = info.name;
  let subApp = xarc.getSubApp(name) || { info };

  // mark the subapp's webpack bundle as loaded
  const lname = name.toLowerCase();
  if (!xarc.getBundle(lname)) {
    xarc.setBundle(lname, true);
  }

  // subapp already loaded, do nothing and return the info
  if (subApp._started) {
    // console.error("SubApp", name, "already loaded");
    return info;
  }

  subApp._started = [];
  xarc.setSubApp(name, subApp);

  subApp._renderStart =
    renderStart ||
    ((options, element) => {
      const lib = new FrameworkLib({ subApp, element, options });

      return lib.renderStart();
    });

  subApp.start = options => {
    let instance;
    let element;
    const id = options.id || options.elementId;

    if (id) {
      element = document.getElementById(id);
      instance = subApp._started.find(x => x.id === id);

      if (!instance) {
        instance = Object.assign({}, options, { id, element });
        subApp._started.push(instance);
      } else {
        instance.element = element;
      }
      console.log("rendering subapp", name, "into", element);
    } else {
      // inline rendering, no instance
      instance = { props: options.props };
    }

    const callStart = () => {
      // if user provided a start function, then user is expected to
      // have reference to info
      if (subApp.info.start) {
        return subApp.info.start(instance, element);
      }

      return subApp._renderStart(instance, element);
    };

    if (subApp.info.prepare) {
      const _prepared = subApp.info.prepare(subApp.info, instance);
      if (_prepared.then) {
        return _prepared.then(r => {
          instance._prepared = r;
          return callStart();
        });
      } else {
        instance._prepared = _prepared;
      }
    }

    return callStart();
  };

  xarc.getOnLoadStart(name).forEach(options => setTimeout(() => subApp.start(options), 0));

  return info;
}

export function dynamicLoadSubApp({ name, id, timeout = 15000, onLoad, onError }) {
  // TODO: timeout and callback
  const lname = name.toLowerCase();

  if (xarc.getBundle(name) === undefined) {
    xarc.loadSubAppBundles(lname);
  }
  const startTime = Date.now();

  const load = delay => {
    setTimeout(() => {
      const subApp = xarc.getSubApp(name);
      if (subApp) {
        if (!id) {
          return onLoad();
        } else {
          const element = document.getElementById(id);
          if (element && subApp.start) {
            return subApp.start({ id });
          }
        }
      }

      if (timeout > 50 && Date.now() - startTime > timeout) {
        return onError(new Error("dynamicLoadSubApp Timeout"));
      }

      return load(50);
    }, delay);
  };

  load(0);
}

export function getBrowserHistory() {
  if (!xarc.rt.history) xarc.rt.history = createBrowserHistory();
  return xarc.rt.history;
}

export function hotReloadSubApp(info) {
  info = info.default || info; // check for es6 module
  const subApp = xarc.getSubApp(info.name);
  subApp.info = info;
  subApp._started.forEach(instance => setTimeout(() => subApp.start(instance), 0));
}
