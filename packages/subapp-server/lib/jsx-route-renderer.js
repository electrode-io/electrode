import { JsxRenderer } from "@xarc/jsx-renderer");
import * as jsxTokenHandlers from "@xarc/jsx-token-handler";


 const JsxRouterRend = routeOptions => {
  const templateFullPath = Path.resolve(routeOptions.templateFile);
  const defaultTemplate = require(Path.resolve("resources/index-page.js"));
  const asyncTemplate = new JsxRenderer({
    templateFullPath: Path.dirname(templateFullPath),
    template: _.get(templateFullPath, "default", defaultTemplate),
    tokenHandlers: jsxTokenHandlers,
    insertTokenIds: routeOptions.insertTokenIds,
    routeOptions
  });
  asyncTemplate.initializeRenderer();
  return asyncTemplate;
};

export default JsxRouterRend;