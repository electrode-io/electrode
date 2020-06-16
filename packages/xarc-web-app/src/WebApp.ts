import { JsxRenderer } from "@xarc/jsx-renderer";
import { RenderContext, TokenModule } from "@xarc/render-context";
import { getTokenHandlers, TokeHandler, getReactTokenHandlers } from "@xarc/token_handler";
import * as Path from "path";

export class WebApp {
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
    var gg = this.tokenHandlers;

    //00000 originally
    const tmplFile = templateFile || htmlFile;
    cacheKey = cacheKey || (cacheId && `${tmplFile}#${cacheId}`) || tmplFile;

    let asyncTemplate = routeOptions._templateCache[cacheKey];
    if (asyncTemplate) {
      return asyncTemplate;
    }

    if (options) {
      routeOptions = Object.assign({}, routeOptions, options);
    }

    const userTokenHandlers = []
      .concat(tokenHandlers, routeOptions.tokenHandler, routeOptions.tokenHandlers)
      .filter(x => x);

    let finalTokenHandlers = userTokenHandlers;
  }
  initializeTemplate() {
    this.renderer = new JsxRenderer({
      templateFullPath: Path.dirname(this.templateFullPath),
      template: _.get(this.template, "default", this.template),
      tokenHandlers: finalTokenHandlers.filter(x => x),
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
  }

  routeHandler(): (option: any) => {};

  render = (options, temp: ateSelection) => {};

  routeHandler(routeOptions);

  static makeRouteHander(routeOptions) {
    return new WebApp(routeOptions).routeHandler;
  }
}
