import { Compiler, Compilation, sources } from "webpack";
const { ConcatSource, RawSource } = sources;

class CombineRuntimeAndRemoteEntryPlugin {
  private __fileName: string;
  private __runtimeFilename: string;

  constructor(fileName: string = "remoteEntry.js", runtimeFilename: string = "runtime.bundle") {
    this.__fileName = fileName;
    this.__runtimeFilename = runtimeFilename;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.thisCompilation.tap("CombineRuntimeAndRemoteEntryPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "CombineRuntimeAndRemoteEntryPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          let remoteEntry = Object.keys(assets).find((asset) => asset.startsWith("__remote_"));

          if (!remoteEntry) {
            remoteEntry = this.__fileName;
          }

          const runtime = Object.keys(assets).find((asset) => asset.startsWith(this.__runtimeFilename));

          if (remoteEntry && runtime && assets[remoteEntry] && assets[runtime]) {
            const runtimeSource =
              assets[runtime] instanceof ConcatSource
                ? assets[runtime]
                : new RawSource(assets[runtime].source());
            const remoteEntrySource =
              assets[remoteEntry] instanceof ConcatSource
                ? assets[remoteEntry]
                : new RawSource(assets[remoteEntry].source());

            const mergedRuntime = new ConcatSource(runtimeSource, "\n", remoteEntrySource);
            assets[remoteEntry] = mergedRuntime;
          }
        }
      );
    });
  }
}

export { CombineRuntimeAndRemoteEntryPlugin };
