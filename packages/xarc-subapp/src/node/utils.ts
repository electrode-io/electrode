import Path from "path";
import Fs from "fs";
import Crypto from "crypto";
import { NonceInfo, InitProps } from "./types";
import Url from "url";

const NONCE_SIZE = 16;

/**
 * Load CDN map
 *
 * @param cdnMap CDN map
 * @returns cdn Map, if not found, return undefined
 */
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

/**
 * get
 *
 * @param file - string to wrap
 * @param data - string go before fragment
 * @returns if found, return request's path name, if not, return false
 */
export function mapCdn(file: string, data: Record<string, string>): string | boolean {
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
export function wrapStringFragment(fragment: string, prefix = "", postfix = ""): string {
  if (fragment) {
    return `${prefix}${fragment}${postfix}`;
  }

  return "";
}

//  eslint-disable-next-line
export function nonceGenerator(_?: string): string {
  const token = Crypto.randomBytes(NONCE_SIZE).toString("base64");
  // drop "==" at the end
  //  eslint-disable-next-line
  return token.substr(0, token.length - 2);
}

/**
 * generate nonce token
 *
 * @param token init props
 * @param fallback nonce fallback
 * @param tag nonce token tag or nonce generator tag
 * @returns an object with generated string token and nonce info
 */
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
    } else if (nonce.tokens || nonce.generator) {
      nonceToken = nonce.tokens[tag] || nonce.tokens.all || nonce.generator(tag);
    } else {
      nonceToken = nonceGenerator(tag);
      nonce = { tokens: { all: nonceToken, [tag]: nonceToken } };
    }
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
    // istanbul ignore next
    url.pathname = Path.posix.join(url.pathname || "", ...onlyPaths);
  }
  return Url.format(url);
}

export const SSR_PIPELINES = Symbol("subapp-ssr-pipelines");

/**
 * Stringify a JSON object and replace some tags to avoid XSS:
 *  - `<script>` => `&lt;script>`
 *  - `</script>` => `&lt;/script>`
 *
 * @param obj - object to stringify
 * @returns JSON string of object
 */
export function safeStringifyJson(obj) {
  return JSON.stringify(obj).replace(/<(\/?)script>/g, "&lt;$1script>");
}
