/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */

/* eslint-disable filenames/match-regex */

import { processToken } from "../process-token";

export function Token(props: any, context: any, scope: any) {
  return processToken(props, context, scope);
}
