"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements, complexity */

const HttpStatusCodes = require("http-status-codes");
const HttpStatus = require("../http-status");

const getDataHtml = data => (data.html !== undefined ? data.html : data);

const DefaultHandleRoute = (request, reply, handler, content, routeOptions) => {
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
        respond = reply(html);
      } else if (HttpStatus.redirect[status]) {
        respond = reply.redirect(data.path);
        return respond.code(status);
      } else if (status >= HttpStatusCodes.OK && status < 300) {
        respond = reply(html);
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        status = output.status;
        respond = reply(output.html);
      } else {
        // should not reach here w/o html because user returned content
        // would have to return a literal string that has no `.status`
        // and html being undefined to be able to skip all the cases above
        respond = reply(html);
      }

      const response = context.user && context.user.response;

      if (response) {
        Object.assign(respond.headers, response.headers);
      }

      return respond.code(status);
    })
    .catch(err => {
      const output = routeOptions.responseForError(request, routeOptions, err);

      reply(output.html).code(output.status);
    });
};

const _registerRoutes = require("./register-routes");

const registerRoutes = (server, options) => _registerRoutes(server, options, DefaultHandleRoute);

const register = (server, options, next) => {
  try {
    registerRoutes(server, options);
    return next();
  } catch (err) {
    return next(err);
  }
};

const pkg = require("../../package.json");

register.attributes = { pkg };

module.exports = {
  register,
  registerRoutes
};
