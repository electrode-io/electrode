"use strict";

module.exports = function setup() {
  return {
    process() {
      return `<script src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=es5,es6&flags=gated"></script>`;
    }
  };
};
