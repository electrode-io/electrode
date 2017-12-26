"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return (x !== null && !isNaN(x)) ? x : defaultListenPort;
};

module.exports = {
  "plugins": {
    "inert": {
      "enable": true
    },
    "electrodeStaticPaths": {
      "enable": true,
      "options": {
        "pathPrefix": "dist"
      }
    },<%if(pwa){%>
    "server/plugins/pwa": {
      "module": "./{{env.APP_SRC_DIR}}/server/plugins/pwa"
    },<%} if(isAutoSsr){%>
    "electrode-auto-ssr": {}, <%}%>
    "webapp": {
      "module": <%if(serverType==="HapiJS"){%>"electrode-react-webapp/lib/hapi"<%}else if (serverType==="ExpressJS"){%>"electrode-react-webapp/lib/express"<%} else {%>"electrode-react-webapp/lib/koa"<%}%>,
      "options": {
        "pageTitle": "<%= projectName %>",
        "paths": {
          "<%= routeValue %>": {
            "content": {
              "module": "./{{env.APP_SRC_DIR}}/server/views/index-view"
            }
          }
        }
      }
    }
  },
  "connections": {
    "default": {
      "host": process.env.HOST,
      "address": process.env.HOST_IP || "0.0.0.0",
      "port": portFromEnv(),
      "routes": {
        "cors": false
      },
      "state": {
        "ignoreErrors":true
      }
    }
  }
};
