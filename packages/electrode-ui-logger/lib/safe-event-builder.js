"use strict";
/* eslint-env es5 */
/* eslint-disable no-var */

var omit = require("lodash.omit");
var keys = require("lodash.keys");

module.exports = function (evt) {
  if (!(evt && keys(evt).length)) {
    // We explicitly make a known "undefined" state for traceability
    // rather than returning an empty object through the logging
    return {
      _type: "undefined",
      state: "undefined"
    };
  }

  if (evt._type === "fetch") {
    var safeEvt = {
      _type: evt._type,
      state: evt.state
    };

    if (evt.extras && evt.extras.request) {
      safeEvt.extras = {
        request: evt.extras.request,
        response: {
          status: evt.extras.response ? evt.extras.response.status : null
        },
        options: evt.extras.options,
        time: evt.extras.time
      };
    } else {
      safeEvt.extras = {
        response: {
          status: null
        }
      };
    }

    return safeEvt;

  } else {
    var otherProps = null;
    if (evt.props) {
      otherProps = omit(evt.props, "children");
    }
    return {
      _type: evt._type,
      context: evt.context,
      event: evt.event,
      extras: evt.extras,
      props: otherProps,
      state: evt.state
    };
  }
};
