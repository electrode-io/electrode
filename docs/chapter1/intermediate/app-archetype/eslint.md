# Eslint Configuration

ESLint is enabled using the `clap features` interactive command or using npm:
```sh
npm i -D electrode-archetype-opt-eslint
```

The app archetype provides eslint configuration files base on [eslint-config-walmart]. The RC files can be found in the `config/eslint` directory of the module `electrode-archetype-react-app-dev`.

Your application's code that serves different purposes will be limited by a specific eslint configuration:

-   `.eslintrc-react` for directories `src/client` and `src/templates` (React Code)
-   `.eslintrc-react-test` for `test/client` (React test code)
-   `.eslintrc-node` for directory `src/server` (NodeJS code)
-   `.eslintrc-mocha-test` for `test/server` and `test/func` (NodeJS test code)

To override the eslint configuration, add a `.eslintrc` file to the corresponding directory.  You can also use other extensions such as `.json`, `.yml`, `.yaml`, and `.js`.

[eslint-config-walmart]: https://www.npmjs.com/package/eslint-config-walmart
