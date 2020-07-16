/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */

/* eslint-disable filenames/match-regex */

import { processToken } from "../process-token";

/**
 * Require and invoke a token module with process handler
 *
 * @param props
 * @param context
 * @param scope
 */
export function Require(props: any, context: any, scope: any) {
  return processToken(props, context, scope, true);
}
