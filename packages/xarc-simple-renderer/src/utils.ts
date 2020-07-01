import * as Path from "path";

export const resolvePath = filename =>
  (Path.isAbsolute(filename) && filename) || Path.resolve(filename);
