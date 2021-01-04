import { createBrowserHistory } from "history";
import makeSubAppSpec from "./make-subapp-spec";
import xarc from "./xarc";

export { default as makeSubAppSpec } from "./make-subapp-spec";

export { default as xarc } from "./xarc";

let FrameworkLib;

export function setupFramework(frameworkLib) {
  FrameworkLib = frameworkLib;
}

export function loadSubApp(info, renderStart, options) {
  setTimeout(() => xarc.watchSubAppOnLoad(), 0);
  info = makeSubAppSpec(info);

  const name = info.name;
  const ns = info.ns;

  let subApp = xarc.getSubApp(name) || { info };

  // mark the subapp's webpack bundle as loaded
  if (!xarc.getBundle(name, ns)) {
    xarc.setBundle(name, true, ns);
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

  subApp.preStart = (instance, options, info) => {
    instance = instance || subApp.getInstance(options);
    info = info || subApp.info;

    if (!instance._prepared) {
      if (info.prepare) {
        instance._prepared = info.prepare(instance, options, info);
      } else {
        instance._prepared = options.initialState || {};
      }
    }

    return instance;
  };

  subApp.preRender = info.__preRender;
  subApp.signalReady = info.__signalReady;

  subApp.start = (instance, options, info) => {
    instance = instance || subApp.preStart(instance, options, info);
    info = info || subApp.info;
    // if user provided a start function, then user is expected to
    // have reference to info
    const callStart = () => {
      if (info.start) {
        return info.start(instance, instance.element);
      }

      return subApp._renderStart(instance, instance.element);
    };

    if (instance._prepared && instance._prepared.then) {
      return instance._prepared.then(r => {
        instance._prepared = r;
        return callStart();
      });
    } else {
      return callStart();
    }
  };

  const findInstanceInGroup = (groupInfo, group, name) => {
    return groupInfo.queue.find(x => {
      if (x.options.name === name && x.options.group === group && x.options.inline) {
        return x.instance;
      }
      return undefined;
    });
  };

  const findFirstGroup = ({ name }) => {
    for (let k in xarc.rt.groups) {
      const groupInfo = xarc.rt.groups[k];
      return findInstanceInGroup(groupInfo, groupInfo.group, name);
    }
  };

  subApp.inline = ({ group, props }) => {
    const fail = msg => {
      console.error(msg);
      return `<!--
****** ${msg}
-->`;
    };

    let found;

    if (group) {
      const groupInfo = xarc.rt.groups[group];
      if (!groupInfo) {
        return fail(`subApp inline unable to find group ${group}`);
      }
      found = findInstanceInGroup(groupInfo, group, subApp.info.name);
      if (!found) {
        return fail(`subApp inline unable to find instance in group ${group} \
for subapp ${subApp.info.name}`);
      }
    } else {
      found = findFirstGroup(props);
      if (!found) {
        return fail(`subApp inline unable to find a group with instance for subApp ${name}`);
      }
    }

    return subApp.start(found.instance, Object.assign({}, found.options, { props }), found.info);
  };

  // xarc.addOnLoadStart(name, options);

  // getOnLoadStart(name)
  //   .forEach(options => setTimeout(() => subApp.start(options), 0));

  return info;
}

export function getSubAppComponent({ name, timeout = 15000, onReady, onError, fallback }) {
  //
}

export function waitForSubApp(name, timeout = 15000) {
  return new Promise((resolve, reject) => {
    lazyLoadSubApp({
      name,
      onLoad: () => resolve(),
      onError: () => reject(),
      timeout
    });
  });
}

export function isLoaded(name) {
  return Boolean(xarc.getSubApp(name));
}

export function lazyLoadSubApp({ name, id, timeout = 15000, onLoad, onError, fallback, ns }) {
  // TODO: timeout and callback
  const lname = name.toLowerCase();

  const renderToDomId = (instance, subApp) => {
    if (!id) {
      return onLoad && onLoad();
    } else {
      const element = document.getElementById(id);
      if (element && subApp.start) {
        return subApp.start(instance, { id });
      }
    }
  };

  const renderInline = () => {
    const subApp = xarc.getSubApp(name);
    if (subApp) {
      return subApp.start(null, {});
    }
    return false;
  };

  if (xarc.getBundle(name, ns) === undefined) {
    xarc.loadSubAppBundles(lname, null, ns);
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
        return xarc.startSubApp(subApp, { id }, true).then(() => renderToDomId(null, subApp));
      }

      if (timeout > 50 && Date.now() - startTime > timeout) {
        return onError(new Error("lazyLoadSubApp Timeout"));
      }

      return load(50);
    }, delay);
  };

  load(0);

  return fallback;
}

export { lazyLoadSubApp as dynamicLoadSubApp };

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
