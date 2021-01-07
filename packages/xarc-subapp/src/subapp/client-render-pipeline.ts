//
// This is a fake copy of ClientRenderPipeline that's implemented in src/browser/client-render-pipeline.ts.
// we need this because, unfortunately, tsc's module resolution doesn't look at package.json and the browser
// field.  So `compilerOptions.moduleResolution` only allow "classic" or "node", and
// it only knows about node.js.
//

/* eslint-disable */

import { SubAppCSRData, SubAppFeatureResult } from "./types";
import { envHooks } from "./envhooks";
import { SubAppRenderPipeline } from "./subapp-render-pipeline";
import { ClientFrameworkLib } from "./client-framework-lib";

export class ClientRenderPipeline implements Partial<SubAppRenderPipeline> {
  /** The component instance subapp mounted on */
  subAppName: string;
  csrData?: SubAppCSRData;
  framework?: ClientFrameworkLib;
  prepResult?: SubAppFeatureResult;
  preparePromise?: Promise<unknown>;

  constructor(csrData: SubAppCSRData) {
    //
    this.csrData = csrData;
    throw new Error("src/subapp/client-render-pipeline.ts should not be used by anything");
  }

  async start(_reload?: boolean) {
    //
  }

  startPrepare() {
    //
  }

  async waitForPrepare() {
    return this.prepResult;
  }

  getPrepResult() {
    return this.prepResult;
  }

  isPrepared() {
    return false;
  }

  executeRender() {
    //
  }

  _getSubApp() {
    const container = envHooks.getContainer();
    const subapp = container.get(this.subAppName);
    return subapp;
  }

  _mount(_: any) {
    //
  }
  _unmount(_: any) {
    //
  }
  _reload() {
    return Promise.resolve();
  }
}
