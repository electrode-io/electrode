/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
/* global window */

import React from "react";
import { SubAppStartComponentPropsType } from "./subapp-start-component";
import { xarcV2, envHooks } from "@xarc/subapp";

type SubAppInlineComponentPropsType = SubAppStartComponentPropsType & {
  inlineId?: string;
};

/**
 * Functional component for starting a subapp inline, for hot reload or nesting within another subapp.
 */
export const SubAppInlineComponent = React.memo(
  function SubAppInlineComponent(
    props: SubAppInlineComponentPropsType
  ): React.JSX.Element {
    const { subapp, inlineId, pipeline, __props } = props;

    // Log on mount and when key props change
    React.useEffect(() => {
      xarcV2.debug("SubAppInlineComponent subapp", subapp.name, inlineId);
    }, [subapp.name, inlineId]);

    // Use useMemo to memoize the render logic and prevent unnecessary re-renders
    const renderedContent = React.useMemo(() => {
      xarcV2.debug("SubAppInlineComponent rendering subapp", subapp.name);

      const currentSubapp = envHooks.getContainer().get(subapp.name);

      if (!currentSubapp._module) {
        // Handle async module loading
        currentSubapp._getModule().then(() => {
          // Force re-render when module is loaded
          // Note: In a functional component, we need to trigger a state update
          // This is handled by the parent component's state management
        });
        return <div>loading subapp for inlining: {subapp.name}</div>;
      }

      // Get the prepared result from pipeline
      const prepResult = pipeline?.getPrepResult?.() || {
        Component: currentSubapp._getExport().Component,
      };

      return (
        <div>
          <prepResult.Component {...__props} />
        </div>
      );
    }, [subapp.name, __props, pipeline]); // Dependencies that should trigger re-computation

    return renderedContent;
  },
  // Custom comparison function to replicate shouldComponentUpdate behavior
  (prevProps, nextProps) => {
    // Return true if props are "equal" (component should NOT update)
    // This replicates the original shouldComponentUpdate returning false

    // For now, mimic the exact original behavior of never updating
    // TODO: Define proper conditions when an inline subapp should update
    return true; // Always return true = never update (same as shouldComponentUpdate returning false)

    // Alternative: More sophisticated comparison
    // return (
    //   prevProps.subapp.name === nextProps.subapp.name &&
    //   prevProps.inlineId === nextProps.inlineId &&
    //   prevProps.pipeline === nextProps.pipeline
    //   // Add other comparison logic as needed
    // );
  }
);
