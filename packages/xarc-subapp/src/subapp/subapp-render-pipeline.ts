import { SubAppFeatureResult, SubAppMountInfo } from "./types";

/**
 * Manage the steps of rendering a subapp
 *
 * Each instance of this represents a unique rendering of a given subapp.
 *
 * It should contain all the information and options for the instance only.
 */
export interface SubAppRenderPipeline {
  /**
   * Kick off executing a subapp's features to prepare it for rendering
   */
  startPrepare: () => void;
  /**
   * Async wait for the subapp's prepare to finish
   */
  waitForPrepare: () => Promise<SubAppFeatureResult>;
  /** Check if pipeline is prepared */
  isPrepared: () => boolean;
  getPrepResult: () => SubAppFeatureResult;
  /**
   * Actually render the subapp (client or server side).  subapp must've been prepared.
   */
  executeRender: () => void;
  start: (reload?: boolean) => Promise<any>;
  /** Hot module reload (HMR) support */
  _reload: () => Promise<any>;
  /** For HMR: a component mount itself to the subapp/pipeline */
  _mount: (info: SubAppMountInfo) => void;
  /** For HMR: a component unmount itself from the subapp/pipeline*/
  _unmount: (info: SubAppMountInfo) => void;
}
