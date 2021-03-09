/* eslint-disable no-magic-numbers, no-use-before-define, no-unused-vars */
/* eslint-disable no-console, max-statements, no-param-reassign, complexity */
/* global window, document, EventSource, fetch */

function t(t) {
  return null === t ? "null" : typeof t;
}
function e(t) {
  return !!t && "object" == typeof t;
}
function r(t) {
  if (void 0 === t) return "";
  if (null === t) return "Object";
  if ("object" == typeof t && !t.constructor) return "Object";
  var e = /function ([^(]*)/.exec(t.constructor.toString());
  return e && e.length > 1 ? e[1] : "";
}
function n(t, e, r) {
  return "null" === t || "undefined" === t
    ? t
    : (("string" !== t && "stringifiable" !== t) || (r = '"' + r.replace(/"/g, '\\"') + '"'),
      "function" === t
        ? e
            .toString()
            .replace(/[\r\n]/g, "")
            .replace(/\{.*\}/, "") + "{…}"
        : r);
}
function o(o) {
  var i = "";
  return (
    e(o) ? ((i = r(o)), Array.isArray(o) && (i += "[" + o.length + "]")) : (i = n(t(o), o, o)), i
  );
}
function i(t) {
  return "json-formatter-" + t;
}
function s(t, e, r) {
  var n = document.createElement(t);
  return (
    e && n.classList.add(i(e)),
    void 0 !== r &&
      (r instanceof Node ? n.appendChild(r) : n.appendChild(document.createTextNode(String(r)))),
    n
  );
}
!(function(t) {
  if (t && "undefined" != typeof window) {
    var e = document.createElement("style");
    e.setAttribute("media", "screen"), (e.innerHTML = t), document.head.appendChild(e);
  }
})(
  '.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-row,\n.json-formatter-row a,\n.json-formatter-row a:hover {\n  color: black;\n  text-decoration: none;\n}\n.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-row .json-formatter-string,\n.json-formatter-row .json-formatter-stringifiable {\n  color: green;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-row .json-formatter-number {\n  color: blue;\n}\n.json-formatter-row .json-formatter-boolean {\n  color: red;\n}\n.json-formatter-row .json-formatter-null {\n  color: #855A00;\n}\n.json-formatter-row .json-formatter-undefined {\n  color: #ca0b69;\n}\n.json-formatter-row .json-formatter-function {\n  color: #FF20ED;\n}\n.json-formatter-row .json-formatter-date {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: blue;\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-bracket {\n  color: blue;\n}\n.json-formatter-row .json-formatter-key {\n  color: #00008B;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "►";\n}\n.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n.json-formatter-dark.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-dark.json-formatter-row,\n.json-formatter-dark.json-formatter-row a,\n.json-formatter-dark.json-formatter-row a:hover {\n  color: white;\n  text-decoration: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-string,\n.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {\n  color: #31F031;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-number {\n  color: #66C2FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-boolean {\n  color: #EC4242;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-null {\n  color: #EEC97D;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-undefined {\n  color: #ef8fbe;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-function {\n  color: #FD48CB;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-date {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.json-formatter-dark.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: #027BFF;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-bracket {\n  color: #9494FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-key {\n  color: #23A0DB;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "►";\n}\n.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n'
);
var a = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/,
  f = /\d{2}:\d{2}:\d{2} GMT-\d{4}/,
  m = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
  l =
    window.requestAnimationFrame ||
    function(t) {
      return t(), 0;
    },
  d = {
    hoverPreviewEnabled: !1,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    animateOpen: !0,
    animateClose: !0,
    theme: null,
    useToJSON: !0,
    sortPropertiesBy: null
  },
  c = (function() {
    function c(t, e, r, n) {
      void 0 === e && (e = 1),
        void 0 === r && (r = d),
        (this.json = t),
        (this.open = e),
        (this.config = r),
        (this.key = n),
        (this._isOpen = null),
        void 0 === this.config.hoverPreviewEnabled &&
          (this.config.hoverPreviewEnabled = d.hoverPreviewEnabled),
        void 0 === this.config.hoverPreviewArrayCount &&
          (this.config.hoverPreviewArrayCount = d.hoverPreviewArrayCount),
        void 0 === this.config.hoverPreviewFieldCount &&
          (this.config.hoverPreviewFieldCount = d.hoverPreviewFieldCount),
        void 0 === this.config.useToJSON && (this.config.useToJSON = d.useToJSON),
        "" === this.key && (this.key = '""');
    }
    return (
      Object.defineProperty(c.prototype, "isOpen", {
        get: function() {
          return null !== this._isOpen ? this._isOpen : this.open > 0;
        },
        set: function(t) {
          this._isOpen = t;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "isDate", {
        get: function() {
          return (
            this.json instanceof Date ||
            ("string" === this.type &&
              (a.test(this.json) || m.test(this.json) || f.test(this.json)))
          );
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "isUrl", {
        get: function() {
          return "string" === this.type && 0 === this.json.indexOf("http");
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "isArray", {
        get: function() {
          return Array.isArray(this.json);
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "isObject", {
        get: function() {
          return e(this.json);
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "isEmptyObject", {
        get: function() {
          return !this.keys.length && !this.isArray;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "isEmpty", {
        get: function() {
          return this.isEmptyObject || (this.keys && !this.keys.length && this.isArray);
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "useToJSON", {
        get: function() {
          return this.config.useToJSON && "stringifiable" === this.type;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "hasKey", {
        get: function() {
          return void 0 !== this.key;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "constructorName", {
        get: function() {
          return r(this.json);
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "type", {
        get: function() {
          return this.config.useToJSON && this.json && this.json.toJSON
            ? "stringifiable"
            : t(this.json);
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(c.prototype, "keys", {
        get: function() {
          if (this.isObject) {
            var t = Object.keys(this.json);
            return !this.isArray && this.config.sortPropertiesBy
              ? t.sort(this.config.sortPropertiesBy)
              : t;
          }
          return [];
        },
        enumerable: !0,
        configurable: !0
      }),
      (c.prototype.toggleOpen = function() {
        (this.isOpen = !this.isOpen),
          this.element &&
            (this.isOpen
              ? this.appendChildren(this.config.animateOpen)
              : this.removeChildren(this.config.animateClose),
            this.element.classList.toggle(i("open")));
      }),
      (c.prototype.openAtDepth = function(t) {
        void 0 === t && (t = 1),
          t < 0 ||
            ((this.open = t),
            (this.isOpen = 0 !== t),
            this.element &&
              (this.removeChildren(!1),
              0 === t
                ? this.element.classList.remove(i("open"))
                : (this.appendChildren(this.config.animateOpen),
                  this.element.classList.add(i("open")))));
      }),
      (c.prototype.getInlinepreview = function() {
        var t = this;
        if (this.isArray)
          return this.json.length > this.config.hoverPreviewArrayCount
            ? "Array[" + this.json.length + "]"
            : "[" + this.json.map(o).join(", ") + "]";
        var e = this.keys,
          r = e.slice(0, this.config.hoverPreviewFieldCount).map(function(e) {
            return e + ":" + o(t.json[e]);
          }),
          n = e.length >= this.config.hoverPreviewFieldCount ? "…" : "";
        return "{" + r.join(", ") + n + "}";
      }),
      (c.prototype.render = function() {
        this.element = s("div", "row");
        var t = this.isObject ? s("a", "toggler-link") : s("span");
        if (
          (this.isObject && !this.useToJSON && t.appendChild(s("span", "toggler")),
          this.hasKey && t.appendChild(s("span", "key", this.key + ":")),
          this.isObject && !this.useToJSON)
        ) {
          var e = s("span", "value"),
            r = s("span"),
            o = s("span", "constructor-name", this.constructorName);
          if ((r.appendChild(o), this.isArray)) {
            var a = s("span");
            a.appendChild(s("span", "bracket", "[")),
              a.appendChild(s("span", "number", this.json.length)),
              a.appendChild(s("span", "bracket", "]")),
              r.appendChild(a);
          }
          e.appendChild(r), t.appendChild(e);
        } else {
          (e = this.isUrl ? s("a") : s("span")).classList.add(i(this.type)),
            this.isDate && e.classList.add(i("date")),
            this.isUrl && (e.classList.add(i("url")), e.setAttribute("href", this.json));
          var f = n(this.type, this.json, this.useToJSON ? this.json.toJSON() : this.json);
          e.appendChild(document.createTextNode(f)), t.appendChild(e);
        }
        if (this.isObject && this.config.hoverPreviewEnabled) {
          var m = s("span", "preview-text");
          m.appendChild(document.createTextNode(this.getInlinepreview())), t.appendChild(m);
        }
        var l = s("div", "children");
        return (
          this.isObject && l.classList.add(i("object")),
          this.isArray && l.classList.add(i("array")),
          this.isEmpty && l.classList.add(i("empty")),
          this.config && this.config.theme && this.element.classList.add(i(this.config.theme)),
          this.isOpen && this.element.classList.add(i("open")),
          this.element.appendChild(t),
          this.element.appendChild(l),
          this.isObject && this.isOpen && this.appendChildren(),
          this.isObject &&
            !this.useToJSON &&
            t.addEventListener("click", this.toggleOpen.bind(this)),
          this.element
        );
      }),
      (c.prototype.appendChildren = function(t) {
        var e = this;
        void 0 === t && (t = !1);
        var r = this.element.querySelector("div." + i("children"));
        if (r && !this.isEmpty)
          if (t) {
            var n = 0,
              o = function() {
                var t = e.keys[n],
                  i = new c(e.json[t], e.open - 1, e.config, t);
                r.appendChild(i.render()), (n += 1) < e.keys.length && (n > 10 ? o() : l(o));
              };
            l(o);
          } else
            this.keys.forEach(function(t) {
              var n = new c(e.json[t], e.open - 1, e.config, t);
              r.appendChild(n.render());
            });
      }),
      (c.prototype.removeChildren = function(t) {
        void 0 === t && (t = !1);
        var e = this.element.querySelector("div." + i("children"));
        if (t) {
          var r = 0,
            n = function() {
              e && e.children.length && (e.removeChild(e.children[0]), (r += 1) > 10 ? n() : l(n));
            };
          l(n);
        } else e && (e.innerHTML = "");
      }),
      c
    );
  })();

const JSONFormatter = c;

let logLineNum = 1;
let logStream;
let logStreamReconnectDelay = 5000;
let logStreamReconnectTimer;
let debugStreamEvents;

const Levels = {
  error: {
    color: "red",
    index: 0,
    name: "error"
  },
  warn: {
    color: "yellow",
    index: 1,
    name: "warn"
  },
  info: {
    color: "green",
    index: 2,
    name: "info"
  },
  http: {
    color: "green",
    index: 3,
    name: "http"
  },
  verbose: {
    color: "blue",
    index: 4,
    name: "verbose"
  },
  debug: {
    color: "orange",
    index: 5,
    name: "debug"
  },
  silly: {
    color: "purple",
    index: 6,
    name: "silly"
  }
};

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
  logStream.addEventListener("open", _e => {
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

      const newMeta = document.createElement("span");
      newMeta.setAttribute("class", "show unselectable meta");

      //  line number
      const newLineNum = document.createElement("span");
      newLineNum.innerHTML = logLineNum.toString();
      logLineNum++;
      newLineNum.setAttribute("class", "mx-4 w-10 inline-block text-center");

      //  level info
      const newLevelInfo = document.createElement("span");
      const levelInfo = Levels[event.level];
      if (levelInfo.color) {
        newLevelInfo.setAttribute("style", `color: ${levelInfo.color}`);
      }
      newLevelInfo.setAttribute("class", "mx-4 mr-8");
      newLevelInfo.innerHTML = levelInfo.name.substring(0, 4);

      newMeta.appendChild(newLineNum);
      newMeta.appendChild(newLevelInfo);

      //  log
      const newLog = document.createElement("span");

      //  if it's json string, pretty it

      const jsonStr = event.message.match(/{"[a-zA-Z0-9_]+":.+}/);

      if (jsonStr) {
        try {
          const jsonObj = JSON.parse(jsonStr);

          const startIndex = event.message.indexOf(jsonStr);
          if (startIndex) {
            const msgBeforeJson = event.message.slice(0, startIndex);
            const msgBeforeJsonDiv = document.createElement("div");
            msgBeforeJsonDiv.innerHTML = msgBeforeJson;
            newLog.appendChild(msgBeforeJsonDiv);
          }

          const formatter = new JSONFormatter(jsonObj);
          newLog.appendChild(formatter.render(), 1, {
            hoverPreviewEnabled: false,
            hoverPreviewArrayCount: 10,
            hoverPreviewFieldCount: 5,
            theme: "dark",
            animateOpen: true,
            animateClose: true,
            useToJSON: true
          });

          if (startIndex + jsonStr.length !== event.message.length) {
            const msgAfterJson = event.message.slice(0, startIndex);
            const msgAfterJsonDiv = document.createElement("div");
            msgAfterJsonDiv.innerHTML = msgAfterJson;
            newLog.appendChild(msgAfterJsonDiv);
          }
        } catch (e) {
          console.error(e);
          newLog.innerHTML = event.message;
        }
      } else {
        newLog.innerHTML = event.message;
      }

      newLine.appendChild(newMeta);
      newLine.appendChild(newLog);
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

window.addEventListener("keypress", event => {
  if (event.ctrlKey && event.code === "KeyK") {
    wipeLogs();
  }

  if (event.ctrlKey && event.code === "KeyH") {
    toggleMeta();
  }
});

lastEntryId = parseEntryId(hashVal.get("entryId") || "0");
updateLevelCheckboxes();
// setTimeout(displayLogs, 10);
