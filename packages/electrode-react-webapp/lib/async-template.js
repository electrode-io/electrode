"use strict";

/* eslint-disable max-params, max-statements, no-constant-condition, no-magic-numbers */

const assert = require("assert");
const Fs = require("fs");
const RenderContext = require("./render-context");
const loadHandler = require("./load-handler");
const Renderer = require("./renderer");
const { resolvePath } = require("./utils");
const Token = require("./token");
const stringArray = require("string-array");
const _ = require("lodash");
const Path = require("path");
const Promise = require("bluebird");

const { TEMPLATE_DIR } = require("./symbols");

const tokenTags = {
  "<!--%{": {
    // for tokens in html
    open: "<!--[ \n]*%{",
    close: new RegExp("}[ \\n]*-->")
  },
  "/*--%{": {
    // for tokens in script and style
    open: "\\/\\*--[ \n]*%{",
    close: new RegExp("}--\\*/")
  }
};

const tokenOpenTagRegex = new RegExp(
  Object.keys(tokenTags)
    .map(x => `(${tokenTags[x].open})`)
    .join("|")
);

class AsyncTemplate {
  constructor(options) {
    this._options = options;
    this._tokenHandlers = [].concat(this._options.tokenHandlers).filter(x => x);
    this._handlersMap = {};
    // the same context that gets passed to each token handler's setup function
    this._handlerContext = _.merge(
      {
        user: {
          // set routeOptions in user also for consistency
          routeOptions: options.routeOptions
        }
      },
      options
    );
    this._initializeTemplate(options.htmlFile);
  }

  initializeRenderer(reset) {
    if (reset || !this._renderer) {
      this._initializeTokenHandlers(this._tokenHandlers);
      this._applyTokenLoad();
      this._renderer = new Renderer({
        insertTokenIds: this._options.insertTokenIds,
        htmlTokens: this._tokens,
        tokenHandlers: this._tokenHandlers
      });
    }
  }

  get tokens() {
    return this._tokens;
  }

  get handlersMap() {
    return this._handlersMap;
  }

  render(options) {
    const context = new RenderContext(options, this);

    return Promise.each(this._beforeRenders, r => r.beforeRender(context))
      .then(() => {
        return this._renderer.render(context);
      })
      .then(result => {
        return Promise.each(this._afterRenders, r => r.afterRender(context)).then(() => {
          context.result = context.isVoidStop ? context.voidResult : result;

          return context;
        });
      });
  }

  _findTokenIndex(id, str, index, instance = 0, msg = "AsyncTemplate._findTokenIndex") {
    let found;

    if (id) {
      found = this.findTokensById(id, instance + 1);
    } else if (str) {
      found = this.findTokensByStr(str, instance + 1);
    } else if (!Number.isInteger(index)) {
      throw new Error(`${msg}: invalid id, str, and index`);
    } else if (index < 0 || index >= this._tokens.length) {
      throw new Error(`${msg}: index ${index} is out of range.`);
    } else {
      return index;
    }

    if (found.length === 0) return false;

    return found[instance].index;
  }

  //
  // add tokens at first|last   position of the tokens,
  // or add tokens before|after token at {id}[instance] or {index}
  //               ^^^ {insert}
  // - Note that item indexes will change after add
  //
  // returns:
  //   - number of tokens removed
  //   - false if nothing was removed
  // throws:
  //   - if id and index are invalid
  //   - if {insert} is invalid
  //
  addTokens({ insert = "after", id, index, str, instance = 0, tokens }) {
    const create = tk => {
      return new Token(
        tk.token,
        -1,
        typeof tk.props === "string" ? this._parseTokenProps(tk.props) : tk.props
      );
    };

    if (insert === "first") {
      this._tokens.unshift(...tokens.map(create));
      return 0;
    }

    if (insert === "last") {
      const x = this._tokens.length;
      this._tokens.push(...tokens.map(create));
      return x;
    }

    index = this._findTokenIndex(id, str, index, instance, "AsyncTemplate.addTokens");
    if (index === false) return false;

    if (insert === "before") {
      this._tokens.splice(index, 0, ...tokens.map(create));
      return index;
    }

    if (insert === "after") {
      index++;
      this._tokens.splice(index, 0, ...tokens.map(create));
      return index;
    }

    throw new Error(
      `AsyncTemplate.addTokens: insert "${insert}" is not valid, must be first|before|after|last`
    );
  }

  //
  // remove {count} tokens before|after token at {id}[instance] or {index}
  //                       ^^^ {remove}
  // - if removeSelf is true then the token at {id}[instance] or {index} is included for removal
  // returns:
  //   - array of tokens removed
  // throws:
  //   - if id and index are invalid
  //   - if {remove} is invalid
  //
  removeTokens({ remove = "after", removeSelf = true, id, str, index, instance = 0, count = 1 }) {
    assert(count > 0, `AsyncTemplate.removeTokens: count ${count} must be > 0`);

    index = this._findTokenIndex(id, str, index, instance, "AsyncTemplate.removeTokens");
    if (index === false) return false;

    const offset = removeSelf ? 0 : 1;

    if (remove === "before") {
      let newIndex = index + 1 - count - offset;
      if (newIndex < 0) {
        newIndex = 0;
        count = index + 1 - offset;
      }
      return this._tokens.splice(newIndex, count);
    } else if (remove === "after") {
      return this._tokens.splice(index + offset, count);
    } else {
      throw new Error(`AsyncTemplate.removeTokens: remove "${remove}" must be before|after`);
    }
  }

  findTokensById(id, count = Infinity) {
    if (!Number.isInteger(count)) count = this._tokens.length;

    const found = [];

    for (let index = 0; index < this._tokens.length && found.length < count; index++) {
      const token = this._tokens[index];
      if (token.id === id) {
        found.push({ index, token });
      }
    }

    return found;
  }

  findTokensByStr(matcher, count = Infinity) {
    if (!Number.isInteger(count)) count = this._tokens.length;

    const found = [];

    let match;

    if (typeof matcher === "string") {
      match = str => str.indexOf(matcher) >= 0;
    } else if (matcher && matcher.constructor.name === "RegExp") {
      match = str => str.match(matcher);
    } else {
      throw new Error("AsyncTemplate.findTokensByStr: matcher must be a string or RegExp");
    }

    for (let index = 0; index < this._tokens.length && found.length < count; index++) {
      const token = this._tokens[index];
      if (token.hasOwnProperty("str") && match(token.str)) {
        found.push({ index, token });
      }
    }

    return found;
  }

  /*
   * break up the template into a list of literal strings and the tokens between them
   *
   *  - each item is of the form:
   *
   *    { str: "literal string" }
   *
   * or a Token object
   */

  _parseTemplate(template, filepath) {
    const tokens = [];
    const templateDir = Path.dirname(filepath);

    let pos = 0;

    const parseFail = msg => {
      const lineCount = [].concat(template.substring(0, pos).match(/\n/g)).length + 1;
      const lastNLIx = template.lastIndexOf("\n", pos);
      const lineCol = pos - lastNLIx;
      msg = msg.replace(/\n/g, "\\n");
      const pfx = `electrode-react-webapp: ${filepath}: at line ${lineCount} col ${lineCol}`;
      throw new Error(`${pfx} - ${msg}`);
    };

    let subTmpl = template;
    while (true) {
      const openMatch = subTmpl.match(tokenOpenTagRegex);
      if (openMatch) {
        pos += openMatch.index;

        if (openMatch.index > 0) {
          const str = subTmpl.substring(0, openMatch.index).trim();
          // if there are text between a close tag and an open tag, then consider
          // that as plain HTML string
          if (str) tokens.push({ str });
        }

        const tokenOpenTag = openMatch[0].replace(/[ \n]/g, "");
        const tokenCloseTag = tokenTags[tokenOpenTag].close;
        subTmpl = subTmpl.substring(openMatch.index + openMatch[0].length);
        const closeMatch = subTmpl.match(tokenCloseTag);

        if (!closeMatch) {
          parseFail(`Can't find token close tag for '${openMatch[0]}'`);
        }

        const tokenBody = subTmpl
          .substring(0, closeMatch.index)
          .trim()
          .split("\n")
          .map(x => x.trim())
          // remove empty and comment lines that start with "//"
          .filter(x => x && !x.startsWith("//"))
          .join(" ");

        const consumedCount = closeMatch.index + closeMatch[0].length;
        subTmpl = subTmpl.substring(consumedCount);

        const token = tokenBody.split(" ", 1)[0];
        if (!token) {
          parseFail(`empty token body`);
        }

        const tokenProps = tokenBody.substring(token.length).trim();

        try {
          const props = this._parseTokenProps(tokenProps);
          props[TEMPLATE_DIR] = templateDir;

          tokens.push(new Token(token, pos, props));
          pos += openMatch[0].length + consumedCount;
        } catch (e) {
          parseFail(`'${tokenBody}' has malformed prop: ${e.message};`);
        }
      } else {
        const str = subTmpl.trim();
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
      } else if (m1[2] === `'` || m1[2] === `"` || m1[2] === "`") {
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
    return mod(this._handlerContext, this);
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
