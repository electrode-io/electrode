/** @ignore */ /** */

const MIN_CWD_LEN = 3;

export const munchyHandleStreamError = (err, cwd = process.cwd()) => {
  let errMsg = (process.env.NODE_ENV !== "production" && err.stack) || err.message;

  if (cwd.length > MIN_CWD_LEN) {
    errMsg = (errMsg || "").replace(new RegExp(process.cwd(), "g"), "CWD");
  }

  return {
    result: `<!-- SSR ERROR -->
<p><h2 style="color: red">SSR ERROR</h2><pre style="color: red">
${errMsg}
</pre></p>`,
    remit: false
  };
};

export const isReadableStream = x => Boolean(x && x.pipe && x.on && x._readableState);
