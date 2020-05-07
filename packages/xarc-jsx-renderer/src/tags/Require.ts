/**
 * @packageDocumentation
 * @module index
 */

/* eslint-disable filenames/match-regex */

import { processToken } from "../process-token";

export function Require(props: any, context: any, scope: any) {
  return processToken(props, context, scope, true);
}
