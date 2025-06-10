/* eslint-disable max-statements */
/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */

import React, { useState, useEffect, useRef } from "react";
import { envHooks } from "@xarc/subapp";
import { SubAppDef, SubAppMountInfo, xarcV2, MountType } from "@xarc/subapp";
import { ReactClientRenderPipeline } from "./react-render-pipeline";

export type SubAppStartComponentPropsType = {
  subapp: SubAppDef;
  pipeline?: ReactClientRenderPipeline;
  __props: any;
};

/**
 * Functional component for starting a subapp, handling mount/unmount/reload logic.
 * @param props SubAppStartComponentPropsType
 * @returns React.JSX.Element
 */
export function SubAppStartComponent(
  props: SubAppStartComponentPropsType
): React.JSX.Element {
  const { subapp, pipeline, __props } = props;
  const [, setCount] = useState(0);
  const subappRef = useRef(subapp);
  const pipelineRef = useRef(pipeline);
  const mountInfoRef = useRef<SubAppMountInfo | null>(null);

  // Helper to reload the subapp
  const reload = () => {
    xarcV2.debug(
      "SubAppStartComponent (fn) reloading subapp",
      subappRef.current?.name
    );
    const container = envHooks.getContainer?.();
    if (container && subappRef.current) {
      const newSubapp = container.get(subappRef.current.name);
      if (newSubapp) {
        subappRef.current = newSubapp;
        setCount((c) => c + 1);
      }
    }
  };

  // Mount/unmount logic
  useEffect(() => {
    const type: MountType = "start";
    const mountInfo: SubAppMountInfo = {
      component: { reload },
      subapp: subappRef.current,
      type,
    };
    mountInfoRef.current = mountInfo;
    xarcV2.debug("SubAppStartComponent (fn) mount", subappRef.current?.name);
    if (pipelineRef.current && pipelineRef.current._mount) {
      pipelineRef.current._mount(mountInfo);
    } else if (subappRef.current && subappRef.current._mount) {
      subappRef.current._mount(mountInfo);
    }
    return () => {
      xarcV2.debug(
        "SubAppStartComponent (fn) unmount",
        subappRef.current?.name
      );
      if (pipelineRef.current && pipelineRef.current._unmount) {
        pipelineRef.current._unmount(mountInfo);
      } else if (subappRef.current && subappRef.current._unmount) {
        subappRef.current._unmount(mountInfo);
      }
    };
  }, []);

  // Helper to get the subapp instance
  const getSubApp = () => {
    const container = envHooks.getContainer?.();
    if (!container || !subappRef.current) return undefined;
    return container.get(subappRef.current.name);
  };

  // Render logic
  xarcV2.debug(
    "SubAppStartComponent (fn) rendering subapp",
    subappRef.current?.name
  );
  const currentSubApp = getSubApp();
  if (!currentSubApp || !currentSubApp._module) {
    currentSubApp?._getModule?.().then(() => reload());
    return (
      <div>
        SubAppStartComponent - module not loaded: {subappRef.current?.name}
      </div>
    );
  }
  const Comp =
    currentSubApp._getExport?.() && currentSubApp._getExport()?.Component;
  if (!Comp) {
    return (
      <div>
        SubAppStartComponent - no Component export for {subappRef.current?.name}
      </div>
    );
  }
  // Ensure Comp is a valid React component type
  if (
    typeof Comp === "function" ||
    (typeof Comp === "object" && Comp !== null)
  ) {
    return React.createElement(Comp as React.ElementType, { ...__props });
  }
  return (
    <div>
      SubAppStartComponent - invalid component type for{" "}
      {subappRef.current?.name}
    </div>
  );
}
