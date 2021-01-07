/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
/* global window */

import { createElement, Component } from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { envHooks } from "@xarc/subapp";
import { SubAppDef, SubAppMountInfo, xarcV2, MountType } from "./index";
import { ReactClientRenderPipeline } from "./react-render-pipeline";

export type SubAppStartComponentPropsType = {
  subapp: SubAppDef;
  pipeline?: ReactClientRenderPipeline;
  __props: any;
};

/**
 * wrapping component for starting a subapp, either for hot reload or nesting within another
 * subapp as a component.
 */
export class SubAppStartComponent extends Component {
  subapp: SubAppDef;
  state: { count: number };
  _mountInfo: SubAppMountInfo;
  props: SubAppStartComponentPropsType;
  pipeline?: ReactClientRenderPipeline;

  constructor(props: SubAppStartComponentPropsType, context: any, type: MountType = "start") {
    super(props);
    this.state = { count: 0 };
    this.subapp = props.subapp;
    this.pipeline = props.pipeline;
    this._mountInfo = { component: this, subapp: this.subapp, type };
    xarcV2.debug(this.constructor.name, "constructor wrap component for subapp", this.subapp.name);
    if (this.pipeline) {
      this.pipeline._mount(this._mountInfo);
    } else {
      this.subapp._mount(this._mountInfo);
    }
  }

  reload() {
    xarcV2.debug(this.constructor.name, "wrap component reloading subapp", this.subapp.name);
    this.subapp = envHooks.getContainer().get(this.subapp.name);
    this.setState({ count: this.state.count + 1 });
  }

  componentWillUnmount() {
    if (this.pipeline) {
      this.pipeline._unmount(this._mountInfo);
    } else {
      this.subapp._unmount(this._mountInfo);
    }
  }

  getSubApp() {
    const container = envHooks.getContainer();
    return container.get(this.subapp.name);
  }

  getPipeline(): ReactClientRenderPipeline {
    const subapp = this.getSubApp();
    // TODO: more than one
    return subapp._renderPipelines[0] as ReactClientRenderPipeline;
  }

  render() {
    xarcV2.debug("SubAppStartComponent rendering subapp", this.props.subapp.name);
    const subapp = this.getSubApp();
    if (!subapp._module) {
      subapp._getModule().then(() => this.reload());
      return <div>SubAppStartComponent - module not loaded: {this.subapp.name}</div>;
    }

    const Comp = subapp._getExport<typeof Component>()?.Component;
    return <Comp {...this.props.__props} />;
  }
}
