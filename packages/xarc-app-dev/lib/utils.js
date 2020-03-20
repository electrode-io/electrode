"use strict";
const Url = require("url");

const getOptRequire = require("@xarc/webpack/lib/util/get-opt-require");

const formUrl = ({ protocol = "http", host = "", port = "", path = "" }) => {
  const proto = protocol.toString().toLowerCase();
  const sp = port.toString();
  const host2 =
    host && port && !(sp === "80" && proto === "http") && !(sp === "443" && proto === "https")
      ? `${host}:${port}`
      : host;

  return Url.format({ protocol: proto, host: host2, pathname: path });
};

module.exports = {
  getOptArchetypeRequire: getOptRequire,
  formUrl
};
