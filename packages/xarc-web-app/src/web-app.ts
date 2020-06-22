import { JsxRenderer } from "@xarc/jsx-renderer";
import { RenderContext, TokenModule } from "@xarc/render-context";
import * as Path from "path";
import _ from "lodash";

export class WebApp {
  _routeOptions: any;
  templateFullPath: string;
  renderer: JsxRenderer;
  template: Array<TokenModule>;

  tokenHandlers: Array<any>;
  renderContext: RenderContext;

  constructor(routeOptions: any) {
    this._routeOptions = routeOptions;

    this.templateFullPath =
      (routeOptions.templateFile && Path.resolve(routeOptions.templateFile)) ||
      Path.join(__dirname, "../template/index");

    const userTokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);
    let finalTokenHandlers = userTokenHandlers;

    if (!routeOptions.replaceTokenHandlers) {
      const reactTokenHandlers = Path.join(__dirname, "handlers/react/token-handlers");
      finalTokenHandlers =
        userTokenHandlers.indexOf(reactTokenHandlers) < 0
          ? [reactTokenHandlers].concat(userTokenHandlers)
          : userTokenHandlers;
    }

    this.template = require(this.templateFullPath);
    this.renderer = new JsxRenderer({
      templateFullPath: Path.dirname(this.templateFullPath),
      template: _.get(this.template, "default", this.template),
      tokenHandlers: this.tokenHandlers.filter(x => x),
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
  }

  static async makeRouteHander(routeOptions) {
    return new WebApp(routeOptions).renderer;
  }
}
