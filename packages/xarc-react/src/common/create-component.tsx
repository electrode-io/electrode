/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
/* global window */

import { createElement, Component } from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
// rename declareSubApp to avoid triggering subapp webpack plugin
import { SubAppDef, IS_BROWSER, SubAppOptions, SubAppMountInfo, declareSubApp } from "@xarc/subapp";

/**
 * Create Component Options
 */
export type CreateComponentOptions = {
  /** Support Server Side Rendering */
  ssr?: boolean;
  /** Fall back JSX element to render while component module is loading */
  fallback?: JSX.Element;
  /** Specify a different resolve name to get the subapp from the module */
  resolveName?: string;
};

export class SubAppComponent extends Component {
  subapp: SubAppDef;
  loading: JSX.Element;
  resolveName: string | false;
  state: { module: any; TheComponent: typeof Component };
  _info: SubAppMountInfo;
  _props: any;
  _options: CreateComponentOptions;
  props: {
    __subapp: SubAppDef;
    __props: any;
    __options: CreateComponentOptions;
  };

  constructor(props) {
    super(props);
    this.subapp = props.__subapp;
    this._props = props.__props;
    this._options = props.__options;
    this.resolveName = this._options.resolveName || this.subapp.resolveName;
    this.state = this.makeState(this.subapp._module);
    this.loading = <div>subapp {this.subapp.name} component loading... </div>;
    this._info = { component: this, subapp: props.__subapp };
    this.subapp._mount(this._info);
  }

  makeState(mod) {
    let TheComponent: typeof Component;
    if (mod) {
      const resolveName = [this.resolveName, "subapp", "default"].find(x => x && mod[x]);

      TheComponent = (resolveName && mod[resolveName]?.Component) || mod.subapp?.Component;
    }

    return { module: mod, TheComponent };
  }

  reload(mod) {
    this.setState(this.makeState(mod));
  }

  componentWillUnmount() {
    this.subapp._unmount(this._info);
  }

  componentDidMount() {
    if (!this.state.module) {
      if (!IS_BROWSER) {
        console.error("SSR can't dynamic load subapp module");
      } else {
        this.subapp._getModule().then(mod => {
          this.setState(this.makeState(mod));
        });
      }
    }
  }

  render() {
    if (this.state.module) {
      if (this.state.TheComponent) {
        return <this.state.TheComponent {...this._props} />;
      } else {
        return <div>subapp {this.subapp.name}'s module did not export a SubApp</div>;
      }
    }

    if (this._options.ssr) {
      console.warn(
        `module is not ready for SSR dynamic import component of subapp ${this.subapp.name} - rendering loading fallback`
      );
    }

    return this.loading;
  }
}

/**
 * Create a React component from a subapp definition
 *
 * @param subapp - subapp definition
 * @param options - options
 *
 * @returns a React Component
 */
export function __createDynamicComponent(
  optDef: SubAppDef | SubAppOptions,
  options: CreateComponentOptions = {},
  dsa: typeof declareSubApp
) {
  let subappDef: SubAppDef;

  // already a SubAppDef
  if (!optDef.hasOwnProperty("_getModule")) {
    subappDef = dsa(optDef);
  } else {
    subappDef = optDef as SubAppDef;
  }

  if (options.ssr) {
    subappDef._ssr = true;
  }

  return (props: any) => (
    <SubAppComponent __subapp={subappDef} __options={options} __props={props} />
  );
}
