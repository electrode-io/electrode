//
//

import { SubAppCSRData, SubAppFeatureResult } from "../subapp/types";
import { envHooks } from "../subapp/envhooks";
import { SubAppRenderPipeline } from "../subapp/subapp-render-pipeline";
import { ClientFrameworkLib } from "../subapp/client-framework-lib";
import { xarcV2 } from "./xarcv2";

export class ClientRenderPipeline implements Partial<SubAppRenderPipeline> {
  /** The component instance subapp mounted on */
  subAppName: string;
  csrData?: SubAppCSRData;
  framework?: ClientFrameworkLib;
  prepResult?: SubAppFeatureResult;
  preparePromise?: Promise<unknown>;

  constructor(csrData: SubAppCSRData) {
    this.subAppName = csrData.name;
    this.csrData = csrData;
    this.framework = this._getSubApp()._frameworkFactory() as ClientFrameworkLib;
  }

  async start(_reload?: boolean) {
    this.startPrepare();
    await this.waitForPrepare();
    if (!this.csrData.prepareOnly && !this.csrData.inlineId) {
      this.executeRender();
    }
  }

  startPrepare() {
    xarcV2.debug(this.constructor.name, "pipeline startPrepare for subapp", this.subAppName);
    this.preparePromise = this.framework.prepareCSR(this.csrData, this).then(result => {
      return (this.prepResult = result);
    });
  }

  async waitForPrepare() {
    this.prepResult = await this.preparePromise;
    return this.prepResult;
  }

  getPrepResult() {
    return this.prepResult;
  }

  isPrepared() {
    return !!this.prepResult;
  }

  executeRender() {
    xarcV2.debug("ClientRenderPipeline executeRender for subapp", this.csrData.name);
    this.framework.startSubAppSync(this.csrData, this);
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
