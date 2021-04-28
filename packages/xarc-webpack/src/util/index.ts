import * as Path from "path";

/**
 * Get a babel exclude function to filter out files that should not
 * transpile.
 *
 * @param xarcOptions - xarc dev options
 * @returns babel exclude function
 */
export const getBabelExclude = (xarcOptions: any) => {
  const AppMode = xarcOptions.AppMode;

  const clientVendor = Path.join(AppMode.src.client, "vendor/");
  const { includeRegExp, excludeRegExp } = xarcOptions.babel;

  const babelExclude = (x: string) => {
    if (includeRegExp && includeRegExp.find((r: RegExp) => x.match(r))) {
      return false;
    }

    if (excludeRegExp && excludeRegExp.find((r: RegExp) => x.match(r))) {
      return true;
    }

    if (x.indexOf("node_modules") >= 0) {
      if (x.indexOf("~es2x~") >= 0 || x.indexOf("~es6~") >= 0) {
        return false;
      }
      return true;
    }

    if (x.indexOf(clientVendor) >= 0) {
      return true;
    }

    return false;
  };

  return babelExclude;
};
