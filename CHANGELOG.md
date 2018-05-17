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
