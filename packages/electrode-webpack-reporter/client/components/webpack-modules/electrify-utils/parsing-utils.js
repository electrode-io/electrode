import jsonTree from './json-tree';

export const parseBundle = function(bundles) {
    if (!bundles) {
        return null;
    }
      bundles = bundles && bundles[0]
    if (bundles) {
      // bundles = JSON.parse(bundles.toString());
    }
    return bundles;
  }

export const getStats = function(bundles) {
  if (Array.isArray(bundles)) {
    return parseBundle(bundles)
  } else {
    throw new Error("**** Pass the stats.json as per instructions electrify -h ****")
  }
}
  
export const bundle = function(bundles, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    callback = callback || function(){};
    var header = opts.header || opts.button || ''
    var footer = opts.footer || ''
      
      var data = {}; 
      data.mode = opts.mode || 'size'
    data = JSON.stringify(jsonTree(getStats([bundles])))

   return callback(null, {data})
  }