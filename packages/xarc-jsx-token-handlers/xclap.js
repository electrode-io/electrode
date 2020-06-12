const xclap = require("xclap");

const xsh = require("xsh");
const shell = xsh.$;
const exec = xsh.exec;

exec({ cwd: __dirname }, `cat src/*.js > dist/main.js`);
xclap.load({
  build: {
    desc: "make install",
    task: () => exec({ cwd: __dirname }, `cat src/*.js > dist/main.js`)
  }
});
