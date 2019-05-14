"use strict";

const Path = require("path");
const { JsxRenderer, Component, IndexPage } = require("../../../lib/jsx");
const Template = require("../../jsx-templates/test1").default;

describe("Component", function() {
  it("should have isComponent and render method", () => {
    const x = new Component();
    expect(x.isComponent()).to.equal(true);
    expect(x.render()).to.equal("component");
  });
});

describe("IndexPage", function() {
  it("should have static memoize", () => {
    expect(IndexPage.memoize({})).equal(`<!DOCTYPE html>`);
    expect(IndexPage.memoize({ DOCTYPE: "blah" })).equal(`<!DOCTYPE blah>`);
  });
});

describe("Jsx Renderer", function() {
  it("getTokenHandler should return undefined if no token handler", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    expect(renderer.getTokenHandler({ props: { _id: "blah" } })).to.equal(undefined);
  });

  it("getTokenInst should return undefined if no token instance", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    expect(renderer.getTokenInst({ props: { _id: "blah" } })).to.equal(undefined);
  });

  it("should have re-entrant initializeRenderer", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    renderer.initializeRenderer();
    renderer.initializeRenderer(true);
    renderer.initializeRenderer();
  });

  it("should render index page in JSX", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    const verify = context => {
      expect(context.output._result.trim()).equal(`<!DOCTYPE html>
<div>from test component1
</div>

<!-- INITIALIZE removed due to its handler set to null -->
<html lang="en"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
<div a="1" b="2" v="50"><!-- BEGIN PAGE_TITLE props: {} -->
<title>user-handler-title</title><!-- PAGE_TITLE END -->
my test
</div>

<link rel="stylesheet" id="bogel-font" href=""/>
<!-- META_TAGS removed due to its handler set to null -->
<!-- BEGIN PAGE_TITLE props: {} -->
<title>user-handler-title</title><!-- PAGE_TITLE END -->
<!-- BEGIN require(subapp-web/lib/init) props: {} -->

token process module subapp-web/lib/init not found
<!-- require(subapp-web/lib/init) END -->
<!-- CRITICAL_CSS removed due to its handler set to null -->
<style>.test {
  background: black;
}

.test {
  color: red;
}

<h1>Literal reading file failed: ENOENT: no such file or directory, open 'CWD/bad-file'</h1>
.test {
  color: red;
}

<h1>Literal props missing file</h1>
</style>
=async component 1
test nested async components 1
==async component 2
<div>test nested async components 2
</div>


</head>
<body><div>from test component1
hello
</div>

<!-- BEGIN user-token-2 props: {} -->
<div>user-token-2</div><!-- user-token-2 END -->
<img src="blah.gif"/>
<noscript><h4>JavaScript is Disabled
</h4>
<p>Sorry, this webpage requires JavaScript to function correctly.
</p>
<p>Please enable JavaScript in your browser and reload the page.
</p>
</noscript>
<div class="blah" style="background: cyan;"><!-- BEGIN require(../fixtures/custom-1) props: {} -->
<div>from custom-1</div><!-- require(../fixtures/custom-1) END -->
<!-- BEGIN require(subapp-web/lib/load) props: {"_concurrent":true,"name":"Header","timestamp":true,\
"startOnLoad":true,"elementId":"subapp-header01","serverSideRendering":true,"hydrateServerData":true,\
"clientSideRendering":true,"inlineScript":true} -->

token process module subapp-web/lib/load not found
<!-- require(subapp-web/lib/load) END -->
</div>
<div class="blah" style="background: green;"><!-- BEGIN require(subapp-web/lib/load) props: \
{"_concurrent":true,"name":"MainBody","timestamp":true,"elementId":"subapp-mainbody","streaming":true,\
"async":true,"hydrateServerData":true,"serverSideRendering":true} -->

token process module subapp-web/lib/load not found
<!-- require(subapp-web/lib/load) END -->
</div>
</body>
</html>`);
    };
    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });
});
