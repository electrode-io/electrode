const xclap = require("xclap");
const { env, exec, serial, concurrent } = xclap;
const shcmd = require("shcmd");

xclap.load({
  "node-env": env({ BABEL_ENV: "-src-node" }),
  test: serial("compile", "node-env", "electrode/test-only"),
  coverage: serial("compile", "node-env", "electrode/test-cov"),
  check: serial("compile", "node-env", "electrode/check"),
  "test-only": ["test"],
  compile: serial(
    () => shcmd.rm("-rf", "dist"),
    concurrent("compile-dev", "compile-min", "compile-node")
  ),
  "compile-dev": exec("babel src -d dist/dev --delete-dir-on-start --source-maps", {
    env: { BABEL_ENV: "-src-dev" }
  }),
  "compile-min": exec("babel src -d dist/min --no-comments --delete-dir-on-start", {
    env: { BABEL_ENV: "-src-minify" }
  }),
  "compile-node": exec("babel src -d dist/node --delete-dir-on-start --source-maps", {
    env: { BABEL_ENV: "-src-node" }
  })
});
