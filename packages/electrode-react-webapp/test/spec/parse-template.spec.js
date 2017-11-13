"use strict";

const parseTemplate = require("../../lib/parse-template");
const Fs = require("fs");
const Path = require("path");
const expect = require("chai").expect;

describe("parse-template", function() {
  it("should parse template into tokens", () => {
    const template = Fs.readFileSync(Path.join(__dirname, "../data/template1.html")).toString();
    const tokens = parseTemplate(template);
    const expected = [
      { str: "<html>\n\n<head>" },
      { id: "ssr content", isModule: false, pos: 17, custom: undefined, wantsNext: undefined },
      {
        id: "webapp header bundles",
        isModule: false,
        pos: 41,
        custom: undefined,
        wantsNext: undefined
      },
      {
        id: "webapp body bundles",
        isModule: false,
        pos: 75,
        custom: undefined,
        wantsNext: undefined
      },
      { id: "page title", isModule: false, pos: 107, custom: undefined, wantsNext: undefined },
      {
        id: "prefetch bundles",
        isModule: false,
        pos: 130,
        custom: undefined,
        wantsNext: undefined
      },
      { str: `<script>\n    console.log("test")\n  </script>` },
      { id: "meta tags", isModule: false, pos: 206, custom: undefined, wantsNext: undefined },
      { id: "#critical css", isModule: true, pos: 228, custom: undefined, wantsNext: undefined },
      { str: "</head>\n\n</html>" }
    ];
    expect(tokens).to.deep.equal(expected);
  });

  it("should parse template with token at end", () => {
    const template = Fs.readFileSync(Path.join(__dirname, "../data/template2.html")).toString();
    const tokens = parseTemplate(template);
    const expected = [
      { str: "<html>\n\n<head>" },
      { id: "ssr content", isModule: false, pos: 17, custom: undefined, wantsNext: undefined },
      {
        id: "webapp header bundles",
        isModule: false,
        pos: 41,
        custom: undefined,
        wantsNext: undefined
      },
      {
        id: "webapp body bundles",
        isModule: false,
        pos: 75,
        custom: undefined,
        wantsNext: undefined
      },
      {
        id: "prefetch bundles",
        isModule: false,
        pos: 107,
        custom: undefined,
        wantsNext: undefined
      },
      { str: `<script>\n    console.log("test")\n  </script>` },
      { id: "meta tags", isModule: false, pos: 183, custom: undefined, wantsNext: undefined },
      { id: "#critical css", isModule: true, pos: 205, custom: undefined, wantsNext: undefined },
      { str: "</head>\n\n</html>" },
      { id: "page title", isModule: false, pos: 246, custom: undefined, wantsNext: undefined }
    ];
    expect(tokens).to.deep.equal(expected);
  });
});
