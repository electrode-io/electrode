import { JsxRenderer } from "@xarc/jsx-renderer";
import { RenderContext, TokenModule } from "@xarc/render-context";
import { TokeHandler, getReactTokenHandlers } from "@xarc/handler_templates";
import * as Path from "path";

export class WebApp {
  _routeOptions: any;
  templateFullPath: string;
  renderer: JsxRenderer;
  template: Array<TokenModule>;

  tokenHandlers: Array<TokeHandler>;
  renderContext: RenderContext;

  constructor(routeOptions: any) {
    this._routeOptions = routeOptions;
    this.templateFullPath =
      (routeOptions.templateFile && Path.resolve(routeOptions.templateFile)) ||
      Path.join(__dirname, "../template/index");

    this.template = import templateFullPath;

    this.tokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);
    if (!routeOptions.replaceTokenHandlers) {
      this.tokenHandlers.concat(getReactTokenHandlers());
    }

    this.renderer = new JsxRenderer({
      templateFullPath: Path.dirname(this.templateFullPath),
      template: _.get(this.template, "default", this.template),
      tokenHandlers: this.tokenHandlers.filter(x => x),
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
  }

  static makeRouteHander(routeOptions) {
    return new WebApp(routeOptions).renderer;
  }
}
