'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the number of selectors for a given node.
 * @param {Object} node CSS node in question.
 * @returns {Number} Total number of selectors associated with that node.
 */
var getSelLength = function getSelLength(node) {
  if (node.type === 'rule') {
    return node.selectors.length;
  }
  if (node.type === 'atrule' && node.nodes) {
    return 1 + node.nodes.reduce(function (memo, n) {
      return memo + getSelLength(n);
    }, 0);
  }
  return 0;
};

/**
 * PostCSS plugin that splits the generated result into multiple results based
 * on number of selectors.
 * @param {Number} size Maximum number of rules in a single file.
 * @param {Function} result Options passed to `postcss.toResult()`
 * @returns {Object} `postcss` plugin instance.
 */
exports.default = _postcss2.default.plugin('postcss-chunk', function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 4000 : _ref$size,
      _ref$result = _ref.result,
      genResult = _ref$result === undefined ? function () {
    return {};
  } : _ref$result;

  return function (css, result) {
    var chunks = [];
    var count = void 0;
    var chunk = void 0;

    // Create a new chunk that holds current result.
    var nextChunk = function nextChunk() {
      count = 0;
      chunk = css.clone({ nodes: [] });
      chunks.push(chunk);
    };

    // Walk the nodes. When we overflow the selector count, then start a new
    // chunk. Collect the nodes into the current chunk.
    css.nodes.forEach(function (n) {
      var selCount = getSelLength(n);
      if (!chunk || count + selCount > size) {
        nextChunk();
      }
      chunk.nodes.push(n);
      count += selCount;
    });

    // Output the results.
    result.chunks = chunks.map(function (c, i) {
      return c.toResult(genResult(i, c));
    });
  };
});
//# sourceMappingURL=chunk.js.map