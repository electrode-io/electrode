import { TagTemplate, createTemplateTags, Token } from "../../src";

export const templateTags = createTemplateTags/*html*/ `<!DOCTYPE html>
<html lang="en">
${Token("INITIALIZE")}
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
  ${Token("META_TAGS")}
  ${Token("PAGE_TITLE")}
  ${Token("CRITICAL_CSS")}
  ${Token("APP_CONFIG_DATA")}
  ${Token("WEBAPP_HEADER_BUNDLES")}
  ${Token("WEBAPP_DLL_BUNDLES")}
<body>
  <div class="js-content">
    ${Token("SSR_CONTENT")}
  </div>
  ${Token("AFTER_SSR_CONTENT")}
  ${Token("PREFETCH_BUNDLES")}
  ${Token("WEBAPP_BODY_BUNDLES")}
  ${Token("WEBAPP_START_SCRIPT")}
  <noscript>
    <h4>JavaScript is Disabled</h4>
    <p>Sorry, this webpage requires JavaScript to function correctly.</p>
    <p>Please enable JavaScript in your browser and reload the page.</p>
  </noscript>
</body>
  ${Token("BODY_CLOSED")}
</html>
${Token("HTML_CLOSED")}
${Token("X")}${Token("X")}${Token("X")}${Token("X")}${Token("X")}${Token("X")}`;

export const template = new TagTemplate({
  templateTags,
  templateDir: __dirname,
  tokenHandlers: []
});
