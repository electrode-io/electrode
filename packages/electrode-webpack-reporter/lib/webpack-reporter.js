"use strict";

const EventEmitter = require('events');

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
      this._reporterOptions = reporterOptions;
      const opt = reporterOptions.options;
      console.log(`webpack report is available at http://${opt.host}:${opt.port}/reporter`);
      console.log("webpack bundle is now VALID");
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
      let data = this._reporterOptions.stats.toJson(true);
      data.modules.forEach((m) => {
        delete m.source;
      });
      delete data.children;
      return data;
  };

    res.format({
      html: () => {
        res.status(200).send(`<pre>${this.jsonToString(jsonData(), false)}</pre>`);
      },

      json: () => {
        res.json(jsonData());
      },

      default: function () {
        res.status(404).send("Not found");
      }
    })
  }

  //
  // A quick one copied from webpack Stat
  //
  jsonToString(obj, useColors) {	var buf = [];

    function normal(str) {
      buf.push(str);
    }

    function bold(str) {
      if(useColors) buf.push("\u001b[1m");
      buf.push(str);
      if(useColors) buf.push("\u001b[22m");
    }

    function yellow(str) {
      if(useColors) buf.push("\u001b[1m\u001b[33m");
      buf.push(str);
      if(useColors) buf.push("\u001b[39m\u001b[22m");
    }

    function red(str) {
      if(useColors) buf.push("\u001b[1m\u001b[31m");
      buf.push(str);
      if(useColors) buf.push("\u001b[39m\u001b[22m");
    }

    function green(str) {
      if(useColors) buf.push("\u001b[1m\u001b[32m");
      buf.push(str);
      if(useColors) buf.push("\u001b[39m\u001b[22m");
    }

    function cyan(str) {
      if(useColors) buf.push("\u001b[1m\u001b[36m");
      buf.push(str);
      if(useColors) buf.push("\u001b[39m\u001b[22m");
    }

    function magenta(str) {
      if(useColors) buf.push("\u001b[1m\u001b[35m");
      buf.push(str);
      if(useColors) buf.push("\u001b[39m\u001b[22m");
    }

    function coloredTime(time) {
      var times = [800, 400, 200, 100];
      if(obj.time) {
        times = [obj.time / 2, obj.time / 4, obj.time / 8, obj.time / 16];
      }
      if(time < times[3])
        normal(time + "ms");
      else if(time < times[2])
        bold(time + "ms");
      else if(time < times[1])
        green(time + "ms");
      else if(time < times[0])
        yellow(time + "ms");
      else
        red(time + "ms");
    }

    function newline() {
      buf.push("\n");
    }

    function table(array, formats, align, splitter) {
      var rows = array.length;
      var cols = array[0].length;
      var colSizes = new Array(cols);
      for(var col = 0; col < cols; col++)
        colSizes[col] = 3;
      for(var row = 0; row < rows; row++) {
        for(var col = 0; col < cols; col++) {
          var value = array[row][col] + "";
          if(value.length > colSizes[col]) {
            colSizes[col] = value.length;
          }
        }
      }
      for(var row = 0; row < rows; row++) {
        for(var col = 0; col < cols; col++) {
          var format = row === 0 ? bold : formats[col];
          var value = array[row][col] + "";
          var l = value.length;
          if(align[col] === "l")
            format(value);
          for(; l < colSizes[col] && col !== cols - 1; l++)
            normal(" ");
          if(align[col] === "r")
            format(value);
          if(col + 1 < cols)
            normal(splitter || "  ");
        }
        newline();
      }
    }

    function formatSize(size) {
      if(size <= 0) return "0 bytes";

      var abbreviations = ["bytes", "kB", "MB", "GB"];
      var index = Math.floor(Math.log(size) / Math.log(1000));

      return +(size / Math.pow(1000, index))
          .toPrecision(3) + " " + abbreviations[index];
    }

    if(obj.hash) {
      normal("Hash: ");
      bold(obj.hash);
      newline();
    }
    if(obj.version) {
      normal("Version: webpack ");
      bold(obj.version);
      newline();
    }
    if(typeof obj.time === "number") {
      normal("Time: ");
      bold(obj.time);
      normal("ms");
      newline();
    }
    if(obj.publicPath) {
      normal("PublicPath: ");
      bold(obj.publicPath);
      newline();
    }
    if(obj.assets && obj.assets.length > 0) {
      var t = [
        ["Asset", "Size", "Chunks", "", "Chunk Names"]
      ];
      obj.assets.forEach(function(asset) {
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
    var modulesByIdentifier = {};
    if(obj.modules) {
      obj.modules.forEach(function(module) {
        modulesByIdentifier["$" + module.identifier] = module;
      });
    } else if(obj.chunks) {
      obj.chunks.forEach(function(chunk) {
        if(chunk.modules) {
          chunk.modules.forEach(function(module) {
            modulesByIdentifier["$" + module.identifier] = module;
          });
        }
      });
    }

    function processProfile(module) {
      if(module.profile) {
        normal("      ");
        var sum = 0,
          allowSum = true;
        var path = [];
        var current = module;
        while(current.issuer) {
          if(!modulesByIdentifier["$" + current.issuer]) {
            normal(" ... ->");
            allowSum = false;
            break;
          }
          path.unshift(current = modulesByIdentifier["$" + current.issuer]);
        }
        path.forEach(function(module) {
          normal(" [");
          normal(module.id);
          normal("] ");
          if(module.profile) {
            var time = (module.profile.factory || 0) + (module.profile.building || 0);
            coloredTime(time);
            sum += time;
            normal(" ");
          }
          normal("->");
        });
        Object.keys(module.profile).forEach(function(key) {
          normal(" " + key + ":");
          var time = module.profile[key];
          coloredTime(time);
          sum += time;
        });
        if(allowSum) {
          normal(" = ");
          coloredTime(sum);
        }
        newline();
      }
    }

    function processModuleAttributes(module) {
      normal(" ");
      normal(formatSize(module.size));
      if(module.chunks) {
        module.chunks.forEach(function(chunk) {
          normal(" {");
          yellow(chunk);
          normal("}");
        });
      }
      if(!module.cacheable) {
        red(" [not cacheable]");
      }
      if(module.optional) {
        yellow(" [optional]");
      }
      if(module.built) {
        green(" [built]");
      }
      if(module.prefetched) {
        magenta(" [prefetched]");
      }
      if(module.failed)
        red(" [failed]");
      if(module.warnings)
        yellow(" [" + module.warnings + " warning" + (module.warnings === 1 ? "" : "s") + "]");
      if(module.errors)
        red(" [" + module.errors + " error" + (module.errors === 1 ? "" : "s") + "]");
    }
    if(obj.chunks) {
      obj.chunks.forEach(function(chunk) {
        normal("chunk ");
        if(chunk.id < 1000) normal(" ");
        if(chunk.id < 100) normal(" ");
        if(chunk.id < 10) normal(" ");
        normal("{");
        yellow(chunk.id);
        normal("} ");
        green(chunk.files.join(", "));
        if(chunk.names && chunk.names.length > 0) {
          normal(" (");
          normal(chunk.names.join(", "));
          normal(")");
        }
        normal(" ");
        normal(formatSize(chunk.size));
        chunk.parents.forEach(function(id) {
          normal(" {");
          yellow(id);
          normal("}");
        });
        if(chunk.rendered) {
          green(" [rendered]");
        }
        newline();
        if(chunk.origins) {
          chunk.origins.forEach(function(origin) {
            normal("    > ");
            if(origin.reasons && origin.reasons.length) {
              yellow(origin.reasons.join(" "));
              normal(" ");
            }
            if(origin.name) {
              normal(origin.name);
              normal(" ");
            }
            if(origin.module) {
              normal("[");
              normal(origin.moduleId);
              normal("] ");
              var module = modulesByIdentifier["$" + origin.module];
              if(module) {
                bold(module.name);
                normal(" ");
              }
              if(origin.loc) {
                normal(origin.loc);
              }
            }
            newline();
          });
        }
        if(chunk.modules) {
          chunk.modules.forEach(function(module) {
            normal(" ");
            if(module.id < 1000) normal(" ");
            if(module.id < 100) normal(" ");
            if(module.id < 10) normal(" ");
            normal("[");
            normal(module.id);
            normal("] ");
            bold(module.name);
            processModuleAttributes(module);
            newline();
            if(module.reasons) {
              module.reasons.forEach(function(reason) {
                normal("        ");
                normal(reason.type);
                normal(" ");
                cyan(reason.userRequest);
                if(reason.templateModules) cyan(reason.templateModules.join(" "));
                normal(" [");
                normal(reason.moduleId);
                normal("] ");
                magenta(reason.module);
                if(reason.loc) {
                  normal(" ");
                  normal(reason.loc);
                }
                newline();
              });
            }
            processProfile(module);
          });
          if(chunk.filteredModules > 0) {
            normal("     + " + chunk.filteredModules + " hidden modules");
            newline();
          }
        }
      });
    }
    if(obj.modules) {
      obj.modules.forEach(function(module) {
        if(module.id < 1000) normal(" ");
        if(module.id < 100) normal(" ");
        if(module.id < 10) normal(" ");
        normal("[");
        normal(module.id);
        normal("] ");
        bold(module.name || module.identifier);
        processModuleAttributes(module);
        newline();
        if(module.reasons) {
          module.reasons.forEach(function(reason) {
            normal("       ");
            normal(reason.type);
            normal(" ");
            cyan(reason.userRequest);
            if(reason.templateModules) cyan(reason.templateModules.join(" "));
            normal(" [");
            normal(reason.moduleId);
            normal("] ");
            magenta(reason.module);
            if(reason.loc) {
              normal(" ");
              normal(reason.loc);
            }
            newline();
          });
        }
        processProfile(module);
      });
      if(obj.filteredModules > 0) {
        normal("    + " + obj.filteredModules + " hidden modules");
        newline();
      }
    }
    if(obj._showWarnings && obj.warnings) {
      obj.warnings.forEach(function(warning) {
        newline();
        yellow("WARNING in " + warning);
        newline();
      });
    }
    if(obj._showErrors && obj.errors) {
      obj.errors.forEach(function(error) {
        newline();
        red("ERROR in " + error);
        newline();
      });
    }
    if(obj.children) {
      obj.children.forEach(function(child) {
        if(child.name) {
          normal("Child ");
          bold(child.name);
          normal(":");
        } else {
          normal("Child");
        }
        newline();
        buf.push("    ");
        buf.push(Stats.jsonToString(child, useColors).replace(/\n/g, "\n    "));
        newline();
      });
    }

    while(buf[buf.length - 1] === "\n") buf.pop();
    return buf.join("");
  }
}

module.exports = WebpackReporter;
