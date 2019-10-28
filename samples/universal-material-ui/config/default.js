
const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.APP_SERVER_PORT || process.env.PORT, 10);
  return x !== null && !isNaN(x) ? x : defaultListenPort;
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
    },
    "webapp": {
      "module": "electrode-react-webapp/lib/hapi",
      "options": {
        "pageTitle": "Electrode React Sample App with material-ui",
        "paths": {
          "/{args*}": {
            "content": {
              "module": "./{{env.APP_SRC_DIR}}server/views/index-view"
            }
          }
        }
      }
    }
  },
  connections: {
    default: {
      port: portFromEnv()
    }
  }
};
