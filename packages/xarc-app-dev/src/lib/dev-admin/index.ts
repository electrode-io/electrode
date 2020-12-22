/* eslint-disable @typescript-eslint/no-var-requires */
export {};

const NixClap = require("nix-clap");

const parsed = new NixClap()
  .init({
    exec: {
      type: "string",
      desc: "program/js to execute as the app server"
    },
    ext: {
      type: "string",
      desc: "file extensions to watch"
    },
    watch: {
      type: "string array",
      desc: "directories and files to watch"
    },
    interactive: {
      alias: "int",
      type: "boolean",
      default: true,
      desc: "disable interactivity (no-interactive to turn off)"
    },
    port: {
      type: "number",
      default: process.env.ELECTRODE_ADMIN_PORT || 8991,
      desc: "HTTP port to serve admin data"
    }
  })
  .parse();
import { AdminServer } from "./admin-server";

const admin = new AdminServer(parsed, {});

require("./cleanup");

admin.start();
