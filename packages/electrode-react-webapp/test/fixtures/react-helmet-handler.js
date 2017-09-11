"use strict";

const Helmet = require("react-helmet").Helmet;

const emptyTitleRegex = /<title[^>]*><\/title>/;

module.exports = options => {
  const routeOptions = options.routeOptions;
  const iconStats = options.routeData.iconStats;

  return {
    INITIALIZE: context => {
      context.$.user.helmet = Helmet.renderStatic();
    },

    PAGE_TITLE: context => {
      const helmet = context.$.user.helmet;
      const helmetTitleScript = helmet.title.toString();
      const helmetTitleEmpty = helmetTitleScript.match(emptyTitleRegex);

      return helmetTitleEmpty ? `<title>${routeOptions.pageTitle}</title>` : helmetTitleScript;
    },

    WEBAPP_HEADER_BUNDLES: (context, next) => {
      context.handleResult(
        "WEBAPP_HEADER_BUNDLES",
        context.tokenHandler.WEBAPP_HEADER_BUNDLES(context), // eslint-disable-line
        () => {
          const scriptsFromHelmet = ["link", "style", "script", "noscript"]
            .map(tagName => context.$.user.helmet[tagName].toString())
            .join("");
          context.output.add(`<!--scripts from helmet-->${scriptsFromHelmet}`);
          next();
        }
      );
    },

    META_TAGS: context => {
      return context.$.user.helmet.meta.toString() + iconStats;
    }
  };
};
