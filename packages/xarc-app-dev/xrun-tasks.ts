import Path from "path";
import xrun from "@xarc/run";
import scanDir from "filter-scan-dir";
import { loadTasks } from "@xarc/module-dev";
import xsh from "xsh";
import _ from "lodash";
import Fs from "fs";

loadTasks({ xrun });

const { exec, serial } = xrun;

xrun.load("user", {
  moveDist: () => {
    const scanned = scanDir.sync({
      dir: "src",
      includeRoot: true,
      ignoreExt: [".ts"]
    });

    _.uniq(scanned.map(f => Path.dirname(f).replace("src", "dist"))).forEach(d =>
      // @ts-ignore
      xsh.$.mkdir("-p", d)
    );

    // @ts-ignore
    scanned.forEach(f => xsh.$.cp(f, f.replace("src", "dist")));

    const scanMaps = scanDir.sync({
      dir: "dist",
      includeRoot: true,
      filterExt: [".map"]
    });

    scanMaps.forEach(f => {
      const fname = Path.resolve(f);
      const mapData = JSON.parse(Fs.readFileSync(fname).toString());
      mapData.sources = mapData.sources.map(s => Path.relative("..", s));
      Fs.writeFileSync(fname, JSON.stringify(mapData) + "\n");
    });

    return serial(exec("shx rm -rf config lib", {}), exec("shx mv dist/* .", {}), () =>
      Fs.rmdirSync("dist")
    );
  }
});
