import Fs from "fs";
import Path from "path";

/**
 * For loading and accessing stats data from webpack compile
 */
export class WebpackStats {
  private _stats: any;

  constructor() {
    this._stats = null;
  }

  /**
   * Load webpack's stats according to `WEBPACK_DEV` env.
   *
   * - `WEBPACK_ENV` defined - load from `.etmp` dir
   * - otherwise - load from `dist/server` dir
   *
   * '@remarks' will look for the data under dir by env `XARC_CWD` or `process.cwd()`
   *
   */
  load() {
    const statsDir = process.env.WEBPACK_DEV ? ".etmp" : "dist/server";
    const statsFile = Path.resolve(process.env.XARC_CWD || process.cwd(), statsDir, "stats.json");
    this._stats = JSON.parse(Fs.readFileSync(statsFile).toString());
  }

  /** names of all chunks
   *
   * @returns an array of chuck names of assets
   */
  get allChunkNames() {
    return Object.keys(this._stats.assetsByChunkName);
  }

  /** The raw stats data as loaded
   *
   * @returns webpack status object
   */
  get stats() {
    return this._stats;
  }

  /**
   * Get the asset filename of a chunk by its name
   *
   * @param name - name of chunk
   * @param ext - extension of the asset to get (`".css"`, `".js"`, etc)
   * @returns array of strings
   */
  getChunkAssetFilename(name: string, ext: string) {
    const chunk = this._stats.assetsByChunkName[name];
    if (!chunk) {
      return [];
    }

    return [].concat(chunk).filter(x => Path.extname(x) === ext);
  }
}
