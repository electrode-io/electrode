/* eslint-disable no-magic-numbers, no-use-before-define, no-unused-vars */
/* eslint-disable no-console, max-statements, no-param-reassign, complexity */
/* global window, document, EventSource */

//  c is from json-formatter-js.js, keep it loaded ahead of log-view.js
/* eslint-disable no-undef */
const JSONFormatter = c;
/* eslint-enable no-undef */

let logLineNum = 1;
let logStream;
let logStreamReconnectDelay = 5000;
let logStreamReconnectTimer;
let debugStreamEvents;

const Levels = {
  error: {
    color: "red",
    index: 0,
    name: "error",
  },
  warn: {
    color: "yellow",
    index: 1,
    name: "warn",
  },
  info: {
    color: "green",
    index: 2,
    name: "info",
  },
  http: {
    color: "green",
    index: 3,
    name: "http",
  },
  verbose: {
    color: "blue",
    index: 4,
    name: "verbose",
  },
  debug: {
    color: "orange",
    index: 5,
    name: "debug",
  },
  silly: {
    color: "purple",
    index: 6,
    name: "silly",
  },
};

const themeArr = ["", "adventure", "acai", "monikai"];
let curThemeIdx = 0;
let isPrettyJSONEnabled = true;

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
  logStream.addEventListener("log-stream", (e) => {
    if (debugStreamEvents) {
      console.log("stream event", e);
    }
    const data = JSON.parse(e.data);
    updateLogs(data);
  });
  logStream.addEventListener("open", (_e) => {
    console.log("log stream opened");
    logStreamReconnectDelay = 5000;
  });
  logStream.addEventListener("error", (e, _a) => {
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
  silly: true,
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
      .map((k) => `${k}=${this._hash[k]}`)
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
    [].concat(values).forEach((k) => delete this._hash[k]);
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

let hashVal = new HashValues();

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
 * @description hide meta column
 */
function toggleMeta() {
  const metaSpans = document.querySelectorAll(".meta");

  for (const s of metaSpans) {
    if (s.getAttribute("class").indexOf("hide") === -1) {
      s.setAttribute("class", "hide meta");
    } else {
      s.setAttribute("class", "show unselectable meta");
    }
  }
}

/**
 * @description turn on/off JSON prettier
 */
function toggleJSONPretty() {
  isPrettyJSONEnabled = !isPrettyJSONEnabled;
  clearLogs();
  hashVal = new HashValues();
  lastEntryId = { ts: 0, tx: 0 };
  instanceId = -1;
  startLogStream();
}

/**
 * @param levelSelections
 * @param scrollToEnd
 */
function refreshLogs(levelSelections, _scrollToEnd = true) {
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
  logLineNum = 1;
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
 * @param level level string including info, warn, and so on...
 * @return new span element with meta info
 */
function createMetaElement(level) {
  const newMeta = document.createElement("span");
  newMeta.setAttribute("class", "show unselectable meta");

  //  line number
  const newLineNum = document.createElement("span");
  newLineNum.innerHTML = logLineNum.toString();
  logLineNum++;
  newLineNum.setAttribute("class", "mx-2 w-10 inline-block text-left");

  //  level info
  const newLevelInfo = document.createElement("span");
  const levelInfo = Levels[level];
  if (levelInfo.color) {
    newLevelInfo.setAttribute("style", `color: ${levelInfo.color}`);
  }
  newLevelInfo.setAttribute("class", "mr-16");
  newLevelInfo.innerHTML = levelInfo.name.substring(0, 4) + " >>";

  newMeta.appendChild(newLineNum);
  newMeta.appendChild(newLevelInfo);

  return newMeta;
}

function getJSONInfo(msg) {
  const matchArr = msg.match(/{"[a-zA-Z0-9_]+":.+}/g);

  if (matchArr && matchArr.length !== 0) {
    try {
      const jsonStr = matchArr[0];
      const jsonObj = JSON.parse(jsonStr);
      return { jsonStr: jsonStr, jsonObj: jsonObj, startIdx: msg.indexOf(jsonStr) };
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}

function prettyJSON(jsonObj) {
  const formatter = new JSONFormatter(jsonObj, 1, {
    hoverPreviewEnabled: true,
    hoverPreviewArrayCount: 10,
    hoverPreviewFieldCount: 5,
    theme: themeArr[curThemeIdx++],
    animateOpen: true,
    animateClose: true,
    useToJSON: true,
  });

  //  alternatively display different theme
  if (curThemeIdx === themeArr.length) {
    curThemeIdx = 0;
  }

  return formatter.render();
}

/**
 * @param message log string
 * @return new span element with log info
 */
function createLogElement(message) {
  const newLog = document.createElement("span");

  const jsonInfo = getJSONInfo(message);
  if (jsonInfo && isPrettyJSONEnabled) {
    //  append message before JSON
    if (jsonInfo.startIdx) {
      const msgBeforeJson = message.slice(0, jsonInfo.startIdx);
      const msgBeforeJsonDiv = document.createElement("div");
      msgBeforeJsonDiv.innerHTML = msgBeforeJson;
      newLog.appendChild(msgBeforeJsonDiv);
    }

    newLog.appendChild(prettyJSON(jsonInfo.jsonObj));

    //  append message after JSON
    if (jsonInfo.startIdx + jsonInfo.jsonStr.length !== message.length) {
      const msgAfterJson = message.slice(jsonInfo.startIdx + jsonInfo.jsonStr.length);
      const msgAfterJsonDiv = document.createElement("div");
      msgAfterJsonDiv.innerHTML = msgAfterJson;
      newLog.appendChild(msgAfterJsonDiv);
    }
  } else {
    newLog.innerHTML = message;
  }

  return newLog;
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

    newLogs = data.logs.filter((l) => {
      return compareEntryId(l, lastEntryId) > 0;
    });
  }

  const bounding = logDisplayElement.getBoundingClientRect();
  // check if bottom is in view (< -25 to account for our top margin of 30px)
  const bottomInView =
    bounding.bottom - (window.innerHeight || document.documentElement.clientHeight) < -25;

  if (newLogs.length > 0) {
    newLogs.forEach((event) => {
      const newLine = document.createElement("div");
      newLine.setAttribute("lvl", event.level);
      newLine.setAttribute("entryId", stringifyEntryId(event));
      if (!levelSelections[event.level]) {
        newLine.setAttribute("class", "hide");
      } else {
        newLine.setAttribute("class", "flex");
      }

      const metaColumnElement = createMetaElement(event.level);
      const logColumnElment = createLogElement(event.message);

      newLine.appendChild(metaColumnElement);
      newLine.appendChild(logColumnElment);
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
  Object.keys(defaultLevelSelections).forEach((k) => {
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
      tx: parseInt(parts[1]),
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

  if (event.ctrlKey && event.code === "KeyM") {
    toggleMeta();
  }

  if (event.ctrlKey && event.code === "KeyJ") {
    toggleJSONPretty();
  }
});

lastEntryId = parseEntryId(hashVal.get("entryId") || "0");
updateLevelCheckboxes();
// setTimeout(displayLogs, 10);
