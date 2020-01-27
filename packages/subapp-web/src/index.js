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
  if (!xarc.getBundle(name)) {
    xarc.setBundle(name, true);
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

  subApp.getInstance = options => {
    let element;
    let id = options.id || options.elementId;

    if (!id) {
      id = options._genId;
    } else {
      element = document.getElementById(id);
    }

    let instance = subApp._started.find(x => x.id === id);

    if (!instance) {
      instance = Object.assign({}, options, { id, element });
      subApp._started.push(instance);
    } else if (instance.element !== element) {
      // document has changed
      instance.element = element;
    }

    if (element) {
      console.debug("rendering subapp", name, "into", element);
    }

    return instance;
  };

  subApp.preStart = options => {
    const instance = subApp.getInstance(options);

    if (!instance._prepared) {
      if (subApp.info.prepare) {
        instance._prepared = subApp.info.prepare(subApp.info, instance);
      } else {
        instance._prepared = {};
      }
    }

    return instance;
  };

  subApp.start = options => {
    const instance = subApp.preStart(options);
    // if user provided a start function, then user is expected to
    // have reference to info
    const callStart = () => {
      if (subApp.info.start) {
        return subApp.info.start(instance, instance.element);
      }

      return subApp._renderStart(instance, instance.element);
    };

    if (instance._prepared.then) {
      return instance._prepared.then(r => {
        instance._prepared = r;
        return callStart();
      });
    } else {
      return callStart();
    }
  };

  // xarc.addOnLoadStart(name, options);

  // getOnLoadStart(name)
  //   .forEach(options => setTimeout(() => subApp.start(options), 0));

  return info;
}

export function getSubAppComponent({ name, timeout = 15000, onReady, onError, fallback }) {
  //
}

export function dynamicLoadSubApp({ name, id, timeout = 15000, onLoad, onError, fallback }) {
  // TODO: timeout and callback
  const lname = name.toLowerCase();

  const renderToDomId = subApp => {
    if (!id) {
      return onLoad();
    } else {
      const element = document.getElementById(id);
      if (element && subApp.start) {
        return subApp.start({ id });
      }
    }
  };

  const renderInline = () => {
    const subApp = xarc.getSubApp(name);
    if (subApp) {
      return "Render inline";
    }
    return false;
  };

  if (xarc.getBundle(name) === undefined) {
    xarc.loadSubAppBundles(lname);
  } else if (!id && !onLoad) {
    const inlined = renderInline();
    if (inlined) {
      return inlined;
    }
  }

  const startTime = Date.now();

  const load = delay => {
    setTimeout(() => {
      const subApp = xarc.getSubApp(name);
      if (subApp) {
        return renderToDomId(subApp);
      }

      if (timeout > 50 && Date.now() - startTime > timeout) {
        return onError(new Error("dynamicLoadSubApp Timeout"));
      }

      return load(50);
    }, delay);
  };

  load(0);

  return fallback;
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
