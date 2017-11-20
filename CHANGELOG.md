# 11/20/2017

## Packages

### Directly Updated

-   electrode-archetype-opt-inferno@0.2.1 `(0.2.0 => 0.2.1)`
-   electrode-archetype-react-app@4.1.0 `(4.0.7 => 4.1.0)`
-   electrode-archetype-react-app-dev@4.1.0 `(4.0.7 => 4.1.0)`
-   electrode-archetype-react-component@4.0.1 `(4.0.0 => 4.0.1)`
-   electrode-archetype-react-component-dev@4.0.1 `(4.0.0 => 4.0.1)`
-   generator-electrode@3.4.6 `(3.4.5 => 3.4.6)`

### Lerna Updated

-   electrode-ignite@1.2.3 `(1.2.2 => 1.2.3)`

## Commits

-   `packages/electrode-archetype-opt-inferno`

    -   [patch] more info in log output ([#637](https://github.com/electrode-io/electrode/pull/637)) [commit](http://github.com/electrode-io/electrode/commit/f8e0e4b80da5ce8083e7a0a8833133c5150f91c0)

-   `packages/electrode-archetype-react-app[-dev]`

    -   Reports code coverage on server side tests ([#612](https://github.com/electrode-io/electrode/pull/612)) [commit](http://github.com/electrode-io/electrode/commit/82b51968ccce719fc8116e9fb7349d7be5c87e96)
    -   enable defer based on latest css-split-webpack-plugin ([#636](https://github.com/electrode-io/electrode/pull/636)) [commit](http://github.com/electrode-io/electrode/commit/b84e4cb1d0766ebedf5d82602f0afc93df7a421a)
    -   [minor] Add sonarQubeUnitReporter to Karma test coverage output ([#639](https://github.com/electrode-io/electrode/pull/639)) [commit](http://github.com/electrode-io/electrode/commit/084dd42792b04472a31bb06cdb833dd965d27e91)
    -   write karma coverage report to common dir ([#634](https://github.com/electrode-io/electrode/pull/634)) [commit](http://github.com/electrode-io/electrode/commit/e5b4b909dd5acfc01e9fc9066f00cacaae0eab9f)
    -   [minor] update to use babel-preset-env ([#641](https://github.com/electrode-io/electrode/pull/641)) [commit](http://github.com/electrode-io/electrode/commit/eabe92b7945745f99cc9222a19d63f7d158e5000)

-   `packages/electrode-archetype-react-component[-dev]`

    -   Few fixes for new electrode component ([#642](https://github.com/electrode-io/electrode/pull/642)) [commit](http://github.com/electrode-io/electrode/commit/d94553058ecc68992a33aaadcdd13e3a4268e8bf)

-   `packages/generator-electrode`

    -   Few fixes for new electrode component ([#642](https://github.com/electrode-io/electrode/pull/642)) [commit](http://github.com/electrode-io/electrode/commit/d94553058ecc68992a33aaadcdd13e3a4268e8bf)
    -   [patch] update react-notify-toast ([#638](https://github.com/electrode-io/electrode/pull/638)) [commit](http://github.com/electrode-io/electrode/commit/37fb8577f39f22e692dd336c3897e367cf491ef3)

-   `docs`

    -   Fix link to hapijs/bell [commit](http://github.com/electrode-io/electrode/commit/40f2d41ae6b4fe90d8fb1ac9b51aa6a0ad0312da)

# 11/14/2017

## Packages

-   electrode-archetype-react-app@4.0.7 `(4.0.6 => 4.0.7)`
-   electrode-archetype-react-app-dev@4.0.7 `(4.0.6 => 4.0.7)`
-   electrode-ignite@1.2.2 `(1.2.1 => 1.2.2)`
-   generator-electrode@3.4.5 `(3.4.4 => 3.4.5)`
-   ignite-core@1.1.2 `(1.1.1 => 1.1.2)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [bug] set compilerPhase to emit to make sure css split happens after optimization ([#631](https://github.com/electrode-io/electrode/pull/631)) [commit](http://github.com/electrode-io/electrode/commit/92a43f95a451da6459cc59652411c8cf9ec63ca0)

-   `packages/electrode-ignite`

    -   [patch] Update a more reasonable message for generator child process exit. ([#627](https://github.com/electrode-io/electrode/pull/627)) [commit](http://github.com/electrode-io/electrode/commit/3253a751f929d854eaca2638fd7a6b46e49593bb)

-   `packages/generator-electrode`

    -   export custom config ([#630](https://github.com/electrode-io/electrode/pull/630)) [commit](http://github.com/electrode-io/electrode/commit/b1f9e5b4f301b150402c5ba935dfa21f7baf777f)

-   `packages/ignite-core`

    -   [patch] Add a proper hint message for case: npm v5.4.x ([#624](https://github.com/electrode-io/electrode/pull/624)) [commit](http://github.com/electrode-io/electrode/commit/5fc1886da5153f904c68bfbadadf07933713af06)

# 10/31/2017

## Packages

### Directly Updated

-   electrode-archetype-react-app@4.0.6 `(4.0.5 => 4.0.6)`
-   electrode-archetype-react-app-dev@4.0.6 `(4.0.5 => 4.0.6)`
-   generator-electrode@3.4.4 `(3.4.3 => 3.4.4)`
-   ignite-core@1.1.1 `(1.1.0 => 1.1.1)`

### Lerna Updated

-   electrode-ignite@1.2.1 `(1.2.0 => 1.2.1)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   Removed compilers with require ([#625](https://github.com/electrode-io/electrode/pull/625)) [commit](http://github.com/electrode-io/electrode/commit/4dddbf025b844aa682e41dd5c2bdc7d9bcc79a9d)

-   `packages/generator-electrode`

    -   Read incoming props if extended ([#622](https://github.com/electrode-io/electrode/pull/622)) [commit](http://github.com/electrode-io/electrode/commit/9b5bafa276fea80281f7b559ab0e893b7a70aff2)

-   `packages/ignite-core`

    -   [fix] pass npmReg to latestOnceDaily ([#626](https://github.com/electrode-io/electrode/pull/626)) [commit](http://github.com/electrode-io/electrode/commit/4f03e480cbbe136dfa796c1c34b599bbcef858a0)

# 10/20/2017

## Packages

-   electrode-archetype-react-app@4.0.5 `(4.0.4 => 4.0.5)`
-   electrode-archetype-react-app-dev@4.0.5 `(4.0.4 => 4.0.5)`
-   electrode-ignite@1.2.0 `(1.1.0 => 1.2.0)`
-   generator-electrode@3.4.3 `(3.4.2 => 3.4.3)`
-   ignite-core@1.1.0 `(1.0.1 => 1.1.0)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] Chai as promised ([#618](https://github.com/electrode-io/electrode/pull/618)) [commit](http://github.com/electrode-io/electrode/commit/2d1af7ae95664f979fb2758cd5049d4f655839ed)

-   `packages/electrode-ignite`

    -   [minor] More updates for electrode-ignite ([#619](https://github.com/electrode-io/electrode/pull/619)) [commit](http://github.com/electrode-io/electrode/commit/af1ef695357992f340335f8cdc43fd2257e62c28)

-   `packages/generator-electrode`

    -   [patch][bug] Component Generator refactor install function, exit immediately. ([#620](https://github.com/electrode-io/electrode/pull/620)) [commit](http://github.com/electrode-io/electrode/commit/8b3313b164c850bd5b4f5900bf1f2bb5b4b157e5)

-   `packages/ignite-core`

    -   [minor] support optional npm registry ([#621](https://github.com/electrode-io/electrode/pull/621)) [commit](http://github.com/electrode-io/electrode/commit/40bb1243f91e33a8659f530ce7800780e8d39325)

-   `tools`

    -   include packages updated by mapping [commit](http://github.com/electrode-io/electrode/commit/448c33ebae2540f8afd023db64db49ab25640c99)

# 10/18/2017

## Packages

-   electrode-ignite@1.1.0 `(1.0.1 => 1.1.0)`
-   generator-electrode@3.4.2 `(3.4.1 => 3.4.2)`
-   ignite-core@1.0.1 `(1.0.0 => 1.0.1)`

## Commits

-   `packages/electrode-ignite`

    -   [patch] commit missing file [commit](http://github.com/electrode-io/electrode/commit/377524cf53ae2ef193fb88d87ccb59421ce61e89)
    -   [patch] fix argument parsing ([#613](https://github.com/electrode-io/electrode/pull/613)) [commit](http://github.com/electrode-io/electrode/commit/54d85eaf81f9cbb28072c2ae8b4a486c75c515fa)
    -   [minor] Changes for wml electrode-ignite ([#615](https://github.com/electrode-io/electrode/pull/615)) [commit](http://github.com/electrode-io/electrode/commit/679c0593f4cbc54b65b46e25ab9a01a27749b0ee)

-   `packages/generator-electrode`

    -   Fix component generator ([#616](https://github.com/electrode-io/electrode/pull/616)) [commit](http://github.com/electrode-io/electrode/commit/93aae0ec8c5bea0d57902aa0d780e0dc20b90bef)

-   `packages/ignite-core`

    -   remove unused pre_execute event and update tests ([#614](https://github.com/electrode-io/electrode/pull/614)) [commit](http://github.com/electrode-io/electrode/commit/3b7be797ad564c0db1c413c3caa81d9213c33a1e)
    -   [patch] fix argument parsing ([#613](https://github.com/electrode-io/electrode/pull/613)) [commit](http://github.com/electrode-io/electrode/commit/54d85eaf81f9cbb28072c2ae8b4a486c75c515fa)
    -   Update ignite-core unit test ([#611](https://github.com/electrode-io/electrode/pull/611)) [commit](http://github.com/electrode-io/electrode/commit/39b8471f0480dc526f8cb23fa0f16ec91b7cdbf5)

-   `samples/stylus-sample`

    -   [minor][bug] unable to launch sample program. ([#609](https://github.com/electrode-io/electrode/pull/609)) [commit](http://github.com/electrode-io/electrode/commit/b57ee79325e91b4ada4afefdb5cb7365700c68ed)

-   `samples/universal-material-ui`

    -   [minor][bug] unable to launch sample program. ([#609](https://github.com/electrode-io/electrode/pull/609)) [commit](http://github.com/electrode-io/electrode/commit/b57ee79325e91b4ada4afefdb5cb7365700c68ed)

-   `samples/universal-react-node`

    -   [minor][bug] unable to launch sample program. ([#609](https://github.com/electrode-io/electrode/pull/609)) [commit](http://github.com/electrode-io/electrode/commit/b57ee79325e91b4ada4afefdb5cb7365700c68ed)

-   `MISC`

    -   [chore] remove bin from gitignore [commit](http://github.com/electrode-io/electrode/commit/f17e989f3870271d20953df038125376dc5689ee)

# 10/10/2017

## Packages

### Directly Updated

-   generator-electrode@3.4.1 `(3.4.0 => 3.4.1)`

### Lerna Updated

-   electrode-ignite@1.0.1 `(1.0.0 => 1.0.1)`

## Commits

-   `packages/generator-electrode`

    -   update generated app's dep [commit](http://github.com/electrode-io/electrode/commit/603ced06ed91893622fbe6ba3cae715ec1e25d9b)
    -   update generated component's dep [commit](http://github.com/electrode-io/electrode/commit/cd0e4d7fa157d7c3429b1231a697327dd4fff812)

# 10/10/2017

## Packages

### Directly Updated

-   electrode-archetype-opt-inferno@0.2.0 `(0.1.1 => 0.2.0)`
-   electrode-archetype-opt-react@0.2.0 `(0.1.1 => 0.2.0)`
-   electrode-archetype-react-app@4.0.0 `(3.2.2 => 4.0.0)`
-   electrode-archetype-react-app-dev@4.0.0 `(3.2.2 => 4.0.0)`
-   electrode-archetype-react-component@4.0.0 `(3.2.1 => 4.0.0)`
-   electrode-archetype-react-component-dev@4.0.0 `(3.2.1 => 4.0.0)`
-   electrode-ignite@1.0.0 `(0.1.27 => 1.0.0)`
-   electrode-react-webapp@2.1.0 `(2.0.0 => 2.1.0)`
-   electrode-redux-router-engine@1.5.0 `(1.4.6 => 1.5.0)`
-   electrode-ui-config@1.1.0 `(1.0.1 => 1.1.0)`
-   electrode-ui-logger@1.1.0 `(1.0.0 => 1.1.0)`
-   generator-electrode@3.4.0 `(3.3.4 => 3.4.0)`
-   ignite-core@1.0.0 `(0.1.19 => 1.0.0)`

### Lerna Updated

-   electrode-webpack-reporter@0.3.13 `(0.3.12 => 0.3.13)`

## Commits

-   `packages/electrode-archetype-opt-inferno`

    -   [minor] update inferno v3 ([#601](https://github.com/electrode-io/electrode/pull/601)) [commit](http://github.com/electrode-io/electrode/commit/9dd239484525b6faae71eb59a0fcc3c71bdecbd9)

-   `packages/electrode-archetype-opt-react`

    -   [minor] add react 16 ([#585](https://github.com/electrode-io/electrode/pull/585)) [commit](http://github.com/electrode-io/electrode/commit/ed39b93b9cb423f03b68f898c458bf38d6a07899)

-   `packages/electrode-archetype-react-app[-dev]`

    -   [major] update chai v4, eslint v4, eslint-plugin-react v7, mocha v4, sinon  v4 ([#598](https://github.com/electrode-io/electrode/pull/598)) [commit](http://github.com/electrode-io/electrode/commit/6ad5e16294485b249c063249b9f63b6c5e4d739d)
    -   [major] Added babel-core/register to mocha.opts ([#599](https://github.com/electrode-io/electrode/pull/599)) [commit](http://github.com/electrode-io/electrode/commit/de524341259044edef69a0b39abc32973ee691e5)
    -   **Revert** "[minor][feat] implement code splitting support with webpack 3. (#538)" [commit](http://github.com/electrode-io/electrode/commit/d88513e2c1eb5acabce7e090032249309301c514)
    -   Add CSS_MODULE_STYLUS_SUPPORT to webpack config spec of archetype ([#562](https://github.com/electrode-io/electrode/pull/562)) [commit](http://github.com/electrode-io/electrode/commit/5d7ff30e69628ec815624324fa59e80772ec448b)
    -   [minor][feat] implement code splitting support with webpack 3. ([#538](https://github.com/electrode-io/electrode/pull/538)) [commit](http://github.com/electrode-io/electrode/commit/3540cc0e0d74d41496de00b22456356bbe016df1)
    -   [patch][bug] Fix CORS issue when running karma tests in  and ([#584](https://github.com/electrode-io/electrode/pull/584)) [commit](http://github.com/electrode-io/electrode/commit/4de10ccbc81b391dcc8453e7447c9c890788fbb4)
    -   transform-react-constant-elements ([#556](https://github.com/electrode-io/electrode/pull/556)) [commit](http://github.com/electrode-io/electrode/commit/2c3526028400dcab8778a98ea50dfa609472e82f)
    -   added simple progress ([#578](https://github.com/electrode-io/electrode/pull/578)) [commit](http://github.com/electrode-io/electrode/commit/eefe133c978e6a60f3ad9ad9377cd0dbd7456b53)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [major] update chai, mocha, sinon to v4, eslint-plugin-react v7 ([#606](https://github.com/electrode-io/electrode/pull/606)) [commit](http://github.com/electrode-io/electrode/commit/851e0c0fba3e75ac57668e59277e21bc0ba000b0)
    -   [major] Update ESLint from v3 to v4 ([#549](https://github.com/electrode-io/electrode/pull/549)) [commit](http://github.com/electrode-io/electrode/commit/58a207ed01becf896cf66cf29f58ca5f1234fa33)
    -   fixes for electrode component archetype readme ([#550](https://github.com/electrode-io/electrode/pull/550)) [commit](http://github.com/electrode-io/electrode/commit/c20a94b99199b17fe86d27f886205d03b5ea221c)
    -   [patch] Fix "clap npm:prepublish" command ([#551](https://github.com/electrode-io/electrode/pull/551)) [commit](http://github.com/electrode-io/electrode/commit/638d82a4b54150471c0946a90eaf54f721733514)

-   `packages/electrode-ignite`

    -   generator only ask yes/no if running from menu ([#600](https://github.com/electrode-io/electrode/pull/600)) [commit](http://github.com/electrode-io/electrode/commit/ef19d4f8f75fc9e41076fa0203c49c5ef8e1e4a6)
    -   add clap command to ignite [commit](http://github.com/electrode-io/electrode/commit/78a71aa63fc832e846e5e25d613cdcb85681a9f1)
    -   add a pause after menu item execute ([#592](https://github.com/electrode-io/electrode/pull/592)) [commit](http://github.com/electrode-io/electrode/commit/da162479c6f714e937464863023a55cdd626b881)
    -   update dependencies [commit](http://github.com/electrode-io/electrode/commit/ba6d679bb87304d696c9c92b6078c34ec1886248)
    -   adjust and fixes on windows [commit](http://github.com/electrode-io/electrode/commit/f2e772ef8d8c689cea3b59b670ead748863c026b)
    -   use correct path for yo [commit](http://github.com/electrode-io/electrode/commit/ed7a7453b285649b834a9a719bafca83841ec5a8)
    -   exit ignite after update [commit](http://github.com/electrode-io/electrode/commit/177bfd0298bb3d1b9f975e5bda5d6698e30d0728)
    -   add version to ignite title ([#587](https://github.com/electrode-io/electrode/pull/587)) [commit](http://github.com/electrode-io/electrode/commit/61af5b4d17056100c2959cc2fc06161b0058bb19)
    -   rewrite ignite ([#586](https://github.com/electrode-io/electrode/pull/586)) [commit](http://github.com/electrode-io/electrode/commit/f3daaf297c76eaec4762143de54ba9443ab9af1c)
    -   [chore] prettierify [commit](http://github.com/electrode-io/electrode/commit/75686bd290ddab113fd355bce90bdd42c9e4d613)
    -   [major][feat] electrode-ignite modules ([#548](https://github.com/electrode-io/electrode/pull/548)) [commit](http://github.com/electrode-io/electrode/commit/73cad612a82490929e1e62376a862b1026b7d47a)
    -   Update ignite readme ([#607](https://github.com/electrode-io/electrode/pull/607)) [commit](http://github.com/electrode-io/electrode/commit/103de8a2076775279f926ccd74afb6433c84352c)

-   `packages/electrode-react-webapp`

    -   [minor] support custom HTTP status code ([#605](https://github.com/electrode-io/electrode/pull/605)) [commit](http://github.com/electrode-io/electrode/commit/85c00d83cfb97399bffc7157a1809294fad570ad)
    -   [minor] enable react 16 ([#595](https://github.com/electrode-io/electrode/pull/595)) [commit](http://github.com/electrode-io/electrode/commit/0e7ac20e54a5c44035ccafdaaedc18a6af7a22b6)
    -   Fixed registerRoutes never resolving promise from express-server.js ([#563](https://github.com/electrode-io/electrode/pull/563)) [commit](http://github.com/electrode-io/electrode/commit/434a261728ffa5b6335a03f57433e0ce7170e216)

-   `packages/electrode-redux-router-engine`

    -   [minor] enable react 16 ([#596](https://github.com/electrode-io/electrode/pull/596)) [commit](http://github.com/electrode-io/electrode/commit/56e7aab03fdcc5b046db32776362abd9f4356594)

-   `packages/electrode-ui-config`

    -   [minor] clean up ui-config ([#582](https://github.com/electrode-io/electrode/pull/582)) [commit](http://github.com/electrode-io/electrode/commit/83b4cd6a4c2deb0b62a23e58432aba55ea17c71e)

-   `packages/electrode-ui-logger`

    -   [minor] clean up ui-config ([#582](https://github.com/electrode-io/electrode/pull/582)) [commit](http://github.com/electrode-io/electrode/commit/83b4cd6a4c2deb0b62a23e58432aba55ea17c71e)

-   `packages/generator-electrode`

    -   [minor] update electrode-react-webapp to v2 for generate app ([#597](https://github.com/electrode-io/electrode/pull/597)) [commit](http://github.com/electrode-io/electrode/commit/846cd77334c6dc1652151108faa21f4a60b20a8f)
    -   [patch] lock react 15 in generated app ([#594](https://github.com/electrode-io/electrode/pull/594)) [commit](http://github.com/electrode-io/electrode/commit/55c86da017a7260345ae6e66f691a21956a1f187)
    -   **Revert** "[minor][feat] implement code splitting support with webpack 3. (#538)" [commit](http://github.com/electrode-io/electrode/commit/d88513e2c1eb5acabce7e090032249309301c514)
    -   [minor][chore] [generator-electrode] Update yeoman and add yarn support. ([#559](https://github.com/electrode-io/electrode/pull/559)) [commit](http://github.com/electrode-io/electrode/commit/736c3a4e7f3f03db78777f8eab047364db69336b)
    -   [minor][feat] implement code splitting support with webpack 3. ([#538](https://github.com/electrode-io/electrode/pull/538)) [commit](http://github.com/electrode-io/electrode/commit/3540cc0e0d74d41496de00b22456356bbe016df1)

-   `packages/ignite-core`

    -   add a pause after menu item execute ([#592](https://github.com/electrode-io/electrode/pull/592)) [commit](http://github.com/electrode-io/electrode/commit/da162479c6f714e937464863023a55cdd626b881)
    -   show manual install message in helpers [commit](http://github.com/electrode-io/electrode/commit/d43052e9ab1651d18299114e96a9337f14053cca)
    -   redo get input prompt logic [commit](http://github.com/electrode-io/electrode/commit/85f76e5140d7049dccd144c915394bb7560f3a1c)
    -   update dependencies [commit](http://github.com/electrode-io/electrode/commit/ba6d679bb87304d696c9c92b6078c34ec1886248)
    -   adjust and fixes on windows [commit](http://github.com/electrode-io/electrode/commit/f2e772ef8d8c689cea3b59b670ead748863c026b)
    -   exit ignite after update [commit](http://github.com/electrode-io/electrode/commit/177bfd0298bb3d1b9f975e5bda5d6698e30d0728)
    -   rewrite ignite ([#586](https://github.com/electrode-io/electrode/pull/586)) [commit](http://github.com/electrode-io/electrode/commit/f3daaf297c76eaec4762143de54ba9443ab9af1c)
    -   [chore] fix eslint [commit](http://github.com/electrode-io/electrode/commit/673ad621d23b425dabd95c8a461cd5178a9ce66d)
    -   [chore] prettierify [commit](http://github.com/electrode-io/electrode/commit/2c95da360e16a44a91eba7fc5a4e8de6e891edcb)
    -   [major][feat] electrode-ignite modules ([#548](https://github.com/electrode-io/electrode/pull/548)) [commit](http://github.com/electrode-io/electrode/commit/73cad612a82490929e1e62376a862b1026b7d47a)

-   `samples/universal-react-node`

    -   Remove redundant return ([#573](https://github.com/electrode-io/electrode/pull/573)) [commit](http://github.com/electrode-io/electrode/commit/2cb4adcb1a2f92d23d533848b35a3d814c58f182)

-   `docs`

    -   [chore] update doc images [commit](http://github.com/electrode-io/electrode/commit/2baf9ce343709a630d847e91bd45bb27bd17db11)
    -   update requirements doc [commit](http://github.com/electrode-io/electrode/commit/2b5945176909827eec6ea22ecb418e2481e44c54)
    -   update docs for electrode-ignite [commit](http://github.com/electrode-io/electrode/commit/80a78142fb489f59e1e02311574d20d4d30ca36f)
    -   update docs for electrode-ignite [commit](http://github.com/electrode-io/electrode/commit/03ad8ef3cf0425611af693120480466233020759)
    -   [patch]Ignite gitbook ([#552](https://github.com/electrode-io/electrode/pull/552)) [commit](http://github.com/electrode-io/electrode/commit/17b0ba39cf7bc1382d09d0a7a5b3bc9a3bdf2f87)

-   `MISC`

    -   CI test generate HapiJS app first [commit](http://github.com/electrode-io/electrode/commit/b936161be71b73aa35362069a8280743cf25f267)
    -   fix build-test [commit](http://github.com/electrode-io/electrode/commit/32c1598c3e0b76dfdb339227db02b34e9e62721a)

# 9/11/2017

## Packages

-   electrode-react-webapp@2.0.0 `(1.8.1 => 2.0.0)`

## Commits

-   `packages/electrode-react-webapp`

    -   pre process renderring steps to improv performance [commit](http://github.com/electrode-io/electrode/commit/c724d24d283e053374b6d9aa034b82d8e2fe5a22)
    -   allow specifying array of token handlers [commit](http://github.com/electrode-io/electrode/commit/c36ece1a7096b9399fbee9cef1dddcd6c78d9404)
    -   [major] remove react-helmet [commit](http://github.com/electrode-io/electrode/commit/4c5a4a75c96ce31ce49eb0c0d05e2945c9184f39)
    -   [major] rewrite react-webapp [commit](http://github.com/electrode-io/electrode/commit/fbbf85cac18178873a228ffa08f7e072400e4cc9)

# 8/24/2017

## Packages

-   electrode-archetype-react-app@3.2.2 `(3.2.1 => 3.2.2)`
-   electrode-archetype-react-app-dev@3.2.2 `(3.2.1 => 3.2.2)`
-   generator-electrode@3.3.4 `(3.3.3 => 3.3.4)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] update penthouse to avoid npm pulling from github.com ([#554](https://github.com/electrode-io/electrode/pull/554)) [commit](http://github.com/electrode-io/electrode/commit/4fe91fc732fe83950727419420c250403edda9e2)

-   `packages/generator-electrode`

    -   [chore] update docs on publishing components ([#546](https://github.com/electrode-io/electrode/pull/546)) [commit](http://github.com/electrode-io/electrode/commit/ebf67c737b1da2158fdb9cea6730dcdeb4664678)

-   `MISC`

    -   [chore] remove node 4 from CI [commit](http://github.com/electrode-io/electrode/commit/d80b2c44022c3c05952469cce9cd2a514cbbb37c)

# 8/14/2017

## Packages

### Directly Updated

-   electrode-archetype-react-app@3.2.1 `(3.2.0 => 3.2.1)`
-   electrode-archetype-react-component@3.2.1 `(3.2.0 => 3.2.1)`
-   electrode-archetype-react-component-dev@3.2.1 `(3.2.0 => 3.2.1)`
-   electrode-webpack-reporter@0.3.12 `(0.3.11 => 0.3.12)`
-   generator-electrode@3.3.3 `(3.3.2 => 3.3.3)`

### Lerna Updated

-   electrode-archetype-react-app-dev@3.2.1 `(3.2.0 => 3.2.1)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch][chore] Update Readme component archetype ([#528](https://github.com/electrode-io/electrode/pull/528)) [commit](http://github.com/electrode-io/electrode/commit/f81feec3194b13de85f901bc1421ab75ab8d61e1)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] babel src to lib should copy files ([#542](https://github.com/electrode-io/electrode/pull/542)) [commit](http://github.com/electrode-io/electrode/commit/be20b4142340e62e8c9e3c2ac05f03884e815891)
    -   [chore] format code ([#541](https://github.com/electrode-io/electrode/pull/541)) [commit](http://github.com/electrode-io/electrode/commit/8334262d3e3f5f47a323bde8046068f6e23d6af7)
    -   [patch][chore] Update Readme component archetype ([#528](https://github.com/electrode-io/electrode/pull/528)) [commit](http://github.com/electrode-io/electrode/commit/f81feec3194b13de85f901bc1421ab75ab8d61e1)

-   `packages/electrode-webpack-reporter`

    -   [patch] make sure chunks is valid ([#544](https://github.com/electrode-io/electrode/pull/544)) [commit](http://github.com/electrode-io/electrode/commit/4a11c7c08cb6290c95eab4b3d5bc19cc1020dc2e)

-   `packages/generator-electrode`

    -   [patch] update component bundled demos ([#543](https://github.com/electrode-io/electrode/pull/543)) [commit](http://github.com/electrode-io/electrode/commit/bb2af69fa02e83b59d46c26fe8410a3b2b53f435)

-   `MISC`

    -   [chore] consolidate changelog [commit](http://github.com/electrode-io/electrode/commit/82763d93ebd00fff8baad5977cb23a03b6810568)

# 8/10/2017

## Packages

-   electrode-archetype-react-app@3.2.0 `(3.1.8 => 3.2.0)`
-   electrode-archetype-react-app-dev@3.2.0 `(3.1.8 => 3.2.0)`
-   electrode-archetype-react-component@3.2.0 `(3.1.0 => 3.2.0)`
-   electrode-archetype-react-component-dev@3.2.0 `(3.1.0 => 3.2.0)`
-   generator-electrode@3.3.2 `(3.3.0 => 3.3.2)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] update dep and use node:false webpack option ([#534](https://github.com/electrode-io/electrode/pull/534)) [commit](http://github.com/electrode-io/electrode/commit/7ed8eb7321d4e5bcff8669575fff72b817872a74)
    -   [patch] update wds and fix webpack resolver ([#532](https://github.com/electrode-io/electrode/pull/532)) [commit](http://github.com/electrode-io/electrode/commit/c5017598d38553f873b783b3c305b7b6a206d3c7)
    -   [minor] update to webpack 3.0 ([#530](https://github.com/electrode-io/electrode/pull/530)) [commit](http://github.com/electrode-io/electrode/commit/61275b846674f49d68834f5501f291c4232332d0)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] update wds and fix webpack resolver ([#532](https://github.com/electrode-io/electrode/pull/532)) [commit](http://github.com/electrode-io/electrode/commit/c5017598d38553f873b783b3c305b7b6a206d3c7)
    -   [minor] update to webpack 3.0 ([#531](https://github.com/electrode-io/electrode/pull/531)) [commit](http://github.com/electrode-io/electrode/commit/2b997e865b905e77ddada4c6b6a62cf9b0ccabef)

-   `packages/generator-electrode`

    -   [patch][bug] update component readme generated by electrode-generator ([#535](https://github.com/electrode-io/electrode/pull/535)) [commit](http://github.com/electrode-io/electrode/commit/bcfed0fe7c05a14d5dbc1af07ac039295f1e8e2d)
    -   Fixes for eslint max-len and Handler function errors ([#527](https://github.com/electrode-io/electrode/pull/527)) [commit](http://github.com/electrode-io/electrode/commit/ccc5a25c43b36c6970e57182ffabd8b4fdb5f576)
    -   [patch] move component bootstrap instructions to top README ([#536](https://github.com/electrode-io/electrode/pull/536)) [commit](http://github.com/electrode-io/electrode/commit/f74ea44c3a7d5596950f4953c807c8106d0ace14)
    -   [patch] fix component README [commit](http://github.com/electrode-io/electrode/commit/7cf6c21f52806f1eea084e794a697783b098d9af)

-   `docs`

    -   [chore] update getting started link in docs readme [commit](http://github.com/electrode-io/electrode/commit/8e4b6f580bafefa7271c072b3a80b5bdc87fd11e)

-   `MISC`

    -   [chore] update getting started link [commit](http://github.com/electrode-io/electrode/commit/529d7eb79e9017b03ad4f9f031723cd6d05413aa)

# 8/5/2017

## Packages

-   electrode-archetype-react-app@3.1.8 `(3.1.7 => 3.1.8)`
-   electrode-archetype-react-app-dev@3.1.8 `(3.1.7 => 3.1.8)`
-   electrode-archetype-react-component@3.1.0 `(3.0.4 => 3.1.0)`
-   electrode-archetype-react-component-dev@3.1.0 `(3.0.4 => 3.1.0)`
-   electrode-cookies@1.0.0 `(0.1.0 => 1.0.0)`
-   electrode-react-context@1.0.0 `(0.1.0 => 1.0.0)`
-   electrode-react-webapp@1.8.1 `(1.8.0 => 1.8.1)`
-   electrode-ui-config@1.0.1 `(1.0.0 => 1.0.1)`
-   electrode-ui-logger@1.0.0 `(0.1.0 => 1.0.0)`
-   generator-electrode@3.3.0 `(3.2.0 => 3.3.0)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] apply default web config ([#523](https://github.com/electrode-io/electrode/pull/523)) [commit](http://github.com/electrode-io/electrode/commit/a1adefa2c51e810fd3895f2ef5c97180c8b8f89d)
    -   [patch] update sw-precache plugin ([#505](https://github.com/electrode-io/electrode/pull/505)) [commit](http://github.com/electrode-io/electrode/commit/02da615ee17c7769163e61a5e18a2590e3fd595f)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [minor] Add chrome headless to component archetype ([#516](https://github.com/electrode-io/electrode/pull/516)) [commit](http://github.com/electrode-io/electrode/commit/7de0490c2cddf9b1ecb1641b3c8d1fe2e6f763f4)

-   `packages/electrode-cookies`

    -   Open-sourcing electrode-cookies [commit](http://github.com/electrode-io/electrode/commit/d91855200d68e70d4e72de868e9c872c7fcc179b)
    -   [major] prep version [commit](http://github.com/electrode-io/electrode/commit/10868b30db3b4615bfaddf29863f723423294612)

-   `packages/electrode-react-context`

    -   Add "use strict" to address travis CI failure [commit](http://github.com/electrode-io/electrode/commit/6b9b6bee34f63d2b22ea415e17b01c6122ec13d9)
    -   Open sourcing electrode-react-context [commit](http://github.com/electrode-io/electrode/commit/aff6a8f06e405135710b3bf64899798e8e839dc2)
    -   [major] prep version [commit](http://github.com/electrode-io/electrode/commit/10868b30db3b4615bfaddf29863f723423294612)

-   `packages/electrode-react-webapp`

    -   [patch][bug] should always return promise object. ([#519](https://github.com/electrode-io/electrode/pull/519)) [commit](http://github.com/electrode-io/electrode/commit/a747804dcc6c9bebc85a89ff3b28b5396286d422)
    -   [chore] use random port for tests ([#514](https://github.com/electrode-io/electrode/pull/514)) [commit](http://github.com/electrode-io/electrode/commit/4f4b67602d0a222ca01ca163bd6315b420602b3d)
    -   Move {{PREFETCH_BUDNLES}} marker after {{SSR_CONTENT}} ([#480](https://github.com/electrode-io/electrode/pull/480)) [commit](http://github.com/electrode-io/electrode/commit/daa37796c5b247c75418d9cba64b40476a75ee29)

-   `packages/electrode-ui-config`

    -   [chore] prep electrode-ui-config@1 to publish [commit](http://github.com/electrode-io/electrode/commit/aabd71265a96b42aa73ee068ac419e71b62f9f09)
    -   Open-sourcing electrode-ui-config ([#500](https://github.com/electrode-io/electrode/pull/500)) [commit](http://github.com/electrode-io/electrode/commit/8e994ec9f1eb081bad3f6050de57be7c741996f5)

-   `packages/electrode-ui-logger`

    -   Add maintainer info to package.json [commit](http://github.com/electrode-io/electrode/commit/62363934f8f0109942a0b1eea9cfcff8fa8e5e3e)
    -   Open sourcing electrode-ui-logger [commit](http://github.com/electrode-io/electrode/commit/3be5e8a022d60dc5ca778ba91394532cdbbf8059)
    -   Starting on open-sourcing electrode-ui-logger [commit](http://github.com/electrode-io/electrode/commit/47df22529685dd46cac01c7171a87e402df7a8d8)
    -   [major] prep version [commit](http://github.com/electrode-io/electrode/commit/10868b30db3b4615bfaddf29863f723423294612)

-   `packages/generator-electrode`

    -   add build script ([#522](https://github.com/electrode-io/electrode/pull/522)) [commit](http://github.com/electrode-io/electrode/commit/2b4da435f1846669bd74f9e9f0d9e5f99c84c955)
    -   [minor][feat] update component generator UI & using random name for component-add ([#507](https://github.com/electrode-io/electrode/pull/507)) [commit](http://github.com/electrode-io/electrode/commit/be952385a6cce55835fa5c22e6f2acde2b3aabe6)
    -   [patch] show generator version and location ([#509](https://github.com/electrode-io/electrode/pull/509)) [commit](http://github.com/electrode-io/electrode/commit/18ec00214b06d8be9023f3439dbb27ac7118f02a)

-   `docs`

    -   [patch] Add a doc on customizing app ([#518](https://github.com/electrode-io/electrode/pull/518)) [commit](http://github.com/electrode-io/electrode/commit/ceda239939ff11fce4bb52920be9cf1a69155d20)
    -   Update headless chrome set up doc ([#517](https://github.com/electrode-io/electrode/pull/517)) [commit](http://github.com/electrode-io/electrode/commit/febd37f22a5255b1e2e61602aa4928a4a50e1377)
    -   update component add gerator docs ([#512](https://github.com/electrode-io/electrode/pull/512)) [commit](http://github.com/electrode-io/electrode/commit/f4955ecdcaaf9ecfcd089e06615e53169f3661dd)
    -   [docs] update requirements ([#513](https://github.com/electrode-io/electrode/pull/513)) [commit](http://github.com/electrode-io/electrode/commit/29fd8c02ac74db2cc248ae68a8a0a839bfec4336)
    -   [docs] move what's archetype to overview ([#511](https://github.com/electrode-io/electrode/pull/511)) [commit](http://github.com/electrode-io/electrode/commit/7a60f489f80131a73f76eb82dd377a01cf650097)
    -   [docs] update requirements [commit](http://github.com/electrode-io/electrode/commit/5f6907c5f1e88436e7fea033761a799262fc6868)

-   `MISC`

    -   [chore] add issue template [commit](http://github.com/electrode-io/electrode/commit/f2ac6ef8ee6422c6fb06d7034d62dcb49a795c8c)

# 7/25/2017

## Packages

### Directly Updated

-   electrode-archetype-react-app@3.1.7 `(3.1.6 => 3.1.7)`
-   electrode-archetype-react-app-dev@3.1.7 `(3.1.6 => 3.1.7)`
-   electrode-archetype-react-component@3.0.4 `(3.0.3 => 3.0.4)`
-   electrode-archetype-react-component-dev@3.0.4 `(3.0.3 => 3.0.4)`
-   electrode-react-webapp@1.8.0 `(1.7.2 => 1.8.0)`
-   electrode-redux-router-engine@1.4.6 `(1.4.5 => 1.4.6)`

### Lerna Updated

-   electrode-webpack-reporter@0.3.11 `(0.3.10 => 0.3.11)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   lock to wds@2.5.1 ([#496](https://github.com/electrode-io/electrode/pull/496)) [commit](http://github.com/electrode-io/electrode/commit/abcc399d5f3a83fde9950810289b8ae6ec3f9149)
    -   Fix the inclusion of test/ directory as part of code coverage reporting ([#487](https://github.com/electrode-io/electrode/pull/487)) [commit](http://github.com/electrode-io/electrode/commit/18c101ac730dafb7005ffdc5a4dc3578c27c0a15)

-   `packages/electrode-archetype-react-component[-dev]`

    -   lock to wds@2.5.1 ([#497](https://github.com/electrode-io/electrode/pull/497)) [commit](http://github.com/electrode-io/electrode/commit/a1728b2bbe14fe06ef2186ceba6b04fed4e63970)
    -   fix deprecate warnings ([#472](https://github.com/electrode-io/electrode/pull/472)) [commit](http://github.com/electrode-io/electrode/commit/bbdad5ee55df62079c5a20ab50fc023179a8cb04)

-   `packages/electrode-react-webapp`

    -   [minor][feat] Allow inline scripts to be marked with a nonce for CSP protection ([#486](https://github.com/electrode-io/electrode/pull/486)) [commit](http://github.com/electrode-io/electrode/commit/08f3f6ff6ad1e95f23407f708a4ea1829c3a9356)

-   `packages/electrode-redux-router-engine`

    -   [patch][bug] state should be preloaded after renderToString. ([#481](https://github.com/electrode-io/electrode/pull/481)) [commit](http://github.com/electrode-io/electrode/commit/2a7e39704edd175b274766f12dc8d1c0814aa0bc)

-   `samples/demo-component`

    -   fix deprecate warnings ([#472](https://github.com/electrode-io/electrode/pull/472)) [commit](http://github.com/electrode-io/electrode/commit/bbdad5ee55df62079c5a20ab50fc023179a8cb04)

-   `.vscode`

    -   removed vscode plugin settings ([#476](https://github.com/electrode-io/electrode/pull/476)) [commit](http://github.com/electrode-io/electrode/commit/b5b2a84e23bb9790cd8d726179f5bd3d94fcce5f)

-   `docs`

    -   [docs] Fix broken Add Routes link ([#488](https://github.com/electrode-io/electrode/pull/488)) [commit](http://github.com/electrode-io/electrode/commit/24ea88f9911d0cc369a2d526b793361d614dc04b)
    -   Spell mistake - Sacling -> Scaling ([#482](https://github.com/electrode-io/electrode/pull/482)) [commit](http://github.com/electrode-io/electrode/commit/ee21eb4dc8e1d079e84eab82daa7c087f251c92c)
    -   [patch] Update official gitbook docs ([#477](https://github.com/electrode-io/electrode/pull/477)) [commit](http://github.com/electrode-io/electrode/commit/465b02cc9f74ffe9bd662dbc99fdc80329f67d21)

# 7/10/2017

## Packages

-   electrode-archetype-react-app@3.1.6 `(3.1.5 => 3.1.6)`
-   electrode-archetype-react-app-dev@3.1.6 `(3.1.5 => 3.1.6)`
-   electrode-react-webapp@1.7.2 `(1.7.1 => 1.7.2)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] add config for woff font inline limit ([#470](https://github.com/electrode-io/electrode/pull/470)) [commit](http://github.com/electrode-io/electrode/commit/a00c22c3da8915e716d195f27ef9420a70da2acc)
    -   [patch] make stylus work in hot mode again ([#469](https://github.com/electrode-io/electrode/pull/469)) [commit](http://github.com/electrode-io/electrode/commit/2cf792a454450928240d1700fa44f57f20f272c9)

-   `packages/electrode-react-webapp`

    -   [chore] add .nyc_output to .npmignore ([#468](https://github.com/electrode-io/electrode/pull/468)) [commit](http://github.com/electrode-io/electrode/commit/79dd9a915b90c247ba7556d62ade8cbcdcb0a72e)

-   `samples/stylus-sample`

    -   change styles to stylus [commit](http://github.com/electrode-io/electrode/commit/a14d68c231119e3f3cd6493eb295eb6567019792)
    -   initial commit for new stylus-sample [commit](http://github.com/electrode-io/electrode/commit/d6a9d7b0534f083c02fb61c3364c09a3c24189a8)

# 7/8/2017

## Packages

-   electrode-archetype-react-app@3.1.5 `(3.1.4 => 3.1.5)`
-   electrode-archetype-react-app-dev@3.1.5 `(3.1.4 => 3.1.5)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] fix typo for karma browsers ([#466](https://github.com/electrode-io/electrode/pull/466)) [commit](http://github.com/electrode-io/electrode/commit/564e4c39446764d0c7ea74ae4503964447726c6e)

# 7/7/2017

## Packages

-   electrode-archetype-react-app@3.1.4 `(3.1.3 => 3.1.4)`
-   electrode-archetype-react-app-dev@3.1.4 `(3.1.3 => 3.1.4)`
-   electrode-react-webapp@1.7.1 `(1.7.0 => 1.7.1)`
-   generator-electrode@3.2.0 `(3.1.2 => 3.2.0)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] back to isparta-loader due to issue with new loader ([#464](https://github.com/electrode-io/electrode/pull/464)) [commit](http://github.com/electrode-io/electrode/commit/972907fa50c0e4b61ababbef786145436afa04f5)

-   `packages/electrode-react-webapp`

    -   [patch] fix resolving user's htmlFile view. ([#454](https://github.com/electrode-io/electrode/pull/454)) [commit](http://github.com/electrode-io/electrode/commit/36b6305935498728225468d8da746e905bf36f0f)
    -   [patch] fix and document SSR content resolving ([#450](https://github.com/electrode-io/electrode/pull/450)) [commit](http://github.com/electrode-io/electrode/commit/6e0526caef2a300b4164089dbf4fedc38b8dccbd)

-   `packages/generator-electrode`

    -   add components.md to component generator ([#463](https://github.com/electrode-io/electrode/pull/463)) [commit](http://github.com/electrode-io/electrode/commit/0ad4944eb540bbf6a270348ff34e72af906a0e86)
    -   Update  in a clearer way ([#462](https://github.com/electrode-io/electrode/pull/462)) [commit](http://github.com/electrode-io/electrode/commit/c1d0b786935d7ad63fb527f0cebd37568a4d4886)
    -   [minor][chore] Update component generator ([#460](https://github.com/electrode-io/electrode/pull/460)) [commit](http://github.com/electrode-io/electrode/commit/31862649f920cfcbac315d8e3cc58879b6da0094)
    -   [patch] no xclap in dev dep ([#459](https://github.com/electrode-io/electrode/pull/459)) [commit](http://github.com/electrode-io/electrode/commit/21bffaa5e664f8f090db5cce144429bd18026ab0)
    -   [patch] fix dangling comment in generated app ([#458](https://github.com/electrode-io/electrode/pull/458)) [commit](http://github.com/electrode-io/electrode/commit/c42e8c28dcac1bb7f58269d2f6609a9df50ae498)

-   `samples/universal-react-node`

    -   [patch] test issue with isparta-loader and its replacement ([#465](https://github.com/electrode-io/electrode/pull/465)) [commit](http://github.com/electrode-io/electrode/commit/119079f0d3535fea9861fd184b54310535e1cdb8)

-   `docs`

    -   Update docs for latest electrode component ([#461](https://github.com/electrode-io/electrode/pull/461)) [commit](http://github.com/electrode-io/electrode/commit/ad0fe79d5aa1451c9eb7dc4c4436b31a9ee13009)
    -   [chore] add more features to docs [commit](http://github.com/electrode-io/electrode/commit/96fc5f26835a52373fe4deb37548d41da654ac3c)
    -   [chore] update what is Electrode doc ([#457](https://github.com/electrode-io/electrode/pull/457)) [commit](http://github.com/electrode-io/electrode/commit/79a02213cd5556bdf8e0e01d607f16f6e453b4ae)
    -   [chore] update docs getting started [commit](http://github.com/electrode-io/electrode/commit/dcef48abb2a0477ebbd5d1aed957d0f77981a96c)
    -   gitbook: [patch][bug] Update docs ([#449](https://github.com/electrode-io/electrode/pull/449)) [commit](http://github.com/electrode-io/electrode/commit/188c57ef2dc7b3a35aa44a81e86260804cef2dff)

-   `tools`

    -   fix update-changelog script [commit](http://github.com/electrode-io/electrode/commit/061391e355d5266b9e85cc480c6c3ddcfdd91101)

-   `MISC`

    -   It's 2017 ([#451](https://github.com/electrode-io/electrode/pull/451)) [commit](http://github.com/electrode-io/electrode/commit/417e097dda838222815883989802d8faf5241508)

# 6/30/2017

## Packages

-   electrode-react-webapp@1.7.0 `(1.6.3 => 1.7.0)`
-   generator-electrode@3.1.2 `(3.1.1 => 3.1.2)`

## Commits

-   `packages/electrode-react-webapp`

    -   [patch] Move react-helmet scripts to head to avoid double load ([#423](https://github.com/electrode-io/electrode/pull/423)) [commit](http://github.com/electrode-io/electrode/commit/0a3bb8068cedae9de162ae0863a30722a966d4c5)
    -   [minor] add unbundledJS option ([#448](https://github.com/electrode-io/electrode/pull/448)) [commit](http://github.com/electrode-io/electrode/commit/f6286342e96b4383d0104dbca3448d3396cee0dd)

-   `packages/generator-electrode`

    -   do not write default.js when extended ([#447](https://github.com/electrode-io/electrode/pull/447)) [commit](http://github.com/electrode-io/electrode/commit/a2e995745825a29a3280d5e26ee597a7845aa4e2)

-   `docs`

    -   [chore]&#x3A; update docs quick guide [commit](http://github.com/electrode-io/electrode/commit/5db747ff12bc0f2b3c2dea1eb9475634799608fc)

# 6/29/2017

## Packages

### Directly Updated

-   electrode-redux-router-engine@1.4.5 `(1.4.4 => 1.4.5)`
-   generator-electrode@3.1.1 `(3.1.0 => 3.1.1)`

### Lerna Updated

-   electrode-archetype-react-app@3.1.3 `(3.1.2 => 3.1.3)`
-   electrode-archetype-react-app-dev@3.1.3 `(3.1.2 => 3.1.3)`
-   electrode-webpack-reporter@0.3.10 `(0.3.9 => 0.3.10)`

## Commits

-   `packages/electrode-redux-router-engine`

    -   [patch][bug] Escape **PRELOADED_STATE**. Fix for #441 ([#442](https://github.com/electrode-io/electrode/pull/442)) [commit](http://github.com/electrode-io/electrode/commit/161fb83b605f140d27a537b0e8e3e7564d0fac11)

-   `packages/generator-electrode`

    -   no git init for demo-app ([#445](https://github.com/electrode-io/electrode/pull/445)) [commit](http://github.com/electrode-io/electrode/commit/945b25b8b583c6340e34c2685a829ed10d246492)

-   `docs`

    -   gitbook: [patch] Update docs form training feedback ([#443](https://github.com/electrode-io/electrode/pull/443)) [commit](http://github.com/electrode-io/electrode/commit/cef5d8d8bb197765e497add66feac65d73a93c5c)
    -   update readme [commit](http://github.com/electrode-io/electrode/commit/1932de00a20c3fac630cc043d0bf30c47c7b4794)

# 6/26/2017

## Packages

-   electrode-archetype-react-app@3.1.2 `(3.1.1 => 3.1.2)`
-   electrode-archetype-react-app-dev@3.1.2 `(3.1.1 => 3.1.2)`
-   generator-electrode@3.1.0 `(3.0.4 => 3.1.0)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] fix eslint rules for server tests ([#439](https://github.com/electrode-io/electrode/pull/439)) [commit](http://github.com/electrode-io/electrode/commit/e28b12bdb3f021d2c1569e0ca4ff1e3d097cdf3d)
    -   [chore] enclose node env in ' [commit](http://github.com/electrode-io/electrode/commit/5c48e4d063f67d1cc0d8cfb8014a018a3bb9b9ab)

-   `packages/generator-electrode`

    -   [minor] improve demos included in the generated app ([#438](https://github.com/electrode-io/electrode/pull/438)) [commit](http://github.com/electrode-io/electrode/commit/8292cb39157a7473323698e55b01a659d68d2189)

# 6/24/2017

## Packages

-   electrode-archetype-react-app@3.1.1 `(3.0.5 => 3.1.1)`
-   electrode-archetype-react-app-dev@3.1.1 `(3.0.5 => 3.1.1)`
-   electrode-archetype-react-component@3.0.3 `(3.0.2 => 3.0.3)`
-   electrode-archetype-react-component-dev@3.0.3 `(3.0.2 => 3.0.3)`
-   generator-electrode@3.0.4 `(3.0.3 => 3.0.4)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] only optimize CSS for production build ([#436](https://github.com/electrode-io/electrode/pull/436)) [commit](http://github.com/electrode-io/electrode/commit/7ab6f54defae2995becef5b9e5a1d154774a7ab8)
    -   [minor] update mocha ([#434](https://github.com/electrode-io/electrode/pull/434)) [commit](http://github.com/electrode-io/electrode/commit/286d79aa4642ac57fe8c1346cc48069e42dfba6d)
    -   [patch] update dep extract-text-plugin ([#433](https://github.com/electrode-io/electrode/pull/433)) [commit](http://github.com/electrode-io/electrode/commit/03c8eda0c78fc87fbba545562adc52ba22ae03ae)
    -   [patch] fix startAppServer [commit](http://github.com/electrode-io/electrode/commit/cca48935944e809312a3e9572a33ea73dc555970)
    -   [patch] update dep, xclap, sw-precache ([#431](https://github.com/electrode-io/electrode/pull/431)) [commit](http://github.com/electrode-io/electrode/commit/31a350a5effb8fe9a70f147fa83d476a53df434e)
    -   [patch] update the deprecated isparta-loader ([#428](https://github.com/electrode-io/electrode/pull/428)) [commit](http://github.com/electrode-io/electrode/commit/013c14b521b720d4211bc2999e3935624a2ec0d5)
    -   [patch] add xclai-cli to archetype app ([#426](https://github.com/electrode-io/electrode/pull/426)) [commit](http://github.com/electrode-io/electrode/commit/01416b5f5eff2060a99a5d55e9c00e27bcc55484)
    -   Fix eslint errors [commit](http://github.com/electrode-io/electrode/commit/4f132586b81dab1ed1e7a40f259f77db5a09dfaf)
    -   Debug server side components with Chrome Developer Tools (DevTools) [commit](http://github.com/electrode-io/electrode/commit/eb8124b0baf8b0af8d86f743e70a365db5f7423f)
    -   code refactor [commit](http://github.com/electrode-io/electrode/commit/533b94138e3465ad7f8b2ef5509703ff8a5f824d)
    -   fix typo [commit](http://github.com/electrode-io/electrode/commit/c2086c13bf7e6e628dfae08a8bc29cd0164a463a)
    -   added missing variable [commit](http://github.com/electrode-io/electrode/commit/b1b0a0fca7c098d7a4f02e274ef183b36be99edd)
    -   remove extractTextPlugin in hot mode [commit](http://github.com/electrode-io/electrode/commit/19c6e08da5b371a39c6bed3c97407a4c6be5541f)
    -   [minor] update istanbul ([#435](https://github.com/electrode-io/electrode/pull/435)) [commit](http://github.com/electrode-io/electrode/commit/415ea039cb2f6f309a032b3c838eb384a99919de)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] improve resolving xclap ([#432](https://github.com/electrode-io/electrode/pull/432)) [commit](http://github.com/electrode-io/electrode/commit/1d4051cfd1cae8e29f21ff6795626be96923c3ae)

-   `packages/generator-electrode`

    -   [patch][bug] fix license prompt for app generator, use path. ([#429](https://github.com/electrode-io/electrode/pull/429)) [commit](http://github.com/electrode-io/electrode/commit/0461a59dfd12c6bd2ed9f3a022744908320d1f1e)
    -   [patch] change autoSSR message ([#425](https://github.com/electrode-io/electrode/pull/425)) [commit](http://github.com/electrode-io/electrode/commit/7212b70180e39421d2a5774e4ef3ff8dd9edab77)
    -   rename clap.js to xclap.js ([#427](https://github.com/electrode-io/electrode/pull/427)) [commit](http://github.com/electrode-io/electrode/commit/4030b1cc626575c4d2f8736f36804c0c82352478)
    -   Debug server side components with Chrome Developer Tools (DevTools) [commit](http://github.com/electrode-io/electrode/commit/eb8124b0baf8b0af8d86f743e70a365db5f7423f)

-   `samples/universal-react-node`

    -   [chore] remove xlap-cli from sample [commit](http://github.com/electrode-io/electrode/commit/1efdcf86a9934cea9137eff09d60255b967693cf)
    -   [chore] default samples to pull from local package ([#430](https://github.com/electrode-io/electrode/pull/430)) [commit](http://github.com/electrode-io/electrode/commit/acf58194afbedc7819ebe32371b9ce03311d8820)

-   `docs`

    -   update readme [commit](http://github.com/electrode-io/electrode/commit/f195c72c174fd13d8fd9800c03d79ba73356bb95)

-   `MISC`

    -   update contributing guide [commit](http://github.com/electrode-io/electrode/commit/84e5eb682f3b2b9b0c73d34f284fc0562dc8a0db)
    -   update lerna [commit](http://github.com/electrode-io/electrode/commit/c4e70ae0dc8fae527edabc2ea3a8a6b03310ba54)

# 6/22/2017

## Packages

-   electrode-archetype-react-app@3.0.5 `(3.0.3 => 3.0.5)`
-   electrode-archetype-react-app-dev@3.0.5 `(3.0.3 => 3.0.5)`
-   electrode-archetype-react-component@3.0.2 `(3.0.1 => 3.0.2)`
-   electrode-archetype-react-component-dev@3.0.2 `(3.0.1 => 3.0.2)`
-   electrode-auto-ssr@1.0.3 `(1.0.2 => 1.0.3)`
-   electrode-react-webapp@1.6.3 `(1.6.2 => 1.6.3)`
-   electrode-redux-router-engine@1.4.4 `(1.4.3 => 1.4.4)`
-   electrode-webpack-reporter@0.3.9 `(0.3.8 => 0.3.9)`
-   generator-electrode@3.0.3 `(3.0.2 => 3.0.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] fix devHostname [commit](http://github.com/electrode-io/electrode/commit/bcc2de27ea9382dd2b7256c13732029ae6f08bc2)
    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)
    -   [patch][chore] clean up env get ([#419](https://github.com/electrode-io/electrode/pull/419)) [commit](http://github.com/electrode-io/electrode/commit/3a91a830516d88e455bb90a97babe04a3464d5b1)
    -   [chore] add test mocha opts and nyc coverage config [commit](http://github.com/electrode-io/electrode/commit/6aa8bfcacb9f4d89309e321b2f0033ad63deaf7d)

-   `packages/electrode-archetype-react-component[-dev]`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `packages/electrode-auto-ssr`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)
    -   [chore] add test mocha opts and nyc coverage config [commit](http://github.com/electrode-io/electrode/commit/6aa8bfcacb9f4d89309e321b2f0033ad63deaf7d)

-   `packages/electrode-react-webapp`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)
    -   [chore] add test mocha opts and nyc coverage config [commit](http://github.com/electrode-io/electrode/commit/6aa8bfcacb9f4d89309e321b2f0033ad63deaf7d)

-   `packages/electrode-redux-router-engine`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)
    -   [chore] add test mocha opts and nyc coverage config [commit](http://github.com/electrode-io/electrode/commit/6aa8bfcacb9f4d89309e321b2f0033ad63deaf7d)

-   `packages/electrode-webpack-reporter`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `packages/generator-electrode`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)
    -   [patch] check component generators is invoked inside app. ([#422](https://github.com/electrode-io/electrode/pull/422)) [commit](http://github.com/electrode-io/electrode/commit/7fe029720c8fa261ca91da6e1975670300431680)
    -   [chore] add test mocha opts and nyc coverage config [commit](http://github.com/electrode-io/electrode/commit/6aa8bfcacb9f4d89309e321b2f0033ad63deaf7d)

-   `samples/demo-component`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `samples/electrode-demo-index`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `samples/universal-material-ui`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `samples/universal-react-node`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `docs`

    -   [patch] rename clap.js to xclap.js ([#424](https://github.com/electrode-io/electrode/pull/424)) [commit](http://github.com/electrode-io/electrode/commit/2da5a892a7b828f2120b3b23d354fd807c7de2ea)

-   `MISC`

    -   [chore] consolidate 6/21 changelog [commit](http://github.com/electrode-io/electrode/commit/16ec599201c66911273ad2305a6de666fc01b5d9)

# 6/21/2017

Update and fix dependencies after major releases.

## Packages

### Directly Updated

-   electrode-archetype-react-app-dev@3.0.2 `(3.0.1 => 3.0.2)`
-   electrode-archetype-react-app@3.0.2 `(3.0.1 => 3.0.2)`
-   electrode-webpack-reporter@0.3.8 `(0.3.7 => 0.3.8)`
-   generator-electrode@3.0.2 `(3.0.1 => 3.0.2)`

### Lerna Updated

-   electrode-archetype-react-app@3.0.3 `(3.0.2 => 3.0.3)`
-   electrode-archetype-react-app-dev@3.0.3 `(3.0.2 => 3.0.3)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   [patch] update peer dep ([#415](https://github.com/electrode-io/electrode/pull/415)) [commit](http://github.com/electrode-io/electrode/commit/3799989a37482c6b094c17f3e2f1e17e283a2b72)

-   `packages/electrode-webpack-reporter`

    -   [patch] fix webpack-reporter ([#417](https://github.com/electrode-io/electrode/pull/417)) [commit](http://github.com/electrode-io/electrode/commit/f57955582d1b4243f75ab8f7ec441013df71aa04)

-   `packages/generator-electrode`

    -   update template dep ([#416](https://github.com/electrode-io/electrode/pull/416)) [commit](http://github.com/electrode-io/electrode/commit/240903f2e084501cf829d7e0da13ef40e60e516d)

-   `tools`

    -   update tools script [commit](http://github.com/electrode-io/electrode/commit/5471ef382546c50c6c24d1ac7d33300ee78f78ba)
    -   fix tools update changelog [commit](http://github.com/electrode-io/electrode/commit/4011529aeb22078f8d84704bd39dad57d4d82a2f)

# 6/20/2017

## Packages

-   electrode-archetype-react-app@3.0.1 `(2.4.0 => 3.0.1)`
-   electrode-archetype-react-app-dev@3.0.1 `(2.4.0 => 3.0.1)`
-   electrode-archetype-react-component@3.0.1 `(2.1.0 => 3.0.1)`
-   electrode-archetype-react-component-dev@3.0.1 `(2.1.0 => 3.0.1)`
-   electrode-auto-ssr@1.0.2 `(1.0.0 => 1.0.2)`
-   electrode-react-webapp@1.6.2 `(1.6.0 => 1.6.2)`
-   electrode-redux-router-engine@1.4.3 `(1.4.1 => 1.4.3)`
-   electrode-webpack-reporter@0.3.7 `(0.3.6 => 0.3.7)`
-   generator-electrode@3.0.1 `(2.2.1 => 3.0.1)`

## Commits

-   `packages/electrode-archetype-react-app[-dev]`

    -   Breaking Changes

        -   webpack NodeSourcePlugin is now turned off by default in production build. See [blog](https://medium.com/@jchipnxd/92b130334b6c) for detail.
        -   Karma unit test are now default to use Chrome Headless
        -   babel-register is no longer part of the production dependencies
        -   archetype tasks are now executed with [xclap](https://www.npmjs.com/package/xclap)

    -   [patch][chore] fix linting and tests, and update deps ([#410](https://github.com/electrode-io/electrode/pull/410)) [commit](http://github.com/electrode-io/electrode/commit/ce1143fed3f21abdd671a18fbd951d6788ce8ba3)
    -   [major][feat] Chrome Headless Feature ([#407](https://github.com/electrode-io/electrode/pull/407)) [commit](http://github.com/electrode-io/electrode/commit/45011d0ff8de986d46e729044e4d06803d02baee)
    -   archetype-react-app: [major] default to Chrome Headless for karma ([#403](https://github.com/electrode-io/electrode/pull/403)) [commit](http://github.com/electrode-io/electrode/commit/9f4144504d370e05e6c7f52560ae96a6a0f78b52)
    -   archetype-react-app: [major] clappify ([#390](https://github.com/electrode-io/electrode/pull/390)) [commit](http://github.com/electrode-io/electrode/commit/61165641aeb95066aaa25809825090041c06281e)
    -   archetype-react-app: [major] turn off NodeSourcePlugin for prod build ([#384](https://github.com/electrode-io/electrode/pull/384)) [commit](http://github.com/electrode-io/electrode/commit/beb59738e23805986798db23c8de79392ae0bb56)
    -   archetype-react-app: [major] remove babel-register dep from prod ([#380](https://github.com/electrode-io/electrode/pull/380)) [commit](http://github.com/electrode-io/electrode/commit/920269202cbcaabc086156169e460807c8239d79)
    -   archetype-react-app: [minor][feat]Chrome Headless ([#358](https://github.com/electrode-io/electrode/pull/358)) [commit](http://github.com/electrode-io/electrode/commit/fe963916f7864f6fbbeebbff6535e080687ad226)

-   `packages/electrode-archetype-react-component[-dev]`

    -   Breaking Changes

        -   archetype tasks are now executed with [xclap](https://www.npmjs.com/package/xclap)

    -   [patch][chore] add .npmignore ([#411](https://github.com/electrode-io/electrode/pull/411)) [commit](http://github.com/electrode-io/electrode/commit/3e2dbd042d79fe01bd32069f71abd4d193828f19)
    -   archetype-react-component: [major] clappify ([#393](https://github.com/electrode-io/electrode/pull/393)) [commit](http://github.com/electrode-io/electrode/commit/a65511b7dafa67c44e6019d94f5b2868b3163019)

-   `packages/electrode-auto-ssr`

    -   [patch][chore] add npmignore ([#412](https://github.com/electrode-io/electrode/pull/412)) [commit](http://github.com/electrode-io/electrode/commit/2219b10cb8d402a2ceeb74d967e27cdce3c4422f)
    -   auto-ssr: [patch][chore] clappify ([#394](https://github.com/electrode-io/electrode/pull/394)) [commit](http://github.com/electrode-io/electrode/commit/cdf9b2040f5452837833b739bc150944baac15db)

-   `packages/electrode-react-webapp`

    -   [patch][chore] add npmignore ([#413](https://github.com/electrode-io/electrode/pull/413)) [commit](http://github.com/electrode-io/electrode/commit/e55789746db0232752b62e6f32a07ab28cfd3fe6)
    -   react-webapp: [patch][chore] clappify ([#395](https://github.com/electrode-io/electrode/pull/395)) [commit](http://github.com/electrode-io/electrode/commit/1b3ba9a5facedf32ce147127358f42f58b8fe44c)

-   `packages/electrode-redux-router-engine`

    -   [patch][chore] add npmignore ([#414](https://github.com/electrode-io/electrode/pull/414)) [commit](http://github.com/electrode-io/electrode/commit/cbf8929f8af95c3a6c71c5ec9ca6cb3412a3412c)
    -   redux-router-engine: [patch][chore] clappify ([#396](https://github.com/electrode-io/electrode/pull/396)) [commit](http://github.com/electrode-io/electrode/commit/9f67dd4d50ba0e63078f888523fa73b3babe135c)

-   `packages/electrode-webpack-reporter`

    -   [patch][chore] add npmignore [commit](http://github.com/electrode-io/electrode/commit/1539c15ba43783d12aa76bc762d682c76cbb24a2)
    -   webpack-reporter: [patch][chore] clappify ([#397](https://github.com/electrode-io/electrode/pull/397)) [commit](http://github.com/electrode-io/electrode/commit/7578702571a50b03d2e04913ee87b434fa8fbde2)

-   `packages/generator-electrode`

    -   [patch][chore] add npmignore [commit](http://github.com/electrode-io/electrode/commit/ed9ceba4b989d2e7c477852d3c2a9e97c87b5906)
    -   [patch][chore] remove SSR caching from template ([#405](https://github.com/electrode-io/electrode/pull/405)) [commit](http://github.com/electrode-io/electrode/commit/087f345ce9bc5e9afc66a257f122434f17a801ae)
    -   [patch][bug] use demo-helper v2 ([#406](https://github.com/electrode-io/electrode/pull/406)) [commit](http://github.com/electrode-io/electrode/commit/551d847a3249d99e13d1d8a187e923ba3cef926f)
    -   archetype-react-app: [major] default to Chrome Headless for karma ([#403](https://github.com/electrode-io/electrode/pull/403)) [commit](http://github.com/electrode-io/electrode/commit/9f4144504d370e05e6c7f52560ae96a6a0f78b52)
    -   Update author name and re-format project name ([#402](https://github.com/electrode-io/electrode/pull/402)) [commit](http://github.com/electrode-io/electrode/commit/c43afe71f7eb5c674f6ba8204e49d2758dfc3e33)
    -   generator-electrode: [patch] add flags to generate app's clap.js ([#401](https://github.com/electrode-io/electrode/pull/401)) [commit](http://github.com/electrode-io/electrode/commit/95318db4d190eee323358b21dbe8e5cb52b71332)
    -   generator-electrode: [major] clappify ([#400](https://github.com/electrode-io/electrode/pull/400)) [commit](http://github.com/electrode-io/electrode/commit/4ca0e57952234e0083a1059c6236311f889e345a)
    -   generator-electrode: [patch] copy entire archetype again for component-add  ([#391](https://github.com/electrode-io/electrode/pull/391)) [commit](http://github.com/electrode-io/electrode/commit/e8383fc424979315baa3f4134a92e4165edced60)
    -   generator-electrode: [patch][bug]generator-default-developer-name ([#392](https://github.com/electrode-io/electrode/pull/392)) [commit](http://github.com/electrode-io/electrode/commit/1955c5e2a2a549f8436cd78d8dd9cca8013e2aa1)

-   `samples/demo-component`

    -   archetype-react-component: [major] clappify ([#393](https://github.com/electrode-io/electrode/pull/393)) [commit](http://github.com/electrode-io/electrode/commit/a65511b7dafa67c44e6019d94f5b2868b3163019)

-   `samples/electrode-demo-index`

    -   demo-index clappify ([#399](https://github.com/electrode-io/electrode/pull/399)) [commit](http://github.com/electrode-io/electrode/commit/206181ed26b803e0d0b1759bfc82a6e2db86bec9)

-   `samples/universal-material-ui`

    -   univeral-material-ui clappify ([#398](https://github.com/electrode-io/electrode/pull/398)) [commit](http://github.com/electrode-io/electrode/commit/c6d5995400baa0d90e67b38c35c9fc47d078d1ca)

-   `samples/universal-react-node`

    -   archetype-react-app: [major] clappify ([#390](https://github.com/electrode-io/electrode/pull/390)) [commit](http://github.com/electrode-io/electrode/commit/61165641aeb95066aaa25809825090041c06281e)
    -   archetype-react-app: [major] turn off NodeSourcePlugin for prod build ([#384](https://github.com/electrode-io/electrode/pull/384)) [commit](http://github.com/electrode-io/electrode/commit/beb59738e23805986798db23c8de79392ae0bb56)
    -   archetype-react-app: [minor][feat]Chrome Headless ([#358](https://github.com/electrode-io/electrode/pull/358)) [commit](http://github.com/electrode-io/electrode/commit/fe963916f7864f6fbbeebbff6535e080687ad226)

-   `docs`

    -   [docs] update what's archetype [commit](http://github.com/electrode-io/electrode/commit/ee89c6ada9ee28eab4b41c8555c92dc5ddcad3bb)
    -   docs: clappify ([#388](https://github.com/electrode-io/electrode/pull/388)) [commit](http://github.com/electrode-io/electrode/commit/17dffa654b945705f8efe95692a3e324fccb895f)
    -   Updating electrode component docs ([#385](https://github.com/electrode-io/electrode/pull/385)) [commit](http://github.com/electrode-io/electrode/commit/db08c0837238b82883b156538e46b076d945e5bb)

-   `tools`

    -   script to auto update changelog ([#408](https://github.com/electrode-io/electrode/pull/408)) [commit](http://github.com/electrode-io/electrode/commit/2da9ae7719c2310a36ad8bbeaea977cea778e460)
    -   add # to PR number [commit](http://github.com/electrode-io/electrode/commit/8019ceb0dd3023cf19581448ae1a9ad15b6bdd48)

-   `MISC`

    -   update CONTRIBUTING guide [commit](http://github.com/electrode-io/electrode/commit/d75078868cc3915d74539cde8335e7929581030e)
    -   clappify lerna repo top files ([#389](https://github.com/electrode-io/electrode/pull/389)) [commit](http://github.com/electrode-io/electrode/commit/ec4374571c39cf9373cb9e73f6a966ee2ed0da76)

# 6/19/2017

## Packages

-   electrode-archetype-react-app-dev@2.4.0 `(2.3.3 => 2.4.0)`
-   electrode-archetype-react-app2.4.0 `(2.3.3 => 2.4.0)`
-   electrode-archetype-react-component-dev@2.1.0 `(2.0.3 => 2.1.0)`
-   electrode-archetype-react-component@2.1.0 `(2.0.3 => 2.1.0)`
-   generator-electrode@2.2.0 `(2.1.0 => 2.2.0)`
-   webpack-config-composer@1.0.2 `(1.0.1 => 1.0.2)`

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/5b55a8dbdeed46752a3fa47a58e7df24fd53bf07) add config for mocha tests with es6
-   [commit](http://github.com/electrode-io/electrode/commit/b2cf439c20794e54acb37f772edda375b30e701b) format clap.js
-   [commit](http://github.com/electrode-io/electrode/commit/6b3d49054c738c1f12d681cfc78ae74fe1ee31c8) ignore lerna no updating error
-   [commit](http://github.com/electrode-io/electrode/commit/df369da6eff15744a56083d732d01f0699d4cdc5) update front facing README
-   [commit](http://github.com/electrode-io/electrode/commit/b848a3a0342e62d2fb217a31eeb3a7615bb5000d) archetype-react-component: [minor][chore]move configs to component dev (#356)
-   [commit](http://github.com/electrode-io/electrode/commit/87a6fb358da0199fd5f6f25c485621ec619fedc2) archetype-react-app-dev: [patch] add config for mocha tests with es6 (#373)
-   [commit](http://github.com/electrode-io/electrode/commit/f51c1f7aa2f80566b63d6437dbe415ac0e55ef0a) archetype-react-app: [minor][chore] Modify clap task based on flag (#371)
-   [commit](http://github.com/electrode-io/electrode/commit/829ff161b60c58591726066f13e20bb2a07c6408) archetype-react-app: [patch][chore] format code
-   [commit](http://github.com/electrode-io/electrode/commit/6a85b4b72052464e3676c5bbf6f128a6e72feefa) archetype-react-app: [patch] use babel to optimize modules for PROD
-   [commit](http://github.com/electrode-io/electrode/commit/a184fff313d41758efcbd7db8d5b095495435fc0) archetype-react-app: [patch][chore] prettier format all code (#378)
-   [commit](http://github.com/electrode-io/electrode/commit/f804916d39e9239e13be9c475b56f2b8362aaebc) archetype-react-app: [patch] remove log files (#381)
-   [commit](http://github.com/electrode-io/electrode/commit/62b19038de1d715c6c09cc314ff73cecdaf93fae) archetype-react-app: [patch] log loading custom webpack config (#382)
-   [commit](http://github.com/electrode-io/electrode/commit/ed62e36d5a86925a62209d1eff1b8f8ebbbec8bc) (multiple): [patch][chore] update engines to node 8 (#379)
-   [commit](http://github.com/electrode-io/electrode/commit/b6284abb52a8055be8406ee71b042d1815631473) generator-electrode: [patch][bug] Add default classNames to components (#376)
-   [commit](http://github.com/electrode-io/electrode/commit/d81593a99f1bf324fae6c83f597db74e7dbc462a) generator-electrode: [minor][chore] Set ES6 flag in clap.js. (#374)
-   [commit](http://github.com/electrode-io/electrode/commit/da5e945b8f39ff5a6f5c64ef28bf2cb09afc5df9) generator-electrode: [patch][bug] Write all files before installing (#383)

# 6/13/2017

## Packages

-   electrode-archetype-react-app-dev@2.3.3 `(2.3.2 => 2.3.3)`
-   electrode-archetype-react-app@2.3.3 `(2.3.2 => 2.3.3)`
-   electrode-archetype-react-component-dev@2.0.3 `(2.0.2 => 2.0.3)`
-   electrode-archetype-react-component@2.0.3 `(2.0.2 => 2.0.3)`
-   electrode-react-webapp@1.6.0 `(1.5.0 => 1.6.0)`
-   electrode-redux-router-engine@1.4.1 `(1.4.0 => 1.4.1)`
-   electrode-webpack-reporter@0.3.6 `(0.3.5 => 0.3.6)`
-   generator-electrode@2.1.0 `(2.0.1 => 2.1.0)`

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/778aae9675d65a5255e605adb45bd39827befb84) gitbook: Add gitbook documentations for electrode component generators (#328)
-   [commit](http://github.com/electrode-io/electrode/commit/7fbfb5a64904d1064a82e010d68ddc045086d657) update contributing guidelines and demo video (#332)
-   [commit](http://github.com/electrode-io/electrode/commit/d306c8624462b5d59a48500295ff33b1112c1c1a) update gitbook book.json
-   [commit](http://github.com/electrode-io/electrode/commit/6107cc811c2ed2753f8a8eac47350f2bb038b63a) Demo gif for component generator.
-   [commit](http://github.com/electrode-io/electrode/commit/176a9331a86c517ed2416b3de1c53dd9003091a1) docs: add app archetype docs (#339)
-   [commit](http://github.com/electrode-io/electrode/commit/bd464cae05040d21bca72f18f842b3348d5b3d83) update book.json
-   [commit](http://github.com/electrode-io/electrode/commit/1c1ffc7b1301c42eb2f570687b33d9bbe637ff51) docs: add new component archetype docs in gitbook (#341)
-   [commit](http://github.com/electrode-io/electrode/commit/aab4d0471a668609f213fb7702d3d94a1cffe214) add node 8 to CI
-   [commit](http://github.com/electrode-io/electrode/commit/312467d2d3ed3b2650b5bfce27e75d8ecb336ad0) docs: display iframe url in address bar (#346)
-   [commit](http://github.com/electrode-io/electrode/commit/eabfbc7f448016fc908e208720837c84de92753c) docs: [bug][patch] Issue338: Update Samples Link (#340)
-   [commit](http://github.com/electrode-io/electrode/commit/c2111967faf138e28a244483a0abe96a4402793d) archetype-react-app: [patch] FIX DeprecationWarning: loaderUtils.parseQuery() received a non-strin… (#347)
-   [commit](http://github.com/electrode-io/electrode/commit/77f518601db3d0f96e29227adbb90f6755abd9f9) generator-electrode: Fix typo (#348)
-   [commit](http://github.com/electrode-io/electrode/commit/a61e45832b67ac9c4bfad58895cb1ec9c32498be) archetype-react-app: Add Prettier and precommit hook packages (#349)
-   [commit](http://github.com/electrode-io/electrode/commit/b3c007a40258aabc32fc57cf99c53ddc8e2aa640) archetype-react-app: [patch] FIX clap lint as it skips src/server files (#353)
-   [commit](http://github.com/electrode-io/electrode/commit/2f16584b726b67407d97d5410ae7775ea1f98612) archetype-react-app: [patch] A Webpack plugin to optimize / minimize CSS assets. (#355)
-   [commit](http://github.com/electrode-io/electrode/commit/2155b4e4b01de078d7185c16dfbc1786533ff490) update docs links in README
-   [commit](http://github.com/electrode-io/electrode/commit/1066459dbcb1ac8159c06db01eefe84332e04359) archetype-react-app: [patch] fix webpack simple-progress output (#364)
-   [commit](http://github.com/electrode-io/electrode/commit/245d88aa68f17a304a096460f98df3224d51dac6) generator-electrode: [chore] increase test timeout
-   [commit](http://github.com/electrode-io/electrode/commit/0a8e13dd94192dce716a8c7445a63ed3c4cb5b59) react-web-app: [feat][minor] Allow an external base URL for resources on production runs (#359) (#360)
-   [commit](http://github.com/electrode-io/electrode/commit/0f6d3bd08c1ffa32fe9cd469fab00ce4c3262d02) archetype-react-component: Add Prettier and precommit hook packages (#350)
-   [commit](http://github.com/electrode-io/electrode/commit/d7075177ccaad6d3bd122b0d04128f7384f84695) webpack-reporter: [chore][patch] fix eslint, update .npmignore (#367)
-   [commit](http://github.com/electrode-io/electrode/commit/c8264acb9d95279125e832b26315c703c5e2ec37) redux-router-engine: update README and docs (#366)
-   [commit](http://github.com/electrode-io/electrode/commit/9e72f81b524bafceb4452c950cf9fa07f30d0e76) archetype-react-component: update travis commands for new component generator (#368)
-   [commit](http://github.com/electrode-io/electrode/commit/b092823a2a07c60268ba25a1228dc6e8feb4d19c) generator-electrode: support command line arguments (#369)
-   [commit](http://github.com/electrode-io/electrode/commit/911bcd0da1ca027c947480b77818a5603fe725e8) generator-electrode-component: delete generator-electrode-component (#370)
-   [commit](http://github.com/electrode-io/electrode/commit/26c7505d8904c468a4f1435d68988db945b37227) update contributing doc

# Packages

-   electrode-archetype-react-app-dev@2.3.2
-   electrode-archetype-react-app@2.3.2
-   electrode-archetype-react-component-dev@2.0.2
-   electrode-archetype-react-component@2.0.2
-   generator-electrode@2.0.1

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/5ef57e46ea535b60a4beba87817a1dbd6ec1fcef) gitbook: [Feature] Add gitbook (#322)
-   [commit](http://github.com/electrode-io/electrode/commit/801e3222c260959fc03f29d69acb3d1739c22eb5) minor fixes for readme (#329)
-   [commit](http://github.com/electrode-io/electrode/commit/5d70b97207bb1d37a2f3b78e346a7e19794e297e) archetype-react-app: [minor][bug] Invalid host header fixes (#321)
-   [commit](http://github.com/electrode-io/electrode/commit/65884aa271ed76398c7bc062675d99627da94b8e) fix the require statement for pulling in the profile base (#327)

# Packages

-   electrode-archetype-react-app-dev@2.3.1
-   electrode-archetype-react-app@2.3.1
-   electrode-archetype-react-component-dev@2.0.1
-   electrode-archetype-react-component@2.0.1
-   generator-electrode@2.0.0

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/cbb0c01e5cb49e40c7832e4d5873484a4950681f) Service worker fixes for oss archetype app (#314)
-   [commit](http://github.com/electrode-io/electrode/commit/5a7e2baaff5e2c9f5055ac4ad294f274ecc521d5) archetype-react-app: [bug][patch] Update initial entry path for PWA (#315)
-   [commit](http://github.com/electrode-io/electrode/commit/5e843c99317ec18a806fedcdb365be789110a12e) Generator-electrode: [Feat][major] New component structure with Demo App (#312)
-   [commit](http://github.com/electrode-io/electrode/commit/5ce88a7351173b0b93e0e0cf199623c4853814da) clean remaining dev and hot tasks (#313)
-   [commit](http://github.com/electrode-io/electrode/commit/b8cc45566f0f8833fc8d5941d204c75773f677a4) universal-material-ui: [Chore][major] Update Material-UI sample to src/lib mode (#280)
-   [commit](http://github.com/electrode-io/electrode/commit/c0164f4b267947fb3d0c2dc05e6792a91fa0a921) Accept props as options (#318)
-   [commit](http://github.com/electrode-io/electrode/commit/af3d4ca4460b1253a72988b5e245ebefd064fea4) archetype-react-app: [patch] archetype app entry configurations (#317)
-   [commit](http://github.com/electrode-io/electrode/commit/f8e02869b8359e59e7aa2fe6a63542286e3ff1fb) update Path for Dockerfile (#323)

# Packages

-   electrode-archetype-react-app-dev@2.3.0
-   electrode-archetype-react-app@2.3.0
-   electrode-redux-router-engine@1.4.0
-   electrode-webpack-reporter@0.3.5

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/05f2d90fe0607dff212dff53cff4218a4d821367) redux-router-engine: [feat][minor] Support async result from optional renderToString (#309)

# Packages

-   electrode-archetype-react-app-dev@2.2.0
-   electrode-archetype-react-app@2.2.0
-   electrode-archetype-react-component-dev@1.4.0
-   electrode-archetype-react-component@1.4.0
-   electrode-react-webapp@1.5.0
-   electrode-redux-router-engine@1.3.0
-   electrode-webpack-reporter@0.3.4
-   generator-electrode@1.12.0

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/0871a19008656ccb3ea7c32c6715a685283c10f9) Add prop-types for react 15.5.0 (#279)
-   [commit](http://github.com/electrode-io/electrode/commit/f0140655a9587cd360e7c547e3e7ba08ac810124) invert cssModuleSupport so that it chooses the correct loaders (#283)
-   [commit](http://github.com/electrode-io/electrode/commit/9605bf1bd7bab73775979ed1352367e4ed8afc5c) Update proptypes (#287)
-   [commit](http://github.com/electrode-io/electrode/commit/a5f3a7c2e0163a235a07411b4cef707b9919294b) Add environment variable for webpack dev HTTPS (#290)
-   [commit](http://github.com/electrode-io/electrode/commit/15754928ac46e9f920c7fa38ad983f783bd8f65b) Use socketPort from defaults (#294)
-   [commit](http://github.com/electrode-io/electrode/commit/9c88e4424af8a423d6e44828c4dfc15a146eeffd) Fix CSS Modules FOUC with production build (#296)
-   [commit](http://github.com/electrode-io/electrode/commit/5e4ccb680b5a5807e7c60e26569ae0c882193909) add an eslint file for the client directory (#297)
-   [commit](http://github.com/electrode-io/electrode/commit/853f1da230a7ab1646508f5189acd841b461f8db) Allow dynamic head and body tags with react-helmet (#299)
-   [commit](http://github.com/electrode-io/electrode/commit/1b8b789b628f609efca38aa8f522b5de28cebd49) Fix Windows coverage errors and Windows Sinon error (#292)
-   [commit](http://github.com/electrode-io/electrode/commit/efe4bd776bd80e85bf115821e4445435034f4f35) Add readme for extending webpack config (#284)
-   [commit](http://github.com/electrode-io/electrode/commit/2f5b0da61c11d75fcf5188c8582e89e5f04590f4) Fix archetype component test issues (#291)
-   [commit](http://github.com/electrode-io/electrode/commit/beb0743051823c06c8dcf814344782fd691cf5e6) Mongo db example (#301)
-   [commit](http://github.com/electrode-io/electrode/commit/51eeb115bb60b553471fe6aedf6742b8eaad028b) [WIP] invalid host header fixes for oss archetype (#305)
-   [commit](http://github.com/electrode-io/electrode/commit/fac6b68c840a31e36afc0a343ae49ce092e164a2) redux-router-engine: support custom store initializer for each route (#306)

# Packages

-   electrode-archetype-opt-inferno@0.1.1
-   electrode-archetype-opt-react@0.1.1
-   electrode-archetype-react-app-dev@2.1.0
-   electrode-archetype-react-app@2.1.0
-   electrode-archetype-react-component-dev@1.2.0
-   electrode-archetype-react-component@1.2.0
-   electrode-react-webapp@1.4.2
-   electrode-redux-router-engine@1.2.8
-   electrode-webpack-reporter@0.3.0
-   generator-electrode-component@1.3.0
-   generator-electrode@1.9.0
-   webpack-config-composer@1.0.1

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/bee1cdc5299040f27e071874a3ecde2177d2bbc0) initial commit
-   [commit](http://github.com/electrode-io/electrode/commit/fa37c9b3092385b6450b38ebacc9c63762f35726) quick html hack
-   [commit](http://github.com/electrode-io/electrode/commit/2b74edbb9851977eb12b780e34447639dc148c20) badges
-   [commit](http://github.com/electrode-io/electrode/commit/fe145d0e724b9a9e58383266802fd7087d58255c) travis ci
-   [commit](http://github.com/electrode-io/electrode/commit/5b48b7c7a21e7b80a789280180cb522b5e260554) convert to JSON for toString
-   [commit](http://github.com/electrode-io/electrode/commit/49cd4e222716050a2205f835ce28c659f5601393) fix terminal colors
-   [commit](http://github.com/electrode-io/electrode/commit/b10167a321b98211034c3742e9d95b1f4e7d970f) update messages and colors
-   [commit](http://github.com/electrode-io/electrode/commit/72f5d4c282ab844f91d9f82ee8d78512d4c14905) Adds Team Electrode link to readme.md
-   [commit](http://github.com/electrode-io/electrode/commit/44bc9bff6c4bdbff0504dab506047d1ff965640c) Merge pull request #2 from tiffine-koch/master
-   [commit](http://github.com/electrode-io/electrode/commit/96b4a19768e4e6396a8e6dfeaf998723e6d05d68) Update README.md
-   [commit](http://github.com/electrode-io/electrode/commit/fdc1135a8e90a5e197aa7512919843706bf4c597) add react webapp with material-ui
-   [commit](http://github.com/electrode-io/electrode/commit/51171dda209abd970107ac9439c2efad233af412) create real HTML based reporter with material-ui
-   [commit](http://github.com/electrode-io/electrode/commit/5810c90fe8a520e961135944a0795cffc91ba00b) wrap legacy display
-   [commit](http://github.com/electrode-io/electrode/commit/90b4e3a54a3c5587f147b40f9c4eeed261224ae0) update readme with screenshot
-   [commit](http://github.com/electrode-io/electrode/commit/23e4710e05e307c1170d2e2e1edd49dc2826169c) modularize home component, add dark mui theme
-   [commit](http://github.com/electrode-io/electrode/commit/a27258b76f15f3d974d0feb3bdd679d27859cf22) move webpack-modules file into separate folder
-   [commit](http://github.com/electrode-io/electrode/commit/ca50246aa48a586319792c4ff7c2b3adbf22516b) create base electrify component
-   [commit](http://github.com/electrode-io/electrode/commit/93530021e7853a39628cfdc2dc693b13dd3c564b) set up file structure for electrify component
-   [commit](http://github.com/electrode-io/electrode/commit/7f503e0c69f60e5307875f4fe1c6c3e94d3da0d4) import code from electrify and edit to work with react
-   [commit](http://github.com/electrode-io/electrode/commit/d4b48de3cbe5988c2ad9abaa9306f4c7907eb8a9) rewrite webpack assets component
-   [commit](http://github.com/electrode-io/electrode/commit/9208ce744958bcec205f706d940f28fada14170f) rewrite webpack-info component
-   [commit](http://github.com/electrode-io/electrode/commit/dcb431f13e7e7691d03b7b46cc4470b50c9ce221) pull in styling from base
-   [commit](http://github.com/electrode-io/electrode/commit/914ffae512f31fb051e35675d3b0440e71429ec2) rewrite warnings-errors component
-   [commit](http://github.com/electrode-io/electrode/commit/3bedffc8ac8c8104ec96d6e0f861f5c81af0a246) syntax changes
-   [commit](http://github.com/electrode-io/electrode/commit/45b82d5cd332134eeda4fc76328b93a85cee1f72) fix name regex (#5)
-   [commit](http://github.com/electrode-io/electrode/commit/3f6349b2d753d4c2b1657004483ce97dd708e33e) lint client files
-   [commit](http://github.com/electrode-io/electrode/commit/f509ef397a50db49dc483f9e0b5d5bd299cc57d0) add fix to solve type error cannot read prop 1 of null
-   [commit](http://github.com/electrode-io/electrode/commit/9ca910330d90e704bc430a1c3d7fe4b3e7c1e80a) fix react error in warnings component when there are no warnings
-   [commit](http://github.com/electrode-io/electrode/commit/a314c293fe2f3faca1c3788e6928e52858876ff2) render a no warnings component instead of null
-   [commit](http://github.com/electrode-io/electrode/commit/991bb20e51de5a14ca3c915632a8402696d5c41f) edit bundle pathnames to work with npm link
-   [commit](http://github.com/electrode-io/electrode/commit/cc4a91fbf54655b2d5bfa7d4c2f2fbd0c26dac8e) center electrify in container regarless of window size
-   [commit](http://github.com/electrode-io/electrode/commit/3d050668f08a5b981ca6855bfcd168c8cf78a1a4) change bundle pathnames - no longer need npm link
-   [commit](http://github.com/electrode-io/electrode/commit/0952a6eaa9ea34f67ae40d2464aaadd7a8bfa8ec) add module-processor fix and install prettysize module
-   [commit](http://github.com/electrode-io/electrode/commit/192aeeee94549922978de79d54f0ed6263bb50cf) modularize webpack assets react component to include a d3visualization
-   [commit](http://github.com/electrode-io/electrode/commit/557dfbc31e0307504873a356639739fa56ca5402) basic d3vis for webpack assets
-   [commit](http://github.com/electrode-io/electrode/commit/00245156b9d7fb553b4469b5bc324da6deaba448) separate d3 component from mui card to fix rendering issue
-   [commit](http://github.com/electrode-io/electrode/commit/f42b532d02a087f5fee3b7d1b13843a472f66956) remove utils file
-   [commit](http://github.com/electrode-io/electrode/commit/e9f83411871efb1c5cb18c316ad5fc8780a19312) remove console log
-   [commit](http://github.com/electrode-io/electrode/commit/24e5a75154cd9364853599af27fe0416d9cbf18b) remove asset data views and use log scale
-   [commit](http://github.com/electrode-io/electrode/commit/5ada1d29dbe1e620910f3c292a1790620e253d82) safe fallback if module name doesn't match regex (#7)
-   [commit](http://github.com/electrode-io/electrode/commit/51573d19074f699769e4fe23d0f39dcd863be751) resolve linting errors
-   [commit](http://github.com/electrode-io/electrode/commit/ce52306c1671d3e37371bf5fef7f9cb33459c4a0) resolve linting errors
-   [commit](http://github.com/electrode-io/electrode/commit/b93bc4fa92aeca132be5ada4322d76280f483f89) fix filename capitalization error
-   [commit](http://github.com/electrode-io/electrode/commit/1ffe583b627ef4187df101ae31c18c73c599e1a3) upgrade react-tap-event-plugin to v2.0.0 to resolve react 15.4.0 upgrade issues (#8)
-   [commit](http://github.com/electrode-io/electrode/commit/ed7af6c0759df63f131363d1c9ca1d8594067de2) fix incorrect propTypes
-   [commit](http://github.com/electrode-io/electrode/commit/9c451be2307702f60bf86ae5d8f149732717e0c8) add key prop to iterated components
-   [commit](http://github.com/electrode-io/electrode/commit/82d168806ebf6cb9b2b63b71f0ce75798d986464) remove color scheme options
-   [commit](http://github.com/electrode-io/electrode/commit/f1d7856ca5ad9d1ed380cf8ae920639b5d35d9e5) add purePackStats to test state
-   [commit](http://github.com/electrode-io/electrode/commit/20bdfd961070df4447c6755cecb1709020e478d9) separate pureWebpackStats from init-state.js and import them instead
-   [commit](http://github.com/electrode-io/electrode/commit/8e973b376aac9b679965bd9cf80c358b5d231599) with '#' will be ignored, and an empty message aborts the commit.
-   [commit](http://github.com/electrode-io/electrode/commit/fbdb6121921cae9c777107bdbee25fa004c069d8) remove electrify files and install via npm instead"
-   [commit](http://github.com/electrode-io/electrode/commit/efe7efb92dc1db4b7472f7d641ddf8d2690520ea) install electrify-react-component
-   [commit](http://github.com/electrode-io/electrode/commit/e59e7a7b028c1f072d20bfadf1fee5c572611509) remove electrify modules from home component
-   [commit](http://github.com/electrode-io/electrode/commit/6cb3f39e5dfdc422f7f08911704deeeb50d7ad78) remove unused style properties
-   [commit](http://github.com/electrode-io/electrode/commit/a4ee410d511d6c532715902649b7f46fa004397f) remove comments
-   [commit](http://github.com/electrode-io/electrode/commit/a7765469da150d612bb5f261568730ae5b3672d0) resovle merge conflicts
-   [commit](http://github.com/electrode-io/electrode/commit/5bc6a6b50cec93b4c358908557f2b61f110650e2) fix linting error
-   [commit](http://github.com/electrode-io/electrode/commit/7bec2424d5cd7316299f47469941b4884eeb1b74) update electrify-react-component dependency
-   [commit](http://github.com/electrode-io/electrode/commit/dc83aa39517ffc58567bf7891e858e352b39f500) update electrify-react-component version
-   [commit](http://github.com/electrode-io/electrode/commit/6db2a2bb791500037aead20955cdc57b59414e93) update electrify-react-component version
-   [commit](http://github.com/electrode-io/electrode/commit/5db8314ae8f198550393a696eabaa77d9a6dc802) update electrify react component version
-   [commit](http://github.com/electrode-io/electrode/commit/be6d3af5278cb845cd087de2cb248989e95b8593) update eslint-diable rules and fix css code styling
-   [commit](http://github.com/electrode-io/electrode/commit/a568a9d6a62afb07cbc13fe528e7ce15eb4467b2) update electrify component version
-   [commit](http://github.com/electrode-io/electrode/commit/a9ca5d5ac34a1d45eb0f21d06dbc42b829f71c3d) pass purewebpack stats
-   [commit](http://github.com/electrode-io/electrode/commit/31655aeef750b19ae4e7fb00826d1e698191232e) [Bugfix] Ensure "ignored" modules don't break output (#9)
-   [commit](http://github.com/electrode-io/electrode/commit/706cf98f687706766c6e6dc777c1e53d7c174831) [Bugfix] Add missing jsonData variable (#10)
-   [commit](http://github.com/electrode-io/electrode/commit/f3d980af1903bbda2476aaaeb8aa68c8b972a114) update to react 15.4.0
-   [commit](http://github.com/electrode-io/electrode/commit/b2b48fdbe01395aae8fd224b47594e131b271246) upgrade material-ui to 0.16.4
-   [commit](http://github.com/electrode-io/electrode/commit/9726eb9dec6d2d32bdba75c27dd7370ff8e2da20) fix merge conflict from upstream
-   [commit](http://github.com/electrode-io/electrode/commit/9d2d07c667feecb0ce7343a506efdecfeaa42de9) upgrade electrify component to remove material-ui to dev dep
-   [commit](http://github.com/electrode-io/electrode/commit/6e1cbbcdac47fd30784ffc570fba684303a30385) resolve merge conflicts. rge branch 'master' of <https://github.com/electrode-io/electrode-webpack-reporter>
-   [commit](http://github.com/electrode-io/electrode/commit/e5f74c457cbfb88593ad2b1d9466367e69d49789) Redesign electrode-webpack-reporter and incorporate electrify (#6)
-   [commit](http://github.com/electrode-io/electrode/commit/d9a64e6634269faafde96cef74a87a63d370ecf2) fix `cannot find module electrode-electrify-react-component` error
-   [commit](http://github.com/electrode-io/electrode/commit/7de65a525152c1de01fd61ff3d1ee294a64f4fae) resolve merge conflict with upstream
-   [commit](http://github.com/electrode-io/electrode/commit/97273939ac1641f5349e0b0818d8e1d9407e6f9f) upgrade electrify component to 4.4.7
-   [commit](http://github.com/electrode-io/electrode/commit/b34dd7f71be31d13e7a7648000da279c76118189) fix linter errors (#12)
-   [commit](http://github.com/electrode-io/electrode/commit/97478667201864af69e7439e12b6f02376990f24) electrify-react-component version update
-   [commit](http://github.com/electrode-io/electrode/commit/a363af1c7d737828898856ca03de64dee9ea100f) lint
-   [commit](http://github.com/electrode-io/electrode/commit/b7e066ac9e539d80f5120224c00e5d07f6709e5b) enable hot module reloading
-   [commit](http://github.com/electrode-io/electrode/commit/8db246ba61474f89ff7626914d6e9b79abb73e3e) config hot module reloading
-   [commit](http://github.com/electrode-io/electrode/commit/ad154ccf587ab2fdabb2555f262c9872a397cbd4) resolve conflicts with origin
-   [commit](http://github.com/electrode-io/electrode/commit/78ddecdbec1b3fd0362f04d644ff3c0da585c47e) lint & resolve upstream conflicts
-   [commit](http://github.com/electrode-io/electrode/commit/88053e98ff1d021b45034d799cf3fe235f9ed645) config server-side socket.io; update electrify react component version
-   [commit](http://github.com/electrode-io/electrode/commit/7e8d95ae94aba852207423ca00402474f9d68f9b) lint and fix npm module name
-   [commit](http://github.com/electrode-io/electrode/commit/c0b4c171693dc3a70fb38a9beca283bdb5ccda37) set up socket.io to enable hot module reloading
-   [commit](http://github.com/electrode-io/electrode/commit/9aca6e6b118af3d26e5ac7e5bd211d520fc20fbd) fix tap event issue on hot reload
-   [commit](http://github.com/electrode-io/electrode/commit/1076c8b724b57b9ecaa621d31edcd773b291754b) remove uncessary server config
-   [commit](http://github.com/electrode-io/electrode/commit/a5e944af751627e19eb8910f1ac67249f5a3641c) lint
-   [commit](http://github.com/electrode-io/electrode/commit/2a273df254ae926bfbb878d918ff289f97635ef3) fix npm version number
-   [commit](http://github.com/electrode-io/electrode/commit/6cd9220197b8d995bfe349f4f159139595e67d43) correct out of scope variable
-   [commit](http://github.com/electrode-io/electrode/commit/fd1c1f01a4381e204962a326e643d35908a6d25b) Enable hot module reloading for webpack reporter (#13)
-   [commit](http://github.com/electrode-io/electrode/commit/d916adbb6083a6b758c5de9ac25e3d0d9a08e592) reduce pureWebpackStats. only pass info that is required
-   [commit](http://github.com/electrode-io/electrode/commit/d90351825de3d34adacf4d4c5773601931a733ae) Trigger notification
-   [commit](http://github.com/electrode-io/electrode/commit/83b88b7a394d0c415bc1a8d49720657592509521) update electrify-react-component version
-   [commit](http://github.com/electrode-io/electrode/commit/5f67d3de429766e153498b1966420c2ba2ceb5a3) Reduce pureWebPackStats (#14)
-   [commit](http://github.com/electrode-io/electrode/commit/e55911318d9ab6cd991d221e3f97c77520d31b62) initial redesign of warningsErrors component
-   [commit](http://github.com/electrode-io/electrode/commit/1074e6dfcade5cfef3a7aa50236d5a19010ff1f6) set up react router
-   [commit](http://github.com/electrode-io/electrode/commit/84044c51ebca4a6df37ac0ae92baac95c6419743) update legacy styling
-   [commit](http://github.com/electrode-io/electrode/commit/4c9c0dcece2773fff41ed6936598966e9e1320f7) redesign warningsErrors component
-   [commit](http://github.com/electrode-io/electrode/commit/1d9a3902903a2f4f821fbc5b97185cdea5e57db4) redesign reporter to include navbar
-   [commit](http://github.com/electrode-io/electrode/commit/ec30c26769597d2ccc9d0f1b57eb965bc2a2669a) redesign report route
-   [commit](http://github.com/electrode-io/electrode/commit/4d595f0a702c5af2c23ac1611c7f53049c7a0aae) GothamRounded fonts
-   [commit](http://github.com/electrode-io/electrode/commit/b6378042e22dfd856cad3287eb508de62809115f) remove webpack info component
-   [commit](http://github.com/electrode-io/electrode/commit/5f29ddf9115276d387cad7d7c2c8c6b5cdd781e9) install classnames dependency
-   [commit](http://github.com/electrode-io/electrode/commit/1effdb75e4b118ba46f94bcef8d071f4471a6930) merge conflicts
-   [commit](http://github.com/electrode-io/electrode/commit/2fd36612c367acb8588ba17dd81832e2672ab3cd) remove duplicate dependency
-   [commit](http://github.com/electrode-io/electrode/commit/b01b15c985cd63a9061094aff4f560c586236362) update electrify version
-   [commit](http://github.com/electrode-io/electrode/commit/08cbac6283d4a877e0f17b8b55b96114e191d0e6) fix navbar link styling
-   [commit](http://github.com/electrode-io/electrode/commit/ec4aac51cd92a6ec8b542a05aa040fd49c6c4fed) Update changelog
-   [commit](http://github.com/electrode-io/electrode/commit/711bce7ed762c938f41872615c778f032e52591f) archetype-react-app: add linting for JS files
-   [commit](http://github.com/electrode-io/electrode/commit/e478870bc167f91cb4e5c1c3b5b160b80edd924a) Merge pull request #203 from jchip/master
-   [commit](http://github.com/electrode-io/electrode/commit/e0d75fbfc89d1a11d28129b27091f67273eef180) Centring Logo
-   [commit](http://github.com/electrode-io/electrode/commit/e43d3016b7b8344d49afcbfae964d23d28f0ad09) allow single quotes for components
-   [commit](http://github.com/electrode-io/electrode/commit/0ec17071d60cf658d9f33edee55582a5cc4c63f9) add single quote option to app generator
-   [commit](http://github.com/electrode-io/electrode/commit/0ef2b03f584b347903db9b7a892d4e8880c1941b) remove unused code
-   [commit](http://github.com/electrode-io/electrode/commit/78b9a2e02d2a414c70155137cdef50e5bc2cd10b) #104 add yaml and js for eslint in app archtype (#206)
-   [commit](http://github.com/electrode-io/electrode/commit/505e7d3136f31a793275fb7b5e8e673104c79b29) archetype-react-app-dev: add eslint check to JS files (#204)
-   [commit](http://github.com/electrode-io/electrode/commit/e6d326778aae8af5c9062ce19f98e3b86cdd009a) archetype-react-app-dev: fix eslint glob to include all files (#207)
-   [commit](http://github.com/electrode-io/electrode/commit/c810e9300edb8e3d7f8856031cab06e6b19ea317) fix issue #116: Greedy string replace in copy-as-flow script (#209)
-   [commit](http://github.com/electrode-io/electrode/commit/c70630d1b5934233a2056f9462936253e633be43) archetype-react-app-dev: use a custom webpack module resolver plugin (#208)
-   [commit](http://github.com/electrode-io/electrode/commit/e354bd449fe6f2de577e6262c0394d68c512b5cd) archetype-react-app: Add babel-polyfill to archetype (#212)
-   [commit](http://github.com/electrode-io/electrode/commit/aa0c64f499b34f318903498a47a3c94339e147d2) Support stylus modules for component archetype (#211)
-   [commit](http://github.com/electrode-io/electrode/commit/aa7f5b1f16c7b6a8b5aaddcf19d5aab441bb378b) archetype-react-app-dev: refactor fail plugin (#213)
-   [commit](http://github.com/electrode-io/electrode/commit/91abeb31c7fdadad42e64bab0a4cae36d0edefff) register with all eslintrc
-   [commit](http://github.com/electrode-io/electrode/commit/ead3390e0dfcb01b8e10b97073ae0bea5657aa5d) whitespace
-   [commit](http://github.com/electrode-io/electrode/commit/acb722bece0a8ff6ceb57db466835de8b372fd63) webpack-config-composer (#222)
-   [commit](http://github.com/electrode-io/electrode/commit/fbcdde65f7427031f7ee5776d28588c0ab040f09) add npmignore
-   [commit](http://github.com/electrode-io/electrode/commit/90bcce4a83301e88e4182564bb2067390445f137) show error if profile doesn't exist
-   [commit](http://github.com/electrode-io/electrode/commit/cacf73b60830fa2c03670997a4aa08375180eb81) expose deleteCustomProps
-   [commit](http://github.com/electrode-io/electrode/commit/3d16e26fde2293a05188d982145050b93f03bbb2) fix production server (#224)
-   [commit](http://github.com/electrode-io/electrode/commit/436e36c563e4a94d12bdf25914b2275c267b53e7) accept different repo and package name (#225)
-   [commit](http://github.com/electrode-io/electrode/commit/87ecabacf7196a28bb6ee61674411d708c68a075) removed an old import which caused error (#216)
-   [commit](http://github.com/electrode-io/electrode/commit/af2f63d38699d5301f9983f40fa1b415c6c83dfc) webpack-config-composer: add deleteCustomProps to instance
-   [commit](http://github.com/electrode-io/electrode/commit/0f9bd9174bea865f4522d87b181fdfabe345c51e) composable webpack partials (#226)
-   [commit](http://github.com/electrode-io/electrode/commit/e72e4a553d281e8f26b3e76a1188373c15d9209f) Add intl shim to the karma config (#228)
-   [commit](http://github.com/electrode-io/electrode/commit/2d640965ad7a7ec8c05a2407afa5e06962f017ab) allow user settings for karma config (#229)
-   [commit](http://github.com/electrode-io/electrode/commit/3d4355f712863cbfbdb76cdfa0a6e1019beb7409) turn off sw precache filepath warning (#231)
-   [commit](http://github.com/electrode-io/electrode/commit/aec693e0b362aa2a0442466b459b69e0901d9bc4) Include component generator into the App Generator (#217)
-   [commit](http://github.com/electrode-io/electrode/commit/2fe708ca1d5f3f1cd75e4c69721510f0290b56c8) add option to use inferno instead of react (#234)
-   [commit](http://github.com/electrode-io/electrode/commit/77aa7afe40b17c46c9d80fc73e302a309bc71cd2) react-webapp: remove unused dep (#238)
-   [commit](http://github.com/electrode-io/electrode/commit/0052809b04cb3891923bb72a2954103d3e6d5477) redux-router-engine: Make react and react-dom peerDep (#239)
-   [commit](http://github.com/electrode-io/electrode/commit/1827d5c3fd322065e5d4c7b2579423700803fdbe) archetype-opt modules to allow installing inferno on demand (#240)
-   [commit](http://github.com/electrode-io/electrode/commit/87dbeb5b5b1bbacce42e4d64f1dea9e36e2d1077) archetype-opt: proper remove trailing slash from path (#242)
-   [commit](http://github.com/electrode-io/electrode/commit/dcfdb9f93001c6737f04fe408091291a0741e008) archetype-react-component: update engines in package.json (#241)
-   [commit](http://github.com/electrode-io/electrode/commit/264d0d6b26fcfae8891ee4e3a1dcb1ed3c17c17d) archetype-react-app: Add debug logger using winston (#220)
-   [commit](http://github.com/electrode-io/electrode/commit/4b0024166fc367ffcadf2cc87244721e14697dd1) use archetype-opt to pull in react or inferno (#243)
-   [commit](http://github.com/electrode-io/electrode/commit/86fe471b017955b1cc55b469462178ec508c53c3) Add logger unit test (#246)
-   [commit](http://github.com/electrode-io/electrode/commit/49bb37ef731cd8a524125d0d1bd433f2fa1bc3b6) Merge pull request #15 from georgeweiler/redesign
-   [commit](http://github.com/electrode-io/electrode/commit/18770bd9c30a1095a4aec6d57debc2bb757f73bf) fix eslint
-   [commit](http://github.com/electrode-io/electrode/commit/e00ff30b6339b70272a96f18773d8d2c80aced4e) move dep to dev
-   [commit](http://github.com/electrode-io/electrode/commit/2b4449cf0bbc7f5e6af69dc99a6ce95fc3f48c92) update lerna to 2.0.0-beta.38
-   [commit](http://github.com/electrode-io/electrode/commit/ddfd02c1c0816a439580cd25b8514aa7e831deea) ignore electrode-webpack-reporter in bootstrap
-   [commit](http://github.com/electrode-io/electrode/commit/e62ee9f839b312dc79402eb8facbf682618bbb0e) add back HTML webpack reporter (#248)
-   [commit](http://github.com/electrode-io/electrode/commit/85307af3b983161052a6a6f684b07502ae701423) cleanup dep
-   [commit](http://github.com/electrode-io/electrode/commit/0524d4058af172faa920587222ca2905fafc1bb9) cleanup logs (#249)
-   [commit](http://github.com/electrode-io/electrode/commit/5e76437362a62ec524cd7fd5ee08ffbf9adac624) Update archetype component eslint (#251)
-   [commit](http://github.com/electrode-io/electrode/commit/029d5052e04b477d17b4aff98c43bb0e0e27c1ea) Improve formatting (#252)
-   [commit](http://github.com/electrode-io/electrode/commit/ba5f3a623214d524a55dafa73efb4af6910c857b) webpack-config-composer: support node@7 and npm@4 (#261)
-   [commit](http://github.com/electrode-io/electrode/commit/afc5216c1692788078e0d3c203e9c3de6db4bad7) Archetype component upgrades webpack to v2 (#256)
-   [commit](http://github.com/electrode-io/electrode/commit/f28fe85ecaa0617b69d8a71c10ee1ce3e9467d18) update babel & karma (#257)
-   [commit](http://github.com/electrode-io/electrode/commit/b72d207a243bdc1207c4459c84f79d07f6e01932) archetype-react-app-dev: fix CSS modules class name (#258)
-   [commit](http://github.com/electrode-io/electrode/commit/ea6c641c84c3f434ff43175333716106210e8546) webpack-reporter: update to archetype 2 with src/lib mode (#259)
-   [commit](http://github.com/electrode-io/electrode/commit/1eb5814ee8c35672f1373a87a133bdbf7ac9fac7) archetype-react-app: generate .babelrc for tests (#260)
-   [commit](http://github.com/electrode-io/electrode/commit/593d057e033464277b9f7d7223c38035f0f52825) update lerna

# Packages

-   electrode-archetype-react-app-dev@2.0.2
-   electrode-archetype-react-app@2.0.2
-   electrode-archetype-react-component@1.1.12
-   electrode-archetype-react-component-dev@1.1.12
-   generator-electrode-component@1.2.4
-   generator-electrode@1.8.0

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/571244e906399d509e6f388cda4590a18f3e97e2) switch to 2 space indents, consistent with the generator-electrode package (#173)
-   [commit](http://github.com/electrode-io/electrode/commit/ff7d11c103f9d6c309ad472137435136360ee9e4) update peerDep
-   [commit](http://github.com/electrode-io/electrode/commit/10e3da9dea035f24c374cefb9f2f65999bc9561b) Revert "#158: modify webpack test config to allow for correct relative paths" (#192)
-   [commit](http://github.com/electrode-io/electrode/commit/1b0799f9b16decf7b9ec6fcbceceef7679621cad) universal-react-node: update to archetype 2.0 (#199)
-   [commit](http://github.com/electrode-io/electrode/commit/1831df1bad854fb4fd89bb3462820594bc8ad1dd) archetype-react-app: run webpack and test watch in parallel (#102) (#196)
-   [commit](http://github.com/electrode-io/electrode/commit/d3df706928a6d77cc87aa01c752457003e0fd351) generator: update app template to archetype 2.0 (#201)
-   [commit](http://github.com/electrode-io/electrode/commit/84ca0cd04fc8acf62dc06dc25a39a771d2f9c391) archetype-react-app: make sure dist dir exist for PWA (#202)

# Packages

-   electrode-archetype-react-app-dev@2.0.0
-   electrode-archetype-react-app@2.0.0

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/730a0fb45c06db5ca70d9a579bfa79a53e944004) archetype-react-app: upgrade to webpack 2.0
-   [commit](http://github.com/electrode-io/electrode/commit/2aa3e116ee375ef3bfd6f065255c35cec158ea93) archetype-react-app: webpack 2.0 working with few features disabled
-   [commit](http://github.com/electrode-io/electrode/commit/5d2336a9dcea2cf5acab9db70f293474f2d946e9) archetype-reach-app: enable PWA for webpack 2.0 (#156)
-   [commit](http://github.com/electrode-io/electrode/commit/4518138904b711e3b16e1c4773eaf6e5032a692c) archetype-react-app: re-enable dll tasks (#161)
-   [commit](http://github.com/electrode-io/electrode/commit/92378863c9f4f643bbc0716e975a2b58824f8cee) universal-react-node: bundle DLL's for demo (#162)
-   [commit](http://github.com/electrode-io/electrode/commit/fd9f632c19ef3eee8903b8710510b7ae0d5932d7) archetype-react-app: only enable DLL if dll.config.js exist in client (#165)
-   [commit](http://github.com/electrode-io/electrode/commit/4395504e5e8f8554fbed314bf3e57efb6a0398f8) archetype-react-app: upgrade PostCSS for Webpack2 (#167)
-   [commit](http://github.com/electrode-io/electrode/commit/874c0ba71bdabb8b541d510f407ef7bd5a3e7f8b) universal-react-node: add build to test
-   [commit](http://github.com/electrode-io/electrode/commit/defae94eebf6b21b8bf0c8515ef1567873eb7d37) archetype-react-app: remove multiBundle flag
-   [commit](http://github.com/electrode-io/electrode/commit/4bbd59722b0f7a74e1786d455be46c20203781d5) fix webpack resolver paths with CWD add back.
-   [commit](http://github.com/electrode-io/electrode/commit/5d58293db07a810eb6c44429a09ab3c894a4fbdd) fix DLL plugin (#177)
-   [commit](http://github.com/electrode-io/electrode/commit/3f35c436c6a2369078224d7db5e6689e40756c2f) build-dist-dll before build-dist-min (#182)
-   [commit](http://github.com/electrode-io/electrode/commit/07aa47b82e8a252f854d53af08744f16b0c2436a) disable DLL since it conflicts with PWA (#183)
-   [commit](http://github.com/electrode-io/electrode/commit/0b4c421fe1e2997feb5483d85d1419aa4f39ba8d) make sure dll/dist dir exist first (for DLL) (#184)
-   [commit](http://github.com/electrode-io/electrode/commit/378317b3d3d985f8c7d33d904f5fc0cf1aaabfcd) use .etmp for PWA temp file (#186)
-   [commit](http://github.com/electrode-io/electrode/commit/17f7733e3e062b6db09b106d5a553eb8e7a1ee4d) a copy of favicons-webpack-plugin for webpack 2.0 (#187)

# Packages

-   electrode-archetype-react-app-dev@1.10.0
-   electrode-archetype-react-app@1.10.0
-   electrode-archetype-react-component-dev@1.1.10
-   electrode-archetype-react-component@1.1.10
-   electrode-react-webapp@1.4.1
-   generator-electrode@1.7.1

## Commits

-   [commit](http://github.com/electrode-io/electrode/commit/5ca236b66f9fe5d2a101198eeb73729e019445c7) archetype-react-app: Update karma version up to 1.x.x (#151)
-   [commit](http://github.com/electrode-io/electrode/commit/1d6a66488ecbc7bf51b7578129189daad035d940) archetype-react-app: Pass webpack-dev host and port (#157)
-   [commit](http://github.com/electrode-io/electrode/commit/f1573b1fb335a151ff99bcb748a179eec66b06a3) archetype-react-app: Babel extend (#168)
-   [commit](http://github.com/electrode-io/electrode/commit/a104d2edf66c6f7ac272aef35c74fe5f4da07912) archetype-react-app: split up code in archetype.js (#170)
-   [commit](http://github.com/electrode-io/electrode/commit/905730120b746b9a6a219752ffe67c0c72eb241c) generator-electrode: Ignore unused server files. (#171)
-   [commit](http://github.com/electrode-io/electrode/commit/5b1debdf5a6b4fe10f976c442f066be76635a0b9) archetype-react-component: #158: modify webpack test config to match relative paths from other builds (#159)
-   [commit](http://github.com/electrode-io/electrode/commit/2f1bc346e26fe90e91a342144183c67c1d096220) fix universal-react-node: Todo sample (#172)
-   [commit](http://github.com/electrode-io/electrode/commit/cafc136a5aaefbde491ef9bbc5b666beef3e9780) add npm clean script
-   [commit](http://github.com/electrode-io/electrode/commit/51920e9c41dd538a3724bf8782940394db0d00f5) archetype-react-app: fix missing dep (#178)
-   [commit](http://github.com/electrode-io/electrode/commit/96fdc26f8fe7de2d594f19890426dc7338b14274) react-webapp: check in-publish before running prepublish (#179)
-   [commit](http://github.com/electrode-io/electrode/commit/9a7f6cebf76f4e61435e46af9478baa5c4f776fa) Load manifest in dev mode (#180)
