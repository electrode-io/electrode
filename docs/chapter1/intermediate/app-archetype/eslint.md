# Eslint Config

The app archetype provides eslint config files base on [eslint-config-walmart]. The RC files can be found in the directory `config/eslint` of the module `electrode-archetype-react-app-dev`.

Your application's code that serve different purposes will be linted by a specific eslint config:

-   `.eslintrc-react` for directories `src/client` and `src/templates` (React Code)
-   `.eslintrc-react-test` for `test/client` (React test code)
-   `.eslintrc-node` for directory `src/server` (NodeJS code)
-   `.eslintrc-mocha-test` for `test/server` and `test/func` (NodeJS test code)

To override the eslint config, add a `.eslintrc` file to the corresponding directory.  You can also use other extensions such as `.json`, `.yml`, `.yaml`, and `.js`.

[eslint-config-walmart]: https://www.npmjs.com/package/eslint-config-walmart
