import * as Fs from "fs";
import * as Path from "path";

const HTTP_ERROR_500 = 500;
const HTTP_OK = 200;
/**
 * @param renderSs
 * @param options
 * @param context
 */
function getContent(renderSs, options, context) {
  let userContent = options.content;

  // prepare user content for container of SSR output

  if (typeof userContent === "string") {
    return Promise.resolve({ status: 200, html: userContent });
  }

  if (typeof userContent !== "function") return Promise.resolve(userContent);

  if (!renderSs) return Promise.resolve({ status: 200, html: "<!-- noss mode -->" });

  // invoke user content as a function, which could return any content
  // as static html or generated from react's renderToString
  userContent = userContent(options.request, options, context);

  if (userContent.catch) {
    // user function needs to generate the content async, so wait for it.
    return userContent.catch(err => {
      if (!err.status) err.status = HTTP_ERROR_500;
      throw err;
    });
  }

  return Promise.resolve(userContent);
}

/**
 * @param result
 * @param context
 */
function transformOutput(result, context) {
  const content = context.user.content;
  if (content && content.status !== HTTP_OK) {
    return {
      verbatim: content.verbatim,
      status: content.status,
      path: content.path,
      store: content.store,
      html: result
    };
  }

  return result;
}

const htmlifyScripts = (scripts, scriptNonce) => {
  return scripts
    .map(x =>
      typeof x === "string"
        ? `<script${scriptNonce || ""}>${x}</script>\n`
        : x.map(n => `<script src="${n.src}"></script>`).join("\n")
    )
    .join("\n");
};

const loadElectrodeDllAssets = routeOptions => {
  const tag = process.env.NODE_ENV === "production" ? "" : ".dev";
  try {
    const file = Path.resolve(
      routeOptions.electrodeDllAssetsPath || `dist/electrode-dll-assets${tag}.json`
    );
    return JSON.parse(Fs.readFileSync(file).toString());
  } catch (err) {
    return {};
  }
};

const makeElectrodeDllScripts = (dllAssets, nonce = "") => {
  const scripts = [];
  for (const modName in dllAssets) {
    const cdnMapping = dllAssets[modName].cdnMapping;
    for (const bundle in cdnMapping) {
      scripts.push({ src: cdnMapping[bundle] });
    }
  }

  return htmlifyScripts([scripts], nonce);
};
export {
  getContent,
  transformOutput,
  htmlifyScripts,
  loadElectrodeDllAssets,
  makeElectrodeDllScripts
};
