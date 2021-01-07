import { ClientRenderPipeline } from "./client-render-pipeline";
import { SubAppCSRData } from "./types";

/**
 * Allow specific UI framework to be configured
 *
 * TBD
 */
export interface ClientFrameworkLib {
  // TODO: what goes here?
  // 1. Browser side startup and render
  // 2. Server side rendering
  renderStart?(): void;

  renderToString?(Component: unknown): string;

  prepareCSR?(
    csrData: SubAppCSRData,
    pipeline: ClientRenderPipeline,
    reload?: boolean
  ): Promise<any>;

  startSubApp?(
    csrData: SubAppCSRData,
    pipeline: ClientRenderPipeline,
    reload?: boolean
  ): Promise<any>;

  startSubAppSync?(csrData: SubAppCSRData, pipeline: ClientRenderPipeline, reload?: boolean): void;
}
