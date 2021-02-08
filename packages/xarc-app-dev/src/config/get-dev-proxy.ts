import { getDevProxy } from "./dev-proxy";

// this file must maintain compatibility for subapp-server/lib/util, that expects this
// module exports the single getDevProxy function.

// and all ESM and TS code internal to this module will stop using this file.

export = getDevProxy;
