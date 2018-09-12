"use strict";

const Helmet = require("react-helmet").Helmet;

const emptyTitleRegex = /<title[^>]*><\/title>/;

module.exports = handlerContext => {
  const routeOptions = handlerContext.user.routeOptions;
  const iconStats = handlerContext.user.routeData.iconStats;

  return {
    HEAD_INITIALIZE: context => {
      context.user.helmet = Helmet.renderStatic();
    },

    PAGE_TITLE: context => {
      const helmet = context.user.helmet;
      const helmetTitleScript = helmet.title.toString();
      const helmetTitleEmpty = helmetTitleScript.match(emptyTitleRegex);

      return helmetTitleEmpty ? `<title>${routeOptions.pageTitle}</title>` : helmetTitleScript;
    },

    REACT_HELMET_SCRIPTS: context => {
      const scriptsFromHelmet = ["link", "style", "script", "noscript"]
        .map(tagName => context.user.helmet[tagName].toString())
        .join("");
      return `<!--scripts from helmet-->${scriptsFromHelmet}`;
    },

    META_TAGS: context => {
      return context.user.helmet.meta.toString() + iconStats;
    }
  };
};
