import { XarcSubAppClientV2 } from "../subapp/types";

export const xarcV2 = ((window as any).xarcV2 as XarcSubAppClientV2) || {
  // in case xarc subapp client is not loaded, provide an empty fill-in to handle debug calls
  // this occurs when app is using subapp for dynamic import component only without the subapp features.
  debug: () => {
    //
  }
};
