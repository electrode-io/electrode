var loaderUtils = require("loader-utils");

module.exports = function (content) {
  this.cacheable && this.cacheable();
  if (!this.emitFile) {
    throw new Error("emitFile is required from module system");
  }

  var query = loaderUtils.parseQuery(this.query);
  var name = query.name || "[hash].[ext]";
  var url = loaderUtils.interpolateName(this, name, {
    context: query.context || this.options.context,
    content: content,
    regExp: query.regExp
  });

  this.emitFile(url, content);

  var cdn = "var url = " + JSON.stringify(url) + ";\n" + 
    "var cdnUrl = typeof _wml !== \"undefined\" && _wml.cdn && _wml.cdn.map(url);\n";

  return cdn + "module.exports = cdnUrl || __webpack_public_path__ + url;";
};

module.exports.raw = true;

