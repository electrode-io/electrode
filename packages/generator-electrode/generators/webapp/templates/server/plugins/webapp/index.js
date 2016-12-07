
module.exports = require(<% if (isHapi) { %>"./hapi-plugin"<% } else { %>"./express-middleware"<% } %>);
