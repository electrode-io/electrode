/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */

/* eslint-disable filenames/match-regex */

import { processToken } from "../process-token";

/**
 * Invoke a token by its ID, which can be registered with RegisterTokenIds.
 *
 * @param props
 * @param context
 * @param scope
 */
export function Token(props: any, context: any, scope: any) {
  return processToken(props, context, scope);
}
