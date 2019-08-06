// Custom Webpack Config that takes control and overrides Archetype
const { compose, env, options } = require("electrode-archetype-react-app-dev/config/webpack");

module.exports = compose(options);
