/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
/* global window */

import { createElement, Component } from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { SubAppStartComponent, SubAppStartComponentPropsType } from "./subapp-start-component";
import { xarcV2 } from "@xarc/subapp";

type SubAppInlineComponentPropsType = SubAppStartComponentPropsType & {
  inlineId?: string;
};

/**
 * wrapping component for starting a subapp, either for hot reload or nesting within another
 * subapp as a component.
 */
export class SubAppInlineComponent extends SubAppStartComponent {
  props: SubAppInlineComponentPropsType;
  inlineId: string;

  constructor(props: SubAppInlineComponentPropsType, context: any) {
    super(props, context, "inline");
    this.inlineId = this.props.inlineId;
    xarcV2.debug("SubAppInlineComponent subapp", props.subapp.name, this.inlineId);
  }

  shouldComponentUpdate() {
    // Note: without this, every time parent subapp has changes, the whole
    // nested subapp will be re-rendered, which is a perf killer.
    // TODO: define conditions an inline subapp should update
    return false;
  }

  render() {
    xarcV2.debug("SubAppInlineComponent rendering subapp", this.props.subapp.name);
    const subapp = this.getSubApp();
    if (!subapp._module) {
      subapp._getModule().then(() => this.reload());
      return <div>loading subapp for inlining: {this.subapp.name}</div>;
    }
    const prepResult = this.getPipeline().getPrepResult();
    return (
      <div>
        <prepResult.Component {...this.props.__props} />
      </div>
    );
  }
}
