"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements, complexity */

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

      if (data instanceof Error) {
        throw data;
      }

      let respond;
      let status = data.status;

      if (status === undefined) {
        status = 200;
        respond = reply(data);
      } else if (HttpStatus.redirect[status]) {
        respond = reply.redirect(data.path);
        return respond;
      } else if (status >= 200 && status < 300) {
        respond = reply(getDataHtml(data));
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        status = output.status;
        respond = reply(output.html);
      } else {
        respond = reply(getDataHtml(data));
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
