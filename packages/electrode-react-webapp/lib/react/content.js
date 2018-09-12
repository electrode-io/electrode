"use strict";
const HttpStatusCodes = require("http-status-codes");

const HTTP_ERROR_500 = 500;

async function getContent(renderSs, options, context) {
  let userContent = options.content;

  // prepare user content for container of SSR output

  if (typeof userContent === "string") {
    return { status: 200, html: userContent };
  }

  if (typeof userContent !== "function") return userContent;

  if (!renderSs) return { status: 200, html: "<!-- noss mode -->" };

  // invoke user content as a function, which could return any content
  // as static html or generated from react's renderToString
  userContent = userContent(options.request, options, context);
  if (userContent.then) {
    try {
      // user function needs to generate the content async, so wait for it.
      return await userContent;
    } catch (err) {
      if (!err.status) err.status = HTTP_ERROR_500;
      throw err;
    }
  }

  return userContent;
}

function transformOutput(result, context) {
  const content = context.user.content;
  if (content && content.status !== HttpStatusCodes.OK) {
    return {
      status: content.status,
      path: content.path,
      store: content.store,
      html: result
    };
  }

  return result;
}

const htmlifyScripts = (scripts, scriptNonce) => {
  return scripts
    .map(
      x =>
        typeof x === "string"
          ? `<script${scriptNonce}>${x}</script>\n`
          : x.map(n => `<script src="${n.src}"></script>`).join("\n")
    )
    .join("\n");
};

module.exports = {
  getContent,
  transformOutput,
  htmlifyScripts
};
