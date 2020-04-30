"use strict";

const NixClap = require("nix-clap");

const parsed = new NixClap()
  .init({
    exec: {
      type: "string"
    },
    ext: {
      type: "string"
    },
    watch: {
      type: "string array"
    }
  })
  .parse();

const AdminServer = require("./admin-server");

const admin = new AdminServer(parsed);

require("./cleanup");

admin.start();
