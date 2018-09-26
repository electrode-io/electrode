"use strict";

const xsh = require("xsh");
const Fs = require("fs");
const archClap = require("../..")();

describe("save-cdn-map", function() {
  afterEach(() => {
    try {
      xsh.$.popd();
    } catch (e) {
      //
    }
  });
  it("should process and save raw CDN mappings to dist", done => {
    xsh.$.pushd("test/fixtures/save-cdn-map");
    archClap.run(["save-cdn-map --file=cdn-assets.json"], err => {
      expect(err).to.not.exist;
      const cdnMapping = JSON.parse(Fs.readFileSync("dist/cdn-mapping.json"));
      expect(cdnMapping).to.deep.equal({ "electrode-dll.test.js": "https://cdn.test.com/9999.js" });
      xsh.$.rm("-f", "dist/cdn-mapping.json");
      done();
    });
  });
});
