"use strict";

/* eslint-disable max-statements, no-constant-condition, no-magic-numbers */

const assert = require("assert");
const Fs = require("fs");
const RenderContext = require("./render-context");
const loadHandler = require("./load-handler");
const Renderer = require("./renderer");
const { resolvePath } = require("./utils");
const Token = require("./token");
const stringArray = require("string-array");
const Path = require("path");

const { TEMPLATE_DIR } = require("./symbols");

const tokenTags = {
  "<!--%{": "}-->", // for tokens in html
  "/*--%{": "}--*/" // for tokens in script and style
};

const tokenOpenTagRegex = new RegExp(
  Object.keys(tokenTags)
    .map(x => `(${x.replace(/([\*\/])/g, "\\$1")})`)
    .join("|")
);

class AsyncTemplate {
  constructor(options) {
    this._options = options;
    this._tokenHandlers = [];
    this._handlersMap = {};
    this._initializeTemplate(options.htmlFile);
    this._initializeTokenHandlers([].concat(options.tokenHandlers).filter(x => x));
    this._applyTokenLoad();
    this._renderer = new Renderer({
      htmlTokens: this._tokens,
      tokenHandlers: this._tokenHandlers
    });
  }

  get tokens() {
    return this._tokens;
  }

  get handlersMap() {
    return this._handlersMap;
  }

  async render(options) {
    const context = new RenderContext(options, this);

    for (const r of this._beforeRenders) {
      await r.beforeRender(context);
    }

    const result = await this._renderer.render(context);

    for (const r of this._afterRenders) {
      await r.afterRender(context);
    }

    context.result = context.isVoidStop ? context.voidResult : result;

    return context;
  }

  /*
   break up the template into a list of literal strings and the tokens between them
   - each item is of the form:

   { str: "literal string" }

   or a Token object
   */

  _parseTemplate(template, filepath) {
    const tokens = [];
    let pt = 0;
    const templateDir = Path.dirname(filepath);

    while (true) {
      const mx = template.substr(pt).match(tokenOpenTagRegex);
      if (mx) {
        const pos = mx.index + pt;
        const str = template.substring(pt, pos).trim();
        // if there are text between a close tag and an open tag, then consider
        // that as plain HTML string
        if (str) tokens.push({ str });

        const tokenOpenTag = mx[0];
        const tokenCloseTag = tokenTags[tokenOpenTag];
        const ex = template.indexOf(tokenCloseTag, pos);
        assert(
          ex > pos,
          `electrode-react-webapp: ${filepath}: Can't find token close tag at position ${pos}`
        );

        let remain = template
          .substring(pos + tokenOpenTag.length, ex)
          .trim()
          .split("\n")
          .map(x => x.trim())
          // remove empty and comment lines that start with "//"
          .filter(x => x && !x.startsWith("//"))
          .join(" ");

        const token = remain.split(" ", 1)[0];
        assert(token, `electrode-react-webapp: ${filepath}: Empty token at position ${pos}`);
        remain = remain.substring(token.length).trim();

        let props;
        try {
          props = this._parseTokenProps(remain);
        } catch (e) {
          const x = `at position ${pos} has malformed prop '${remain}': ${e.message}`;
          assert(false, `electrode-react-webapp: ${filepath}: token ${token} ${x}`);
        }
        props[TEMPLATE_DIR] = templateDir;

        tokens.push(new Token(token, pos, props));
        pt = ex + tokenCloseTag.length;
      } else {
        const str = template.substring(pt).trim();
        if (str) tokens.push({ str });
        break;
      }
    }

    return tokens;
  }

  _parseTokenProps(str) {
    // check if it's JSON object by looking for "{"
    if (str[0] === "{") {
      return JSON.parse(str);
    }

    const props = {};

    while (str) {
      const m1 = str.match(/([\w]+)=(.)/);
      assert(m1 && m1[1], "name must be name=Val");
      const name = m1[1];

      if (m1[2] === `[`) {
        // treat as name=[str1, str2]
        str = str.substring(m1[0].length - 1);
        const r = stringArray.parse(str, true);
        props[name] = r.array;
        str = r.remain.trim();
      } else if (m1[2] === `'` || m1[2] === `"`) {
        str = str.substring(m1[0].length);
        const m2 = str.match(new RegExp(`([^${m1[2]}]+)${m1[2]}`));
        assert(m2, `mismatch quote ${m1[2]}`);
        props[name] = m2[1];
        str = str.substring(m2[0].length).trim();
      } else if (m1[2] === " ") {
        // empty
        props[name] = "";
        str = str.substring(m1[0].length).trim();
      } else {
        str = str.substring(m1[0].length - 1);
        const m2 = str.match(/([^ ]*)/); // matching name=Prop
        props[name] = JSON.parse(m2[1]);
        str = str.substring(m2[0].length).trim();
      }
    }

    return props;
  }

  _initializeTemplate(filename) {
    const filepath = resolvePath(filename);
    const html = Fs.readFileSync(filepath).toString();
    this._tokens = this._parseTemplate(html, filepath);
  }

  _loadTokenHandler(path) {
    const mod = loadHandler(path);
    return mod(this._options, this);
  }

  _applyTokenLoad() {
    this._tokens.forEach(x => {
      if (x.load) {
        x.load(this._options, this);
      }
    });
  }

  _initializeTokenHandlers(filenames) {
    this._tokenHandlers = filenames.map(fname => {
      let handler;
      if (typeof fname === "string") {
        handler = this._loadTokenHandler(fname);
      } else {
        handler = fname;
        assert(handler.name, "electrode-react-webapp AsyncTemplate token handler missing name");
      }
      if (!handler.name) {
        handler = {
          name: fname,
          tokens: handler
        };
      }
      assert(handler.tokens, "electrode-react-webapp AsyncTemplate token handler missing tokens");
      assert(
        !this._handlersMap.hasOwnProperty(handler.name),
        `electrode-react-webapp AsyncTemplate token handlers map already contains ${handler.name}`
      );
      this._handlersMap[handler.name] = handler;
      return handler;
    });

    this._beforeRenders = this._tokenHandlers.filter(x => x.beforeRender);
    this._afterRenders = this._tokenHandlers.filter(x => x.afterRender);
  }
}

module.exports = AsyncTemplate;
