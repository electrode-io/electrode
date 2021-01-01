import * as Path from "path";
import * as Fs from "fs";
import * as Crypto from "crypto";
import { NonceInfo, InitProps } from "./types";
import * as Url from "url";

export function loadCdnMap(cdnMap: string): any {
  const fullPath = Path.isAbsolute(cdnMap)
    ? cdnMap
    : Path.resolve(process.env.XARC_CWD || process.cwd(), cdnMap);

  try {
    return JSON.parse(Fs.readFileSync(fullPath).toString());
  } catch (err) {
    return undefined;
  }
}

export function mapCdn(file: string, data: Record<string, string>) {
  if (data) {
    const reqBase = Path.posix.basename(file);
    for (const k in data) {
      if (Path.posix.basename(k) === reqBase) {
        return data[k];
      }
    }
  }
  return false;
}

/**
 * Wrap a string fragment with prefix and postfix
 * If fragment is falsy, then return empty string `""`
 *
 * @param fragment - string to wrap
 * @param prefix - string go before fragment
 * @param postfix - go after fragment
 * @returns wrapped string
 */
export function wrapStringFragment(fragment: string, prefix = "", postfix = "") {
  if (fragment) {
    return `${prefix}${fragment}${postfix}`;
  }

  return "";
}

export function nonceGenerator(_?: string) {
  const token = Crypto.randomBytes(16).toString("base64");
  // drop "==" at the end
  return token.substr(0, token.length - 2);
}

export function generateNonce(
  token: Partial<{ props: InitProps }>,
  fallback: NonceInfo = null,
  tag = ""
): { attr: string; nonce?: NonceInfo } {
  if (token.props.nonce === false) {
    return { attr: "" };
  }

  let nonceToken: string;
  let nonce: NonceInfo = (token.props.nonce as NonceInfo) || fallback;

  if (nonce) {
    if (nonce[tag] === false) {
      return { attr: "" };
    }
    nonceToken = nonce.tokens[tag] || nonce.tokens.all || nonce.generator(tag);
  } else {
    nonceToken = nonceGenerator(tag);
    nonce = { tokens: { all: nonceToken, [tag]: nonceToken } };
  }

  return { attr: ` nonce="${nonceToken}"`, nonce };
}

/**
 * Join a base url with path parts
 *
 * @param baseUrl - base url (protocol, host, port, first path parts)
 * @param pathParts - other path parts.  the first one start with ? or & causes
 *   the remaining parts to be treated as query params
 * @returns full URL
 */
export function urlJoin(baseUrl: string, ...pathParts: string[]) {
  const url = Url.parse(baseUrl);
  let onlyPaths = pathParts;
  const lastPathIx = pathParts.findIndex(x => x[0] === "?" || x[0] === "&");
  if (lastPathIx >= 0) {
    onlyPaths = pathParts.slice(0, lastPathIx);
    const queries = pathParts.slice(lastPathIx);
    const search = queries.map(x => (x[0] === "?" || x[0] === "&" ? x.substr(1) : x)).join("&");
    url.search = url.search ? `${url.search}&${search}` : `?${search}`;
  }
  if (onlyPaths.length > 0) {
    url.pathname = Path.posix.join(url.pathname || "", ...onlyPaths);
  }
  return Url.format(url);
}
