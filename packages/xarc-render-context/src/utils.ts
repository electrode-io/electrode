/** @ignore */ /** */

export const munchyHandleStreamError = (err, cwd = process.cwd()) => {
  let errMsg = (process.env.NODE_ENV !== "production" && err.stack) || err.message;

  if (cwd.length > 3) {
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
