import { SubAppCSRData, xarcV2, ClientRenderPipeline, envHooks } from "@xarc/subapp";
import { SubAppMountInfo } from "../common";
import { BrowserReactLib } from "./react-lib-browser";

const _dynamics = [];

export class ReactClientRenderPipeline extends ClientRenderPipeline {
  /** The component instance subapp mounted on */
  startComponent: any;
  framework?: BrowserReactLib;

  constructor(csrData: SubAppCSRData) {
    super(csrData);
    // In production build, webpack will replace module.hot with false and the code will be optimized out
    // eslint-disable-next-line
    // @ts-ignore
    if (module.hot) {
      this._mount = function (info: SubAppMountInfo) {
        xarcV2.debug(
          "subapp pipeline _mount for",
          info.subapp.name,
          info,
          info.component.constructor.name
        );
        if (info.type === "start" || info.type === "inline") {
          this.startComponent = info.component;
        }
        if (_dynamics.indexOf(info) < 0) {
          _dynamics.push(info);
        }
      };

      this._unmount = function (info: SubAppMountInfo) {
        xarcV2.debug(
          "subapp pipeline _unmount for",
          info.subapp.name,
          info,
          info.component.constructor.name
        );
        const subapp = envHooks.getContainer().get(info.subapp.name);
        const plIx = subapp._renderPipelines.indexOf(this);
        // if this pipeline's component is the same as the mount component, then
        // it's no longer needed, so remove it from subapp.
        if (plIx >= 0) {
          if (this.startComponent === info.component) {
            xarcV2.debug(
              "removing unmounted pipeline because its startComponent is same as unmount component"
            );
            subapp._renderPipelines.slice(plIx, 1);
          } else if (this.startComponent) {
            xarcV2.debug(
              "keeping unmounted pipeline and reloading because its startComponent has changed"
            );
            subapp._getModule().then(() => {
              this.startComponent.reload();
            });
          } else {
            xarcV2.debug(
              "keeping unmounted pipeline because its startComponent has changed to null"
            );
          }
        } else {
          console.error("unmounted pipeline not found in subapp"); // eslint-disable-line
        }
        const ix = _dynamics.indexOf(info);
        if (ix >= 0) {
          _dynamics.splice(ix, 1);
        }
      };

      this._reload = function () {
        return Promise.resolve().then(() => {
          if (this.csrData) {
            if (this.csrData.inlineId) {
              xarcV2.debug("Reloading an inline subapp", this.csrData.name);
              setTimeout(() => this.startComponent.reload(), 1);
            } else if (this.startComponent) {
              xarcV2.debug("Reloading a subapp with its start component");
              // restart a rendered subapp
              setTimeout(() => this.startComponent.reload(), 1);
            } else {
              // eslint-disable-next-line
              console.error(
                "Subapp pipeline has no startComponent to handle hot reload",
                this.csrData.name
              );
            }
          }
          return null;
        });
      };
    }
  }
}
