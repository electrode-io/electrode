// normally apps depend on @xarc/app[-dev] directly only but not @xarc/webpack
// so put this here to allow webpack config to load this into entry through @xarc/app-dev
require("@xarc/webpack/lib/client/webpack5-jsonp-cdn");
//# fynSourceMap=false
