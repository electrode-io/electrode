import { JsxRenderer } from "@xarc/jsx-renderer";
import { RenderContext, TokenModule } from "@xarc/render-context";
import { getTokenHandlers } from "@xarc/token_handler";
import * as Path from "path";
import { getReactTokenHandlers } from "react/token-handlers";
export = WebApp;

declare class WebApp {
  _routeOptions: any;
  _templateCache: {};
  defaultSelection: any;
  templateFullPath: string;
  templateFile: any;
  renderer: JsxRenderer;
  template: any;

  tokenHandlers: Array<TokeHandler>;
  renderContext: RenderContext;

  constructor(routeOptions: any) {
    this._routeOptions = routeOptions;
    this.templateFullPath =
      (routeOptions.templateFile && Path.resolve(routeOptions.templateFile)) ||
      Path.join(__dirname, "../template/index");
    this.template = require(this.templateFullPath);
    this.tokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);

    if (!routeOptions.replaceTokenHandlers) {
      finalTokenHandlers = getReactTokenHandlers();
      userTokenHandlers.indexOf(reactTokenHreactTokenHandlersandlers) < 0
        ? [reactTokenHandlers].concat(userTokenHandlers)
        : userTokenHandlers;
    }

    this.renderer = new JsxRenderer({
      templateFullPath: Path.dirname(this.templateFullPath),
      template: _.get(template, "default", template),
      tokenHandlers: finalTokenHandlers.filter(x => x),
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
  }

  routeHandler(): (option: any) => {};

  render = (options, temp: ateSelection) => {};

  routeHandler(routeOptions);
}
