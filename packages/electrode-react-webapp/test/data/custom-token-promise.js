// Example of a custom token module that exports an object
// with a process function

/* eslint-disable no-unused-vars */
module.exports = (renderContext, token) => Promise.resolve("custom replacement with promise");
