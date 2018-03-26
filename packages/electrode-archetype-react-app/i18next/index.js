"use strict";

var i18next = require("i18next");
var Backend = require("i18next-xhr-backend");
var LanguageDetector = require("i18next-browser-languagedetector");
var reactI18nextModule = require("react-i18next");

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    detection: {},
    fallbackLng: "en",
    languages: ["en", "zh", "fr", "es", "it"],
    react: {
      wait: true
    },
    backend: {
      loadPath: `${process.cwd()}/src/client/locales/{{ns}}.json`
    }
  });

module.exports = i18next;
