/* eslint-disable */
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
var a = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/,
  f = /\d{2}:\d{2}:\d{2} GMT-\d{4}/,
  m = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
  l =
    window.requestAnimationFrame ||
    function (t) {
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
    sortPropertiesBy: null,
  },
  c = (function () {
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
        get: function () {
          return null !== this._isOpen ? this._isOpen : this.open > 0;
        },
        set: function (t) {
          this._isOpen = t;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "isDate", {
        get: function () {
          return (
            this.json instanceof Date ||
            ("string" === this.type &&
              (a.test(this.json) || m.test(this.json) || f.test(this.json)))
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "isUrl", {
        get: function () {
          return "string" === this.type && 0 === this.json.indexOf("http");
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "isArray", {
        get: function () {
          return Array.isArray(this.json);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "isObject", {
        get: function () {
          return e(this.json);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "isEmptyObject", {
        get: function () {
          return !this.keys.length && !this.isArray;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "isEmpty", {
        get: function () {
          return this.isEmptyObject || (this.keys && !this.keys.length && this.isArray);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "useToJSON", {
        get: function () {
          return this.config.useToJSON && "stringifiable" === this.type;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "hasKey", {
        get: function () {
          return void 0 !== this.key;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "constructorName", {
        get: function () {
          return r(this.json);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "type", {
        get: function () {
          return this.config.useToJSON && this.json && this.json.toJSON
            ? "stringifiable"
            : t(this.json);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(c.prototype, "keys", {
        get: function () {
          if (this.isObject) {
            var t = Object.keys(this.json);
            return !this.isArray && this.config.sortPropertiesBy
              ? t.sort(this.config.sortPropertiesBy)
              : t;
          }
          return [];
        },
        enumerable: !0,
        configurable: !0,
      }),
      (c.prototype.toggleOpen = function () {
        (this.isOpen = !this.isOpen),
          this.element &&
            (this.isOpen
              ? this.appendChildren(this.config.animateOpen)
              : this.removeChildren(this.config.animateClose),
            this.element.classList.toggle(i("open")));
      }),
      (c.prototype.openAtDepth = function (t) {
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
      (c.prototype.getInlinepreview = function () {
        var t = this;
        if (this.isArray)
          return this.json.length > this.config.hoverPreviewArrayCount
            ? "Array[" + this.json.length + "]"
            : "[" + this.json.map(o).join(", ") + "]";
        var e = this.keys,
          r = e.slice(0, this.config.hoverPreviewFieldCount).map(function (e) {
            return e + ":" + o(t.json[e]);
          }),
          n = e.length >= this.config.hoverPreviewFieldCount ? "…" : "";
        return "{" + r.join(", ") + n + "}";
      }),
      (c.prototype.render = function () {
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
      (c.prototype.appendChildren = function (t) {
        var e = this;
        void 0 === t && (t = !1);
        var r = this.element.querySelector("div." + i("children"));
        if (r && !this.isEmpty)
          if (t) {
            var n = 0,
              o = function () {
                var t = e.keys[n],
                  i = new c(e.json[t], e.open - 1, e.config, t);
                r.appendChild(i.render()), (n += 1) < e.keys.length && (n > 10 ? o() : l(o));
              };
            l(o);
          } else
            this.keys.forEach(function (t) {
              var n = new c(e.json[t], e.open - 1, e.config, t);
              r.appendChild(n.render());
            });
      }),
      (c.prototype.removeChildren = function (t) {
        void 0 === t && (t = !1);
        var e = this.element.querySelector("div." + i("children"));
        if (t) {
          var r = 0,
            n = function () {
              e && e.children.length && (e.removeChild(e.children[0]), (r += 1) > 10 ? n() : l(n));
            };
          l(n);
        } else e && (e.innerHTML = "");
      }),
      c
    );
  })();

/* eslint-enable */
//# fynSourceMap=false
