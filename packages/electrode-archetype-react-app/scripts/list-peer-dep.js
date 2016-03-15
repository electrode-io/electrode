var dev = process.argv[2];
if (dev) {
  dev = "-dev";
} else {
  dev = "";
}
var packageFile = "@walmart/electrode-archetype-react-app" + dev + "/package.json";
var devPkg = require(packageFile);
var peerDep = devPkg.peerDependencies;
if (peerDep) {
  var deps = Object.keys(peerDep).map(function (k) {
    return k + "@" + peerDep[k];
  });
  console.log(deps.join(" "));
}
