"use strict";

const Benchmark = require("benchmark");
const ReactWebapp = require("../lib/react-webapp");
const Path = require("path");

function test1() {
  const options = ReactWebapp.setupOptions({
    htmlFile: Path.join(__dirname, "data/perf-1.html"),
    tokenHandler: "./test/fixtures/perf-1-handler"
  });
  const content = () => {
    return {
      status: 200,
      html: "<div>testing</div>",
      prefetch: "window._data = {};"
    };
  };
  const handler = ReactWebapp.makeRouteHandler(options);
  const request = {};

  function render(deferred) {
    handler({ request, content }).then(() => {
      deferred.resolve();
    });
  }

  const suite = new Benchmark.Suite();
  suite
    .add("test1", {
      defer: true,
      fn: render
    })
    .on("complete", function() {
      console.log(this[0].times, 1 / this[0].times.period);
    })
    .run();
}

test1();
