import { createElement } from "react"; // eslint-disable-line
import { SubAppDef } from "@xarc/subapp";
import { SubAppInlineComponent } from "./subapp-inline-component";
import { SubAppInlineOptions } from "../common";

/**
 * Allow you to nest one subapp within another.
 *
 * This is different from `createDynamicComponent`, which just use subapp to handle
 * dynamic import of the component from a subapp.
 *
 * The component this creates keeps the full features of a subapp, such as data preparing,
 * routing, etc.
 *
 * - If `ssr` is true, then `prepareOnly` for an inlined subapp is always `true` because
 *   it will be rendered as part of its parent subapp instead.
 *
 * @param subapp
 * @param options
 * @returns A react component to be inlined in another subapp
 */
export function subAppInlineComponent(subapp: SubAppDef, options: SubAppInlineOptions = {}) {
  if (options.ssr) {
    subapp._ssr = true;
  }

  //
  // A subapp within another subapp has one big quirk with SSR:
  //
  // - It's not possible for us to find out what they are until the parent subapp
  //   is being rendered.
  //
  // Solutions:
  //
  // 1. With suspense, we can suspend rendering and prepare a nested subapp, but
  //    React still doesn't support suspense for SSR.
  // 2. Without suspense, we need user to pre-specify all the subapps that will need
  //    preparing.
  //
  // Even though this is client side only and suspense is available, we are relying on
  // number 2 for now. So by the time we reach here, we expect all subapps should've
  // been prepared.
  //
  // The key is, how do we get the pipeline that was used to prepare the subapp, and
  // connect it to SubAppStartComponent here?
  //

  //
  // subapp.id -> unique definition declare time id
  // subapp.asCompId -> incrementing index of as component instance
  // subapp.asCompId resets to zero when subapp is re-declared for HMR
  //
  // the prepare step needs hint from user on how many pipeline is needed for a subapp
  // to be used as nesting comp
  // when SubAppStartComponent needs a pipeline to use, it just look up as-comp pipeline
  // with count index same as asCompId.
  //

  const id = `subapp-${subapp.name}-inline`;

  const Comp = () => <SubAppInlineComponent subapp={subapp} inlineId={id} __props={{}} />;

  Comp.loadOptions = {
    name: subapp.name,
    ssr: options.ssr,
    prepareOnly: true,
    inlineId: id
  };

  return Comp;
}
