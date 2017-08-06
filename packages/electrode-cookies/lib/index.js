"use strict";

const safeGet = require("lodash/get");
const reduce = require("lodash/reduce");
const assert = require("assert");

const replacers = { "(": "%28", ")": "%29" };

const encodeKey = key =>
  key.replace(/[^#$&+\^`|]/g, encodeURIComponent).replace(/[\(\)]/g, m => replacers[m]);

const cookies = {
  get: (key, options) => {
    options = options || {};
    assert(options.request, "The request option is not set");

    if (options.matchSubStr) {
      const substring = options.skipEncoding === true ? key : encodeKey(key);

      const NOT_FOUND = -1;

      try {
        return reduce(
          options.request.state,
          (result, value, k) => {
            if (k.indexOf(substring) > NOT_FOUND) {
              result[k] =
                options.skipEncoding === true || value === undefined
                  ? value
                  : decodeURIComponent(value);
            }
            return result;
          },
          {}
        );
      } catch (err) {
        return null;
      }
    }

    try {
      const value = options.request.state[encodeKey(key)];
      return value === undefined ? undefined : decodeURIComponent(value);
    } catch (err) {
      return null;
    }
  },

  set: (key, value, options) => {
    options = options || {};
    assert(options.request, "The request option is not set");

    const MSEC = 1000;

    const setOptions = {
      path: options.path || "/",
      ttl: options.expires && options.expires * MSEC,
      isHttpOnly: options.httpOnly,
      isSecure: options.secure,
      domain: options.domain,
      strictHeader: safeGet(options, "strictHeader", true)
    };

    const request = options.request;

    if (!request.app.replyStates) {
      request.app.replyStates = {};
    }

    if (options.skipEncoding !== true) {
      key = encodeKey(key);
      value = (typeof value === "string" ? value : JSON.stringify(value))
        // \--9 being exclude chars - to 9, with 9 being before :
        .replace(/[^!#&-+\--9<-\[\]-~]/g, encodeURIComponent);
    }

    if (options.forceAuthEncoding) {
      value = value.replace(/[+/]/g, encodeURIComponent);
    }

    request.app.replyStates[key] = { value, options: setOptions };
  },

  expire: (key, options) => {
    options = options || {};
    options.expires = 0;
    cookies.set(key, "x", options);
  }
};

module.exports = cookies;
