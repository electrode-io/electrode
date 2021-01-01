/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
/* global window */

import { createElement, Component } from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { SubAppDef, SubAppMountInfo } from "./index";

type PropsType = {
  __subapp: SubAppDef;
  __props: any;
};
export class SubAppStartComponent extends Component {
  _Component: any;
  subapp: SubAppDef;
  state: { count: number };
  _mountInfo: SubAppMountInfo;
  props: PropsType;

  constructor(props: PropsType) {
    super(props);
    this.state = { count: 0 };
    this.subapp = props.__subapp;
    this._Component = this.subapp._module.Component || this.subapp._module.subapp.Component;
    this._mountInfo = { component: this, subapp: this.subapp };
    this.subapp._mount(this._mountInfo);
  }

  reload() {
    this._Component = this.subapp._module.Component || this.subapp._module.subapp.Component;
    this.setState({ count: this.state.count + 1 });
  }

  componentWillUnmount() {
    this.subapp._unmount(this._mountInfo);
  }

  render() {
    return <this._Component {...this.props.__props} />;
  }
}
