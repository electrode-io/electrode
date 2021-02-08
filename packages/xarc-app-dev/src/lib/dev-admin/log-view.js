

/* eslint-disable no-magic-numbers, no-use-before-define, no-unused-vars */
/* eslint-disable no-console, max-statements, no-param-reassign, complexity */
/* global window, document, EventSource, fetch */

let logStream;
let logStreamReconnectDelay = 5000;
let logStreamReconnectTimer;
let debugStreamEvents;

/**
 *
 */
function startLogStream() {
  const close = () => {
    if (logStream) {
      logStream.close();
    }
    logStream = null;
  };

  close();
  clearTimeout(logStreamReconnectTimer);
  logStreamReconnectTimer = null;

  logStream = new EventSource("/__electrode_dev/stream-logs");
  logStream.addEventListener("log-stream", e => {
    if (debugStreamEvents) {
      console.log("stream event", e);
    }
    const data = JSON.parse(e.data);
    updateLogs(data);
  });
  logStream.addEventListener("open", e => {
    console.log("log stream opened");
    logStreamReconnectDelay = 5000;
  });
  logStream.addEventListener("error", (e, a) => {
    console.log("log stream connect error", e);
    close();
    logStreamReconnectTimer = setTimeout(() => {
      console.log("trying to reconnect log stream", logStreamReconnectDelay);
      startLogStream();
      if (logStreamReconnectDelay < 1000 * 60) {
        logStreamReconnectDelay = Math.floor(logStreamReconnectDelay * 1.5);
      } else {
        logStreamReconnectDelay = 1000 * 60;
      }
    }, logStreamReconnectDelay);
  });
}

setTimeout(startLogStream, 100);

const logDisplayElement = document.getElementById("logs");
// this is the ID of last received and displayed entry
// when received new entries, only those with ID after this are kept
let lastEntryId = { ts: 0, tx: 0 };

/**
 * @param a
 * @param b
 */
function compareEntryId(a, b) {
  if (a.ts === b.ts) {
    return (a.tx || 0) - (b.tx || 0);
  }
  return a.ts - b.ts;
}

/**
 * @param entryId
 */
function stringifyEntryId(entryId) {
  return entryId.tx ? `${entryId.ts},${entryId.tx}` : `${entryId.ts}`;
}

// track logs from across restarted dev servers
let instanceId = -1;

const defaultLevelSelections = {
  error: true,
  warn: true,
  info: true,
  http: true,
  verbose: true,
  debug: true,
  silly: true
};

class HashValues {
  constructor() {
    this.setFromUrl();
  }

  setFromUrl() {
    const hash = window.location.hash;
    if (hash) {
      this._hash = hash
        .substr(1)
        .split("&")
        .reduce((acc, val) => {
          const kvp = val.split("=");
          if (kvp.length === 2 && kvp[0]) {
            acc[kvp[0]] = kvp[1];
          }
          return acc;
        }, {});
    } else {
      this._hash = {};
    }
  }

  toUrl() {
    const str = Object.keys(this._hash)
      .sort()
      .map(k => `${k}=${this._hash[k]}`)
      .join("&");

    return str ? "#" + str : "";
  }

  changed() {
    const str = this.toUrl();
    return str !== window.location.hash;
  }

  add(values) {
    this._hash = { ...this._hash, ...values };
    this.update();
  }

  remove(values) {
    [].concat(values).forEach(k => delete this._hash[k]);
    this.update();
  }

  update() {
    if (this._updateTimer) {
      return;
    }
    this._updateTimer = setTimeout(() => {
      this._updateTimer = undefined;
      const str = this.toUrl();
      if (str !== window.location.hash) {
        window.history.pushState(
          this._hash,
          document.title,
          window.location.pathname + window.location.search + str
        );
      }
    }, 10);
  }

  getInt(name, defaultVal = 0) {
    const int = parseInt(this._hash[name], 10);
    if (Number.isInteger(int)) {
      return int;
    }
    return defaultVal;
  }

  get(name) {
    return this._hash[name];
  }

  has(name) {
    return this._hash.hasOwnProperty(name);
  }

  keys() {
    return Object.keys(this._hash);
  }
}

const hashVal = new HashValues();

/**
 *
 */
function getLevelSelections() {
  const levels = Object.keys(defaultLevelSelections);
  const levelSelections = levels.reduce((acc, level) => {
    const checkBox = document.getElementById("level." + level);
    acc[level] = checkBox.checked;
    return acc;
  }, {});
  return { ...defaultLevelSelections, ...levelSelections };
}

/**
 *
 */
function levelChangeHandler() {
  refreshLogs(getLevelSelections(), false);
}

/**
 * @param levelSelections
 * @param scrollToEnd
 */
function refreshLogs(levelSelections, scrollToEnd = true) {
  levelSelections = levelSelections || getLevelSelections();

  for (let line = logDisplayElement.firstChild; line !== null; line = line.nextSibling) {
    const lvl = line.getAttribute("lvl");
    if (!levelSelections[lvl]) {
      line.setAttribute("class", "hide");
    } else {
      line.removeAttribute("class");
    }
  }

  const offLevels = Object.keys(levelSelections).reduce((acc, k) => {
    if (!levelSelections[k]) {
      acc[k] = false;
    }
    return acc;
  }, {});

  hashVal.remove(Object.keys(levelSelections));
  hashVal.add(offLevels);
}

/**
 *
 */
function clearLogs() {
  while (logDisplayElement.lastChild) {
    logDisplayElement.removeChild(logDisplayElement.lastChild);
  }
}

/**
 *
 */
function wipeLogs() {
  const last = logDisplayElement.lastChild;

  console.log("wipe logs, last", last);
  if (last) {
    const entryId = last.getAttribute("entryId");
    lastEntryId = parseEntryId(entryId);
    hashVal.add({ entryId, id: instanceId });
  } else {
    lastEntryId = { ts: Date.now(), tx: 0 };
    hashVal.add({ entryId: `${Date.now()}`, id: instanceId });
  }
  clearLogs();
}

/**
 * @param data
 * @param levelSelections
 * @param scrollToEnd
 */
async function updateLogs(data, levelSelections, scrollToEnd = true) {
  levelSelections = levelSelections || getLevelSelections();

  if (hashVal.has("id")) {
    instanceId = hashVal.getInt("id");
  }

  let newLogs = data.logs;

  // different instanceId means server would've returned all logs
  if (data.instanceId && instanceId !== data.instanceId) {
    if (hashVal.has("entryId") && instanceId > 0) {
      hashVal.remove(["entryId", "id"]);
      lastEntryId = { ts: 0 };
    }
    instanceId = data.instanceId;
    // instance ID completely different, need to start a clean slate log
    clearLogs();
  } else {
    // filter received logs by timestamp, only the ones after current timestamp are kept

    newLogs = data.logs.filter(l => {
      return compareEntryId(l, lastEntryId) > 0;
    });
  }

  const bounding = logDisplayElement.getBoundingClientRect();
  // check if bottom is in view (< -25 to account for our top margin of 30px)
  const bottomInView =
    bounding.bottom - (window.innerHeight || document.documentElement.clientHeight) < -25;

  if (newLogs.length > 0) {
    newLogs.forEach(event => {
      const newLine = document.createElement("div");
      newLine.setAttribute("lvl", event.level);
      newLine.setAttribute("entryId", stringifyEntryId(event));
      if (!levelSelections[event.level]) {
        newLine.setAttribute("class", "hide");
      }
      newLine.innerHTML = event.message;
      logDisplayElement.appendChild(newLine);
    });
  }

  // console.log(bounding.bottom, window.innerHeight);

  // only auto scroll to end if bottom was already visible in view
  if (scrollToEnd && bottomInView) {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight - 30), 0);
  }
}

/**
 * @param levelSelections
 * @param scrollToEnd
 */
async function displayLogs(levelSelections, scrollToEnd = true) {
  levelSelections = levelSelections || getLevelSelections();

  if (hashVal.has("id")) {
    instanceId = hashVal.getInt("id");
  }

  // if we have no logs displaying, we need to fetch all logs from start index
  // else we just fetch new logs since last fetch
  let entryId;
  if (logDisplayElement.childElementCount === 0) {
    entryId = stringifyEntryId(lastEntryId);
  } else {
    const children = logDisplayElement.children;
    const last = children[children.length - 1];
    entryId = last.getAttribute("entryId");
  }

  const logResponse = await fetch(
    `/__electrode_dev/log-events?entryId=${entryId}&id=${instanceId}`
  );
  const data = await logResponse.json();

  updateLogs(data, levelSelections, scrollToEnd);
}

/**
 *
 */
function updateLevelCheckboxes() {
  Object.keys(defaultLevelSelections).forEach(k => {
    const elem = document.getElementById(`level.${k}`);
    if (elem) {
      elem.checked = hashVal.get(k) !== "false";
    }
  });
}

/**
 * @param str
 */
function parseEntryId(str) {
  if (str.indexOf(",") > 0) {
    const parts = str.split(",");
    return {
      ts: parseInt(parts[0]),
      tx: parseInt(parts[1])
    };
  }

  return { ts: parseInt(str), tx: 0 };
}

window.addEventListener(
  "hashchange",
  () => {
    if (hashVal.changed()) {
      hashVal.setFromUrl();
      updateLevelCheckboxes();
      const entryId = parseEntryId(hashVal.get("entryId") || "0");
      //   const start = hashVal.getInt("start");
      if (compareEntryId(entryId, lastEntryId) !== 0) {
        hashVal.add({ entryId: stringifyEntryId(entryId) });
        clearLogs();
        lastEntryId = entryId;
        displayLogs();
      } else {
        refreshLogs();
      }
    }
  },
  false
);

window.addEventListener("keypress", (event) => {
  if (event.ctrlKey && event.code === "KeyK") {
    wipeLogs();
  }
});

lastEntryId = parseEntryId(hashVal.get("entryId") || "0");
updateLevelCheckboxes();
// setTimeout(displayLogs, 10);
