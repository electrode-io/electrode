"use strict";

module.exports = function setup() {
  return {
    process() {
      return `<script src="https://polyfill.io/v3/polyfill.min.js?features=es5,es6&flags=gated"></script>`;
    }
  };
};
