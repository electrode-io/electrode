"use strict";

/* eslint-disable no-console, no-magic-numbers, prefer-template */

/*
 * search all files under dist and generate a config/assets.json file for mocking CDN
 */

const Path = require("path");
const filterScanDir = require("filter-scan-dir");
const Url = require("url");
const Fs = require("fs");
const chokidar = require("chokidar");
const mime = require("mime");
const LOADED_ASSETS = {};

const cdnMock = {
  generateMockAssets(baseUrl) {
    const watcher = chokidar.watch("dist");
    let timer;
    const updateCdnMock = path => {
      LOADED_ASSETS[path] = undefined;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = undefined;
        console.log("Refreshing mock CDN mapping - please restart app");
        cdnMock._generateMockAssets(baseUrl);
      }, 250).unref();
    };
    watcher.on("change", updateCdnMock);
    cdnMock._generateMockAssets(baseUrl);
  },

  _generateMockAssets(baseUrl) {
    const files = filterScanDir.sync({ dir: "dist" });

    const url = Url.parse(baseUrl);
    const noProtocolBase = Path.posix.join(`/`, url.host, url.path);
    const timestamp = Math.floor(Date.now() / 1000);

    const mockAssets = files.reduce((acc, file) => {
      acc[Path.basename(file)] = "/" + Path.posix.join(noProtocolBase, `${timestamp}`, file);
      return acc;
    }, {});

    Fs.writeFileSync("config/assets.json", `${JSON.stringify(mockAssets, null, 2)}\n`);
  },

  respondAsset(req, res) {
    const filePath = req.url.replace(/\/__mock-cdn\/[0-9]+/, "dist");
    try {
      const fp = Path.resolve(filePath);
      let asset = LOADED_ASSETS[filePath];
      if (!asset) {
        asset = LOADED_ASSETS[filePath] = Fs.readFileSync(fp);
      }
      const ext = Path.extname(filePath);
      const mimeType = mime.lookup(ext);
      res.writeHead(200, {
        "Content-Type": mimeType,
        "Content-Length": Buffer.byteLength(asset)
      });
      res.write(asset);
      res.end();
    } catch (err) {
      res.statusCode = 404;
      res.write(`<html>
<body>
<h1>Mock CDN asset Not Found</h1>

<pre>
URL: ${req.url}
filepath: ${filePath}

${err.stack}
</pre>
</body></html>
`);
      res.end();
    }
  }
};

module.exports = cdnMock;
