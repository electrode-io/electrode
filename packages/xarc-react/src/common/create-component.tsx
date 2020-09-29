/* eslint-disable no-console */

import { createElement, Component } from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
// rename declareSubApp to avoid triggering subapp webpack plugin
import { SubAppDef, IS_BROWSER, SubAppOptions, declareSubApp as dsa } from "@xarc/subapp";

export class SubAppComponent extends Component {
  subapp: SubAppDef;
  loading: JSX.Element;
  resolveName: string;
  state: { module: any; TheComponent: typeof Component };

  constructor(props) {
    super(props);
    this.subapp = props.__subapp;
    this.resolveName = props.__resolveName || this.subapp.resolveName;
    this.state = this.makeState(this.subapp._module);
    this.loading = <div>subapp component loading... </div>;
  }

  makeState(mod) {
    let TheComponent;
    if (mod) {
      const resolveName = [this.resolveName, "subapp", "default"].find(x => x && mod[x]);

      TheComponent = resolveName && mod[resolveName]?.Component;
    }

    return { module: mod, TheComponent };
  }

  componentDidMount() {
    if (!this.state.module) {
      if (!IS_BROWSER) {
        console.error("SSR can't dynamic load subapp module");
      } else {
        console.log("loading subapp module", this.subapp.name);
        this.subapp._getModule().then(mod => {
          this.setState(this.makeState(mod));
        });
      }
    } else {
      console.log("subapp module already available", this.subapp.name);
    }
  }

  render() {
    if (this.state.module) {
      if (this.state.TheComponent) {
        return <this.state.TheComponent {...this.props} />;
      } else {
        return <div>subapp {this.subapp.name}'s module did not export a SubApp</div>;
      }
    }

    return this.loading;
  }
}

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

/**
 * Create a React component from a subapp definition
 *
 * @param subapp - subapp definition
 * @param options - options
 *
 * @returns a React Component
 */
export function createDynamicComponent(
  subapp: SubAppDef | SubAppOptions,
  options: CreateComponentOptions = {}
) {
  const saDef = !subapp.hasOwnProperty("_getModule") ? dsa(subapp) : (subapp as SubAppDef);

  if (options.ssr) {
    saDef._ssr = true;
  }

  return (props: any) => (
    <SubAppComponent {...props} __subapp={saDef} __resolveName={options.resolveName} />
  );
}
