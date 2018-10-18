# 10/18/2018

## Packages

-   electrode-react-webapp@3.1.1 `(3.1.0 => 3.1.1)`

## Commits

-   `packages/electrode-react-webapp`

    -   [patch] don't add <script> to prefetch if it already has it ([#1002](https://github.com/electrode-io/electrode/pull/1002)) [commit](http://github.com/electrode-io/electrode/commit/cd6fa531a8db6537fda91e0c6e728947182cb9df)

# 10/17/2018

-   electrode-react-webapp: Add support for hapi 17

## Packages

-   electrode-archetype-react-app@6.0.1 `(6.0.0 => 6.0.1)`
-   electrode-archetype-react-app-dev@6.0.1 `(6.0.0 => 6.0.1)`
-   electrode-react-webapp@3.1.0 `(3.0.9 => 3.1.0)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [chore] fix linting errors [commit](http://github.com/electrode-io/electrode/commit/d92fa7e658438882b0bb8912db62baea47efb597)
    -   [patch][bug] fixes CEECORE-449 test files are copied to lib from src ([#998](https://github.com/electrode-io/electrode/pull/998)) [commit](http://github.com/electrode-io/electrode/commit/7730f7852e21d4b45a7d2023087ae0f71de7a1c3)
    -   drop electrify tasks in prep for source-map-explorer (v6 release) ([#996](https://github.com/electrode-io/electrode/pull/996)) [commit](http://github.com/electrode-io/electrode/commit/001b7190640743af1225e04d76026535fc952f1c)
    -   support skipping webpack dev middleware in dev mode ([#994](https://github.com/electrode-io/electrode/pull/994)) [commit](http://github.com/electrode-io/electrode/commit/c027bc981def90e5fcf2687960ce968f7566a065)
    -   Fix tests ([#995](https://github.com/electrode-io/electrode/pull/995)) [commit](http://github.com/electrode-io/electrode/commit/83825405c68c3ff01c1680f3e6813637f6adf1e0)
    -   fix DLL assets update in dev mode ([#1001](https://github.com/electrode-io/electrode/pull/1001)) [commit](http://github.com/electrode-io/electrode/commit/ca43c8a141dd930a8700a8f02251f13fad7167e8)

-   `packages/electrode-react-webapp`

    -   Add support for hapi 17 ([#992](https://github.com/electrode-io/electrode/pull/992)) [commit](http://github.com/electrode-io/electrode/commit/10c773ff97f985513a092adaa1e3a39fd3a42efa)

-   `samples/react-jest-app`

    -   [patch][bug] fixes CEECORE-449 test files are copied to lib from src ([#998](https://github.com/electrode-io/electrode/pull/998)) [commit](http://github.com/electrode-io/electrode/commit/7730f7852e21d4b45a7d2023087ae0f71de7a1c3)

-   `docs`

    -   Update unit-tests.md ([#1000](https://github.com/electrode-io/electrode/pull/1000)) [commit](http://github.com/electrode-io/electrode/commit/b27f5cd6f39685124d1064b2331f93e37e2c1459)

-   `MISC`

    -   [chore] add releasing doc [commit](http://github.com/electrode-io/electrode/commit/1d515401424cc738808701305bf704df9625aeff)

# 10/15/2018

-   electrode-react-webapp: don't use async/await to avoid compatibility problems

## Packages

-   electrode-react-webapp@3.0.9 `(3.0.8 => 3.0.9)`

## Commits

-   `packages/electrode-react-webapp`

    -   [patch] don't use async/await to avoid compatibility problems ([#993](https://github.com/electrode-io/electrode/pull/993)) [commit](http://github.com/electrode-io/electrode/commit/59a1570075afacb9b924a78f485ca664a5a14dd6)

# 10/12/2018

- electrode-react-webapp: remove display html by status.  let `responseForBadStatus` option handle this.

## Packages

-   electrode-react-webapp@3.0.8 `(3.0.7 => 3.0.8)`

## Commits

-   `packages/electrode-react-webapp`

    -   remove display html by status ([#991](https://github.com/electrode-io/electrode/pull/991)) [commit](http://github.com/electrode-io/electrode/commit/3596a540e02565509fe8f2ecc825651f6bdc68d1)

# 10/11/2018

- electrode-archetype-react-app: Major - webpack 4 upgrade

## Packages

### Directly Updated

-   electrode-archetype-react-app@6.0.0 `(5.4.11 => 6.0.0)`
-   electrode-archetype-react-app-dev@6.0.0 `(5.4.11 => 6.0.0)`
-   electrode-archetype-webpack-dll@1.1.0 `(1.0.0 => 1.1.0)`
-   electrode-archetype-webpack-dll-dev@1.1.0 `(1.0.0 => 1.1.0)`
-   electrode-node-resolver@2.0.0 `(1.0.0 => 2.0.0)`

### Lerna Updated

-   electrode-archetype-react-component@5.3.6 `(5.3.5 => 5.3.6)`
-   electrode-archetype-react-component-dev@5.3.6 `(5.3.5 => 5.3.6)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [major] update peer dev [commit](http://github.com/electrode-io/electrode/commit/3ac27b09dcf2e7e0203d272780e3fbfec56092e7)
    -   [chore] fix lint errors [commit](http://github.com/electrode-io/electrode/commit/ebd191f83bb92a2e5b5862247a615536dd0aca1d)
    -   more sophisticated DLL library version check ([#990](https://github.com/electrode-io/electrode/pull/990)) [commit](http://github.com/electrode-io/electrode/commit/81ce9fde9f414773432ac2fdd6261b676455a402)
    -   show a more detailed breakdown of why an error occurs ([#986](https://github.com/electrode-io/electrode/pull/986)) [commit](http://github.com/electrode-io/electrode/commit/d52c73a83dd19ff1c4b78f7fe32a41de0ca612ad)
    -   remove debug option since its deprecated as of webpack3 ([#987](https://github.com/electrode-io/electrode/pull/987)) [commit](http://github.com/electrode-io/electrode/commit/bdac77dd617ea83aa35eaf61956d99cd5262d105)
    -   enable minimize for css loader ([#988](https://github.com/electrode-io/electrode/pull/988)) [commit](http://github.com/electrode-io/electrode/commit/0c28f437877b9ffc4a3f14909e2fa8cc79c9eb56)
    -   fix missing uglify-es bug ([#981](https://github.com/electrode-io/electrode/pull/981)) [commit](http://github.com/electrode-io/electrode/commit/09ae2bc311576e389214e3f8ede43f2652e1ee63)
    -   Remove definePlugin and get webpack 4 built in nodeEnv to replace ([#977](https://github.com/electrode-io/electrode/pull/977)) [commit](http://github.com/electrode-io/electrode/commit/a3e6bc3fed05a2755075bef7ef35ca65fcb7d1ae)
    -   Decrease bundle size, load lodash methods needed only ([#978](https://github.com/electrode-io/electrode/pull/978)) [commit](http://github.com/electrode-io/electrode/commit/d6fbd884021c6dc7f77396ad7612345e947c782b)
    -   decrease frontend size ([#979](https://github.com/electrode-io/electrode/pull/979)) [commit](http://github.com/electrode-io/electrode/commit/86323790ddeaac91a8adeabdbbefa78406fe593c)
    -   Use multi-process parallel running to improve the build speed. ([#970](https://github.com/electrode-io/electrode/pull/970)) [commit](http://github.com/electrode-io/electrode/commit/e708dd1bda1226cf4205312f7ecc0e413b42efda)
    -   update css-split-webpack-plugin ([#966](https://github.com/electrode-io/electrode/pull/966)) [commit](http://github.com/electrode-io/electrode/commit/a7df5a045fd3e95880d30c8d18149ccfac65d955)
    -   Update css-split-webpack-plugin ([#964](https://github.com/electrode-io/electrode/pull/964)) [commit](http://github.com/electrode-io/electrode/commit/fc85755e9a2c9beb77d4f9011a08c373b605b3f1)
    -   remove hot mode ([#963](https://github.com/electrode-io/electrode/pull/963)) [commit](http://github.com/electrode-io/electrode/commit/0543811f4f3c7fe5ce9c8e43397ef007fb718cb2)
    -   [major] Webpack4: remove webpack dev server ([#962](https://github.com/electrode-io/electrode/pull/962)) [commit](http://github.com/electrode-io/electrode/commit/e6c16b203df51dae51104eb132917ce6d4b664d1)
    -   Other fixes for webpack4 ([#958](https://github.com/electrode-io/electrode/pull/958)) [commit](http://github.com/electrode-io/electrode/commit/cc941243d3cc378f838a82fb4e4bc52dedc1d31d)
    -   webpack 4 pwa ([#960](https://github.com/electrode-io/electrode/pull/960)) [commit](http://github.com/electrode-io/electrode/commit/d01fdc2466c20d1c7ed2c73c79a3b7021bb2a0fc)
    -   webpack 4 noEmitOnErrors update ([#959](https://github.com/electrode-io/electrode/pull/959)) [commit](http://github.com/electrode-io/electrode/commit/c7342ec92e44695216405461d49eedcd251ab7e8)
    -   remove html-reporter ([#957](https://github.com/electrode-io/electrode/pull/957)) [commit](http://github.com/electrode-io/electrode/commit/42a02a05a8f4f78efc92a6756100823ea0f89819)
    -   [major] webpack4: webpack4 dev/prod mode ([#954](https://github.com/electrode-io/electrode/pull/954)) [commit](http://github.com/electrode-io/electrode/commit/c94efc39f33f412bea6edb3c59d18b3ea159767e)
    -   update ProgressPlugin to webpack4 ([#952](https://github.com/electrode-io/electrode/pull/952)) [commit](http://github.com/electrode-io/electrode/commit/32bd6ed3661c1f6c12ac68e060aadcc90f833d91)
    -   update SourceMapDevToolPlugin ([#951](https://github.com/electrode-io/electrode/pull/951)) [commit](http://github.com/electrode-io/electrode/commit/2b4424f7832b76e8d9aa9ed9b7eb425c637f4a5c)
    -   update uglifyjs plugin and its related sw-precache plugin for webpack4 ([#950](https://github.com/electrode-io/electrode/pull/950)) [commit](http://github.com/electrode-io/electrode/commit/06b4e376292bbd1fb1f9b2d04364bc9a7ca1d897)
    -   webpack 4 dependencies update ([#947](https://github.com/electrode-io/electrode/pull/947)) [commit](http://github.com/electrode-io/electrode/commit/c8ab8da5ee695feb1cd798d817787501d8d161cb)
    -    [major] webpack 4: update extract styles to compatible with webpack 4 ([#949](https://github.com/electrode-io/electrode/pull/949)) [commit](http://github.com/electrode-io/electrode/commit/25d24546603d38cde3a734075bd7e1bf8556f739)
    -   update FaviconsWebpackPlugin to compatible with webpack 4 ([#946](https://github.com/electrode-io/electrode/pull/946)) [commit](http://github.com/electrode-io/electrode/commit/20ba8428c1bd291a80a1deb3ec7c109b3110671f)
    -   [major] webpack 4: update FailPlugin to compatible with webpack 4 ([#944](https://github.com/electrode-io/electrode/pull/944)) [commit](http://github.com/electrode-io/electrode/commit/76476ab9325eb4a0e9273232883a7110c4e8cc24)

-   `packages/electrode-archetype-webpack-dll[-dev]`

    -   [minor][chore] mark for minor bump [commit](http://github.com/electrode-io/electrode/commit/c12909f57797e78404f0a3b8107403bc54ca16db)
    -   more sophisticated DLL library version check ([#990](https://github.com/electrode-io/electrode/pull/990)) [commit](http://github.com/electrode-io/electrode/commit/81ce9fde9f414773432ac2fdd6261b676455a402)

-   `packages/electrode-node-resolver`

    -   update node-server-webpack-plugin ([#953](https://github.com/electrode-io/electrode/pull/953)) [commit](http://github.com/electrode-io/electrode/commit/2459501ca530551f88f8569aa44a0bda11103996)
    -   [major] mark for major bump [commit](http://github.com/electrode-io/electrode/commit/2bd4bed434bde787eea9af3fb0c8968ebfdcf3d7)

-   `samples/universal-react-node`

    -   [major] webpack4: update universal react app sample to work with webpack4 ([#965](https://github.com/electrode-io/electrode/pull/965)) [commit](http://github.com/electrode-io/electrode/commit/52be216a6019eb6be77bf902c360a0fe01bf49f1)

-   `docs`

    -   webpack 4: docs ([#982](https://github.com/electrode-io/electrode/pull/982)) [commit](http://github.com/electrode-io/electrode/commit/68c80fe34e7f8d7792e9471d31acf221072eeac4)

# 10/9/2018

- electrode-archetype-webpack-dll: Initial Release. Support common webpack DLL for apps.
- electrode-archetype-react-app: Support loading common webpack DLL modules.
- electrode-react-webapp, electrode-webpack-reporter: Support loading common webpack DLL bundles.

## Packages

-   electrode-archetype-react-app@5.4.11 `(5.4.10 => 5.4.11)`
-   electrode-archetype-react-app-dev@5.4.11 `(5.4.10 => 5.4.11)`
-   electrode-archetype-webpack-dll@1.0.0 `(0.1.0 => 1.0.0)`
-   electrode-archetype-webpack-dll-dev@1.0.0 `(0.1.0 => 1.0.0)`
-   electrode-react-webapp@3.0.7 `(3.0.6 => 3.0.7)`
-   electrode-webpack-reporter@0.4.8 `(0.4.7 => 0.4.8)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   add DLL loading support for webpack dev middleware ([#984](https://github.com/electrode-io/electrode/pull/984)) [commit](http://github.com/electrode-io/electrode/commit/1ab45c30431396a6682874121578a3e40550a97a)
    -    serve DLL assets from webpack dev server ([#975](https://github.com/electrode-io/electrode/pull/975)) [commit](http://github.com/electrode-io/electrode/commit/ad5c6095745c8887d3ea4747591b0352374e2d7a)
    -   save electrode DLL assets to dist ([#974](https://github.com/electrode-io/electrode/pull/974)) [commit](http://github.com/electrode-io/electrode/commit/0a722d42286e1224c3b44cffc0a7bf8a5275a544)
    -   verify installed modules against what's packed in DLL ([#973](https://github.com/electrode-io/electrode/pull/973)) [commit](http://github.com/electrode-io/electrode/commit/c0294922a09d8dc20f01206119fc249bdc89f939)
    -   add support to load electrode DLL modules [commit](http://github.com/electrode-io/electrode/commit/565d9dd012a6462777ae7898635546e01a01d5d6)

-   `packages/electrode-archetype-webpack-dll[-dev]`

    -   [major] preparing for initial release [commit](http://github.com/electrode-io/electrode/commit/a4f885469fb877820c9ada483180d45c9e413fa8)
    -   add README for DLL archetype ([#983](https://github.com/electrode-io/electrode/pull/983)) [commit](http://github.com/electrode-io/electrode/commit/645b8fd45633392a5a3d1c4133281a2483594d56)
    -   verify installed modules against what's packed in DLL ([#973](https://github.com/electrode-io/electrode/pull/973)) [commit](http://github.com/electrode-io/electrode/commit/c0294922a09d8dc20f01206119fc249bdc89f939)
    -   save versions of modules packed into DLL [commit](http://github.com/electrode-io/electrode/commit/021deff52e1059efce0c27369555d1968f49f03a)
    -   first commit webpack dll archetype -dev [commit](http://github.com/electrode-io/electrode/commit/56e25356885194fa7b3d71d10b7881c6b911a917)
    -   first commit of new webpack dll archetype [commit](http://github.com/electrode-io/electrode/commit/600690f3468217fc844e4f24d844e613d03e8eab)
    -   prepare for npm publish [commit](http://github.com/electrode-io/electrode/commit/4f2e9e71c50c8e63edc85ea94696a0ef44625cc6)

-   `packages/electrode-react-webapp`

    -   add token to serve electrode DLL assets ([#976](https://github.com/electrode-io/electrode/pull/976)) [commit](http://github.com/electrode-io/electrode/commit/9c99d1c7bb3c8e81fdba7f67abe1e52babcd284a)

-   `packages/electrode-webpack-reporter`

    -    serve DLL assets from webpack dev server ([#975](https://github.com/electrode-io/electrode/pull/975)) [commit](http://github.com/electrode-io/electrode/commit/ad5c6095745c8887d3ea4747591b0352374e2d7a)

-   `tools`

    -   add dll archetype to release changelog [commit](http://github.com/electrode-io/electrode/commit/424dd36e15c37402fc4cd7b109865cb333e7d87d)

# 9/26/2018

## Packages

### Directly Updated

-   webpack-config-composer@1.1.1 `(1.1.0 => 1.1.1)`

## Commits

-   `packages/webpack-config-composer`

    -   [bug] safe access addopt ([#955](https://github.com/electrode-io/electrode/pull/955)) [commit](http://github.com/electrode-io/electrode/commit/9f9cbbe3ce2386259a3d389e15892bbd5ab7d681)

# 9/24/2018

- `packages/electrode-archetype-react-app[-dev]` - make it easier to extend webpack config

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.4.10 `(5.4.9 => 5.4.10)`
-   electrode-archetype-react-app-dev@5.4.10 `(5.4.9 => 5.4.10)`
-   webpack-config-composer@1.1.0 `(1.0.4 => 1.1.0)`

### Lerna Updated

-   electrode-archetype-react-component@5.3.5 `(5.3.4 => 5.3.5)`
-   electrode-archetype-react-component-dev@5.3.5 `(5.3.4 => 5.3.5)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   add user's custom config as part of the composer [commit](http://github.com/electrode-io/electrode/commit/9a3496dec1188d56be4b9ca2847deafdd46da6c7)
    -   ensure profileNames has user for custom function ([#940](https://github.com/electrode-io/electrode/pull/940)) [commit](http://github.com/electrode-io/electrode/commit/cfc81b18d5ab8120f072bc5aa9fe15321426268a)

-   `packages/webpack-config-composer`

    -   add a Profile class [commit](http://github.com/electrode-io/electrode/commit/8c7b4a2039e73aa6693c77eef4c4e8c088cea3d9)
    -   [minor] new addPartial, addProfile, addPartialToProfile APIs [commit](http://github.com/electrode-io/electrode/commit/cf05c52ddae4430da319d1f0df2dd93e5b117ec6)
    -   format code [commit](http://github.com/electrode-io/electrode/commit/71d03dd2cfd46e0a980326449b648db82203bb55)

-   `docs`

    -   update doc on customizing webpack config [commit](http://github.com/electrode-io/electrode/commit/1c3e83939b02537fd3b7042ac40d892f02fd665d)

# 9/20/2018

## Packages

-   electrode-archetype-react-app@5.4.9 `(5.4.8 => 5.4.9)`
-   electrode-archetype-react-app-dev@5.4.9 `(5.4.8 => 5.4.9)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   account for object entry ([#937](https://github.com/electrode-io/electrode/pull/937)) [commit](http://github.com/electrode-io/electrode/commit/3903c74899bf47853d989252ff439bcf8691ea71)

# 9/18/2018

## Packages

-   electrode-react-webapp@3.0.6 `(3.0.5 => 3.0.6)`

## Commits

-   `packages/electrode-react-webapp`

    -   allow disabling responseForBadStatus ([#936](https://github.com/electrode-io/electrode/pull/936)) [commit](http://github.com/electrode-io/electrode/commit/68244d08e4418790db5485e8ca95a2fa148362d0)

# 9/17/2018

- fix optional node-sass

## Packages

-   electrode-archetype-opt-sass@1.0.2 `(1.0.1 => 1.0.2)`
-   electrode-archetype-react-app@5.4.8 `(5.4.7 => 5.4.8)`
-   electrode-archetype-react-app-dev@5.4.8 `(5.4.7 => 5.4.8)`

## Commits

-   `packages/electrode-archetype-opt-sass`

    -   fix optional node-sass ([#935](https://github.com/electrode-io/electrode/pull/935)) [commit](http://github.com/electrode-io/electrode/commit/7266665566a9c8cc94fd94793812ed21644fc92f)

-   `packages/electrode-archetype-react-app[-dev]`

    -   fix optional node-sass ([#935](https://github.com/electrode-io/electrode/pull/935)) [commit](http://github.com/electrode-io/electrode/commit/7266665566a9c8cc94fd94793812ed21644fc92f)

# 9/13/2018

- minor fixes for electrode-react-webapp and electrode-redux-router-engine

## Packages

-   electrode-archetype-react-app@5.4.7 `(5.4.6 => 5.4.7)`
-   electrode-archetype-react-app-dev@5.4.7 `(5.4.6 => 5.4.7)`
-   electrode-react-webapp@3.0.5 `(3.0.4 => 3.0.5)`
-   electrode-redux-router-engine@2.1.6 `(2.1.5 => 2.1.6)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   update optimize-stats for multiple entries [commit](http://github.com/electrode-io/electrode/commit/26ed7d0463cdfa0946e0e869dcedd22f3c4f282a)
    -   fix failing CI [commit](http://github.com/electrode-io/electrode/commit/8b7d1c1078aca2e89b1154e1f278227098db3981)

-   `packages/electrode-react-webapp`

    -   fix scriptNonce for body bundle ([#934](https://github.com/electrode-io/electrode/pull/934)) [commit](http://github.com/electrode-io/electrode/commit/862b59d7b45bfae2cf097eee5577714658897720)
    -   [patch] handle text based scripts ([#929](https://github.com/electrode-io/electrode/pull/929)) [commit](http://github.com/electrode-io/electrode/commit/74afb2ddf33b3c9b5ceeb8604b5aec8e79cbd6e4)
    -   fix token handlers merging ([#932](https://github.com/electrode-io/electrode/pull/932)) [commit](http://github.com/electrode-io/electrode/commit/a6221f4dca43df6df1e028eb29fd17d3689405d2)
    -   fix failing CI [commit](http://github.com/electrode-io/electrode/commit/8b7d1c1078aca2e89b1154e1f278227098db3981)

-   `packages/electrode-redux-router-engine`

    -   refactor base path name ([#933](https://github.com/electrode-io/electrode/pull/933)) [commit](http://github.com/electrode-io/electrode/commit/9d41447a1771c81cc6407239b893f853bdf0055f)
    -   update _matchRoute to suuport match with basename [commit](http://github.com/electrode-io/electrode/commit/22a517b065896bd470162cde8b8f72814ba20c58)

-   `MISC`

    -   [chore] update lerna@3.3.0 [commit](http://github.com/electrode-io/electrode/commit/6cbccfdfc68f53f7a198c3071f44f6bbba61b773)
    -   back to lerna@2 [commit](http://github.com/electrode-io/electrode/commit/cb5cc208c5fc526c48f71050dea9f44ea1cbdeb4)

# 9/11/2018

## Packages

-   electrode-react-webapp@3.0.4 `(3.0.3 => 3.0.4)`

## Commits

-   `packages/electrode-react-webapp`

    -   really fix content check [commit](http://github.com/electrode-io/electrode/commit/d9b6d6ee09b55e86860ce69067fe3c0a1fe4bade)

# 9/10/2018

- some minor fixes and updates

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.4.6 `(5.4.5 => 5.4.6)`
-   electrode-archetype-react-app-dev@5.4.6 `(5.4.5 => 5.4.6)`
-   electrode-react-webapp@3.0.3 `(3.0.2 => 3.0.3)`
-   electrode-ui-config@1.1.2 `(1.1.1 => 1.1.2)`

### Lerna Updated

-   electrode-ui-logger@1.1.3 `(1.1.2 => 1.1.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   Typo ([#927](https://github.com/electrode-io/electrode/pull/927)) [commit](http://github.com/electrode-io/electrode/commit/59913b48de4483689fa5061c7a227b589e85373a)
    -   Use the first entry for bundle analzying instead of the hardcoded `main` one ([#926](https://github.com/electrode-io/electrode/pull/926)) [commit](http://github.com/electrode-io/electrode/commit/edda3a8b4e981c032f4e95547fb4b784754208f5)
    -   prettier format JS [commit](http://github.com/electrode-io/electrode/commit/49571a51e721b457e558b5ad59b154c5ad1a9a0d)
    -   update dependencies [commit](http://github.com/electrode-io/electrode/commit/7764f502cb6aca6430ec4affc8c8cca6a29fcd93)
    -   undo careless mistakes [commit](http://github.com/electrode-io/electrode/commit/5ed3209e75ac2674dd5338da7bc88755884ed796)
    -   update xenv-config to 1.3.0 with json type support ([#924](https://github.com/electrode-io/electrode/pull/924)) [commit](http://github.com/electrode-io/electrode/commit/03399ddceb103b7b9c0b60bc057c78c258b84e45)
    -   add unit tests for optional sass ([#925](https://github.com/electrode-io/electrode/pull/925)) [commit](http://github.com/electrode-io/electrode/commit/b88efd5558ed851d9937faae7d7ffba27634498d)
    -   add unit tests for extract-styles.js ([#921](https://github.com/electrode-io/electrode/pull/921)) [commit](http://github.com/electrode-io/electrode/commit/808eed6bc0feac40aebcbfcbea474f7fd9e03f59)

-   `packages/electrode-react-webapp`

    -   fix content check ([#928](https://github.com/electrode-io/electrode/pull/928)) [commit](http://github.com/electrode-io/electrode/commit/f3f60b4ebe6a20483847ccb07e9532aac6b2110a)

-   `packages/electrode-ui-config`

    -   [chore] rename deprecated npm script [commit](http://github.com/electrode-io/electrode/commit/4a12db9db775dd5075e1e12d53ad434c3dcc984e)

-   `MISC`

    -   [chore] build use / for local dep path [commit](http://github.com/electrode-io/electrode/commit/4b3acc21728a4c8c85b382e038a80a6096e50bd0)
    -   [chore] fynpo@0.1.12 [commit](http://github.com/electrode-io/electrode/commit/44d8749bda6860c8918605ff9798a3369fdb8492)

# 8/30/2018

electrode-archetype-react-app:
- make node-sass optional so if you don't use it you can skip the dependencies
- update optimize css to not touch zindex by default

electrode-archetype-react-component:
- make node-sass optional so if you don't use it you can skip the dependencies

generator-electrode:
- allow extended generator to get pwa config
- only default create new dir to true if cwd is not empty

## Packages

### Directly Updated

-   electrode-archetype-opt-sass@1.0.1 `(1.0.0 => 1.0.1)`
-   electrode-archetype-react-app@5.4.5 `(5.4.4 => 5.4.5)`
-   electrode-archetype-react-app-dev@5.4.5 `(5.4.4 => 5.4.5)`
-   electrode-archetype-react-component@5.3.4 `(5.3.3 => 5.3.4)`
-   electrode-archetype-react-component-dev@5.3.4 `(5.3.3 => 5.3.4)`
-   generator-electrode@4.2.4 `(4.2.3 => 4.2.4)`

### Lerna Updated

-   electrode-ignite@2.1.8 `(2.1.7 => 2.1.8)`

## Commits

-   `packages/electrode-archetype-opt-sass`

    -   make node-sass optional ([#920](https://github.com/electrode-io/electrode/pull/920)) [commit](http://github.com/electrode-io/electrode/commit/4e8f6a291d38715cc97c6be37b321b99b4aa5aca)

-   `packages/electrode-archetype-react-app[-dev]`

    -   update optimize css to not touch zindex by default ([#922](https://github.com/electrode-io/electrode/pull/922)) [commit](http://github.com/electrode-io/electrode/commit/5feff5d205982c0761b8ad4ba84212b98b9465a6)
    -   make node-sass optional ([#920](https://github.com/electrode-io/electrode/pull/920)) [commit](http://github.com/electrode-io/electrode/commit/4e8f6a291d38715cc97c6be37b321b99b4aa5aca)

-   `packages/electrode-archetype-react-component[-dev]`

    -   make node-sass optional ([#920](https://github.com/electrode-io/electrode/pull/920)) [commit](http://github.com/electrode-io/electrode/commit/4e8f6a291d38715cc97c6be37b321b99b4aa5aca)

-   `packages/generator-electrode`

    -   allow extended generator to get pwa config ([#918](https://github.com/electrode-io/electrode/pull/918)) [commit](http://github.com/electrode-io/electrode/commit/8eff2471e3f1521f54fe66ffdde793cdce180ea0)
    -   only default create new dir to true if cwd is not empty ([#917](https://github.com/electrode-io/electrode/pull/917)) [commit](http://github.com/electrode-io/electrode/commit/f46238ef9a6630a1355be6951f95d662c316247a)
    -   add insertTokenIds to sample ([#916](https://github.com/electrode-io/electrode/pull/916)) [commit](http://github.com/electrode-io/electrode/commit/0baad2a86063f31bb36abb384dad8badb565ed6a)

-   `MISC`

    -   [chore] update fynpo version [commit](http://github.com/electrode-io/electrode/commit/bf260244394382018209b417e4ec1f3c692c3d52)

# 8/24/2018

- electrode-archetype-react-app: Upgrade to jest v23
- electrode-ignite: fix handling space in path for windows
- electrode-react-webapp: minor updates
- electrode-redux-router-engine: fix check for methods prop in route definition
- generator-electrode: add Hapi good logger to generated app

## Packages

-   electrode-archetype-react-app@5.4.4 `(5.4.3 => 5.4.4)`
-   electrode-archetype-react-app-dev@5.4.4 `(5.4.3 => 5.4.4)`
-   electrode-ignite@2.1.7 `(2.1.6 => 2.1.7)`
-   electrode-react-webapp@3.0.2 `(3.0.1 => 3.0.2)`
-   electrode-redux-router-engine@2.1.5 `(2.1.4 => 2.1.5)`
-   generator-electrode@4.2.3 `(4.2.2 => 4.2.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   upgrade to jest v23 ([#911](https://github.com/electrode-io/electrode/pull/911)) [commit](http://github.com/electrode-io/electrode/commit/d2136ba9a4a91cc115602c24ac9e3f178f32dd44)

-   `packages/electrode-ignite`

    -   [patch] fix ignite generator invoking to support windows user dir with space ([#910](https://github.com/electrode-io/electrode/pull/910)) [commit](http://github.com/electrode-io/electrode/commit/fec1a1846648a1e4809c273f561e8a83fcdae92c)

-   `packages/electrode-react-webapp`

    -   apply path specific options to routeOptions [commit](http://github.com/electrode-io/electrode/commit/9f705c460cda9535ba317cbea049a5588ed4e74e)
    -   catch error when transforming output [commit](http://github.com/electrode-io/electrode/commit/2491f75e1d7dddd5bf6c5de2e4b96d5049f49fe8)
    -   clarify content spec for paths [commit](http://github.com/electrode-io/electrode/commit/9528ab6eb9f02142a5abf52cfde81f2556f2805a)

-   `packages/electrode-redux-router-engine`

    -   [patch] [bug] Fix methods prop in route definition not being respected ([#915](https://github.com/electrode-io/electrode/pull/915)) [commit](http://github.com/electrode-io/electrode/commit/e8ca6d403195413c5c09b5b951149b597bf27439)

-   `packages/generator-electrode`

    -   Add Hapi good/good-console logger to the generator Hapi app ([#909](https://github.com/electrode-io/electrode/pull/909)) [commit](http://github.com/electrode-io/electrode/commit/fa3d7a52b3632a8d4757e71c0b6e1a370eca3795)

-   `MISC`

    -   update fynpo [commit](http://github.com/electrode-io/electrode/commit/40f44a1308d32734d92ba58e5601e181f8a857c6)

# 8/16/2018

- minor fixes
- sample app includes demo for multiple routes with nav bar using React Router 4

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.4.3 `(5.4.2 => 5.4.3)`
-   electrode-archetype-react-app-dev@5.4.3 `(5.4.2 => 5.4.3)`
-   electrode-react-webapp@3.0.1 `(3.0.0 => 3.0.1)`
-   generator-electrode@4.2.2 `(4.2.1 => 4.2.2)`

### Lerna Updated

-   electrode-ignite@2.1.6 `(2.1.5 => 2.1.6)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   fix css module production build ([#906](https://github.com/electrode-io/electrode/pull/906)) [commit](http://github.com/electrode-io/electrode/commit/0df1d79da7501c40ce5a5bcdd8a1f20fa031238c)

-   `packages/electrode-react-webapp`

    -   support insert token ids to output for debugging ([#902](https://github.com/electrode-io/electrode/pull/902)) [commit](http://github.com/electrode-io/electrode/commit/0be1eda7eb0b966173ebcbbd05f957153ea9a62f)

-   `packages/generator-electrode`

    -   update generator with a new navigation ([#907](https://github.com/electrode-io/electrode/pull/907)) [commit](http://github.com/electrode-io/electrode/commit/cbda3fccbd2fb92bd901ef77376ae4d85b846e72)

-   `samples/stylus-sample`

    -   fyn extra setup is no longer required ([#903](https://github.com/electrode-io/electrode/pull/903)) [commit](http://github.com/electrode-io/electrode/commit/f8b273be1e8c0586dfb4eaabb99df95d6ed5b161)

-   `samples/universal-react-node`

    -   fyn extra setup is no longer required ([#903](https://github.com/electrode-io/electrode/pull/903)) [commit](http://github.com/electrode-io/electrode/commit/f8b273be1e8c0586dfb4eaabb99df95d6ed5b161)

# 8/6/2018

- Major (v2 to v3) update to electrode-react-webapp
  - Now allow token to do initialization (this breaks existing INITIALIZE token)
  - Allow token to control render flow by stopping it (breaks existing token handlers)
  - Drop support for callbacks for token handler.  Only return Promise now.
  - `require` token processor module relative to directory where template file is
  - Add `templateProcessor` option to allow programatically add/remove tokens.
  - And other clean ups and refactors
- Update all packages to use fyn section in package.json to persist local dep
- Fix PWA option in generator-electrode that was always copying PWA files
- Minor links fixes in docs

## Packages

-   electrode-archetype-react-app@5.4.2 `(5.4.1 => 5.4.2)`
-   electrode-archetype-react-app-dev@5.4.2 `(5.4.1 => 5.4.2)`
-   electrode-archetype-react-component@5.3.3 `(5.3.2 => 5.3.3)`
-   electrode-archetype-react-component-dev@5.3.3 `(5.3.2 => 5.3.3)`
-   electrode-ignite@2.1.5 `(2.1.4 => 2.1.5)`
-   electrode-react-webapp@3.0.0 `(2.5.3 => 3.0.0)`
-   electrode-redux-router-engine@2.1.4 `(2.1.3 => 2.1.4)`
-   electrode-ui-logger@1.1.2 `(1.1.1 => 1.1.2)`
-   generator-electrode@4.2.1 `(4.2.0 => 4.2.1)`
-   ignite-core@1.1.6 `(1.1.5 => 1.1.6)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   persist local deps in fyn section [commit](http://github.com/electrode-io/electrode/commit/9a9cff758a04c518531678c6b432b5471fd3d35c)

-   `packages/electrode-archetype-react-component[-dev]`

    -   persist local deps in fyn section [commit](http://github.com/electrode-io/electrode/commit/9a9cff758a04c518531678c6b432b5471fd3d35c)

-   `packages/electrode-ignite`

    -   persist local deps in fyn section [commit](http://github.com/electrode-io/electrode/commit/9a9cff758a04c518531678c6b432b5471fd3d35c)

-   `packages/electrode-react-webapp`

    -   allow token module to return null to remove itself ([#900](https://github.com/electrode-io/electrode/pull/900)) [commit](http://github.com/electrode-io/electrode/commit/0f37c552e4445e93d43f78ea8966c70f99b7f7a0)
    -   [major] remove callback support for token process/handler function ([#899](https://github.com/electrode-io/electrode/pull/899)) [commit](http://github.com/electrode-io/electrode/commit/19840449710377780f1f9c08cdf950a7affff941)
    -   add integration test for templateProcessor ([#898](https://github.com/electrode-io/electrode/pull/898)) [commit](http://github.com/electrode-io/electrode/commit/546edaf787576c6ea303788b6d4e7e80c1a75e29)
    -   extract and consolidate rendering steps execution ([#897](https://github.com/electrode-io/electrode/pull/897)) [commit](http://github.com/electrode-io/electrode/commit/1e6b771fd76c5f8877baa3bf3c372db97c157308)
    -   add templateProcessor option ([#896](https://github.com/electrode-io/electrode/pull/896)) [commit](http://github.com/electrode-io/electrode/commit/0bd5a196f7882bfbe8bb213ced50a49131d80304)
    -   fix perf-1.html template [commit](http://github.com/electrode-io/electrode/commit/fe21baf8503a3ceeb99c53ac9e5ec7710b40a3eb)
    -   add response callback for error and bad status [commit](http://github.com/electrode-io/electrode/commit/54652fb408f77a71d7167565af3c18b9bc571ac3)
    -   refactor functions out of handler file [commit](http://github.com/electrode-io/electrode/commit/82495cb1fb0b3ee7a50039af329bab20796a588c)
    -   persist local deps in fyn section [commit](http://github.com/electrode-io/electrode/commit/9a9cff758a04c518531678c6b432b5471fd3d35c)
    -   set message to indicate SSR disabled by option [commit](http://github.com/electrode-io/electrode/commit/6d53d097ffbcbf2b868bde92eebc839e7905b8f9)
    -   [major] return context to handle route [commit](http://github.com/electrode-io/electrode/commit/4a8151f9a85602e7a0e3f44232517d330e0bbafe)
    -   avoid executing tokens that are null [commit](http://github.com/electrode-io/electrode/commit/528ddafeef658d24e37d6d29cf557bd3f00dd7fc)
    -   require processor token from where template file is [commit](http://github.com/electrode-io/electrode/commit/138605ea3f9daca2f2d71980b06efa043b079e85)
    -   [major] support context initialize with token [commit](http://github.com/electrode-io/electrode/commit/48b3cca85f6c729addf0e7191b28ac34a3a4b716)
    -   support stopping mid render [commit](http://github.com/electrode-io/electrode/commit/e1d890a00277926ff6c2f162c03ab1dc79460838)
    -   use spread operator ([#901](https://github.com/electrode-io/electrode/pull/901)) [commit](http://github.com/electrode-io/electrode/commit/ac75fc236631bc67473894d23e63d7ab1f2a9244)

-   `packages/electrode-redux-router-engine`

    -   separate SSR render steps ([#890](https://github.com/electrode-io/electrode/pull/890)) [commit](http://github.com/electrode-io/electrode/commit/c0a947dcbae23858f53a885064c9c3c5a4584cce)

-   `packages/electrode-ui-logger`

    -   persist local deps in fyn section [commit](http://github.com/electrode-io/electrode/commit/9a9cff758a04c518531678c6b432b5471fd3d35c)

-   `packages/generator-electrode`

    -   fix generator options passing inconsistency [commit](http://github.com/electrode-io/electrode/commit/16c8b3117f1c63c614a94cb650d88f8bd69dde78)
    -   format code [commit](http://github.com/electrode-io/electrode/commit/f313773c7198a3eb776205e13bc73b8b1ea98ea0)

-   `packages/ignite-core`

    -   update test timeout [commit](http://github.com/electrode-io/electrode/commit/f605faa537d0e62718d6faea6ad5c433d8414613)

-   `samples/demo-component`

    -   lock babel/runtime to fix build failure [commit](http://github.com/electrode-io/electrode/commit/37c91f44a818fd512916523e8de258e7e9a32056)

-   `.vscode`

    -   add electrode-redux-router-engine test debugging to vscode config [commit](http://github.com/electrode-io/electrode/commit/55c6eec2e5e30cabd8b635de81d4cdae62bd7492)
    -   set cwd for vscode debug launch setting [commit](http://github.com/electrode-io/electrode/commit/70ecf380b989bc6aa1d9b653149a0f4bb982258a)
    -   add .vscode debug config [commit](http://github.com/electrode-io/electrode/commit/de2d47ef6510037c83dd01989aa3d5917caa5115)

-   `docs`

    -   fix links for contribute and faq ([#895](https://github.com/electrode-io/electrode/pull/895)) [commit](http://github.com/electrode-io/electrode/commit/3661b8f49693b6d2f3f67e93afdb05fac4eb5a47)
    -   fix-powerful-electrode-tools-docs-links ([#894](https://github.com/electrode-io/electrode/pull/894)) [commit](http://github.com/electrode-io/electrode/commit/cee56fb04c95c787281772a0c5cb08342b5e084f)
    -   fix lins inside stand alone modules ([#893](https://github.com/electrode-io/electrode/pull/893)) [commit](http://github.com/electrode-io/electrode/commit/3cf574cbcef1b4fcbffccf84a76c34751fa5cb57)
    -   fix general section ([#892](https://github.com/electrode-io/electrode/pull/892)) [commit](http://github.com/electrode-io/electrode/commit/505495fb5ba06f9c1dfc033c713603c67dc156b6)

-   `MISC`

    -   fix broken yeoman-test [commit](http://github.com/electrode-io/electrode/commit/77ad661421594bc7b700bcfe585f64283cc14556)

# 7/31/2018

- Fix issue with new CSS module styleName change breaking normal stylus
- Add basename support for SSR links with React Router v4
- Minor updates for electrode-react-webapp

## Packages

-   electrode-archetype-react-app@5.4.1 `(5.4.0 => 5.4.1)`
-   electrode-archetype-react-app-dev@5.4.1 `(5.4.0 => 5.4.1)`
-   electrode-react-webapp@2.5.3 `(2.5.2 => 2.5.3)`
-   electrode-redux-router-engine@2.1.3 `(2.1.2 => 2.1.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   fix archetype stylus issue ([#887](https://github.com/electrode-io/electrode/pull/887)) [commit](http://github.com/electrode-io/electrode/commit/ef1515c46a1306efb25d43792658cf24ad386b7f)
    -   [chore] add stylus-sample to CI ([#884](https://github.com/electrode-io/electrode/pull/884)) [commit](http://github.com/electrode-io/electrode/commit/fdd2914b4285b3c45881c15ec4a46d53632d1936)

-   `packages/electrode-react-webapp`

    -   support tokens that are not a function ([#883](https://github.com/electrode-io/electrode/pull/883)) [commit](http://github.com/electrode-io/electrode/commit/839c83896e73ad7bf19e7ecbf670f73a5b381f2b)
    -   default to reply with error stack ([#882](https://github.com/electrode-io/electrode/pull/882)) [commit](http://github.com/electrode-io/electrode/commit/c3cca427da97470358307233052c64ac1c70d58b)
    -   avoid overriding options.__internals ([#881](https://github.com/electrode-io/electrode/pull/881)) [commit](http://github.com/electrode-io/electrode/commit/dc3adc2dd5c14651d2581cc9b47bf4ad035f06b8)

-   `packages/electrode-redux-router-engine`

    -   add basename support for SSR Links ([#885](https://github.com/electrode-io/electrode/pull/885)) [commit](http://github.com/electrode-io/electrode/commit/295b11d2afb4accee8ee85a4069aa5701596b8e3)

-   `samples/stylus-sample`

    -   [chore] add stylus-sample to CI ([#884](https://github.com/electrode-io/electrode/pull/884)) [commit](http://github.com/electrode-io/electrode/commit/fdd2914b4285b3c45881c15ec4a46d53632d1936)

# 7/27/2018

- New feature - support CSS module `styleName` tag to enable shorten class name in production mode.
- Fix for https://github.com/facebook/jest/issues/6766
- Fix above the fold demo in universal-react-node sample
- Fix WEBPACK_DEV_HOST check in electrode-react-webapp
- Fix broken links in docs
- Add migration guide to docs for React Router v3 to v4
- Add migration guide to docs for webpack dev middleware

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.4.0 `(5.3.4 => 5.4.0)`
-   electrode-archetype-react-app-dev@5.4.0 `(5.3.4 => 5.4.0)`
-   electrode-archetype-react-component@5.3.2 `(5.3.1 => 5.3.2)`
-   electrode-archetype-react-component-dev@5.3.2 `(5.3.1 => 5.3.2)`
-   electrode-react-webapp@2.5.2 `(2.5.1 => 2.5.2)`
-   electrode-redux-router-engine@2.1.2 `(2.1.1 => 2.1.2)`
-   generator-electrode@4.2.0 `(4.1.3 => 4.2.0)`

### Lerna Updated

-   electrode-ignite@2.1.4 `(2.1.3 => 2.1.4)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [minor] shorten css names ([#876](https://github.com/electrode-io/electrode/pull/876)) [commit](http://github.com/electrode-io/electrode/commit/58eaec44f0e7eeb0a89ff9d6cbe90005afc39b9b)
    -   add testURL to jest config [commit](http://github.com/electrode-io/electrode/commit/b72dff34e98236034ed4a9b98988672a75944307)

-   `packages/electrode-archetype-react-component[-dev]`

    -   rewrite copy as flow ([#879](https://github.com/electrode-io/electrode/pull/879)) [commit](http://github.com/electrode-io/electrode/commit/6012a2acf6f4da37f30fb31ced1badb87a6651ab)

-   `packages/electrode-react-webapp`

    -   pass token instance to handler func ([#880](https://github.com/electrode-io/electrode/pull/880)) [commit](http://github.com/electrode-io/electrode/commit/bbbe2401eefc60592789079ac24965d4382b5794)
    -   [patch] check WEBPACK_DEV_HOST ([#868](https://github.com/electrode-io/electrode/pull/868)) [commit](http://github.com/electrode-io/electrode/commit/c62b12c0c54e7fb553749194057773f1306a6192)

-   `packages/electrode-redux-router-engine`

    -   update full doc link in redux router engine README ([#871](https://github.com/electrode-io/electrode/pull/871)) [commit](http://github.com/electrode-io/electrode/commit/7d445be75a8fa5c6a1a46116fec5958424e5611a)

-   `packages/generator-electrode`

    -   [minor] Enable shorten css names for generators ([#878](https://github.com/electrode-io/electrode/pull/878)) [commit](http://github.com/electrode-io/electrode/commit/47acd2dc4e7a67ca0e5bb8b9cb84631457564aeb)
    -   use milligram to replace skeleton ([#861](https://github.com/electrode-io/electrode/pull/861)) [commit](http://github.com/electrode-io/electrode/commit/eaf008f9e6480bf5b2421a36f19874e55a58dc87)

-   `samples/universal-react-node`

    -   [patch] Fix above the fold path inside universal-react-node sample ([#867](https://github.com/electrode-io/electrode/pull/867)) [commit](http://github.com/electrode-io/electrode/commit/514cb95589e5dd0dd6a5458fc70cf2928eb924b4)

-   `docs`

    -   [patch] fix links inside electrode component docs ([#877](https://github.com/electrode-io/electrode/pull/877)) [commit](http://github.com/electrode-io/electrode/commit/35ab702a08c291455acdee1d49a99c06e603f3ce)
    -   add guide to develop and debugging with webpack middleware ([#875](https://github.com/electrode-io/electrode/pull/875)) [commit](http://github.com/electrode-io/electrode/commit/a99b5b3dcf994c3fc5cee05db59763882c333d8e)
    -   Fix links in intermediate app archetype section ([#873](https://github.com/electrode-io/electrode/pull/873)) [commit](http://github.com/electrode-io/electrode/commit/a03179feb032b81986904ca0e61912face302f0d)
    -   add webpack dev middleware migration guide ([#872](https://github.com/electrode-io/electrode/pull/872)) [commit](http://github.com/electrode-io/electrode/commit/cebed81c0c81b309076f954f37ee54068ab6ceb2)
    -   Update customize-config.md [commit](http://github.com/electrode-io/electrode/commit/5195d1e1bbbe27f7a1954ea46cd675041377d112)
    -   fix links for electrode application ([#870](https://github.com/electrode-io/electrode/pull/870)) [commit](http://github.com/electrode-io/electrode/commit/cc9fb514135a4fa6c837c785bde32608b0b764c1)
    -   [patch] fix links for overview and readme section ([#869](https://github.com/electrode-io/electrode/pull/869)) [commit](http://github.com/electrode-io/electrode/commit/f045dfbc595d80aeffb17b96e191041af64d3305)
    -   [docs] update further develop links [commit](http://github.com/electrode-io/electrode/commit/f9ed0c2d533948564628079eba395131f8066732)
    -   [docs] update readme [commit](http://github.com/electrode-io/electrode/commit/1639cf9005ba8d2079358b743e726115d4bef9a8)
    -   [docs] update summary [commit](http://github.com/electrode-io/electrode/commit/b9157d7e6ff20b9596bbc64920978e9a5ad39b94)
    -   [docs] add react router 3 to 4 migration guide [commit](http://github.com/electrode-io/electrode/commit/057d3c9819e25dca9a72082b692837a6f1a9466d)

-   `tools`

    -   [docs] update readme [commit](http://github.com/electrode-io/electrode/commit/1639cf9005ba8d2079358b743e726115d4bef9a8)
    -   update electrode app screen shot ([#864](https://github.com/electrode-io/electrode/pull/864)) [commit](http://github.com/electrode-io/electrode/commit/f95214f652e19014920531adf854c2de392f5c09)

-   `MISC`

    -   update contributing guide [commit](http://github.com/electrode-io/electrode/commit/99cb973ca49343adfcc83ee25c1a50f4d0447182)
    -   fix link in README [commit](http://github.com/electrode-io/electrode/commit/f22c3fb1af983ef833c1d84d6c39d741bba12950)

# 7/16/2018

-   fix 302 redirect from router engine
-   fix docs broken links
-   clean up generator sample app CSS
-   update minimum node version to 8

## Packages

### Directly Updated

-   electrode-archetype-react-component@5.3.1 `(5.3.0 => 5.3.1)`
-   electrode-archetype-react-component-dev@5.3.1 `(5.3.0 => 5.3.1)`
-   electrode-react-webapp@2.5.1 `(2.5.0 => 2.5.1)`
-   electrode-redux-router-engine@2.1.1 `(2.1.0 => 2.1.1)`
-   generator-electrode@4.1.3 `(4.1.2 => 4.1.3)`
-   ignite-core@1.1.5 `(1.1.4 => 1.1.5)`

### Lerna Updated

-   electrode-ignite@2.1.3 `(2.1.2 => 2.1.3)`

## Commits

-   `packages/electrode-archetype-react-component[-dev]`

    -   small typo ([#855](https://github.com/electrode-io/electrode/pull/855)) [commit](http://github.com/electrode-io/electrode/commit/29f0cd4c13412b64226d938c0b4f015348e57829)

-   `packages/electrode-react-webapp`

    -   fix 302 redirect from router engine ([#863](https://github.com/electrode-io/electrode/pull/863)) [commit](http://github.com/electrode-io/electrode/commit/45e9bca33efa84e40466fde9f0565b10d7442c12)
    -   [chore] minor code reformat [commit](http://github.com/electrode-io/electrode/commit/197509d3cb8493c563cc612d8825f14c3043cf1e)

-   `packages/electrode-redux-router-engine`

    -   [chore] trigger a publish to make v2 latest on npm [commit](http://github.com/electrode-io/electrode/commit/a8d285b9e6ca2b933ab8398add9dc75a79cd95c1)

-   `packages/generator-electrode`

    -   [patch] Clean up app generator unused css class names & take inline styles out ([#856](https://github.com/electrode-io/electrode/pull/856)) [commit](http://github.com/electrode-io/electrode/commit/a218547e77d188b91e89c328228b275c88ac2b88)
    -   update dep for generated app ([#859](https://github.com/electrode-io/electrode/pull/859)) [commit](http://github.com/electrode-io/electrode/commit/279a7d258e53917261abc7a3599d063e62f3e5af)

-   `packages/ignite-core`

    -   update require node/npm to 8.0.0 and 5.6.0 [commit](http://github.com/electrode-io/electrode/commit/85148470cae1959ab88b3af7ef372dfb3b041b3c)

-   `samples/stylus-sample`

    -   fix stylus example ([#858](https://github.com/electrode-io/electrode/pull/858)) [commit](http://github.com/electrode-io/electrode/commit/aeb6e8c850e5a64914d2d087f32dcc1b0e7d4a37)

-   `docs`

    -   update docs for redux router engine on redirect [commit](http://github.com/electrode-io/electrode/commit/5ed5b51788c5d107edbce5a8fe37a2a21f641551)
    -   fix links in doc why-use-electrode.md [commit](http://github.com/electrode-io/electrode/commit/5baec72e6fe388258e8d9b169a6a2366a19087b8)
    -   fix links in start-with-component docs [commit](http://github.com/electrode-io/electrode/commit/f3867a22c47fb18ca463899d3a98d61ac35070a0)
    -   update start-with-ignite docs [commit](http://github.com/electrode-io/electrode/commit/8e652fc6a057478ab421ad52120cd2ad8ee0e551)
    -   fix requirements doc [commit](http://github.com/electrode-io/electrode/commit/f3dd3c0515f69a1106a3a974a41fbe21eac44f9f)
    -   fix links in docs [commit](http://github.com/electrode-io/electrode/commit/7e6e840f53dc90ddf4293c8c502fac67df4a902d)

-   `tools`

    -   update README [commit](http://github.com/electrode-io/electrode/commit/9ed2b91e0bd1f69f3fc774ed85eb96c3960578f2)

# 7/9/2018

- fix [852](https://github.com/electrode-io/electrode/issues/852) - properly pass URL query to route components
- Support router `<Redirect>` components
- Fix links in docs

## Packages

### Directly Updated

-   electrode-redux-router-engine@2.1.0 `(2.0.0 => 2.1.0)`
-   electrode-webpack-reporter@0.4.7 `(0.4.6 => 0.4.7)`

### Lerna Updated

-   electrode-archetype-react-app@5.3.4 `(5.3.3 => 5.3.4)`
-   electrode-archetype-react-app-dev@5.3.4 `(5.3.3 => 5.3.4)`

## Commits

-   `packages/electrode-redux-router-engine`

    -   support router Redirect component ([#853](https://github.com/electrode-io/electrode/pull/853)) [commit](http://github.com/electrode-io/electrode/commit/20a5934ecd85ec5dd43b4c093836a31c3afb2d6c)
    -   [minor] pass location with query string to routes ([#854](https://github.com/electrode-io/electrode/pull/854)) [commit](http://github.com/electrode-io/electrode/commit/33b26889ae906addc91cd5ae66fdc0c429788b77)

-   `packages/electrode-webpack-reporter`

    -   fix webpack reporter text overflow issue ([#846](https://github.com/electrode-io/electrode/pull/846)) [commit](http://github.com/electrode-io/electrode/commit/d73270a8d62afd18e661a389b08526f52c38f709)

-   `docs`

    -   Update powerful-electrode-tools.md [commit](http://github.com/electrode-io/electrode/commit/9f41afcc61e3ca03a3909b486bea23d2821be432)
    -   Update contributing.md [commit](http://github.com/electrode-io/electrode/commit/fe7522969507c85a8d57aeda4d697dc2cb059072)
    -   Update resources.md [commit](http://github.com/electrode-io/electrode/commit/c9277b630e2b3b7b85962fb95a857fd0c1af92af)
    -   Update stand-alone-modules.md [commit](http://github.com/electrode-io/electrode/commit/7622983b4647b681130c11d4f2197e6d1910d055)
    -   Update more-deployments.md [commit](http://github.com/electrode-io/electrode/commit/3c5baf743237a724947e4dc52655dc02c215ed18)
    -   Update react-routes.md [commit](http://github.com/electrode-io/electrode/commit/05a149a00b61f1524d5148c55ec32f68613f13c1)
    -   Update overview.md ([#850](https://github.com/electrode-io/electrode/pull/850)) [commit](http://github.com/electrode-io/electrode/commit/85b6eec3e2669293b7f2f4a22813008971e77eab)
    -   Update Intermediate.md ([#851](https://github.com/electrode-io/electrode/pull/851)) [commit](http://github.com/electrode-io/electrode/commit/d86e95f5412f73319c2fb0de23ca5efd34ecf875)
    -   Update further-develop-app.md ([#849](https://github.com/electrode-io/electrode/pull/849)) [commit](http://github.com/electrode-io/electrode/commit/08b8be16ea21b81721d4b1ddc7b1da605e8332b0)
    -   Update start-with-electrode.md [commit](http://github.com/electrode-io/electrode/commit/c18c9b61aec9d7d4f1b0485290956ed792279df8)
    -   Update README.md [commit](http://github.com/electrode-io/electrode/commit/9980f25a8a4853332630db5a3e8bb94a8bb257ad)
    -   Update further-develop-component.md [commit](http://github.com/electrode-io/electrode/commit/fe521d4990cd487ec51c20c1dd35a207d965733c)
    -   Update over-the-air.md [commit](http://github.com/electrode-io/electrode/commit/ec193608bebb9d2244e540a386a53fb3326f8fe2)
    -   Update over-the-air.md [commit](http://github.com/electrode-io/electrode/commit/b95ae9e3eb474576218bbf42f0d0aa74c59deb35)
    -   Update over-the-air.md [commit](http://github.com/electrode-io/electrode/commit/672d409e658304edf444e1a8432ea764448bbb1e)
    -   update code sample in redux router engine doc ([#845](https://github.com/electrode-io/electrode/pull/845)) [commit](http://github.com/electrode-io/electrode/commit/b8a0aa99662d3e841ffe4bcca707770449aa7f58)

# 6/29/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.3.3 `(5.3.2 => 5.3.3)`
-   electrode-archetype-react-app-dev@5.3.3 `(5.3.2 => 5.3.3)`
-   generator-electrode@4.1.2 `(4.1.1 => 4.1.2)`

### Lerna Updated

-   electrode-ignite@2.1.2 `(2.1.1 => 2.1.2)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   fix isomorphic loading after webpack compile ([#844](https://github.com/electrode-io/electrode/pull/844)) [commit](http://github.com/electrode-io/electrode/commit/5ea94a27141e806c0dfd86d29ec2e3f9a3c5528c)

-   `packages/generator-electrode`

    -   webpack-dev-hapi plugin depends on WEBPACK_DEV also ([#842](https://github.com/electrode-io/electrode/pull/842)) [commit](http://github.com/electrode-io/electrode/commit/ed21799efd48af9a1eeec9173de12a3363aa7f16)
    -   fix isomorphic loading after webpack compile ([#844](https://github.com/electrode-io/electrode/pull/844)) [commit](http://github.com/electrode-io/electrode/commit/5ea94a27141e806c0dfd86d29ec2e3f9a3c5528c)

# 6/28/2018

## Packages

-   electrode-archetype-react-app@5.3.2 `(5.3.1 => 5.3.2)`
-   electrode-archetype-react-app-dev@5.3.2 `(5.3.1 => 5.3.2)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   more npm files [commit](http://github.com/electrode-io/electrode/commit/3e479aeaaf88abe0ca53b0dd7b5a7ccfa0570493)

# 6/28/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.3.1 `(5.3.0 => 5.3.1)`
-   electrode-archetype-react-app-dev@5.3.1 `(5.3.0 => 5.3.1)`
-   generator-electrode@4.1.1 `(4.1.0 => 4.1.1)`

### Lerna Updated

-   electrode-ignite@2.1.1 `(2.1.0 => 2.1.1)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [chore] update npm publish files [commit](http://github.com/electrode-io/electrode/commit/7330f1d76241de688a39934b02da9fb6da7af3c9)

-   `packages/generator-electrode`

    -   remove yarn [commit](http://github.com/electrode-io/electrode/commit/dbbc30b652ea92345158160fe9e1225fd5bdbf1a)

# 6/28/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.3.0 `(5.2.1 => 5.3.0)`
-   electrode-archetype-react-app-dev@5.3.0 `(5.2.1 => 5.3.0)`
-   electrode-archetype-react-component@5.3.0 `(5.2.1 => 5.3.0)`
-   electrode-archetype-react-component-dev@5.3.0 `(5.2.1 => 5.3.0)`
-   electrode-ignite@2.1.0 `(2.0.7 => 2.1.0)`
-   electrode-react-webapp@2.5.0 `(2.4.0 => 2.5.0)`
-   electrode-redux-router-engine@2.0.0 `(1.5.2 => 2.0.0)`
-   generator-electrode@4.1.0 `(4.0.7 => 4.1.0)`

### Lerna Updated

-   electrode-webpack-reporter@0.4.6 `(0.4.5 => 0.4.6)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [minor] add flow-typed for flow library definitions ([#836](https://github.com/electrode-io/electrode/pull/836)) [commit](http://github.com/electrode-io/electrode/commit/fbb066a14c3e9c1a5d5c661f7f99d4c31b31eff5)
    -   [minor] support SSR hot module reload ([#840](https://github.com/electrode-io/electrode/pull/840)) [commit](http://github.com/electrode-io/electrode/commit/e084aee07abc74a72781e819c3e43846b1b7394e)
    -   always show reporter url on warning/errors [commit](http://github.com/electrode-io/electrode/commit/a8f77bc0baa6e4909512d566314ed0b8eaa9cbf3)
    -   avoid cleaning dist for dev build ([#833](https://github.com/electrode-io/electrode/pull/833)) [commit](http://github.com/electrode-io/electrode/commit/c87d77fea06f0067c7b1fbe8a9fe4d4f7a78261a)
    -   add hot middleware to webpack hapi plugin ([#829](https://github.com/electrode-io/electrode/pull/829)) [commit](http://github.com/electrode-io/electrode/commit/b278f7f5fdcd7c43d442719c58390e1f8fb0d7e3)
    -   [minor] Electrode archetype flow support ([#814](https://github.com/electrode-io/electrode/pull/814)) [commit](http://github.com/electrode-io/electrode/commit/9f5ab90eadd9fe9453a731cc776b6e12b8aef998)
    -   hapi plugin to use webpack-dev-middleware [commit](http://github.com/electrode-io/electrode/commit/4b9554b8baeb017281a5da3d10a6cd7b90ba6480)
    -   add serve-index locally for mods [commit](http://github.com/electrode-io/electrode/commit/a84766737c2d2c705f659379ba2e83d6a13f2f6f)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [minor] add flow-typed to archetype component ([#838](https://github.com/electrode-io/electrode/pull/838)) [commit](http://github.com/electrode-io/electrode/commit/c99b7625fe4ec2435c0f163a6651f6d32c9b1f21)
    -   [minor] component arch flow support ([#823](https://github.com/electrode-io/electrode/pull/823)) [commit](http://github.com/electrode-io/electrode/commit/68164c9175e1225a491c4346b790173820a73fef)

-   `packages/electrode-ignite`

    -   [minor] update to new generator-electrode [commit](http://github.com/electrode-io/electrode/commit/36b599fc542c9dc60e73d323bd66d43230296cfa)

-   `packages/electrode-react-webapp`

    -   [minor] refresh content module for webpack dev mode ([#835](https://github.com/electrode-io/electrode/pull/835)) [commit](http://github.com/electrode-io/electrode/commit/3a7e8259fff7ec4e952f0dd43192eac13bfa4124)
    -   better SSR content loading by defering and logging error ([#817](https://github.com/electrode-io/electrode/pull/817)) [commit](http://github.com/electrode-io/electrode/commit/04fb81a8f2fd73d011109bc50687560957e7b0e0)
    -   support tokens in script and style tags ([#813](https://github.com/electrode-io/electrode/pull/813)) [commit](http://github.com/electrode-io/electrode/commit/48dc4598668f2bf24430c0c71d7c50f49d295fef)

-   `packages/electrode-redux-router-engine`

    -   [major] update redux router engine to react router 4 [commit](http://github.com/electrode-io/electrode/commit/de76db23b29342345cb4e600dc2cee8ba802f00a)

-   `packages/generator-electrode`

    -   [minor] support SSR hot module reload ([#840](https://github.com/electrode-io/electrode/pull/840)) [commit](http://github.com/electrode-io/electrode/commit/e084aee07abc74a72781e819c3e43846b1b7394e)
    -   fix HMR reducer replacement [commit](http://github.com/electrode-io/electrode/commit/c6e648ad1da065c8d26c06fe92a7f813328647d3)
    -   use span to avoid inconsistent spaces ([#832](https://github.com/electrode-io/electrode/pull/832)) [commit](http://github.com/electrode-io/electrode/commit/0eaba292daf4c7b8db8a771038a0eb44f1c85cec)
    -   add hot middleware to webpack hapi plugin ([#829](https://github.com/electrode-io/electrode/pull/829)) [commit](http://github.com/electrode-io/electrode/commit/b278f7f5fdcd7c43d442719c58390e1f8fb0d7e3)
    -   make sure all template tokens are syntatically legal ([#827](https://github.com/electrode-io/electrode/pull/827)) [commit](http://github.com/electrode-io/electrode/commit/d24e34b10ecb8ad87714f530cffdc217008f4fb6)
    -   [minor] Update component generator ([#824](https://github.com/electrode-io/electrode/pull/824)) [commit](http://github.com/electrode-io/electrode/commit/6dcbce98d29a340f9ec66eff9da2de6817e2af1b)
    -   reformat archetype app flow support ([#826](https://github.com/electrode-io/electrode/pull/826)) [commit](http://github.com/electrode-io/electrode/commit/8c87c63d1acab7055916d9d98315a7c4c8b9f8e7)
    -   [minor] update generator to use react-router-4 [commit](http://github.com/electrode-io/electrode/commit/c38a22138c8be7ff1886482d4e354e56dd7c5fee)
    -   [chore] format code [commit](http://github.com/electrode-io/electrode/commit/27ddd052bf6e082e2525ac436dbf1daac10b0746)
    -   fix typo of electrode-server event name ([#821](https://github.com/electrode-io/electrode/pull/821)) [commit](http://github.com/electrode-io/electrode/commit/072b918a8a614c78dbb294a0486e822d40480a69)
    -   generate flowconfig if user want to use flow ([#819](https://github.com/electrode-io/electrode/pull/819)) [commit](http://github.com/electrode-io/electrode/commit/2a9eb951bd0cd9cb338871144ba2620b613e0872)
    -   hapi plugin to use webpack-dev-middleware [commit](http://github.com/electrode-io/electrode/commit/4b9554b8baeb017281a5da3d10a6cd7b90ba6480)

-   `samples/demo-component`

    -   add flow to demo component ([#822](https://github.com/electrode-io/electrode/pull/822)) [commit](http://github.com/electrode-io/electrode/commit/d4617df6a0d01902c574d2a12b1dd9a236f3418f)

-   `samples/universal-react-node`

    -   update readme & scripts [commit](http://github.com/electrode-io/electrode/commit/e20718a471e50057a1094b67741d7d13e61c2bbc)
    -   add flow-typed to example app for Flow library definitions [commit](http://github.com/electrode-io/electrode/commit/03a615a49241191560bc732c0baed599b70fcb86)
    -   reformat archetype app flow support ([#826](https://github.com/electrode-io/electrode/pull/826)) [commit](http://github.com/electrode-io/electrode/commit/8c87c63d1acab7055916d9d98315a7c4c8b9f8e7)
    -   add hapi good logger to sample [commit](http://github.com/electrode-io/electrode/commit/2cc382a0569079e8afba9f7babd9e5ceab9d3612)
    -   update sample to react router 4 [commit](http://github.com/electrode-io/electrode/commit/8182e720335570b2b86da95db63e90519fe11409)
    -   Add and fix the type checked by flow for examples ([#815](https://github.com/electrode-io/electrode/pull/815)) [commit](http://github.com/electrode-io/electrode/commit/4afa9a427049c64f0f8683306b3eacd489796178)

-   `docs`

    -   add flow docs for component ([#831](https://github.com/electrode-io/electrode/pull/831)) [commit](http://github.com/electrode-io/electrode/commit/ae6344dd9f1fb927e46df83ec3088914c954ba16)
    -   [docs] add app archetype flow docs ([#816](https://github.com/electrode-io/electrode/pull/816)) [commit](http://github.com/electrode-io/electrode/commit/fdd358f5fe0b692f71203a30ca5ec956cde11e8e)
    -   update redux router engine doc [commit](http://github.com/electrode-io/electrode/commit/995395941eca40c4c4dcf6f3af4ba30ebc6a5b9e)
    -   [major] update redux router engine to react router 4 [commit](http://github.com/electrode-io/electrode/commit/de76db23b29342345cb4e600dc2cee8ba802f00a)
    -   hapi plugin to use webpack-dev-middleware [commit](http://github.com/electrode-io/electrode/commit/4b9554b8baeb017281a5da3d10a6cd7b90ba6480)

-   `MISC`

    -   [doc] add gitbook versioning by branches [commit](http://github.com/electrode-io/electrode/commit/d354e82c58207b50e4941a8ce4ccea35327cca50)
    -   preserve other files under tmp dir when testing generator ([#830](https://github.com/electrode-io/electrode/pull/830)) [commit](http://github.com/electrode-io/electrode/commit/df06d7f0d4a12a7ad13b35816e5d17532c7864d3)
    -   test generate hapi app only [commit](http://github.com/electrode-io/electrode/commit/827610a1410524954357ff92fbdb8b250357051c)
    -   [chore] fix CI build [commit](http://github.com/electrode-io/electrode/commit/15bc60f335865a6dc2aee8e64074339e70b83f18)

# 6/15/2018

## Packages

-   electrode-react-webapp@2.4.0 `(2.3.1 => 2.4.0)`

## Commits

-   `packages/electrode-react-webapp`

    -   update DESIGN doc with new token features ([#810](https://github.com/electrode-io/electrode/pull/810)) [commit](http://github.com/electrode-io/electrode/commit/248f4da60dc47c3a5e6b1d62f90328f759524b6b)
    -   support comments and _call prop for tokens ([#809](https://github.com/electrode-io/electrode/pull/809)) [commit](http://github.com/electrode-io/electrode/commit/f651b2f025ec1e2c2319ce1b3b014d1a33bfc029)
    -   [minor] add note about accessing props and concurrent token ([#811](https://github.com/electrode-io/electrode/pull/811)) [commit](http://github.com/electrode-io/electrode/commit/4adc6b576c053810fb5d671e7b6c80eee175d3a3)

# 6/14/2018

## Packages

-   electrode-archetype-opt-inferno@0.2.3 `(0.2.2 => 0.2.3)`
-   electrode-archetype-opt-karma@1.0.1 `(1.0.0 => 1.0.1)`
-   electrode-archetype-opt-react@1.0.1 `(1.0.0 => 1.0.1)`
-   electrode-archetype-react-app@5.2.1 `(5.2.0 => 5.2.1)`
-   electrode-archetype-react-app-dev@5.2.1 `(5.2.0 => 5.2.1)`
-   electrode-archetype-react-component@5.2.1 `(5.2.0 => 5.2.1)`
-   electrode-archetype-react-component-dev@5.2.1 `(5.2.0 => 5.2.1)`
-   electrode-cookies@1.0.2 `(1.0.1 => 1.0.2)`
-   electrode-ignite@2.0.7 `(2.0.6 => 2.0.7)`
-   electrode-react-context@1.0.1 `(1.0.0 => 1.0.1)`
-   electrode-react-webapp@2.3.1 `(2.3.0 => 2.3.1)`
-   electrode-redux-router-engine@1.5.2 `(1.5.1 => 1.5.2)`
-   electrode-ui-config@1.1.1 `(1.1.0 => 1.1.1)`
-   electrode-ui-logger@1.1.1 `(1.1.0 => 1.1.1)`
-   electrode-webpack-reporter@0.4.5 `(0.4.4 => 0.4.5)`
-   generator-electrode@4.0.7 `(4.0.6 => 4.0.7)`
-   ignite-core@1.1.4 `(1.1.3 => 1.1.4)`
-   webpack-config-composer@1.0.4 `(1.0.3 => 1.0.4)`

## Commits

-   `packages/electrode-archetype-opt-inferno`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-archetype-opt-karma`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-archetype-opt-react`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-archetype-react-app[-dev]`

    -   Default reporter socket port from env ([#628](https://github.com/electrode-io/electrode/pull/628)) [commit](http://github.com/electrode-io/electrode/commit/fb2171b5ea03534d5e7d767bde66097ab28f89b9)
    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-cookies`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-ignite`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-react-context`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-react-webapp`

    -   support JSON and string for token props ([#805](https://github.com/electrode-io/electrode/pull/805)) [commit](http://github.com/electrode-io/electrode/commit/07b457c95ab2727a70615cfb33b86700d293af88)
    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-redux-router-engine`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)
    -   update redux to support v4 ([#807](https://github.com/electrode-io/electrode/pull/807)) [commit](http://github.com/electrode-io/electrode/commit/433fd4bfe8bf0c1e5efdc63a68778b6cdbdcc66c)

-   `packages/electrode-ui-config`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-ui-logger`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/electrode-webpack-reporter`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/generator-electrode`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/ignite-core`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `packages/webpack-config-composer`

    -   [chore] replace .npmignore with files in package.json ([#801](https://github.com/electrode-io/electrode/pull/801)) [commit](http://github.com/electrode-io/electrode/commit/44e75f1d8e7d83c2e0d15a780e9dc553ada60fb4)

-   `docs`

    -   update gitbook docs for setup and unit test ([#802](https://github.com/electrode-io/electrode/pull/802)) [commit](http://github.com/electrode-io/electrode/commit/63467d55eb1cd7d7916eff5b7b0c2c64e4a5beea)
    -   jest docs for component & app archetype ([#785](https://github.com/electrode-io/electrode/pull/785)) [commit](http://github.com/electrode-io/electrode/commit/24c716a9b20e6b5deea56713c75525e0dcfa3adc)

# 6/4/2018

## Packages

### Directly Updated

-   electrode-archetype-opt-karma@1.0.0 `(0.0.1 => 1.0.0)`
-   electrode-archetype-react-app@5.2.0 `(5.1.4 => 5.2.0)`
-   electrode-archetype-react-app-dev@5.2.0 `(5.1.4 => 5.2.0)`
-   electrode-archetype-react-component@5.2.0 `(5.1.3 => 5.2.0)`
-   electrode-archetype-react-component-dev@5.2.0 `(5.1.3 => 5.2.0)`
-   electrode-node-resolver@1.0.0 `(0.0.1 => 1.0.0)`
-   electrode-react-webapp@2.3.0 `(2.2.1 => 2.3.0)`
-   generator-electrode@4.0.6 `(4.0.5 => 4.0.6)`

### Lerna Updated

-   electrode-ignite@2.0.6 `(2.0.5 => 2.0.6)`

## Commits

-   `packages/electrode-archetype-opt-karma`

    -   make karma optional [commit](http://github.com/electrode-io/electrode/commit/2a716a39f2ed7d7fa61d7f2ff3b216446a26bb61)
    -   [major] prep for release [commit](http://github.com/electrode-io/electrode/commit/104fe037c72e3f548b1cab361f9b720eab16f2a7)

-   `packages/electrode-archetype-react-app[-dev]`

    -   get user jest config from archetype ([#799](https://github.com/electrode-io/electrode/pull/799)) [commit](http://github.com/electrode-io/electrode/commit/160458367faac203601eaf507e4edc6b7e32bb8f)
    -   fix node not honoring NODE_PRESERVE_SYMLINKS [commit](http://github.com/electrode-io/electrode/commit/7628ad9f1103d5da3121b637c7de319cb507403a)
    -   set cache directory for babel-loader [commit](http://github.com/electrode-io/electrode/commit/7f7fc07426cdd920e920a27c58cee18711ca5fc8)
    -   make karma optional [commit](http://github.com/electrode-io/electrode/commit/2a716a39f2ed7d7fa61d7f2ff3b216446a26bb61)
    -   put module resolvers into module electrode-node-resolver [commit](http://github.com/electrode-io/electrode/commit/e2cbb7a032ecf5ff82e92ef5a0b5f57464ae67ac)
    -   simplify directory setup [commit](http://github.com/electrode-io/electrode/commit/4a06f3adc88bd29c4fbe40d12d71677ac0989578)
    -   add node resolver for jest [commit](http://github.com/electrode-io/electrode/commit/5f05cae89163311739a7f6470e758a2ea16701dd)
    -   extract node resolver to common module in lib [commit](http://github.com/electrode-io/electrode/commit/36611f1a585ead0831e546356a73f8d8930fc4f2)
    -   clean logs [commit](http://github.com/electrode-io/electrode/commit/ce5b35d539ff256fec3f96f371190b73b1a50e0b)
    -   fix glob require from dev [commit](http://github.com/electrode-io/electrode/commit/f98a7bf58eadc1dbcf0a6f93dc3834df56629088)
    -   [minor] Jest support ([#775](https://github.com/electrode-io/electrode/pull/775)) [commit](http://github.com/electrode-io/electrode/commit/2c8e15f8f47cec5629f3022442b07454132c661c)

-   `packages/electrode-archetype-react-component[-dev]`

    -   allow karma dependencies to be turned off ([#800](https://github.com/electrode-io/electrode/pull/800)) [commit](http://github.com/electrode-io/electrode/commit/1810528ccb354d5be1197ce313837a78378f6f29)
    -   get user jest config from archetype ([#799](https://github.com/electrode-io/electrode/pull/799)) [commit](http://github.com/electrode-io/electrode/commit/160458367faac203601eaf507e4edc6b7e32bb8f)
    -   fix node not honoring NODE_PRESERVE_SYMLINKS [commit](http://github.com/electrode-io/electrode/commit/7628ad9f1103d5da3121b637c7de319cb507403a)
    -   set webpack preserve symlinks [commit](http://github.com/electrode-io/electrode/commit/7f003688e66e17449d903c58ede383d82ce48eae)
    -   use node resolver module and add opt dependencies [commit](http://github.com/electrode-io/electrode/commit/5c03d634a5f5f6bb01a599918a1b41fa7bb01aaa)
    -   simplify directory setup [commit](http://github.com/electrode-io/electrode/commit/4a06f3adc88bd29c4fbe40d12d71677ac0989578)
    -   fix rootDir and glob require [commit](http://github.com/electrode-io/electrode/commit/4def1a23e2e5c837a784a3d6520e4c34d1b661cf)
    -   [minor] Jest test component support ([#783](https://github.com/electrode-io/electrode/pull/783)) [commit](http://github.com/electrode-io/electrode/commit/febdd49559df425dae142951e4e83f54eaa8bea6)
    -   removing deprectated electrode-demo-index which has dependency on react 15 ([#790](https://github.com/electrode-io/electrode/pull/790)) [commit](http://github.com/electrode-io/electrode/commit/0b42a787fe96ed407785979e3ab34193df47fa5f)

-   `packages/electrode-node-resolver`

    -   put module resolvers into module electrode-node-resolver [commit](http://github.com/electrode-io/electrode/commit/e2cbb7a032ecf5ff82e92ef5a0b5f57464ae67ac)
    -   [major] prep for release [commit](http://github.com/electrode-io/electrode/commit/104fe037c72e3f548b1cab361f9b720eab16f2a7)

-   `packages/electrode-react-webapp`

    -   [minor] support properties for tokens ([#795](https://github.com/electrode-io/electrode/pull/795)) [commit](http://github.com/electrode-io/electrode/commit/b770c92e8c4f55fe9b8272bd550736a20d308bc0)
    -   refactor to separate async template engine from react webapp handlers ([#793](https://github.com/electrode-io/electrode/pull/793)) [commit](http://github.com/electrode-io/electrode/commit/fc72839e210cfad5c4ca5a66aaa7a7e8842579ba)
    -   export a main for package.json ([#788](https://github.com/electrode-io/electrode/pull/788)) [commit](http://github.com/electrode-io/electrode/commit/1261f2d6351958722fd8ff558ded3b261572653b)

-   `packages/generator-electrode`

    -   fix bad behaving down stream deps [commit](http://github.com/electrode-io/electrode/commit/8019ec1e413645d0f0770830a98167e59429e4db)

-   `samples/demo-component`

    -   use node resolver module and add opt dependencies [commit](http://github.com/electrode-io/electrode/commit/5c03d634a5f5f6bb01a599918a1b41fa7bb01aaa)

-   `samples/universal-react-node`

    -   refactor test [commit](http://github.com/electrode-io/electrode/commit/f7ba5e112f5be8a1cef865618c23fe8430198d1a)
    -   add jest test to sample app ([#776](https://github.com/electrode-io/electrode/pull/776)) [commit](http://github.com/electrode-io/electrode/commit/8ec79a08bbb090c39320816de2fd11f7848692f2)
    -   test: after changes - all pass [commit](http://github.com/electrode-io/electrode/commit/990f7903411ffdd28abde253cfadafef77075e58)

-   `docs`

    -   fix: Prop Types import from react to prop-types [commit](http://github.com/electrode-io/electrode/commit/d61941c4213cd77f9bfb2cae6a1ce1463a48da1d)

-   `MISC`

    -   update contributing guide [commit](http://github.com/electrode-io/electrode/commit/cd18f622caa669e7fb1194995204f3b5584af46e)
    -   remove unused code [commit](http://github.com/electrode-io/electrode/commit/1be212c103012fcec07df38073e6332be653bfaf)
    -   remove extra fyn setup no longer needed [commit](http://github.com/electrode-io/electrode/commit/cb4e814b0bf8b5928e8f5b53e4d02980da548480)
    -   add demo-component to build-test [commit](http://github.com/electrode-io/electrode/commit/63412e00e9497b772bf05f0656a7186e39cc2fb8)
    -   windows compat for build scripts [commit](http://github.com/electrode-io/electrode/commit/fcbba50fd63f6d8d7ef9c78fd58fc7a5cd691efc)

# 5/17/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.1.4 `(5.1.3 => 5.1.4)`
-   electrode-archetype-react-app-dev@5.1.4 `(5.1.3 => 5.1.4)`
-   electrode-archetype-react-component@5.1.3 `(5.1.2 => 5.1.3)`
-   electrode-archetype-react-component-dev@5.1.3 `(5.1.2 => 5.1.3)`
-   electrode-redux-router-engine@1.5.1 `(1.5.0 => 1.5.1)`
-   generator-electrode@4.0.5 `(4.0.4 => 4.0.5)`

### Lerna Updated

-   electrode-archetype-react-app-dev@5.1.4 `(5.1.3 => 5.1.4)`
-   electrode-ignite@2.0.5 `(2.0.4 => 2.0.5)`
-   electrode-webpack-reporter@0.4.4 `(0.4.3 => 0.4.4)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   add babel-runtime to production dep ([#779](https://github.com/electrode-io/electrode/pull/779)) [commit](http://github.com/electrode-io/electrode/commit/3331a9ce189bf52305a25621d2447a01a1ba886c)
    -   fix optimize-stats task ([#774](https://github.com/electrode-io/electrode/pull/774)) [commit](http://github.com/electrode-io/electrode/commit/2b5c7096f89915330924d55b99002fdd12bfeaf0)

-   `packages/electrode-archetype-react-component[-dev]`

    -   component archetype style loader fixes ([#773](https://github.com/electrode-io/electrode/pull/773)) [commit](http://github.com/electrode-io/electrode/commit/3d427feb83820b194a026b2c642efca1326a4259)

-   `packages/electrode-redux-router-engine`

    -   using `ReactDOM.hydrate` to bootstrap SSR content ([#787](https://github.com/electrode-io/electrode/pull/787)) [commit](http://github.com/electrode-io/electrode/commit/27bb19b7eb64511dde951a0649fa23830b67534e)

-   `packages/generator-electrode`

    -   component demo-app webpack config allow importing from `packages/.../lib` ([#784](https://github.com/electrode-io/electrode/pull/784)) [commit](http://github.com/electrode-io/electrode/commit/d13afeddb19d2ba0a1a0182ca88d92faefbf0013)
    -   using `ReactDOM.hydrate` to bootstrap SSR content ([#787](https://github.com/electrode-io/electrode/pull/787)) [commit](http://github.com/electrode-io/electrode/commit/27bb19b7eb64511dde951a0649fa23830b67534e)

-   `samples/universal-react-node`

    -   using `ReactDOM.hydrate` to bootstrap SSR content ([#787](https://github.com/electrode-io/electrode/pull/787)) [commit](http://github.com/electrode-io/electrode/commit/27bb19b7eb64511dde951a0649fa23830b67534e)

-   `MISC`

    -   update copyright message ([#778](https://github.com/electrode-io/electrode/pull/778)) [commit](http://github.com/electrode-io/electrode/commit/1ecbf836a6be79418189ce759379404206898e63)
    -   Update copyright year ([#777](https://github.com/electrode-io/electrode/pull/777)) [commit](http://github.com/electrode-io/electrode/commit/5b39dec2dc4f5630d51917fad43dc9bab51baced)

# 4/24/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.1.3 `(5.1.2 => 5.1.3)`
-   electrode-archetype-react-app-dev@5.1.3 `(5.1.2 => 5.1.3)`
-   electrode-archetype-react-component@5.1.2 `(5.1.1 => 5.1.2)`
-   electrode-archetype-react-component-dev@5.1.2 `(5.1.1 => 5.1.2)`
-   generator-electrode@4.0.4 `(4.0.3 => 4.0.4)`
-   webpack-config-composer@1.0.3 `(1.0.2 => 1.0.3)`

### Lerna Updated

-   electrode-ignite@2.0.4 `(2.0.3 => 2.0.4)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   update all engines spec in prep for Node 4 deprecating ([#770](https://github.com/electrode-io/electrode/pull/770)) [commit](http://github.com/electrode-io/electrode/commit/8cf50bb4d050df7fecef220269195acd96b36af5)
    -   support user server main exporting a function [commit](http://github.com/electrode-io/electrode/commit/8bdb1899632c67e0a970db4dd37efafbd6164752)
    -   add devbrk and hotbrk tasks [commit](http://github.com/electrode-io/electrode/commit/837a87c5e1b65e493205b24df23a2df0981815a3)
    -   prettier format [commit](http://github.com/electrode-io/electrode/commit/fd83ebec2fda24b46e39e1b81dac9d862ff5b037)
    -   Add --inspect flag to clap server-watch ([#765](https://github.com/electrode-io/electrode/pull/765)) [commit](http://github.com/electrode-io/electrode/commit/aa63d2a7b21385bbce2e13f9e36e53e3fe596fbf)
    -   update isomorphic-loader to v2 ([#772](https://github.com/electrode-io/electrode/pull/772)) [commit](http://github.com/electrode-io/electrode/commit/3db8e8b7f1b56bf569c8642da3cb0a748a30bb3b)

-   `packages/electrode-archetype-react-component[-dev]`

    -   update all engines spec in prep for Node 4 deprecating ([#770](https://github.com/electrode-io/electrode/pull/770)) [commit](http://github.com/electrode-io/electrode/commit/8cf50bb4d050df7fecef220269195acd96b36af5)
    -   Electrode archetype component autoprefix & pure css loader fixes ([#767](https://github.com/electrode-io/electrode/pull/767)) [commit](http://github.com/electrode-io/electrode/commit/23bbc36815f48f499e3a639d6f14b89371a0bb29)
    -   [patch] v5 react/wrap multilines ([#763](https://github.com/electrode-io/electrode/pull/763)) [commit](http://github.com/electrode-io/electrode/commit/28fe609e3a4d4c097065e90642a6f51e868e1c2d)

-   `packages/generator-electrode`

    -   update all engines spec in prep for Node 4 deprecating ([#770](https://github.com/electrode-io/electrode/pull/770)) [commit](http://github.com/electrode-io/electrode/commit/8cf50bb4d050df7fecef220269195acd96b36af5)
    -   generate app with sample to show electrode server startup events [commit](http://github.com/electrode-io/electrode/commit/38b39ce2d276629d70cfa4d08f8c4c33f2d9b7cd)

-   `packages/webpack-config-composer`

    -   update all engines spec in prep for Node 4 deprecating ([#770](https://github.com/electrode-io/electrode/pull/770)) [commit](http://github.com/electrode-io/electrode/commit/8cf50bb4d050df7fecef220269195acd96b36af5)

-   `samples/demo-component`

    -   update all engines spec in prep for Node 4 deprecating ([#770](https://github.com/electrode-io/electrode/pull/770)) [commit](http://github.com/electrode-io/electrode/commit/8cf50bb4d050df7fecef220269195acd96b36af5)

-   `samples/stylus-sample`

    -   update all engines spec in prep for Node 4 deprecating ([#770](https://github.com/electrode-io/electrode/pull/770)) [commit](http://github.com/electrode-io/electrode/commit/8cf50bb4d050df7fecef220269195acd96b36af5)

-   `docs`

    -   [patch] fix docs getting started link ([#764](https://github.com/electrode-io/electrode/pull/764)) [commit](http://github.com/electrode-io/electrode/commit/2051135cb7ed09489f5f11f3a7a59f44d9e8a452)

# 3/23/2018

## Packages

-   electrode-archetype-react-app@5.1.2 `(5.1.1 => 5.1.2)`
-   electrode-archetype-react-app-dev@5.1.2 `(5.1.1 => 5.1.2)`
-   electrode-archetype-react-component@5.1.1 `(5.1.0 => 5.1.1)`
-   electrode-archetype-react-component-dev@5.1.1 `(5.1.0 => 5.1.1)`
-   electrode-react-webapp@2.2.1 `(2.2.0 => 2.2.1)`
-   electrode-webpack-reporter@0.4.3 `(0.4.2 => 0.4.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   fix for windows ([#760](https://github.com/electrode-io/electrode/pull/760)) [commit](http://github.com/electrode-io/electrode/commit/e77b81ea557003700dc0d28b391c05f1688845b3)
    -   enable cors to debug unit tests ([#723](https://github.com/electrode-io/electrode/pull/723)) [commit](http://github.com/electrode-io/electrode/commit/9631384fb4e06e98fb21b2722397b76d0607879c)
    -   0x20 ([#757](https://github.com/electrode-io/electrode/pull/757)) [commit](http://github.com/electrode-io/electrode/commit/d1b170a5894a0064b3fb6fc78c2e6dded4a2a1e7)
    -   [patch][bug] fixes bug causing node_modules to not be excluded from babel on windows ([#736](https://github.com/electrode-io/electrode/pull/736)) [commit](http://github.com/electrode-io/electrode/commit/ac588441e9ad9f8c72bb082890bcaa34be812546)
    -   fix auto-prefixer in archetype app ([#744](https://github.com/electrode-io/electrode/pull/744)) [commit](http://github.com/electrode-io/electrode/commit/aa39e09c1d641bd22de343e9eec7e351680575e4)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] optionalRequire archetype/config folder for component archetype ([#733](https://github.com/electrode-io/electrode/pull/733)) [commit](http://github.com/electrode-io/electrode/commit/74298d228dba47f374734aec36f5b40ea3c6c077)
    -   fix auto-prefixer in archetype component ([#745](https://github.com/electrode-io/electrode/pull/745)) [commit](http://github.com/electrode-io/electrode/commit/72c4afe17c757a1379f2e41618530ed273d3fab3)

-   `packages/electrode-react-webapp`

    -   prepublishOnly [commit](http://github.com/electrode-io/electrode/commit/b6035fd571a73ca0d5d8aec8d4755d8cf50a3ec3)

-   `packages/electrode-webpack-reporter`

    -   Webpack reporter text overflow issue ([#731](https://github.com/electrode-io/electrode/pull/731)) [commit](http://github.com/electrode-io/electrode/commit/5e959b17957b9ab6d31b2e8745e995348f9c9c3d)
    -   fix error message display due to broken code check ([#761](https://github.com/electrode-io/electrode/pull/761)) [commit](http://github.com/electrode-io/electrode/commit/723f3d4b0aa2fb537b2f5960f192286be0b7cb50)

-   `samples/demo-component`

    -   [patch] Fix sample demo-component demo-app tests ([#734](https://github.com/electrode-io/electrode/pull/734)) [commit](http://github.com/electrode-io/electrode/commit/262921336d378c810f109ecb356c99d81a38ed31)

-   `samples/electrode-demo-index`

    -   add demo-component as dependency ([#728](https://github.com/electrode-io/electrode/pull/728)) [commit](http://github.com/electrode-io/electrode/commit/e6f9ff08320ee3122dc4eaccf4d069efeb577269)

-   `docs`

    -   Fix link ([#755](https://github.com/electrode-io/electrode/pull/755)) [commit](http://github.com/electrode-io/electrode/commit/d490c2b4b3ddf3fbb995b3d38814a8a912ff0d29)
    -   spaces ([#756](https://github.com/electrode-io/electrode/pull/756)) [commit](http://github.com/electrode-io/electrode/commit/c4a3fc122b3b43ece7fcce53c306fbf4204783b4)

-   `tools`

    -   0x20 ([#757](https://github.com/electrode-io/electrode/pull/757)) [commit](http://github.com/electrode-io/electrode/commit/d1b170a5894a0064b3fb6fc78c2e6dded4a2a1e7)

-   `MISC`

    -   let fynpo take care of fyn setup [commit](http://github.com/electrode-io/electrode/commit/80a8d70ffb5c04eb415f23e03c49ac03fee81a3a)
    -   handle windows [commit](http://github.com/electrode-io/electrode/commit/c9e4a6bb41e6f961464e8668935dca0db2ad5989)
    -   Update license year to 2016-present ([#735](https://github.com/electrode-io/electrode/pull/735)) [commit](http://github.com/electrode-io/electrode/commit/9a00267f35f87b8a24d453c00160b6f5642dce6c)

# 2/26/2018

## Packages

-   electrode-archetype-react-app@5.1.1 `(5.1.0 => 5.1.1)`
-   electrode-archetype-react-app-dev@5.1.1 `(5.1.0 => 5.1.1)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   add extension log to nodemon watch list ([#732](https://github.com/electrode-io/electrode/pull/732)) [commit](http://github.com/electrode-io/electrode/commit/75589124e67a4fa6f507df63c254f224ae44022f)

# 2/15/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.1.0 `(5.0.5 => 5.1.0)`
-   electrode-archetype-react-app-dev@5.1.0 `(5.0.5 => 5.1.0)`
-   electrode-archetype-react-component@5.1.0 `(5.0.3 => 5.1.0)`
-   electrode-archetype-react-component-dev@5.1.0 `(5.0.3 => 5.1.0)`
-   electrode-react-webapp@2.2.0 `(2.1.1 => 2.2.0)`
-   generator-electrode@4.0.3 `(4.0.2 => 4.0.3)`

### Lerna Updated

-   electrode-ignite@2.0.3 `(2.0.2 => 2.0.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] set webpack preserve symlinks for loader resolver ([#725](https://github.com/electrode-io/electrode/pull/725)) [commit](http://github.com/electrode-io/electrode/commit/d2ad8a56d74f23ffe7e489700fb79584117cc0dc)
    -   minor typo fix ([#716](https://github.com/electrode-io/electrode/pull/716)) [commit](http://github.com/electrode-io/electrode/commit/d0b7ee5f08b4c5c468cdf25d390032d4f3a472f0)
    -   [minor] Update archetype app styles ([#703](https://github.com/electrode-io/electrode/pull/703)) [commit](http://github.com/electrode-io/electrode/commit/397e5dbf4e4d7fe2ffa6127d9a2fb8cc45090feb)

-   `packages/electrode-archetype-react-component[-dev]`

    -   resolve warnings ([#724](https://github.com/electrode-io/electrode/pull/724)) [commit](http://github.com/electrode-io/electrode/commit/2fd076e42a6f614232d3610249754dac6ecee554)
    -   [minor] add customize lint feature ([#721](https://github.com/electrode-io/electrode/pull/721)) [commit](http://github.com/electrode-io/electrode/commit/20a0d10e6fb8ab3d8fe3dda2fcf3a09a96c5f75c)
    -   [minor] component archetype extract styles ([#713](https://github.com/electrode-io/electrode/pull/713)) [commit](http://github.com/electrode-io/electrode/commit/edfd24bf63e8b3f678272972adef3e38ba36ff01)
    -   resolve check dependencies error ([#714](https://github.com/electrode-io/electrode/pull/714)) [commit](http://github.com/electrode-io/electrode/commit/1b97aa78398dcd083cc547f240d9337b62229736)
    -   add webpack module resolver plugin to component archetype ([#710](https://github.com/electrode-io/electrode/pull/710)) [commit](http://github.com/electrode-io/electrode/commit/5191abda5063b2da3f310148b7c558fba6d2db33)

-   `packages/electrode-react-webapp`

    -   [chore] prettier format [commit](http://github.com/electrode-io/electrode/commit/3a2cd39c514239af112a816b38946bebe171c5e5)
    -   Support webpack chunks (css) ([#715](https://github.com/electrode-io/electrode/pull/715)) [commit](http://github.com/electrode-io/electrode/commit/689af787abbb6f0867ef0cbf1d9358025c01b778)
    -   [minor] mark for minor release [commit](http://github.com/electrode-io/electrode/commit/50938185406e2bc30f80f8e3c50b8edffb53aab0)

-   `packages/generator-electrode`

    -   Update lerna version ([#705](https://github.com/electrode-io/electrode/pull/705)) [commit](http://github.com/electrode-io/electrode/commit/8c8ecf9c1bd41b4de3430e69ddc18bbd69178caa)

-   `samples/demo-component`

    -   [minor] Use fyn and remove webpack demo-component alias ([#718](https://github.com/electrode-io/electrode/pull/718)) [commit](http://github.com/electrode-io/electrode/commit/e61ea31e5ae002f932c573e9c2c264892937cae5)
    -   update cssModuleStylesSupport Flag ([#717](https://github.com/electrode-io/electrode/pull/717)) [commit](http://github.com/electrode-io/electrode/commit/bdc6f69e1302a0d8856e617d38ba4837c5c8ee35)
    -   Consumes component from demo folder ([#712](https://github.com/electrode-io/electrode/pull/712)) [commit](http://github.com/electrode-io/electrode/commit/32a5fb7498c4f405e17500179d2ddda196b7f13e)

-   `docs`

    -   update component gitbooks ([#720](https://github.com/electrode-io/electrode/pull/720)) [commit](http://github.com/electrode-io/electrode/commit/2f35b14cb18eef9d4202b13115b04998d1e2f70f)
    -   [gitbook] update gitbook for archetype styles ([#704](https://github.com/electrode-io/electrode/pull/704)) [commit](http://github.com/electrode-io/electrode/commit/a1dd7e16405883417f61e4b9e53d4b64eb85d57b)

-   `MISC`

    -   [chore] update CI [commit](http://github.com/electrode-io/electrode/commit/1a218919b7c8006c88e64fa9460a98b9fade2cff)

# 1/23/2018

## Packages

-   electrode-archetype-react-app@5.0.5 `(5.0.4 => 5.0.5)`
-   electrode-archetype-react-app-dev@5.0.5 `(5.0.4 => 5.0.5)`
-   electrode-archetype-react-component@5.0.3 `(5.0.2 => 5.0.3)`
-   electrode-archetype-react-component-dev@5.0.3 `(5.0.2 => 5.0.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   fix babel-run on windows ([#697](https://github.com/electrode-io/electrode/pull/697)) [commit](http://github.com/electrode-io/electrode/commit/0e7211cbf21a71714a5b8ad4d867b91744e154f7)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [chore] reformat some commands ([#692](https://github.com/electrode-io/electrode/pull/692)) [commit](http://github.com/electrode-io/electrode/commit/b5cfa08357262f4eb14c709e67e12af02f07bc14)

-   `samples/demo-component`

    -   use fynpo to bootstrap packages [commit](http://github.com/electrode-io/electrode/commit/15c003741a636d885d089fe7589842d01a7b50c9)
    -   add node_modules to webpack [commit](http://github.com/electrode-io/electrode/commit/daca25b47b1a276172503f494090094a92d27eb0)
    -   fix babelrc [commit](http://github.com/electrode-io/electrode/commit/992363135c166f2cd863bfae16bd390925689714)
    -   point to local archetype [commit](http://github.com/electrode-io/electrode/commit/09f05bcc213aab88c1849b56aa41e687b8b6ba07)
    -   update webpack alias [commit](http://github.com/electrode-io/electrode/commit/5791a2519e19707fc97738af869da5e520e1f511)
    -   point to local archetype + update webpack alias [commit](http://github.com/electrode-io/electrode/commit/b4d39a1cb912c04a79cd102bb76a55ab854579e1)
    -   add react-dom to webpack-alias [commit](http://github.com/electrode-io/electrode/commit/e8047caa29de1a7b213dfe29ab9889260d0ee6f8)
    -   update sample demo component [commit](http://github.com/electrode-io/electrode/commit/9bdfefdc5b4b5876f67e246080e34ed6eb8a9ad9)

-   `samples/electrode-demo-index`

    -   Remove demo from electrode-demo-index ([#696](https://github.com/electrode-io/electrode/pull/696)) [commit](http://github.com/electrode-io/electrode/commit/7c133be879c5dba9212416870d0c89585c660e3d)
    -   fix babelrc and webpack dep ([#695](https://github.com/electrode-io/electrode/pull/695)) [commit](http://github.com/electrode-io/electrode/commit/9faaa7020b4d0396abec1b5a64693911a3c7ea5a)
    -   [major] update component-playground to v3 ([#693](https://github.com/electrode-io/electrode/pull/693)) [commit](http://github.com/electrode-io/electrode/commit/e70662be1f3e5ef65241eaf3f2d67a15617f0a7e)

-   `xchangelog`

    -   [chore] archive older change logs ([#690](https://github.com/electrode-io/electrode/pull/690)) [commit](http://github.com/electrode-io/electrode/commit/c5bbc4bac08fcc8313f7956ef877fdededea4d79)

# 1/19/2018

## Packages

### Directly Updated

-   electrode-archetype-react-component@5.0.2 `(5.0.1 => 5.0.2)`
-   electrode-archetype-react-component-dev@5.0.2 `(5.0.1 => 5.0.2)`
-   electrode-webpack-reporter@0.4.2 `(0.4.1 => 0.4.2)`
-   generator-electrode@4.0.2 `(4.0.1 => 4.0.2)`

### Lerna Updated

-   electrode-archetype-react-app@5.0.4 `(5.0.3 => 5.0.4)`
-   electrode-archetype-react-app-dev@5.0.4 `(5.0.3 => 5.0.4)`
-   electrode-ignite@2.0.2 `(2.0.1 => 2.0.2)`

## Commits

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] fix missed optionalDep update by lerna ([#689](https://github.com/electrode-io/electrode/pull/689)) [commit](http://github.com/electrode-io/electrode/commit/bae5f1fb1b08b9133803c8270d823733ec5bdfd1)

-   `packages/electrode-webpack-reporter`

    -   prepublish -> prepare ([#687](https://github.com/electrode-io/electrode/pull/687)) [commit](http://github.com/electrode-io/electrode/commit/9f2c9eccaf84a3a7c924e2544182b417408b3f84)

-   `packages/generator-electrode`

    -   [patch] fix eslint error in demo-app of generated component ([#688](https://github.com/electrode-io/electrode/pull/688)) [commit](http://github.com/electrode-io/electrode/commit/9f9c9c402b8c38f9f97be38b55020f6e35d4d8a3)

-   `MISC`

    -   ignore lock files ([#686](https://github.com/electrode-io/electrode/pull/686)) [commit](http://github.com/electrode-io/electrode/commit/08dc9b161820ea18d658026d02f3e1f4ebacd4cc)

# 1/18/2018

## Packages

### Directly Updated

-   electrode-archetype-react-app@5.0.3 `(5.0.2 => 5.0.3)`
-   electrode-archetype-react-app-dev@5.0.3 `(5.0.2 => 5.0.3)`
-   electrode-archetype-react-component@5.0.1 `(5.0.0 => 5.0.1)`
-   electrode-archetype-react-component-dev@5.0.1 `(5.0.0 => 5.0.1)`
-   electrode-webpack-reporter@0.4.1 `(0.4.0 => 0.4.1)`
-   generator-electrode@4.0.1 `(4.0.0 => 4.0.1)`

### Lerna Updated

-   electrode-ignite@2.0.1 `(2.0.0 => 2.0.1)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] update component generator ([#681](https://github.com/electrode-io/electrode/pull/681)) [commit](http://github.com/electrode-io/electrode/commit/b7a708ac24bd1207a183b085fe59803e485b935e)
    -   [patch] resolve react/lib/ReactMount issue for hot reload ([#679](https://github.com/electrode-io/electrode/pull/679)) [commit](http://github.com/electrode-io/electrode/commit/d73327ff61f3246409515584b7f036f2c2eaed7f)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] update component generator ([#681](https://github.com/electrode-io/electrode/pull/681)) [commit](http://github.com/electrode-io/electrode/commit/b7a708ac24bd1207a183b085fe59803e485b935e)

-   `packages/electrode-webpack-reporter`

    -   [patch]Webpack reporter fixes ([#682](https://github.com/electrode-io/electrode/pull/682)) [commit](http://github.com/electrode-io/electrode/commit/18408635cd3d15ba426fd199ffd464c528ae1d84)

-   `packages/generator-electrode`

    -   [patch] update component generator ([#681](https://github.com/electrode-io/electrode/pull/681)) [commit](http://github.com/electrode-io/electrode/commit/b7a708ac24bd1207a183b085fe59803e485b935e)

-   `docs`

    -   [patch] Gitbook content updates: build react components for app ([#684](https://github.com/electrode-io/electrode/pull/684)) [commit](http://github.com/electrode-io/electrode/commit/84ce1c5531b9cee492c82ad8dd621737c03285c9)

-   `tools`

    -   remove files no longer needed ([#685](https://github.com/electrode-io/electrode/pull/685)) [commit](http://github.com/electrode-io/electrode/commit/5accb7b5be68998482f204494c51c70938210a33)
    -   use fyn to bootstrap packages ([#677](https://github.com/electrode-io/electrode/pull/677)) [commit](http://github.com/electrode-io/electrode/commit/d2349378e6c2f10dc8a9aa4ecd40900a63532590)

-   `MISC`

    -   extract fyn bootstrap tools for lerna to its own module fynpo ([#683](https://github.com/electrode-io/electrode/pull/683)) [commit](http://github.com/electrode-io/electrode/commit/fc6fda836c499a60bccc9a7698591ba0bed7c10d)

# 1/12/2018

## Packages

-   electrode-archetype-opt-inferno@0.2.2 `(0.2.1 => 0.2.2)`
-   electrode-archetype-opt-react@1.0.0 `(0.2.0 => 1.0.0)`
-   electrode-archetype-react-app@5.0.0 `(4.1.0 => 5.0.0)`
-   electrode-archetype-react-app-dev@5.0.0 `(4.1.0 => 5.0.0)`
-   electrode-archetype-react-component@5.0.0 `(4.0.1 => 5.0.0)`
-   electrode-archetype-react-component-dev@5.0.0 `(4.0.1 => 5.0.0)`
-   electrode-cookies@1.0.1 `(1.0.0 => 1.0.1)`
-   electrode-ignite@2.0.0 `(1.2.3 => 2.0.0)`
-   electrode-react-webapp@2.1.1 `(2.1.0 => 2.1.1)`
-   electrode-webpack-reporter@0.4.0 `(0.3.13 => 0.4.0)`
-   generator-electrode@4.0.0 `(3.4.6 => 4.0.0)`
-   ignite-core@1.1.3 `(1.1.2 => 1.1.3)`

## Commits

-   `packages/electrode-archetype-opt-inferno`

    -   check env PWD before using process.cwd ([#665](https://github.com/electrode-io/electrode/pull/665)) [commit](http://github.com/electrode-io/electrode/commit/275ca4c555f8a4647bbfe9c1dc5d8042086e97ac)

-   `packages/electrode-archetype-opt-react`

    -   check env PWD before using process.cwd ([#665](https://github.com/electrode-io/electrode/pull/665)) [commit](http://github.com/electrode-io/electrode/commit/275ca4c555f8a4647bbfe9c1dc5d8042086e97ac)
    -   [major] move to react 16 exclusively ([#635](https://github.com/electrode-io/electrode/pull/635)) [commit](http://github.com/electrode-io/electrode/commit/bf47f097ab6bc2b0c9b3c8ccc86214907377d8bb)

-   `packages/electrode-archetype-react-app[-dev]`

    -   use callback instead of regex for babel exclude ([#671](https://github.com/electrode-io/electrode/pull/671)) [commit](http://github.com/electrode-io/electrode/commit/ad6944c358414d99518ff4afa683992ffe4964a2)
    -   add enzyme adapter config for tests ([#659](https://github.com/electrode-io/electrode/pull/659)) [commit](http://github.com/electrode-io/electrode/commit/42cacc037c7389072dc3f17dbad261736491da4c)
    -   update build scripts ([#663](https://github.com/electrode-io/electrode/pull/663)) [commit](http://github.com/electrode-io/electrode/commit/1c5b03e6f18ecd36a03b3a720ea00c6f1044a990)
    -   run app server in dev mode with babel-register ([#661](https://github.com/electrode-io/electrode/pull/661)) [commit](http://github.com/electrode-io/electrode/commit/97d210e84304409bc33fe84760b83d881ac3994e)
    -   upgrade babel-eslint ([#658](https://github.com/electrode-io/electrode/pull/658)) [commit](http://github.com/electrode-io/electrode/commit/7e971d3d128c92b5a1b01d633b2fd8773a52ca21)
    -   [patch] fix module resolver by looking up package.json ([#656](https://github.com/electrode-io/electrode/pull/656)) [commit](http://github.com/electrode-io/electrode/commit/ebc2ef6bf76817e1b862c988292f05a46e329010)
    -   [major] move to react 16 exclusively ([#635](https://github.com/electrode-io/electrode/pull/635)) [commit](http://github.com/electrode-io/electrode/commit/bf47f097ab6bc2b0c9b3c8ccc86214907377d8bb)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [major] move to react 16 exclusively ([#655](https://github.com/electrode-io/electrode/pull/655)) [commit](http://github.com/electrode-io/electrode/commit/ee738fc8aa2ef92ecd53457fe4df3251ef42cba0)

-   `packages/electrode-cookies`

    -   update test ([#660](https://github.com/electrode-io/electrode/pull/660)) [commit](http://github.com/electrode-io/electrode/commit/30f74f858a377452ba714590feb8d0cdf3efd5c4)

-   `packages/electrode-ignite`

    -   [major] mark for update on major bump of generator ([#676](https://github.com/electrode-io/electrode/pull/676)) [commit](http://github.com/electrode-io/electrode/commit/46ddcfa38218b5682419335aeb0cd046fbe9c456)

-   `packages/electrode-react-webapp`

    -   update to React 16 ([#675](https://github.com/electrode-io/electrode/pull/675)) [commit](http://github.com/electrode-io/electrode/commit/2ae28037366e68c1618c21df90dd4cc8e67416cb)

-   `packages/electrode-webpack-reporter`

    -   [minor] upgrade webpack-reporter to react16 ([#670](https://github.com/electrode-io/electrode/pull/670)) [commit](http://github.com/electrode-io/electrode/commit/c66a09be9363d0887fa0e56516a8535f0a3ddedd)

-   `packages/generator-electrode`

    -   [major] update generated app to React 16 ([#673](https://github.com/electrode-io/electrode/pull/673)) [commit](http://github.com/electrode-io/electrode/commit/50b3d7afaf76d825bd65585ed55b7757e37e139e)
    -   fix component babel rc in generator ([#669](https://github.com/electrode-io/electrode/pull/669)) [commit](http://github.com/electrode-io/electrode/commit/76668c94abae0f98d83c1175f34b707dacdaab1b)
    -   redo eslintrc files ([#662](https://github.com/electrode-io/electrode/pull/662)) [commit](http://github.com/electrode-io/electrode/commit/ca4375743023cac97a6501c79a3626d76620ce0b)
    -   disable cors in default & prod, enable in dev ([#657](https://github.com/electrode-io/electrode/pull/657)) [commit](http://github.com/electrode-io/electrode/commit/462f3e4906a601f09f9f4e29440f57e23e89a5a9)
    -   [minor] stop lock to react 15 in generated app ([#640](https://github.com/electrode-io/electrode/pull/640)) [commit](http://github.com/electrode-io/electrode/commit/14ef9d9c95673725d9e51be61c3be5690f8a5798)

-   `packages/ignite-core`

    -   update test ([#660](https://github.com/electrode-io/electrode/pull/660)) [commit](http://github.com/electrode-io/electrode/commit/30f74f858a377452ba714590feb8d0cdf3efd5c4)

-   `samples/demo-component`

    -   disable cors in default & prod, enable in dev ([#657](https://github.com/electrode-io/electrode/pull/657)) [commit](http://github.com/electrode-io/electrode/commit/462f3e4906a601f09f9f4e29440f57e23e89a5a9)

-   `samples/stylus-sample`

    -   disable cors in default & prod, enable in dev ([#657](https://github.com/electrode-io/electrode/pull/657)) [commit](http://github.com/electrode-io/electrode/commit/462f3e4906a601f09f9f4e29440f57e23e89a5a9)

-   `samples/universal-react-node`

    -   remove or disable React 16 incompatible samples ([#674](https://github.com/electrode-io/electrode/pull/674)) [commit](http://github.com/electrode-io/electrode/commit/e1637516d8c5845b7c08dcf0b2f7bbefa387e3ff)

-   `docs`

    -   Fix documentation link ([#650](https://github.com/electrode-io/electrode/pull/650)) [commit](http://github.com/electrode-io/electrode/commit/4bdb175314a5292aa81f5190a22564ea4273a906)
    -   Update react-native-and-over-the-air.md [commit](http://github.com/electrode-io/electrode/commit/08bbc00a989f0fc488d7cb4ecd0947a752d77c44)

-   `MISC`

    -   travis fix for chrome headless [commit](http://github.com/electrode-io/electrode/commit/0aa0f37f7dff1c8c80f7749272bf406cb4742f42)
    -   [chore] add fyn to CI [commit](http://github.com/electrode-io/electrode/commit/bbd8c37cbe28f2424ef6a1e9f2e460d5a1f7e509)
    -   remove Node 6 from CI [commit](http://github.com/electrode-io/electrode/commit/dae7d71eb0b51dc086d12971594c49b97b9989b3)
    -   Update changelog [commit](http://github.com/electrode-io/electrode/commit/af634527039c397ac16dad12fcb2d558689af3ce)

# [02/14/2017 - 11/20/2017](./xchangelog//2017.md)
