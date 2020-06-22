/** @ignore */ /** */

/* eslint-disable comma-dangle, arrow-parens */

export function expandProps(props, context) {
  let s = "";

  for (const key in props) {
    if (key !== "children") {
      let v = props[key];
      if (typeof v === "function") {
        v = v(context);
      }

      s = `${s} ${key}="${v}"`;
    }
  }
  return s;
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

// copied from react-dom/server

export const omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  // NOTE: menuitem's close tag should be omitted, but that causes problems.
};
