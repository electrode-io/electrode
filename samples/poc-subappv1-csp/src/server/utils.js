const Crypto = require("crypto");
const NONCE_SIZE = 16;

export function nonceGenerator(_) {
  const token = Crypto.randomBytes(NONCE_SIZE).toString("base64");
  return token.substr(0, token.length - 2);
}

export const cspNonceValue = nonceGenerator();
