/**
 * inject modules into entry
 *
 * @param entry entry config
 * @param inserts modules to inject
 * @returns
 */
function _inject(entry: any, inserts: string | string[]) {
  if (typeof entry === "function") {
    return () => _inject(entry(), inserts);
  } else if (!Array.isArray(entry) && typeof entry === "object") {
    for (const k in entry) {
      entry[k].import = _inject(entry[k].import, inserts);
    }
    return entry;
  } else {
    return [].concat(inserts, entry).filter(x => x);
  }
}

/**
 * inject more modules into webpack config.entry
 *
 * @param config webpack config
 * @param inserts modules to inject
 */
export function injectEntry(config: Partial<{ entry: any }>, inserts: string | string[]) {
  // https://webpack.js.org/configuration/entry-context/#entry

  // an array means it must be array of strings
  if (!Array.isArray(config.entry) && typeof config.entry === "object") {
    for (const k in config.entry) {
      config.entry[k] = _inject(config.entry[k], inserts);
    }
  } else {
    config.entry = _inject(config.entry, inserts);
  }

  return config;
}
