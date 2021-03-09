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
