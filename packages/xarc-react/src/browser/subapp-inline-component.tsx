/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */

import React from "react";
import {
  SubAppStartComponent,
  SubAppStartComponentPropsType,
} from "./subapp-start-component";
import { xarcV2 } from "@xarc/subapp";

type SubAppInlineComponentPropsType = SubAppStartComponentPropsType & {
  inlineId?: string;
};

/**
 * Functional component for starting a subapp inline, for hot reload or nesting within another subapp.
 * @param props Props for the inline subapp component
 * @returns React.JSX.Element
 */

export function SubAppInlineComponent(
  props: SubAppInlineComponentPropsType
): React.JSX.Element {
  const { subapp, inlineId, pipeline, __props } = props;
  React.useEffect(() => {
    xarcV2.debug("SubAppInlineComponent subapp", subapp.name, inlineId);
  }, [subapp, inlineId]);
  // Pass all props to SubAppStartComponent
  return (
    <SubAppStartComponent
      subapp={subapp}
      pipeline={pipeline}
      __props={__props}
    />
  );
}
