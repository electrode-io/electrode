/** @ignore */ /** */

/* eslint-disable comma-dangle */
/* eslint-disable no-magic-numbers, no-console */

import * as Path from "path";
import * as requireAt from "require-at";
import { makeOptionalRequire } from "optional-require";

const failLoadTokenModule = (msg: string, err: Error) => {
  console.error(`error: @xarc/render-context failed to load token process module ${msg}`, err);
  return () => ({
    process: () => `\n@xarc/render-context: token process module ${msg} failed to load\n`
  });
};

const notFoundLoadTokenModule = (msg: string, err: Error) => {
  console.error(`error: @xarc/render-context can't find token process module ${msg}`, err);
  return () => ({
    process: () => `\n@xarc/render-context: token process module ${msg} not found\n`
  });
};

export const loadTokenModuleHandler = (path: string, templateDir?: string, customCall?: string) => {
  const tokenMod: any = makeOptionalRequire(requireAt(Path.resolve(templateDir || "")))(path, {
    fail: (e: Error) => failLoadTokenModule(path, e),
    notFound: (e: Error) => notFoundLoadTokenModule(path, e)
  });
  if (typeof tokenMod === "function") {
    return tokenMod;
  }
  if (tokenMod.tokenHandler) {
    return tokenMod.tokenHandler;
  }
  if (tokenMod.default) {
    return tokenMod.default;
  }

  if (customCall && tokenMod[customCall]) {
    return tokenMod;
  }
  console.log("going to throw");
  throw new Error(
    "@xarc/render-context: token module invalid - should export a function directly or as 'default' or 'tokenHandler'"
  );
};
