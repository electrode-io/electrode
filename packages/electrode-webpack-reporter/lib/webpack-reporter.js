"use strict";

/* eslint-disable no-console, no-magic-numbers, max-statements, complexity, prefer-template, curly, max-len, max-params */

const EventEmitter = require("events");
const chalk = require("chalk");
const AnsiConvert = require("ansi-to-html");

class WebpackReporter extends EventEmitter {
  constructor() {
    super();
  }

  apply(config) {
    config = config.devServer || config;
    config.reporter = this._reporter.bind(this);
    config.setup = this._setup.bind(this);
  }

  _reporter(reporterOptions) {
    if (reporterOptions.state) {
      const stats = reporterOptions.stats;
      this._reporterOptions = reporterOptions;
      const opt = reporterOptions.options;
      const error = stats.hasErrors() ? chalk.red(" ERRORS") : "";
      const warning = stats.hasWarnings() ? chalk.yellow(" WARNINGS") : "";
      console.log(`webpack bundle is now VALID${error}${warning}`);
      console.log(`webpack report is served from http://${opt.host}:${opt.port}/reporter`);
    } else {
      console.log("webpack bundle is now INVALID");
    }
    this.emit("report", reporterOptions);
  }

  _setup(app) {
    app.get("/reporter", this._webReport.bind(this));
  }

  _webReport(req, res) {
    const jsonData = () => {
      return this._reporterOptions.stats.toJson({}, true);
    };

    res.format({
      html: () => {
        res.status(200).send(
          `<html><body style="background-color:black;color:gray">
<pre>${this.jsonToHtml(jsonData(), true)}</pre></body></html>`);
      },

      json: () => {
        res.json(jsonData());
      },

      default: function () {
        res.status(404).send("Not found");
      }
    });
  }

  //
  // A quick HTML output adapted from original Stat.jsonToString
  //
  jsonToHtml(obj, useColors) {
    const buf = [];

    const normal = (str) => buf.push(str);

    const bold = useColors ? (str) => buf.push(`<b>${str}</b>`) : (str) => buf.push(str);

    const colorOut = useColors ?
      (color, str) => buf.push(`<span style="color:${color}">${str}</span>`) :
      (color, str) => buf.push(str);

    const yellow = (str) => colorOut("#cccc33", str);
    const red = (str) => colorOut("red", str);
    const green = (str) => colorOut("green", str);
    const cyan = (str) => colorOut("cyan", str);
    const magenta = (str) => colorOut("magenta", str);

    const coloredTime = (time) => {
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

    const table = (array, formats, align, splitter) => {
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

    const formatSize = (size) => {
      if (size <= 0) return "0 bytes";

      const abbreviations = ["bytes", "kB", "MB", "GB"];
      const index = Math.floor(Math.log(size) / Math.log(1000));

      return +(size / Math.pow(1000, index))
          .toPrecision(3) + " " + abbreviations[index];
    };

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
    if (obj.assets && obj.assets.length > 0) {
      const t = [
        ["Asset", "Size", "Chunks", "", "Chunk Names"]
      ];
      obj.assets.forEach((asset) => {
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
    const modulesByIdentifier = {};
    if (obj.modules) {
      obj.modules.forEach((module) => {
        modulesByIdentifier["$" + module.identifier] = module;
      });
    } else if (obj.chunks) {
      obj.chunks.forEach((chunk) => {
        if (chunk.modules) {
          chunk.modules.forEach((module) => {
            modulesByIdentifier["$" + module.identifier] = module;
          });
        }
      });
    }

    const processProfile = (module) => {
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
          path.unshift(current = modulesByIdentifier["$" + current.issuer]);
        }
        path.forEach((mod) => {
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
        Object.keys(module.profile).forEach((key) => {
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
        module.chunks.forEach((chunk) => {
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
      if (module.failed)
        red(" [failed]");
      if (module.warnings)
        yellow(" [" + module.warnings + " warning" + (module.warnings === 1 ? "" : "s") + "]");
      if (module.errors)
        red(" [" + module.errors + " error" + (module.errors === 1 ? "" : "s") + "]");
    }

    if (obj.chunks) {
      obj.chunks.forEach((chunk) => {
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
        chunk.parents.forEach((id) => {
          normal(" {");
          yellow(id);
          normal("}");
        });
        if (chunk.rendered) {
          green(" [rendered]");
        }
        newline();
        if (chunk.origins) {
          chunk.origins.forEach((origin) => {
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
          chunk.modules.forEach((module) => {
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
              module.reasons.forEach((reason) => {
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
    if (obj.modules) {
      obj.modules.forEach((module) => {
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
          module.reasons.forEach((reason) => {
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
    if (obj._showWarnings && obj.warnings) {
      obj.warnings.forEach((warning) => {
        newline();
        yellow("WARNING in " + warning);
        newline();
      });
    }
    if (obj._showErrors && obj.errors) {
      const convert = new AnsiConvert();
      obj.errors.forEach((error) => {
        newline();
        red("ERROR in " + convert.toHtml(error));
        newline();
      });
    }
    if (obj.children) {
      obj.children.forEach((child) => {
        if (child.name) {
          normal("Child ");
          bold(child.name);
          normal(":");
        } else {
          normal("Child");
        }
        newline();
        buf.push("    ");
        buf.push(this.jsonToHtml(child, useColors).replace(/\n/g, "\n    "));
        newline();
      });
    }

    while (buf[buf.length - 1] === "\n") buf.pop();
    return buf.join("");
  }
}

module.exports = WebpackReporter;
