import _ from "lodash";

export const sortObjKeys = (obj: object) => _(obj).toPairs().sortBy(0).fromPairs().value();
