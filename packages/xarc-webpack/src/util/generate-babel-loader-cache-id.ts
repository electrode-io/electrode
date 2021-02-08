import * as Fs from "fs";
import * as Path from "path";

/**
 * Generate a cache identifier for babel-loader
 *
 * @param cwd - app dir
 * @returns cache identifier
 */
export function generateBabelLoaderCacheId(cwd: string): string {
  /*
   * cacheIdentifier: Default is a string composed by the @babel/core's version,
   * the babel-loader's version, the contents of .babelrc file if it exists,
   * and the value of the environment variable BABEL_ENV with a fallback to
   * the NODE_ENV environment variable. This can be set to a custom value to
   * force cache busting if the identifier changes.
   */
  // @babel/core's version
  // babel-loader's version
  const pkgVersions = ["@babel/core", "babel-loader"].map(pkg => {
    return require(`${pkg}/package.json`).version; // eslint-disable-line
  });

  let babelConfig;
  let browsersListRc;
  const dir = cwd || process.env.XARC_CWD || process.cwd();

  try {
    // content of babel.config.js
    babelConfig = Fs.readFileSync(Path.join(dir, "babel.config.js"), "utf-8");
  } catch {
    //
  }
  // .browserslistrc content
  try {
    browsersListRc = Fs.readFileSync(Path.join(dir, ".browserslistrc"), "utf-8");
  } catch {
    //
  }

  return pkgVersions
    .concat(
      babelConfig,
      process.env.BABEL_ENV,
      process.env.NODE_NV,
      browsersListRc,
      process.env.BROWSERSLIST_ENV
    )
    .filter(x => x)
    .join("\n");
}
