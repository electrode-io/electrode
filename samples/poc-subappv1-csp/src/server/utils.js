const Crypto = require("crypto");
const NONCE_SIZE = 16;
//  eslint-disable-next-line
export function nonceGenerator(_) {
  const token = Crypto.randomBytes(NONCE_SIZE).toString("base64");
  // drop "==" at the end
  //  eslint-disable-next-line
  return token.substr(0, token.length - 2);
}

export const cspNonceValue = nonceGenerator();
