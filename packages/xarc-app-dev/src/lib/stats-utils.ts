/* eslint-disable @typescript-eslint/no-var-requires */
import _ from "lodash";
import { ModuleProcessor } from "./module-processor";
import AnsiConvert from "ansi-to-html";

/**
 * @param html
 */
export function escapeHtml(html) {
  const htmlMap = {
    "<": "&lt;",
    ">": "&gt;"
  };
  return html.replace(/([<>])/g, (_m, a) => htmlMap[a]);
}

/**
 * @param stats
 */
export function getInfo(stats) {
  const info = _.pick(stats, ["hash", "version", "time", "publicPath"]);
  return info;
}

/**
 * @param stats
 */
export function getAssets(stats) {
  if (stats.assets && stats.assets.length > 0) {
    return stats.assets.map(asset => {
      return _.pick(asset, ["name", "size", "chunks", "emitted", "chunkNames"]);
    });
  }

  return [];
}

/**
 * @param stats
 */
export function getModulesByPkg(stats) {
  const processor = new ModuleProcessor(stats);
  return {
    modulesByPkg: processor.makeModulesByPackage(),
    totalSize: processor.totalSize
  };
}

/**
 * @param logs
 */
export function logsToHtml(logs) {
  if (logs) {
    const convert = new AnsiConvert();
    return logs.map(x => convert.toHtml(escapeHtml(x)));
  }
  return [];
}

/**
 * @param stats
 */
export function getErrorsHtml(stats) {
  return logsToHtml(stats.errors);
}

/**
 * @param stats
 */
export function getWarningsHtml(stats) {
  return logsToHtml(stats.warnings);
}

//
// A quick HTML output adapted from original Stat.jsonToString
//
/* eslint-disable */
export function jsonToHtml(obj, useColors, anchors) {
  anchors = anchors || {};
  const buf = [];

  const normal = str => buf.push(str);

  const bold = useColors ? str => buf.push(`<b>${str}</b>`) : str => buf.push(str);

  const colorOut = useColors
    ? (color, str) => buf.push(`<span style="color:${color}">${str}</span>`)
    : (color, str) => buf.push(str);

  const yellow = str => colorOut("#cccc33", str);
  const red = str => colorOut("red", str);
  const green = str => colorOut("green", str);
  const cyan = str => colorOut("cyan", str);
  const magenta = str => colorOut("magenta", str);

  const coloredTime = time => {
    let times = [800, 400, 200, 100];
    if (obj.time) {
      times = [obj.time / 2, obj.time / 4, obj.time / 8, obj.time / 16];
    }
    if (time < times[3]) {
      normal(time + "ms");
    } else if (time < times[2]) {
      bold(time + "ms");
    } else if (time < times[1]) {
      green(time + "ms");
    } else if (time < times[0]) {
      yellow(time + "ms");
    } else {
      red(time + "ms");
    }
  };

  const newline = () => buf.push("\n");
  const anchor = name => {
    if (!anchors.hasOwnProperty(name)) {
      anchors[name] = true;
      buf.push(`<a name="${name}" id="anchor_${name}" />`);
    }
  };

  const table = (array, formats, align, splitter = null) => {
    const rows = array.length;
    const cols = array[0].length;
    const colSizes = new Array(cols);
    for (let col = 0; col < cols; col++) {
      colSizes[col] = 3;
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const value = array[row][col] + "";
        if (value.length > colSizes[col]) {
          colSizes[col] = value.length;
        }
      }
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const format = row === 0 ? bold : formats[col];
        const value = `${array[row][col]}`;
        let l = value.length;
        if (align[col] === "l") {
          format(value);
        }
        for (; l < colSizes[col] && col !== cols - 1; l++) {
          normal(" ");
        }
        if (align[col] === "r") {
          format(value);
        }
        if (col + 1 < cols) {
          normal(splitter || "  ");
        }
      }
      newline();
    }
  };

  const formatSize = size => {
    if (size <= 0) return "0 bytes";

    const abbreviations = ["bytes", "kB", "MB", "GB"];
    const index = Math.floor(Math.log(size) / Math.log(1000));

    return +(size / Math.pow(1000, index)).toPrecision(3) + " " + abbreviations[index];
  };

  //
  // Generate info about webpack: Hash, version, Time, PUblicPath
  //
  if (obj.hash) {
    normal("Hash: ");
    bold(obj.hash);
    newline();
  }
  if (obj.version) {
    normal("Version: webpack ");
    bold(obj.version);
    newline();
  }
  if (typeof obj.time === "number") {
    normal("Time: ");
    bold(obj.time);
    normal("ms");
    newline();
  }
  if (obj.publicPath) {
    normal("PublicPath: ");
    bold(obj.publicPath);
    newline();
  }

  //
  // Generate info about assets

  if (obj.assets && obj.assets.length > 0) {
    const t = [["Asset", "Size", "Chunks", "", "Chunk Names"]];
    obj.assets.forEach(asset => {
      t.push([
        asset.name,
        formatSize(asset.size),
        asset.chunks.join(", "),
        asset.emitted ? "[emitted]" : "",
        asset.chunkNames.join(", ")
      ]);
    });
    table(t, [green, normal, bold, green, normal], "rrrll");
  }

  //
  // Helpers for generate info about each module
  //
  const modulesByIdentifier = {};
  if (obj.modules) {
    obj.modules.forEach(module => {
      modulesByIdentifier["$" + module.identifier] = module;
    });
  } else if (obj.chunks) {
    obj.chunks.forEach(chunk => {
      if (chunk.modules) {
        chunk.modules.forEach(module => {
          modulesByIdentifier["$" + module.identifier] = module;
        });
      }
    });
  }

  const processProfile = module => {
    if (module.profile) {
      normal("      ");
      let sum = 0;
      let allowSum = true;
      const path = [];
      let current = module;
      while (current.issuer) {
        if (!modulesByIdentifier["$" + current.issuer]) {
          normal(" ... ->");
          allowSum = false;
          break;
        }
        path.unshift((current = modulesByIdentifier["$" + current.issuer]));
      }
      path.forEach(mod => {
        normal(" [");
        normal(mod.id);
        normal("] ");
        if (mod.profile) {
          const time = (mod.profile.factory || 0) + (mod.profile.building || 0);
          coloredTime(time);
          sum += time;
          normal(" ");
        }
        normal("->");
      });
      Object.keys(module.profile).forEach(key => {
        normal(" " + key + ":");
        const time = module.profile[key];
        coloredTime(time);
        sum += time;
      });
      if (allowSum) {
        normal(" = ");
        coloredTime(sum);
      }
      newline();
    }
  };

  function processModuleAttributes(module) {
    normal(" ");
    normal(formatSize(module.size));
    if (module.chunks) {
      module.chunks.forEach(chunk => {
        normal(" {");
        yellow(chunk);
        normal("}");
      });
    }
    if (!module.cacheable) {
      red(" [not cacheable]");
    }
    if (module.optional) {
      yellow(" [optional]");
    }
    if (module.built) {
      green(" [built]");
    }
    if (module.prefetched) {
      magenta(" [prefetched]");
    }
    if (module.failed) red(" [failed]");
    if (module.warnings)
      yellow(" [" + module.warnings + " warning" + (module.warnings === 1 ? "" : "s") + "]");
    if (module.errors)
      red(" [" + module.errors + " error" + (module.errors === 1 ? "" : "s") + "]");
  }

  //
  // Generate info about chunks
  //

  if (obj.chunks) {
    obj.chunks.forEach(chunk => {
      normal("chunk ");
      if (chunk.id < 1000) normal(" ");
      if (chunk.id < 100) normal(" ");
      if (chunk.id < 10) normal(" ");
      normal("{");
      yellow(chunk.id);
      normal("} ");
      green(chunk.files.join(", "));
      if (chunk.names && chunk.names.length > 0) {
        normal(" (");
        normal(chunk.names.join(", "));
        normal(")");
      }
      normal(" ");
      normal(formatSize(chunk.size));
      chunk.parents.forEach(id => {
        normal(" {");
        yellow(id);
        normal("}");
      });
      if (chunk.rendered) {
        green(" [rendered]");
      }
      newline();
      if (chunk.origins) {
        chunk.origins.forEach(origin => {
          normal("    > ");
          if (origin.reasons && origin.reasons.length) {
            yellow(origin.reasons.join(" "));
            normal(" ");
          }
          if (origin.name) {
            normal(origin.name);
            normal(" ");
          }
          if (origin.module) {
            normal("[");
            normal(origin.moduleId);
            normal("] ");
            const module = modulesByIdentifier["$" + origin.module];
            if (module) {
              bold(module.name);
              normal(" ");
            }
            if (origin.loc) {
              normal(origin.loc);
            }
          }
          newline();
        });
      }
      if (chunk.modules) {
        chunk.modules.forEach(module => {
          normal(" ");
          if (module.id < 1000) normal(" ");
          if (module.id < 100) normal(" ");
          if (module.id < 10) normal(" ");
          normal("[");
          normal(module.id);
          normal("] ");
          bold(module.name);
          processModuleAttributes(module);
          newline();
          if (module.reasons) {
            module.reasons.forEach(reason => {
              normal("        ");
              normal(reason.type);
              normal(" ");
              cyan(reason.userRequest);
              if (reason.templateModules) cyan(reason.templateModules.join(" "));
              normal(" [");
              normal(reason.moduleId);
              normal("] ");
              magenta(reason.module);
              if (reason.loc) {
                normal(" ");
                normal(reason.loc);
              }
              newline();
            });
          }
          processProfile(module);
        });
        if (chunk.filteredModules > 0) {
          normal("     + " + chunk.filteredModules + " hidden modules");
          newline();
        }
      }
    });
  }

  //
  // Display modules
  //

  if (obj.modules) {
    obj.modules.forEach(module => {
      if (module.id < 1000) normal(" ");
      if (module.id < 100) normal(" ");
      if (module.id < 10) normal(" ");
      normal("[");
      normal(module.id);
      normal("] ");
      bold(module.name || module.identifier);
      processModuleAttributes(module);
      newline();
      if (module.reasons) {
        module.reasons.forEach(reason => {
          normal("       ");
          normal(reason.type);
          normal(" ");
          cyan(reason.userRequest);
          if (reason.templateModules) cyan(reason.templateModules.join(" "));
          normal(" [");
          normal(reason.moduleId);
          normal("] ");
          magenta(reason.module);
          if (reason.loc) {
            normal(" ");
            normal(reason.loc);
          }
          newline();
        });
      }
      processProfile(module);
    });
    if (obj.filteredModules > 0) {
      normal("    + " + obj.filteredModules + " hidden modules");
      newline();
    }
  }

  //
  // Display warnings
  //
  if (obj._showWarnings && obj.warnings) {
    anchor("warning");
    obj.warnings.forEach(warning => {
      newline();
      yellow("WARNING in " + warning);
      newline();
    });
  }

  //
  // Display errors
  //
  if (obj._showErrors && obj.errors) {
    anchor("error");
    const convert = new AnsiConvert();
    obj.errors.forEach(error => {
      newline();
      red("ERROR in " + convert.toHtml(escapeHtml(error)));
      newline();
    });
  }

  //
  // Display children
  //
  if (obj.children) {
    obj.children.forEach(child => {
      if (child.name) {
        normal("Child ");
        bold(child.name);
        normal(":");
      } else {
        normal("Child");
      }
      newline();
      buf.push("    ");
      buf.push(this.jsonToHtml(child, useColors, anchors).replace(/\n/g, "\n    "));
      newline();
    });
  }

  while (buf[buf.length - 1] === "\n") {
    buf.pop();
  }
  return buf.join("");
}
