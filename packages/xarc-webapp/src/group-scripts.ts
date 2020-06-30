import * as _ from "lodash";

function joinScripts(acc) {
  if (acc.current) {
    acc.scripts.push(
      acc.src
        ? acc.current
        : acc.current
            .map(x => {
              x = _.trim(x);
              return x.endsWith(";") ? x : `${x};`;
            })
            .join("\n\n")
    );
    acc.current = undefined;
  }
}
/*
 * Take an array of strings and objects, where strings are JavaScript and objects
 * contain src URL pointing to a JavaScript, and combine all consecutive strings into
 * a single one.
 *
 * The purpose of this is to avoid generating mutiple <script> tags, one for each
 * literal string that are next to each other.
 *
 * If array is [ `console.log("hello, world")`, `console.log("foo")` ], then instead of:
 *
 * <script>console.log("hello, world")</script>
 * <script>console.log("foo")</script>
 *
 * The output will be:
 *
 * <script>console.log("hello, world");
 * console.log("foo");</script>
 */
function groupScripts(data) {
  const output = data
    .filter(x => x)
    .reduce(
      (acc, x) => {
        const update = src => {
          if (acc.src !== src || !acc.current) {
            joinScripts(acc);
            acc.current = [x];
            acc.src = src;
          } else {
            acc.current.push(x);
          }
        };

        update(!!x.src);

        return acc;
      },
      { src: false, scripts: [] }
    );

  joinScripts(output);

  return output;
}
export default groupScripts;
