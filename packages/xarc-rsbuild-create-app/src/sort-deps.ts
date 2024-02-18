import { sortObjKeys } from "./sort-obj-keys.ts";

export function sortDeps(pkg: object) {
  ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].forEach((x) => {
    if (pkg[x]) {
      pkg[x] = sortObjKeys(pkg[x]);
    }
  });
}
