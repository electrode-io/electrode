"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements, complexity */

const HttpStatusCodes = require("http-status-codes");
const HttpStatus = require("../http-status");

const getDataHtml = data => (data.html !== undefined ? data.html : data);

const DefaultHandleRoute = (request, h, handler, content, routeOptions) => {
  return handler({
    content,
    mode: request.query.__mode || "",
    template: request.indexPageTemplate,
    request
  })
    .then(context => {
      const data = context.result;
      const html = getDataHtml(data);

      if (html instanceof Error) {
        throw html;
      }

      let respond;
      let status = data.status;

      if (data.verbatim || status === undefined) {
        // if no status, fallback to context.status, and then 200
        status = status || context.status || HttpStatusCodes.OK;
        respond = h.response(html);
      } else if (HttpStatus.redirect[status]) {
        respond = h.redirect(data.path);
        return respond.code(status);
      } else if (status >= HttpStatusCodes.OK && status < 300) {
        respond = h.response(html);
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        status = output.status;
        respond = h.response(output.html);
      } else {
        // should not reach here w/o html because user returned content
        // would have to return a literal string that has no `.status`
        // and html being undefined to be able to skip all the cases above
        respond = h.response(html);
      }

      const response = context.user && context.user.response;

      if (response) {
        Object.assign(respond.headers, response.headers);
      }

      return respond.code(status);
    })
    .catch(err => {
      const output = routeOptions.responseForError(request, routeOptions, err);

      return h.response(output.html).code(output.status);
    });
};

const registerRoutes = require("./register-routes");

const register = (server, options) => registerRoutes(server, options, DefaultHandleRoute);

const pkg = require("../../package.json");

module.exports = {
  register,
  registerRoutes: register,
  pkg
};
