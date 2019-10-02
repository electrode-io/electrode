const Fs = require("fs");
const Path = require("path");
const shcmd = require("shcmd");

const sortDeps = require("./sort-obj-keys");
const srcDir = Path.join(__dirname, "../template");
const pkg = require("../template/_package")();

sortDeps(pkg);

Fs.writeFileSync(Path.resolve("package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
shcmd.cp(Path.join(srcDir, "xclap.js"), process.cwd());
shcmd.cp("-R", Path.join(srcDir, "archetype"), process.cwd());
shcmd.cp("-R", Path.join(srcDir, "src"), process.cwd());
shcmd.cp("-R", Path.join(srcDir, "static"), process.cwd());
shcmd.cp("-R", Path.join(srcDir, "_gitignore"), Path.resolve(".gitignore"));
