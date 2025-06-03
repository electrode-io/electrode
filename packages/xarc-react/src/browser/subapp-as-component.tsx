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
 * @param subapp The subapp definition to inline
 * @param options Options for inlining the subapp
 * @returns A react component to be inlined in another subapp
 */
export function subAppInlineComponent(
  subapp: SubAppDef,
  options: SubAppInlineOptions = {}
) {
  if (options.ssr) {
    subapp._ssr = true;
  }
  const id = `subapp-${subapp.name}-inline`;
  const Comp = (props: any) => (
    <SubAppInlineComponent subapp={subapp} inlineId={id} __props={props} />
  );
  Comp.loadOptions = {
    name: subapp.name,
    ssr: options.ssr,
    prepareOnly: true,
    inlineId: id,
  };
  return Comp;
}
