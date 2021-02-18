//
//

import { SubAppCSRData, SubAppDef, SubAppFeatureResult } from "../subapp/types";
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
  //  TODO: '_reload' is defined but never used
  //  eslint-disable-next-line
  async start(_reload?: boolean): Promise<any> {
    this.startPrepare();
    await this.waitForPrepare();
    if (!this.csrData.prepareOnly && !this.csrData.inlineId) {
      this.executeRender();
    }
  }

  startPrepare(): any {
    xarcV2.debug(this.constructor.name, "pipeline startPrepare for subapp", this.subAppName);
    this.preparePromise = this.framework.prepareCSR(this.csrData, this).then(result => {
      return (this.prepResult = result);
    });
  }

  async waitForPrepare(): Promise<SubAppFeatureResult> {
    this.prepResult = await this.preparePromise;
    return this.prepResult;
  }

  getPrepResult(): any {
    return this.prepResult;
  }

  isPrepared(): boolean {
    return !!this.prepResult;
  }

  executeRender(): void {
    xarcV2.debug("ClientRenderPipeline executeRender for subapp", this.csrData.name);
    this.framework.startSubAppSync(this.csrData, this);
  }

  _getSubApp(): SubAppDef {
    const container = envHooks.getContainer();
    const subapp = container.get(this.subAppName);
    return subapp;
  }

  //  eslint-disable-next-line
  _mount(_: any): any {
    //
  }

  //  eslint-disable-next-line
  _unmount(_: any): any {
    //
  }
  _reload(): Promise<any> {
    return Promise.resolve();
  }
}
