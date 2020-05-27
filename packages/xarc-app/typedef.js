/**
 * @typedef {object} CreateXarcOptions
 * @property {boolean} [enableFeatures=true] - enable archetype features extensions
 * @property {string[]} [electrodePackages=[]] - electrode-archetype* package names, opt out of parsing from package.json on disk
 * @property {string[]} [electrodePackagesDev=[]] - electrode-archetype* package names, opt out of parsing from package.json on disk
 * @property {boolean} [assertNoGulpExecution=true] - assert that legacy gulp command is not executed
 * @property {boolean} [assertDevArchetypePresent=true] - assert that sibling development archetype is installed
 */
