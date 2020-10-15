# 10/14/2020

- fix: update config and dev code to load xarc options
- fix: drop webpack deprecated stuff
- fix: add optional-require to dep for render-context
- fix: don't output subapp v2 info assets if none was found
- fix: output subapp v2 info to dist

## Packages

### Directly Updated

- `@xarc/app@8.1.18` `(8.1.17 => 8.1.18)`
- `@xarc/app-dev@8.1.18` `(8.1.17 => 8.1.18)`
- `@xarc/render-context@1.0.2` `(1.0.1 => 1.0.2)`
- `@xarc/webpack@8.1.8` `(8.1.7 => 8.1.8)`
- `subapp-web@1.0.38` `(1.0.37 => 1.0.38)`

### Lerna Updated

- `@xarc/index-page@1.0.4` `(1.0.3 => 1.0.4)`
- `@xarc/jsx-renderer@1.0.4` `(1.0.3 => 1.0.4)`
- `@xarc/tag-renderer@1.0.2` `(1.0.1 => 1.0.2)`
- `subapp-pbundle@0.0.32` `(0.0.31 => 0.0.32)`
- `subapp-react@0.0.29` `(0.0.28 => 0.0.29)`
- `subapp-redux@1.0.38` `(1.0.37 => 1.0.38)`
- `subapp-server@1.3.7` `(1.3.6 => 1.3.7)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: update config and dev code to load xarc options [commit](http://github.com/electrode-io/electrode/commit/5a264183ddb2395fd08787e6fbc9854cbf21f27b)
  - [fix] drop webpack deprecated stuff [commit](http://github.com/electrode-io/electrode/commit/f099cf4cdc03088a0fd327ded4788d9b89d34b3f)

- `packages/xarc-render-context`

  - fix: add optional-require to dep for render-context [commit](http://github.com/electrode-io/electrode/commit/617120836d37eb1d0c99090e1931872915bdf547)

- `packages/xarc-webpack`

  - fix: don't output subapp v2 info assets if none was found [commit](http://github.com/electrode-io/electrode/commit/17acaf52c55d8df151341b7e480226df4489db2d)
  - fix: output subapp v2 info to dist [commit](http://github.com/electrode-io/electrode/commit/91d88ea55f09aa3037913478d1a85dec617cc4db)
  - fix: update config and dev code to load xarc options [commit](http://github.com/electrode-io/electrode/commit/5a264183ddb2395fd08787e6fbc9854cbf21f27b)
  - [fix] drop webpack deprecated stuff [commit](http://github.com/electrode-io/electrode/commit/f099cf4cdc03088a0fd327ded4788d9b89d34b3f)

- `packages/subapp-web`

  - fix: more helpful error message when subapp init fail on server [commit](http://github.com/electrode-io/electrode/commit/ffe45607b3d4306ae2e07509460ee77f3f475d86)

- `MISC`

  - [chore] update to fynpo 0.2.28 [commit](http://github.com/electrode-io/electrode/commit/d0ed64192e538d9e21f7ab1109730194c9b74605)

# 10/12/2020

- fix: babel rc handle missing xarc-options.json file
- use isomorphic-loader version 4.0.2
- fix: avoid accessing non exist subApps

## Packages

### Directly Updated

- `@xarc/app@8.1.17` `(8.1.16 => 8.1.17)`
- `@xarc/app-dev@8.1.17` `(8.1.16 => 8.1.17)`
- `@xarc/webpack@8.1.7` `(8.1.6 => 8.1.7)`
- `subapp-web@1.0.37` `(1.0.36 => 1.0.37)`

### Lerna Updated

- `subapp-pbundle@0.0.31` `(0.0.30 => 0.0.31)`
- `subapp-react@0.0.28` `(0.0.27 => 0.0.28)`
- `subapp-redux@1.0.37` `(1.0.36 => 1.0.37)`
- `subapp-server@1.3.6` `(1.3.5 => 1.3.6)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: babel rc handle missing xarc-options.json file [commit](http://github.com/electrode-io/electrode/commit/fc9c1fb6e54aecddae34da7f27279cb3822a6414)
  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)
  - use isomorphic-loader version 4.0.2 [commit](http://github.com/electrode-io/electrode/commit/b11e8e47dca63f90deb4de6879245795f076f83a)

- `packages/xarc-create-app`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-index-page`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-jsx-renderer`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-react`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-render-context`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-subapp`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-tag-renderer`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)

- `packages/xarc-webpack`

  - update docs and fix lint errors [commit](http://github.com/electrode-io/electrode/commit/9d19005113309e90402ed3bcd40a34b159022a39)
  - use isomorphic-loader version 4.0.2 [commit](http://github.com/electrode-io/electrode/commit/b11e8e47dca63f90deb4de6879245795f076f83a)

- `packages/subapp-web`

  - fix: avoid accessing non exist subApps [commit](http://github.com/electrode-io/electrode/commit/7372642bc3b0b31ffd8af414e39d741c04e1b5f4)

# 10/8/2020

- feat: accept XarcOptions when loading tasks - now in xclap.[jt]s, user can pass in an options object to configure all aspect of Electrode X features.
- set isomorphic loader extend-require log level to error - reduce log noises
- feat: first round of subapp version 2 packages - preview only, not yet enabled.
- remove deprecated component archetype and generator packages
- fix: subapp map cdn assets - issue when one bundle ends with exactly the same name of another bundle

## Packages

### Directly Updated

- `@xarc/app@8.1.16` `(8.1.15 => 8.1.16)`
- `@xarc/app-dev@8.1.16` `(8.1.15 => 8.1.16)`
- `@xarc/create-app@3.0.11` `(3.0.10 => 3.0.11)`
- `@xarc/jsx-renderer@1.0.3` `(1.0.2 => 1.0.3)`
- `@xarc/react@0.0.2` `(0.0.1 => 0.0.2)`
- `@xarc/render-context@1.0.1` `(1.0.0 => 1.0.1)`
- `@xarc/subapp@0.0.2` `(0.0.1 => 0.0.2)`
- `@xarc/tag-renderer@1.0.1` `(1.0.0 => 1.0.1)`
- `@xarc/webpack@8.1.6` `(8.1.5 => 8.1.6)`
- `electrode-react-webapp@4.0.1` `(4.0.0 => 4.0.1)`
- `subapp-web@1.0.36` `(1.0.35 => 1.0.36)`

### Lerna Updated

- `@xarc/index-page@1.0.3` `(1.0.2 => 1.0.3)`
- `subapp-pbundle@0.0.30` `(0.0.29 => 0.0.30)`
- `subapp-react@0.0.27` `(0.0.26 => 0.0.27)`
- `subapp-redux@1.0.36` `(1.0.35 => 1.0.36)`
- `subapp-server@1.3.5` `(1.3.4 => 1.3.5)`

## Commits

- `packages/xarc-app[-dev]`

  - fix saving archetype options [commit](http://github.com/electrode-io/electrode/commit/a1ad08dfc06ebd44da7459ea6f29a51283d90e19)
  - accept XarcOptions when loading tasks [commit](http://github.com/electrode-io/electrode/commit/a5241b7a20add0398a440555d17f082d5e561de0)
  - allow user to pass in all options when loading xrun build tasks ([#1739](https://github.com/electrode-io/electrode/pull/1739)) [commit](http://github.com/electrode-io/electrode/commit/374926e10585218557c10b6db56d03183db06bac)
  - fix: restore context for babel-plugin-react-css-modules config [commit](http://github.com/electrode-io/electrode/commit/3a2da013901f5e08a3fadf9b8b7d8718376ea5ff)
  - delete dist before build with tsc [commit](http://github.com/electrode-io/electrode/commit/158e04b4fcd044fd4b6a57dea8a2ccfeea976af4)
  - set ismorphic loader extend-require log level to error [commit](http://github.com/electrode-io/electrode/commit/e4db4a3b30369f6a4bc76090c34e28a0e3b02e1a)
  - add tests for hapi7 webpack dev plugin [commit](http://github.com/electrode-io/electrode/commit/5497ffe0d93e18ddda2e1130b52b282c6d22bdd9)

- `packages/xarc-create-app`

  - create app unit test ([#1737](https://github.com/electrode-io/electrode/pull/1737)) [commit](http://github.com/electrode-io/electrode/commit/c7f1f038e7173bb0369d63a25777903f1e880181)

- `packages/xarc-jsx-renderer`

  - delete dist before build with tsc [commit](http://github.com/electrode-io/electrode/commit/158e04b4fcd044fd4b6a57dea8a2ccfeea976af4)

- `packages/xarc-react`

  - first round of subapp version 2 packages [commit](http://github.com/electrode-io/electrode/commit/4cfc660cad9c864d794d7a5b21473ab9ae509938)

- `packages/xarc-render-context`

  - delete dist before build with tsc [commit](http://github.com/electrode-io/electrode/commit/158e04b4fcd044fd4b6a57dea8a2ccfeea976af4)

- `packages/xarc-subapp`

  - first round of subapp version 2 packages [commit](http://github.com/electrode-io/electrode/commit/4cfc660cad9c864d794d7a5b21473ab9ae509938)

- `packages/xarc-tag-renderer`

  - delete dist before build with tsc [commit](http://github.com/electrode-io/electrode/commit/158e04b4fcd044fd4b6a57dea8a2ccfeea976af4)

- `packages/xarc-webpack`

  - feat: add contenthash to bundle names ([#1745](https://github.com/electrode-io/electrode/pull/1745)) [commit](http://github.com/electrode-io/electrode/commit/37fe2a29ce8a27aa7ec3c33cad929edf6daa1937)
  - first round of subapp version 2 packages [commit](http://github.com/electrode-io/electrode/commit/4cfc660cad9c864d794d7a5b21473ab9ae509938)
  - delete dist before build with tsc [commit](http://github.com/electrode-io/electrode/commit/158e04b4fcd044fd4b6a57dea8a2ccfeea976af4)

- `packages/electrode-react-webapp`

  - create app unit test ([#1737](https://github.com/electrode-io/electrode/pull/1737)) [commit](http://github.com/electrode-io/electrode/commit/c7f1f038e7173bb0369d63a25777903f1e880181)

- `packages/subapp-web`

  - fix: map cdn assets ([#1744](https://github.com/electrode-io/electrode/pull/1744)) [commit](http://github.com/electrode-io/electrode/commit/b462308168e8b51baa85d45fd0500dafc430d662)

- `tools`

  - remove deprecated component archetype and generator packages [commit](http://github.com/electrode-io/electrode/commit/52af61085a62d89426663d00bff9759d1a5b08fa)

- `xchangelog`

  - move 2019 change log out [commit](http://github.com/electrode-io/electrode/commit/72aed78c70c7d9c89422fda47d5f34f33eebd010)

# 9/28/2020

- fix: default css module hook to false

## Packages

- `@xarc/app@8.1.15` `(8.1.14 => 8.1.15)`
- `@xarc/app-dev@8.1.15` `(8.1.14 => 8.1.15)`

## Commits

- `packages/xarc-app[-dev]`

  - [chore] auto gen docs [commit](http://github.com/electrode-io/electrode/commit/44e0173187ba0a5a9bc5a831195845c9f4aec73b)
  - fix: default css module hook to false [commit](http://github.com/electrode-io/electrode/commit/797d52d8f4fba624c0ef2a163025fdc6ac25332e)

- `packages/xarc-webpack`

  - [chore] auto gen docs [commit](http://github.com/electrode-io/electrode/commit/44e0173187ba0a5a9bc5a831195845c9f4aec73b)

# 9/24/2020

- fix: css module and loadable babel plugins needed in SSR
- fix css modules
- fix server loading subapps

## Packages

### Directly Updated

- `@xarc/app@8.1.14` `(8.1.13 => 8.1.14)`
- `@xarc/app-dev@8.1.14` `(8.1.13 => 8.1.14)`
- `@xarc/webpack@8.1.5` `(8.1.4 => 8.1.5)`
- `electrode-archetype-react-component@7.0.4` `(7.0.3 => 7.0.4)`
- `electrode-archetype-react-component-dev@7.0.4` `(7.0.3 => 7.0.4)`
- `subapp-web@1.0.35` `(1.0.34 => 1.0.35)`

### Lerna Updated

- `subapp-pbundle@0.0.29` `(0.0.28 => 0.0.29)`
- `subapp-react@0.0.26` `(0.0.25 => 0.0.26)`
- `subapp-redux@1.0.35` `(1.0.34 => 1.0.35)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: css module and loadable babel plugins needed in SSR ([#1741](https://github.com/electrode-io/electrode/pull/1741)) [commit](http://github.com/electrode-io/electrode/commit/4baed63b1f7c19145c943bc63e3e11f296e13551)
  - fix reference to lib/features:displayFeatures in load-xrun-tasks ([#1738](https://github.com/electrode-io/electrode/pull/1738)) [commit](http://github.com/electrode-io/electrode/commit/6ce3a07a48190fc782540381ec252cb5368d9968)
  - use relative path from CWD for webpack config file ([#1735](https://github.com/electrode-io/electrode/pull/1735)) [commit](http://github.com/electrode-io/electrode/commit/1b70d86cba9c7f2eaf2aa9216aff33153064c108)
  - fix css modules ([#1743](https://github.com/electrode-io/electrode/pull/1743)) [commit](http://github.com/electrode-io/electrode/commit/c7a950cfd28f92e38529e88ed4f6efdd3adaa6aa)

- `packages/xarc-webpack`

  - [chore] fix lint errors [commit](http://github.com/electrode-io/electrode/commit/390fa2efdafe0fb8015aecb20b553b8f040a3c62)
  - adding webpack plugins for subapp and dynamic import jsonp ([#1740](https://github.com/electrode-io/electrode/pull/1740)) [commit](http://github.com/electrode-io/electrode/commit/327ff235df5cfdde567dcfdac9a121d2419cb336)
  - use relative path from CWD for webpack config file ([#1735](https://github.com/electrode-io/electrode/pull/1735)) [commit](http://github.com/electrode-io/electrode/commit/1b70d86cba9c7f2eaf2aa9216aff33153064c108)
  - fix css modules ([#1743](https://github.com/electrode-io/electrode/pull/1743)) [commit](http://github.com/electrode-io/electrode/commit/c7a950cfd28f92e38529e88ed4f6efdd3adaa6aa)

- `packages/electrode-archetype-react-component[-dev]`

  - remove deprecated electrode-archetype-opt- packages ([#1736](https://github.com/electrode-io/electrode/pull/1736)) [commit](http://github.com/electrode-io/electrode/commit/a05c5ac0c406c24d6b62cb785d83c88c1eaffa14)

- `packages/subapp-web`

  - Fix the return. This was causing the issue in not invoking the route initialize method ([#1742](https://github.com/electrode-io/electrode/pull/1742)) [commit](http://github.com/electrode-io/electrode/commit/e22dc16734baff9afdd6d61dae4566507c249390)

# 9/4/2020

- fix: tweak webpack-cli to not break yarn workspace hoisting

## Packages

- `@xarc/app@8.1.13` `(8.1.12 => 8.1.13)`
- `@xarc/app-dev@8.1.13` `(8.1.12 => 8.1.13)`
- `@xarc/webpack@8.1.4` `(8.1.3 => 8.1.4)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: tweak webpack-cli to not break yarn workspace hoisting ([#1734](https://github.com/electrode-io/electrode/pull/1734)) [commit](http://github.com/electrode-io/electrode/commit/d70852e47afa99673a36bc3eadcf9e9ef71477fb)

- `packages/xarc-webpack`

  - fix: tweak webpack-cli to not break yarn workspace hoisting ([#1734](https://github.com/electrode-io/electrode/pull/1734)) [commit](http://github.com/electrode-io/electrode/commit/d70852e47afa99673a36bc3eadcf9e9ef71477fb)

# 9/3/2020

- fix: webpack-cli should be dep in @xarc/webpack
- simple node http server for webpack dev
- feature: add support for electrode-sso
- fix: ensure to have exact webpack CLI command

## Packages

- `@xarc/app@8.1.12` `(8.1.11 => 8.1.12)`
- `@xarc/app-dev@8.1.12` `(8.1.11 => 8.1.12)`
- `@xarc/webpack@8.1.3` `(8.1.2 => 8.1.3)`
- `subapp-server@1.3.4` `(1.3.3 => 1.3.4)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: webpack-cli should be dep in @xarc/webpack ([#1730](https://github.com/electrode-io/electrode/pull/1730)) [commit](http://github.com/electrode-io/electrode/commit/8ae327bf638e2eecea0f8ccc932e851a734b16f1)
  - simple node http server for webpack dev ([#1729](https://github.com/electrode-io/electrode/pull/1729)) [commit](http://github.com/electrode-io/electrode/commit/f61f8014e6bba88e7cc3c69c3f9e2f51b0a16165)
  - [chore]: remove opt-\* from devDep for app-dev [commit](http://github.com/electrode-io/electrode/commit/3b84adc7e65c10073f58d8eb6505e9edf62421af)
  - fix: ensure to have exact webpack CLI command ([#1728](https://github.com/electrode-io/electrode/pull/1728)) [commit](http://github.com/electrode-io/electrode/commit/50d262d4d747c99586e53a607d75381a3d76c56e)
  - fix http dev webpack server middleware loading ([#1733](https://github.com/electrode-io/electrode/pull/1733)) [commit](http://github.com/electrode-io/electrode/commit/62aee499297781dc4c60e8febb27be69d00e011b)

- `packages/xarc-webpack`

  - fix: webpack-cli should be dep in @xarc/webpack ([#1730](https://github.com/electrode-io/electrode/pull/1730)) [commit](http://github.com/electrode-io/electrode/commit/8ae327bf638e2eecea0f8ccc932e851a734b16f1)

- `packages/subapp-server`

  - feature: add support for electrode-sso ([#1731](https://github.com/electrode-io/electrode/pull/1731)) [commit](http://github.com/electrode-io/electrode/commit/771273fec1c48dbd78b1b4185d5b1bde281d3a2b)

- `MISC`

  - [chore]: more contribute instructions [commit](http://github.com/electrode-io/electrode/commit/d21eb8146d649811f12d27ced5339f9232b24bfd)
  - remove deprecated packages [commit](http://github.com/electrode-io/electrode/commit/677dec7385af39cd42ccd49267a9f38a0358bfac)

# 8/30/2020

- new `@xarc/opt-*` packages to replace electrode-archetype-opt- packages
- fix: handle new node.js ESM quirks

## Packages

### Directly Updated

- `@xarc/app@8.1.11` `(8.1.10 => 8.1.11)`
- `@xarc/app-dev@8.1.11` `(8.1.10 => 8.1.11)`
- `@xarc/opt-eslint@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-jest@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-karma@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-less@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-mocha@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-postcss@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-preact@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-react@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-sass@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/opt-stylus@1.0.0` `(0.0.2 => 1.0.0)`
- `@xarc/webpack@8.1.2` `(8.1.1 => 8.1.2)`
- `electrode-node-resolver@2.0.1` `(2.0.0 => 2.0.1)`

### Lerna Updated

## Commits

- `packages/xarc-app[-dev]`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [chore] generated docs [commit](http://github.com/electrode-io/electrode/commit/a0965962fb9bdb5f3bdb3b4efa9a0b37cdf3781c)

- `packages/xarc-opt-eslint`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-jest`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-karma`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-less`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-mocha`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-postcss`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-preact`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-react`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-sass`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-opt-stylus`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)
  - [major]: mark for first release of new packages [commit](http://github.com/electrode-io/electrode/commit/ab1f94d6f65fade4bccf227202ee39e2292abe6d)

- `packages/xarc-webpack`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)

- `packages/electrode-node-resolver`

  - fix: handle windows \ path separator ([#1726](https://github.com/electrode-io/electrode/pull/1726)) [commit](http://github.com/electrode-io/electrode/commit/52924d773ae217bc82abea42c12343022227e917)
  - fix: handle new node.js ESM quirks ([#1723](https://github.com/electrode-io/electrode/pull/1723)) [commit](http://github.com/electrode-io/electrode/commit/d421006a20b0e8b6b01022b3a25378bc870079e9)

- `packages/opt-archetype-check`

  - new @xarc/opt- packages to replace the electrode-archetype-opt- ones ([#1725](https://github.com/electrode-io/electrode/pull/1725)) [commit](http://github.com/electrode-io/electrode/commit/a6dd2305a75cbad7faa5b677cbf11731dd4c1bca)

# 8/14/2020

- fix: subapp ssr initial load

## Packages

### Directly Updated

- `@xarc/app@8.1.10` `(8.1.9 => 8.1.10)`
- `@xarc/app-dev@8.1.10` `(8.1.9 => 8.1.10)`
- `@xarc/jsx-renderer@1.0.2` `(1.0.1 => 1.0.2)`
- `subapp-web@1.0.34` `(1.0.33 => 1.0.34)`

### Lerna Updated

- `@xarc/index-page@1.0.2` `(1.0.1 => 1.0.2)`
- `subapp-pbundle@0.0.28` `(0.0.27 => 0.0.28)`
- `subapp-react@0.0.25` `(0.0.24 => 0.0.25)`
- `subapp-redux@1.0.34` `(1.0.33 => 1.0.34)`
- `subapp-server@1.3.3` `(1.3.2 => 1.3.3)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: subapp ssr initial load ([#1719](https://github.com/electrode-io/electrode/pull/1719)) [commit](http://github.com/electrode-io/electrode/commit/5600ac0a59be27709b89971fdf4f45c0481f67f8)

- `packages/xarc-jsx-renderer`

  - [chore] more generated docs [commit](http://github.com/electrode-io/electrode/commit/6c2f30ee9b97e0549b03f2e4b427f8b088a2ecb6)

- `packages/subapp-web`

  - fix: subapp ssr initial load ([#1719](https://github.com/electrode-io/electrode/pull/1719)) [commit](http://github.com/electrode-io/electrode/commit/5600ac0a59be27709b89971fdf4f45c0481f67f8)

# 8/11/2020

- implement HTML log viewer using event source to do streaming
- retrieve app logs from dev admin's memory storage
- xarc-app-dev to ts - step 1: rename files
- convert xarc-app to ts
- move all dev related stuff to @xarc/app-dev
- ensure the HTML jsx template used xarc's createElement
- adding new API for customizing webpack configs
- Refactor SSR to improve initial subapp loading performance
- Load cdn mapping script for non js/css assets only if cdn option isenabled
- Removing source map url of runtime bundle

## Packages

### Directly Updated

- `@xarc/app@8.1.9` `(8.1.8 => 8.1.9)`
- `@xarc/app-dev@8.1.9` `(8.1.8 => 8.1.9)`
- `@xarc/create-app@3.0.10` `(3.0.9 => 3.0.10)`
- `@xarc/jsx-renderer@1.0.1` `(1.0.0 => 1.0.1)`
- `@xarc/webpack@8.1.1` `(8.1.0 => 8.1.1)`
- `subapp-server@1.3.2` `(1.3.1 => 1.3.2)`
- `subapp-util@1.1.1` `(1.1.0 => 1.1.1)`
- `subapp-web@1.0.33` `(1.0.32 => 1.0.33)`

### Lerna Updated

- `@xarc/index-page@1.0.1` `(1.0.0 => 1.0.1)`
- `subapp-pbundle@0.0.27` `(0.0.26 => 0.0.27)`
- `subapp-react@0.0.24` `(0.0.23 => 0.0.24)`
- `subapp-redux@1.0.33` `(1.0.32 => 1.0.33)`

## Commits

- `packages/xarc-app[-dev]`

  - implement HTML log viewer using event source to do streaming ([#1714](https://github.com/electrode-io/electrode/pull/1714)) [commit](http://github.com/electrode-io/electrode/commit/6ac370a218dfec9cae150e609174420d66cae553)
  - retrieve app logs from dev admin's memory storage ([#1713](https://github.com/electrode-io/electrode/pull/1713)) [commit](http://github.com/electrode-io/electrode/commit/5a4661d31e37a21504469cfaa1326416eb1fb09f)
  - tsc just compile please [commit](http://github.com/electrode-io/electrode/commit/46014c55a29658b674427031fa9b1d53d2989547)
  - xarc-app-dev to ts - step 1: rename files [commit](http://github.com/electrode-io/electrode/commit/c81c981f20d57038fb0f1a174bb60c6804e8cb1e)
  - fix dev dep [commit](http://github.com/electrode-io/electrode/commit/687cf885bffb1fdbd9dc1dcfb11d0dcf6eb095e4)
  - convert xarc-app to ts ([#1708](https://github.com/electrode-io/electrode/pull/1708)) [commit](http://github.com/electrode-io/electrode/commit/a847cd53b8bf9053a34435aeb5312aec8ea035c6)
  - move all dev related stuff to @xarc/app-dev ([#1707](https://github.com/electrode-io/electrode/pull/1707)) [commit](http://github.com/electrode-io/electrode/commit/ffedf1925ba8b81f4f8a5fc9d9b95e566935fb40)

- `packages/xarc-create-app`

  - move all dev related stuff to @xarc/app-dev ([#1707](https://github.com/electrode-io/electrode/pull/1707)) [commit](http://github.com/electrode-io/electrode/commit/ffedf1925ba8b81f4f8a5fc9d9b95e566935fb40)

- `packages/xarc-jsx-renderer`

  - ensure the HTML jsx template used xarc's createElement ([#1712](https://github.com/electrode-io/electrode/pull/1712)) [commit](http://github.com/electrode-io/electrode/commit/1201fde10c865e17c42fa5fd868973f42826fcd3)
  - update module-dev [commit](http://github.com/electrode-io/electrode/commit/96a568c3a5f38870f07535ccaff953f45acb7f4e)

- `packages/xarc-webpack`

  - adding new API for customizing webpack configs ([#1715](https://github.com/electrode-io/electrode/pull/1715)) [commit](http://github.com/electrode-io/electrode/commit/485508b6b4b008e53d0846367d54a29a47a998fb)
  - tsc just compile please [commit](http://github.com/electrode-io/electrode/commit/40f2ada8efde46defba52c552c2bda3e20773bda)
  - typescript conversion: step 1 - rename to .ts [commit](http://github.com/electrode-io/electrode/commit/ac3604428c622a8f12ab4350119de12e50d89187)
  - move all dev related stuff to @xarc/app-dev ([#1707](https://github.com/electrode-io/electrode/pull/1707)) [commit](http://github.com/electrode-io/electrode/commit/ffedf1925ba8b81f4f8a5fc9d9b95e566935fb40)

- `packages/subapp-server`

  - ensure the HTML jsx template used xarc's createElement ([#1712](https://github.com/electrode-io/electrode/pull/1712)) [commit](http://github.com/electrode-io/electrode/commit/1201fde10c865e17c42fa5fd868973f42826fcd3)

- `packages/subapp-util`

  - Refactor SSR to improve initial subapp loading performance ([#1717](https://github.com/electrode-io/electrode/pull/1717)) [commit](http://github.com/electrode-io/electrode/commit/1b033fb955fc8339befe48b1494762e785873376)

- `packages/subapp-web`

  - Refactor SSR to improve initial subapp loading performance ([#1717](https://github.com/electrode-io/electrode/pull/1717)) [commit](http://github.com/electrode-io/electrode/commit/1b033fb955fc8339befe48b1494762e785873376)
  - Load cdn mapping script for non js/css assets only if cdn option isenabled ([#1716](https://github.com/electrode-io/electrode/pull/1716)) [commit](http://github.com/electrode-io/electrode/commit/206b055d1ff2c4af8d74d452a1bd2c9fb0628823)
  - Removing source map url of runtime bundle ([#1718](https://github.com/electrode-io/electrode/pull/1718)) [commit](http://github.com/electrode-io/electrode/commit/a732136c9777041663cc6b1922c9ebf3d81dfa52)

# 7/22/2020

- new packages extracted from electrode-react-webapp: `@xarc/index-page`, `@xarc/jsx-renderer`, `@xarc/render-context`, `@xarc/tag-renderer`
- fix: minor fix to load the user dev proxy file
- fix webpack dev server port config for electrode-server using hapi@16
- update create app template deps

subapp-server:

- refactor subapp-sever and index-page to remove old SSR content
- subapp-server handle routes from dir for fastify

## Packages

### Directly Updated

- `@xarc/app@8.1.8` `(8.1.7 => 8.1.8)`
- `@xarc/app-dev@8.1.8` `(8.1.7 => 8.1.8)`
- `@xarc/create-app@3.0.9` `(3.0.8 => 3.0.9)`
- `@xarc/index-page@1.0.0` `(0.1.1 => 1.0.0)`
- `@xarc/jsx-renderer@1.0.0` `(0.1.1 => 1.0.0)`
- `@xarc/render-context@1.0.0` `(0.1.0 => 1.0.0)`
- `@xarc/tag-renderer@1.0.0` `(0.1.0 => 1.0.0)`
- `subapp-react@0.0.23` `(0.0.22 => 0.0.23)`
- `subapp-server@1.3.1` `(1.3.0 => 1.3.1)`
- `subapp-web@1.0.32` `(1.0.31 => 1.0.32)`

### Lerna Updated

- `subapp-pbundle@0.0.26` `(0.0.25 => 0.0.26)`
- `subapp-redux@1.0.32` `(1.0.31 => 1.0.32)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: minor fix to load the user dev proxy file ([#1706](https://github.com/electrode-io/electrode/pull/1706)) [commit](http://github.com/electrode-io/electrode/commit/11e13b30fefa92011e864fae34bfd37ea154a01a)
  - fix webpack dev server port config for electrode-server using hapi@16 ([#1705](https://github.com/electrode-io/electrode/pull/1705)) [commit](http://github.com/electrode-io/electrode/commit/6e91db2237174435ed2fc75c462d1950e47a8693)

- `packages/xarc-create-app`

  - update create app template deps [commit](http://github.com/electrode-io/electrode/commit/397ff9735c78083bbfb230466f3fb43ea8c7c087)

- `packages/xarc-index-page`

  - refactor subapp-sever and index-page to remove old SSR content [commit](http://github.com/electrode-io/electrode/commit/7231bb62ca8b5075477f7c9b00f359ff0fc27ef7)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/741a929a7b22f8dc8c9044fb9a0333982ba04630)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/06f122102edf59c039c89626950e354ce2948787)
  - updating tests for tag-renderer [commit](http://github.com/electrode-io/electrode/commit/05d4fbf17f2f005fd296d56fb5b3ea20558ee030)
  - rename updates 1 [commit](http://github.com/electrode-io/electrode/commit/e909552172a6a85c95dcecec40d279e98d609826)
  - rename xarc-webapp to xarc-index-page [commit](http://github.com/electrode-io/electrode/commit/9c94185d3a0805781881efe15f6ab3badba328bf)
  - refactor subapp-sever and index-page to remove old SSR content [commit](http://github.com/electrode-io/electrode/commit/6a06efb150d01bdcd31552446b519d2b29d70d75)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/bca34ccf30d63ce2d74a2c032fd63449f3e05ad8)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/91352c0e67c0cc43a4316030b39bc75adb1527ce)
  - updating tests for tag-renderer [commit](http://github.com/electrode-io/electrode/commit/eda64a0a028fe895e7a0d1ba234fb182b2602971)
  - rename updates 1 [commit](http://github.com/electrode-io/electrode/commit/8e3cd0a077734cf7c93da5f23787929cf8c6b79f)
  - rename xarc-webapp to xarc-index-page [commit](http://github.com/electrode-io/electrode/commit/71fe059e933b93541cabd3676d915ef7131f1f7a)
  - [major] mark for major release [commit](http://github.com/electrode-io/electrode/commit/41cfce9c840a542bdc086b15f45bb234b31a72c8)

- `packages/xarc-jsx-renderer`

  - rename LoadTokenHandler to RegisterTokenIds [commit](http://github.com/electrode-io/electrode/commit/8309e3b459e4c840a2acba1b0a0cca25411a04b6)
  - update subapp samples ([#1701](https://github.com/electrode-io/electrode/pull/1701)) [commit](http://github.com/electrode-io/electrode/commit/787df489e0388a6af513262f920fb78d9a468624)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/06f122102edf59c039c89626950e354ce2948787)
  - cleanup and fixes for xarc/webapp packages ([#1686](https://github.com/electrode-io/electrode/pull/1686)) [commit](http://github.com/electrode-io/electrode/commit/b985f4ebc0e26bd3238df9db9440857f5107654e)
  - jsx-renderer module [commit](http://github.com/electrode-io/electrode/commit/e9ac516dab68bac2121d3673b1966d4f5a3166a6)
  - rename LoadTokenHandler to RegisterTokenIds [commit](http://github.com/electrode-io/electrode/commit/1c88de1395d1a80ea41a819f859ac21f6d1c8b83)
  - update subapp samples ([#1701](https://github.com/electrode-io/electrode/pull/1701)) [commit](http://github.com/electrode-io/electrode/commit/f8777d3f2f5d0bdd4aaca1dc2e9c36c4adab06e3)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/91352c0e67c0cc43a4316030b39bc75adb1527ce)
  - cleanup and fixes for xarc/webapp packages ([#1686](https://github.com/electrode-io/electrode/pull/1686)) [commit](http://github.com/electrode-io/electrode/commit/2e2201cfb363af32efa6809c48578595e3329fae)
  - jsx-renderer module [commit](http://github.com/electrode-io/electrode/commit/d1d2524ce3f9d8b9f36b38e7118ff80ab6cbf6c0)
  - [major] mark for major release [commit](http://github.com/electrode-io/electrode/commit/41cfce9c840a542bdc086b15f45bb234b31a72c8)

- `packages/xarc-render-context`

  - new tag-renderer base on ES6 strings [commit](http://github.com/electrode-io/electrode/commit/bd9891583539fe131a5416a294ebd0009585e81b)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/741a929a7b22f8dc8c9044fb9a0333982ba04630)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/06f122102edf59c039c89626950e354ce2948787)
  - updates for @xarc/webapp, @xarc/simple-renderer ([#1685](https://github.com/electrode-io/electrode/pull/1685)) [commit](http://github.com/electrode-io/electrode/commit/d2d8389e8aa69f430a0ca12150056a7ee0eded82)
  - tests for xarc-render-context ([#1671](https://github.com/electrode-io/electrode/pull/1671)) [commit](http://github.com/electrode-io/electrode/commit/aef1ebd2366a0d375e98eb5dcb6355a83f7de08c)
  - jsx-renderer module [commit](http://github.com/electrode-io/electrode/commit/e9ac516dab68bac2121d3673b1966d4f5a3166a6)
  - new tag-renderer base on ES6 strings [commit](http://github.com/electrode-io/electrode/commit/b35ae209974e23f85d9db78c248521115591444b)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/bca34ccf30d63ce2d74a2c032fd63449f3e05ad8)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/91352c0e67c0cc43a4316030b39bc75adb1527ce)
  - updates for @xarc/webapp, @xarc/simple-renderer ([#1685](https://github.com/electrode-io/electrode/pull/1685)) [commit](http://github.com/electrode-io/electrode/commit/58f0fdaac1b4d5ebc499a67bba3a49ff16734fa6)
  - tests for xarc-render-context ([#1671](https://github.com/electrode-io/electrode/pull/1671)) [commit](http://github.com/electrode-io/electrode/commit/27bc4a2da0ba966affe4db4ddbb3f36dc2392ac9)
  - jsx-renderer module [commit](http://github.com/electrode-io/electrode/commit/d1d2524ce3f9d8b9f36b38e7118ff80ab6cbf6c0)
  - [major] mark for major release [commit](http://github.com/electrode-io/electrode/commit/41cfce9c840a542bdc086b15f45bb234b31a72c8)

- `packages/xarc-tag-renderer`

  - add tag-renderer template to subapp-server ([#1703](https://github.com/electrode-io/electrode/pull/1703)) [commit](http://github.com/electrode-io/electrode/commit/8e7547d8b112c79fb925115a6a8df3fbcfaf1276)
  - xarc/tag-renderer support rendering sub templates ([#1702](https://github.com/electrode-io/electrode/pull/1702)) [commit](http://github.com/electrode-io/electrode/commit/3ea2fe7dab005fa9daa6935b8f60c175d928574d)
  - new tag-renderer base on ES6 strings [commit](http://github.com/electrode-io/electrode/commit/bd9891583539fe131a5416a294ebd0009585e81b)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/741a929a7b22f8dc8c9044fb9a0333982ba04630)
  - rename updates 1 [commit](http://github.com/electrode-io/electrode/commit/e909552172a6a85c95dcecec40d279e98d609826)
  - rename xarc-simple-renderer to xarc-tag-renderer [commit](http://github.com/electrode-io/electrode/commit/92e10de1bdf3116045a9bfbfa8bc2e26593f7936)
  - new tag-renderer base on ES6 strings [commit](http://github.com/electrode-io/electrode/commit/b35ae209974e23f85d9db78c248521115591444b)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/bca34ccf30d63ce2d74a2c032fd63449f3e05ad8)
  - rename updates 1 [commit](http://github.com/electrode-io/electrode/commit/8e3cd0a077734cf7c93da5f23787929cf8c6b79f)
  - rename xarc-simple-renderer to xarc-tag-renderer [commit](http://github.com/electrode-io/electrode/commit/bec397fa369560875c9ac91ed2390cfc4b98caf5)
  - [major] mark for major release [commit](http://github.com/electrode-io/electrode/commit/41cfce9c840a542bdc086b15f45bb234b31a72c8)

- `packages/subapp-react`

  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/741a929a7b22f8dc8c9044fb9a0333982ba04630)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/bca34ccf30d63ce2d74a2c032fd63449f3e05ad8)

- `packages/subapp-server`

  - add tag-renderer template to subapp-server ([#1703](https://github.com/electrode-io/electrode/pull/1703)) [commit](http://github.com/electrode-io/electrode/commit/8e7547d8b112c79fb925115a6a8df3fbcfaf1276)
  - Adding changes to load subapps module from master [commit](http://github.com/electrode-io/electrode/commit/28dea6de7ef88f07318274b25c1d9a42a046864e)
  - rename LoadTokenHandler to RegisterTokenIds [commit](http://github.com/electrode-io/electrode/commit/8309e3b459e4c840a2acba1b0a0cca25411a04b6)
  - update subapp samples ([#1701](https://github.com/electrode-io/electrode/pull/1701)) [commit](http://github.com/electrode-io/electrode/commit/787df489e0388a6af513262f920fb78d9a468624)
  - refactor subapp-sever and index-page to remove old SSR content [commit](http://github.com/electrode-io/electrode/commit/7231bb62ca8b5075477f7c9b00f359ff0fc27ef7)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/741a929a7b22f8dc8c9044fb9a0333982ba04630)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/06f122102edf59c039c89626950e354ce2948787)
  - rename updates 1 [commit](http://github.com/electrode-io/electrode/commit/e909552172a6a85c95dcecec40d279e98d609826)
  - cleanup and fixes for xarc/webapp packages ([#1686](https://github.com/electrode-io/electrode/pull/1686)) [commit](http://github.com/electrode-io/electrode/commit/b985f4ebc0e26bd3238df9db9440857f5107654e)
  - updates for @xarc/webapp, @xarc/simple-renderer ([#1685](https://github.com/electrode-io/electrode/pull/1685)) [commit](http://github.com/electrode-io/electrode/commit/d2d8389e8aa69f430a0ca12150056a7ee0eded82)
  - extract tokens from electrode-react-webapp into @xarc/webapp for subapp-server ([#1681](https://github.com/electrode-io/electrode/pull/1681)) [commit](http://github.com/electrode-io/electrode/commit/a7f768feaaa1feabbe53e71d69e2b6e32ec955b4)
  - rename LoadTokenHandler to RegisterTokenIds [commit](http://github.com/electrode-io/electrode/commit/1c88de1395d1a80ea41a819f859ac21f6d1c8b83)
  - update subapp samples ([#1701](https://github.com/electrode-io/electrode/pull/1701)) [commit](http://github.com/electrode-io/electrode/commit/f8777d3f2f5d0bdd4aaca1dc2e9c36c4adab06e3)
  - refactor subapp-sever and index-page to remove old SSR content [commit](http://github.com/electrode-io/electrode/commit/6a06efb150d01bdcd31552446b519d2b29d70d75)
  - subapp-server handle routes from dir for fastify [commit](http://github.com/electrode-io/electrode/commit/bca34ccf30d63ce2d74a2c032fd63449f3e05ad8)
  - refactor index-page/jsx-renderer/subapp-server [commit](http://github.com/electrode-io/electrode/commit/91352c0e67c0cc43a4316030b39bc75adb1527ce)
  - rename updates 1 [commit](http://github.com/electrode-io/electrode/commit/8e3cd0a077734cf7c93da5f23787929cf8c6b79f)
  - cleanup and fixes for xarc/webapp packages ([#1686](https://github.com/electrode-io/electrode/pull/1686)) [commit](http://github.com/electrode-io/electrode/commit/2e2201cfb363af32efa6809c48578595e3329fae)
  - updates for @xarc/webapp, @xarc/simple-renderer ([#1685](https://github.com/electrode-io/electrode/pull/1685)) [commit](http://github.com/electrode-io/electrode/commit/58f0fdaac1b4d5ebc499a67bba3a49ff16734fa6)
  - extract tokens from electrode-react-webapp into @xarc/webapp for subapp-server ([#1681](https://github.com/electrode-io/electrode/pull/1681)) [commit](http://github.com/electrode-io/electrode/commit/c150185075d8400edfaece4cb5c014657b34bd77)

- `packages/subapp-web`

  - add tag-renderer template to subapp-server ([#1703](https://github.com/electrode-io/electrode/pull/1703)) [commit](http://github.com/electrode-io/electrode/commit/8e7547d8b112c79fb925115a6a8df3fbcfaf1276)

# 7/16/2020

## Packages

- [minor] Loading subapps from a different repo

### Directly Updated

- `@xarc/webpack@8.1.0` `(8.0.7 => 8.1.0)`
- `subapp-server@1.3.0` `(1.2.4 => 1.3.0)`
- `subapp-util@1.1.0` `(1.0.5 => 1.1.0)`

### Lerna Updated

- `@xarc/app@8.1.7` `(8.1.6 => 8.1.7)`
- `@xarc/app-dev@8.1.7` `(8.1.6 => 8.1.7)`
- `subapp-pbundle@0.0.25` `(0.0.24 => 0.0.25)`
- `subapp-react@0.0.22` `(0.0.21 => 0.0.22)`
- `subapp-redux@1.0.31` `(1.0.30 => 1.0.31)`
- `subapp-web@1.0.31` `(1.0.30 => 1.0.31)`

## Commits

- `packages/xarc-webpack`

  - [minor] Loading subapps from a different repo ([#1700](https://github.com/electrode-io/electrode/pull/1700)) [commit](http://github.com/electrode-io/electrode/commit/c3e45e030249ecbcacd46db46000870c1e24f5f7)

- `packages/subapp-server`

  - [minor] Loading subapps from a different repo ([#1700](https://github.com/electrode-io/electrode/pull/1700)) [commit](http://github.com/electrode-io/electrode/commit/c3e45e030249ecbcacd46db46000870c1e24f5f7)

- `packages/subapp-util`

  - [minor] Loading subapps from a different repo ([#1700](https://github.com/electrode-io/electrode/pull/1700)) [commit](http://github.com/electrode-io/electrode/commit/c3e45e030249ecbcacd46db46000870c1e24f5f7)

- `docs`

  - deploy new docs [commit](http://github.com/electrode-io/electrode/commit/147187239efe7610c429197d5078d340190a03db)

- `docusaurus`

  - docs reconfig ([#1698](https://github.com/electrode-io/electrode/pull/1698)) [commit](http://github.com/electrode-io/electrode/commit/c426720224f11c13b24b6b4f124fd983c8d0ff16)

# 7/10/2020

- remove bluebird from electrode-react-webapp
- update to jest v26
- update create-app template deps

## Packages

- `@xarc/create-app@3.0.8` `(3.0.7 => 3.0.8)`
- `electrode-archetype-opt-jest@26.0.0` `(25.0.0 => 26.0.0)`
- `electrode-react-webapp@4.0.0` `(3.8.10 => 4.0.0)`

## Commits

- `packages/xarc-create-app`

  - update create-app template deps [commit](http://github.com/electrode-io/electrode/commit/23b7671d8879bc3cbd6bebdbef6dc34409430d1c)
  - updated GitBook to Docusaurus ([#1673](https://github.com/electrode-io/electrode/pull/1673)) [commit](http://github.com/electrode-io/electrode/commit/2abe85bcf607ef3a92802ed741efcfff67776fba)

- `packages/electrode-archetype-opt-jest`

  - update to jest 26.1 ([#1695](https://github.com/electrode-io/electrode/pull/1695)) [commit](http://github.com/electrode-io/electrode/commit/38d721fef899aa71ea1547caa2d9d098b8cbafbe)
  - [major] mark for major bump [commit](http://github.com/electrode-io/electrode/commit/3b118973966ba53190cbbb1763d5512f55546a69)

- `packages/electrode-react-webapp`

  - [major] remove bluebird [commit](http://github.com/electrode-io/electrode/commit/075868643636a72085ce5e15eef1c3466bd2bdf3)
  - fix: handle token module in es6 format [commit](http://github.com/electrode-io/electrode/commit/e2db07ebfda3888ed9461a5835341f8a2426d8ee)

* `docs`

  - fix docusaurus files [commit](http://github.com/electrode-io/electrode/commit/d943ec354c7102f704362f76982d340dc8ccc1fe)
  - updated GitBook to Docusaurus ([#1673](https://github.com/electrode-io/electrode/pull/1673)) [commit](http://github.com/electrode-io/electrode/commit/2abe85bcf607ef3a92802ed741efcfff67776fba)

* `docusaurus`

  - fix docusaurus files [commit](http://github.com/electrode-io/electrode/commit/d943ec354c7102f704362f76982d340dc8ccc1fe)

* `MISC`

  - Update changelog [commit](http://github.com/electrode-io/electrode/commit/01da08b2c6b4d0792ae5502e8398eaa7865d71b9)
  - update CONTRIBUTING.md [commit](http://github.com/electrode-io/electrode/commit/f2b5119706384ed7dfd1c4901a8d5828c0a7d51b)
  - [patch][bug] Fix the broken contribution link ([#1689](https://github.com/electrode-io/electrode/pull/1689)) [commit](http://github.com/electrode-io/electrode/commit/7a7f31b6a9193a635e4db578609e21389b40cb90)

# 6/30/2020

- fix: handle token module in es6 format

## Packages

### Directly Updated

- `electrode-react-webapp@3.8.10` `(3.8.9 => 3.8.10)`

### Lerna Updated

- `subapp-pbundle@0.0.24` `(0.0.23 => 0.0.24)`
- `subapp-react@0.0.21` `(0.0.20 => 0.0.21)`
- `subapp-redux@1.0.30` `(1.0.29 => 1.0.30)`
- `subapp-server@1.2.4` `(1.2.3 => 1.2.4)`
- `subapp-web@1.0.30` `(1.0.29 => 1.0.30)`

## Commits

- `packages/electrode-react-webapp`

  - fix: handle token module in es6 format [commit](http://github.com/electrode-io/electrode/commit/e2db07ebfda3888ed9461a5835341f8a2426d8ee)

- `docs`

  - updated GitBook to Docusaurus ([#1673](https://github.com/electrode-io/electrode/pull/1673)) [commit](http://github.com/electrode-io/electrode/commit/2abe85bcf607ef3a92802ed741efcfff67776fba)

- `MISC`

  - update CONTRIBUTING.md [commit](http://github.com/electrode-io/electrode/commit/f2b5119706384ed7dfd1c4901a8d5828c0a7d51b)

# 6/17/2020

- create-app - take app directory as argument
- add web SSR timing reporting events

## Packages

### Directly Updated

- `@xarc/app@8.1.6` `(8.1.5 => 8.1.6)`
- `@xarc/app-dev@8.1.6` `(8.1.5 => 8.1.6)`
- `@xarc/create-app@3.0.7` `(3.0.6 => 3.0.7)`
- `subapp-server@1.2.3` `(1.2.2 => 1.2.3)`
- `subapp-web@1.0.29` `(1.0.28 => 1.0.29)`

### Lerna Updated

- `subapp-pbundle@0.0.23` `(0.0.22 => 0.0.23)`
- `subapp-react@0.0.20` `(0.0.19 => 0.0.20)`
- `subapp-redux@1.0.29` `(1.0.28 => 1.0.29)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: use proper dev-admin interactive flag [commit](http://github.com/electrode-io/electrode/commit/fc43f34f8a088a8cc68063c0f91a5910b943dff2)

- `packages/xarc-create-app`

  - create-app - take app directory as argument ([#1674](https://github.com/electrode-io/electrode/pull/1674)) [commit](http://github.com/electrode-io/electrode/commit/6c38df590f2475e15cbddda381d83656bde53260)

- `packages/subapp-server`

  - add web SSR timing reporting events ([#1672](https://github.com/electrode-io/electrode/pull/1672)) [commit](http://github.com/electrode-io/electrode/commit/6d8eaf9c64268da52b4f0c3665ad91ab8772be46)

- `packages/subapp-web`

  - add web SSR timing reporting events ([#1672](https://github.com/electrode-io/electrode/pull/1672)) [commit](http://github.com/electrode-io/electrode/commit/6d8eaf9c64268da52b4f0c3665ad91ab8772be46)

# 6/11/2020

- fix: disable dev admin interactivity in CI

## Packages

- `@xarc/app@8.1.5` `(8.1.4 => 8.1.5)`
- `@xarc/app-dev@8.1.5` `(8.1.4 => 8.1.5)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: disable dev admin interactivity in CI ([#1670](https://github.com/electrode-io/electrode/pull/1670)) [commit](http://github.com/electrode-io/electrode/commit/22278a551e01b88fff03a2af844bbcba7dd899c7)

# 6/10/2020

- remove beta tag

## Packages

- `@xarc/app@8.1.4` `(8.1.3 => 8.1.4)`
- `@xarc/app-dev@8.1.4` `(8.1.3 => 8.1.4)`

## Commits

- `packages/xarc-app[-dev]`

  - remove beta tag [commit](http://github.com/electrode-io/electrode/commit/0a7cebeee8c5f65f316c673b6f7c6f9f099cafb9)

# 6/10/2020

- Preload scripts and load styles in <head>
- Inline webpack runtime js bundle for production
- feat: archetypes as functions

## Packages

### Directly Updated

- `@xarc/app@8.1.3` `(8.1.2 => 8.1.3)`
- `@xarc/app-dev@8.1.3` `(8.1.2 => 8.1.3)`
- `@xarc/create-app@3.0.6` `(3.0.5 => 3.0.6)`
- `@xarc/webpack@8.0.7` `(8.0.6-beta.0 => 8.0.7)`
- `subapp-server@1.2.2` `(1.2.1 => 1.2.2)`
- `subapp-web@1.0.28` `(1.0.27 => 1.0.28)`

### Lerna Updated

- `subapp-pbundle@0.0.22` `(0.0.21 => 0.0.22)`
- `subapp-react@0.0.19` `(0.0.18 => 0.0.19)`
- `subapp-redux@1.0.28` `(1.0.27 => 1.0.28)`

## Commits

- `packages/xarc-app[-dev]`

  - feat: archetypes as functions ([#1646](https://github.com/electrode-io/electrode/pull/1646)) [commit](http://github.com/electrode-io/electrode/commit/3d847eec1ebfd5ef7c7d88b2bdc5c0d0889a8f82)

- `packages/xarc-create-app`

  - Inline webpack runtime js bundle for production ([#1662](https://github.com/electrode-io/electrode/pull/1662)) [commit](http://github.com/electrode-io/electrode/commit/cf64c597891e1762fa1803a6c9759918e65fc3ff)
  - [chore]: rename package create-app to xarc-create-app [commit](http://github.com/electrode-io/electrode/commit/e638ec3372f379ce35c5c379713bdf2cfd2c4af4)

- `packages/xarc-webpack`

  - feat: archetypes as functions ([#1646](https://github.com/electrode-io/electrode/pull/1646)) [commit](http://github.com/electrode-io/electrode/commit/3d847eec1ebfd5ef7c7d88b2bdc5c0d0889a8f82)

- `packages/subapp-pkg-util`

  - fix test [commit](http://github.com/electrode-io/electrode/commit/5a59e2b165ab6ed8f05d06bf0a8a66d9b19c4fec)

- `packages/subapp-server`

  - Preload scripts and load styles in <head> ([#1659](https://github.com/electrode-io/electrode/pull/1659)) [commit](http://github.com/electrode-io/electrode/commit/94a60acf874830034bd97f34141fa703f23cd69e)
  - feat: archetypes as functions ([#1646](https://github.com/electrode-io/electrode/pull/1646)) [commit](http://github.com/electrode-io/electrode/commit/3d847eec1ebfd5ef7c7d88b2bdc5c0d0889a8f82)

- `packages/subapp-web`

  - Preload scripts and load styles in <head> ([#1659](https://github.com/electrode-io/electrode/pull/1659)) [commit](http://github.com/electrode-io/electrode/commit/94a60acf874830034bd97f34141fa703f23cd69e)
  - Inline webpack runtime js bundle for production ([#1662](https://github.com/electrode-io/electrode/pull/1662)) [commit](http://github.com/electrode-io/electrode/commit/cf64c597891e1762fa1803a6c9759918e65fc3ff)
  - dep: xaa 1.6.0 ([#1669](https://github.com/electrode-io/electrode/pull/1669)) [commit](http://github.com/electrode-io/electrode/commit/512cdb5ca887e1f8933415ce7a41ca24c82d852d)

# 5/21/2020

- fix: wds fastify files serving
- fix: mock-cloud create config dir and set NODE_ENV
- update: create-app templates and dep

## Packages

- `@xarc/app@8.1.2` `(8.1.1 => 8.1.2)`
- `@xarc/app-dev@8.1.2` `(8.1.1 => 8.1.2)`
- `@xarc/create-app@3.0.5` `(3.0.4 => 3.0.5)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: wds fastify files serving ([#1650](https://github.com/electrode-io/electrode/pull/1650)) [commit](http://github.com/electrode-io/electrode/commit/3047b9e2a0716a0907b3d6279a12b0a14663d749)
  - fix: mock-cloud create config dir and set NODE_ENV ([#1649](https://github.com/electrode-io/electrode/pull/1649)) [commit](http://github.com/electrode-io/electrode/commit/49774499363b717f4aa25a02096a966ef42b973e)

- `packages/create-app`

  - update: create-app templates and dep ([#1655](https://github.com/electrode-io/electrode/pull/1655)) [commit](http://github.com/electrode-io/electrode/commit/18e36091d5647e6999a8eda825ba23cec955652b)

# 5/19/2020

- fix: minor dev-admin and fastify plugin fix
- fix: subapp-server hapi plugin loading options
- fix: use loadjs to support CSS bundles

## Packages

### Directly Updated

- `@xarc/app@8.1.1` `(8.1.0 => 8.1.1)`
- `@xarc/app-dev@8.1.1` `(8.1.0 => 8.1.1)`
- `subapp-server@1.2.1` `(1.2.0 => 1.2.1)`
- `subapp-web@1.0.27` `(1.0.26 => 1.0.27)`

### Lerna Updated

- `subapp-pbundle@0.0.21` `(0.0.20 => 0.0.21)`
- `subapp-react@0.0.18` `(0.0.17 => 0.0.18)`
- `subapp-redux@1.0.27` `(1.0.26 => 1.0.27)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: minor dev-admin and fastify plugin fix ([#1644](https://github.com/electrode-io/electrode/pull/1644)) [commit](http://github.com/electrode-io/electrode/commit/100c6b12c3ca79049840bd7ebe812f1384f6a2eb)

- `packages/subapp-server`

  - fix: subapp-server hapi plugin loading options ([#1648](https://github.com/electrode-io/electrode/pull/1648)) [commit](http://github.com/electrode-io/electrode/commit/ccbff68c838f99711cfb712d98fadd86d3b62509)

- `packages/subapp-web`

  - fix: use loadjs to support CSS bundles ([#1647](https://github.com/electrode-io/electrode/pull/1647)) [commit](http://github.com/electrode-io/electrode/commit/d1186b0e3f8f8e541c7107c7a558259a084c0887)

# 5/19/2020

- feat: archetypes as functions

## Packages

- `@xarc/app@8.1.1-beta.0` `(8.1.0 => 8.1.1-beta.0)`
- `@xarc/app-dev@8.1.1-beta.0` `(8.1.0 => 8.1.1-beta.0)`
- `@xarc/webpack@8.0.6-beta.0` `(8.0.5 => 8.0.6-beta.0)`
- `subapp-server@1.2.1-beta.0` `(1.2.0 => 1.2.1-beta.0)`

## Commits

- `packages/xarc-app[-dev]`

  - feat: archetypes as functions ([#1646](https://github.com/electrode-io/electrode/pull/1646)) [commit](http://github.com/electrode-io/electrode/commit/3d847eec1ebfd5ef7c7d88b2bdc5c0d0889a8f82)
  - fix: minor dev-admin and fastify plugin fix ([#1644](https://github.com/electrode-io/electrode/pull/1644)) [commit](http://github.com/electrode-io/electrode/commit/100c6b12c3ca79049840bd7ebe812f1384f6a2eb)

- `packages/xarc-webpack`

  - feat: archetypes as functions ([#1646](https://github.com/electrode-io/electrode/pull/1646)) [commit](http://github.com/electrode-io/electrode/commit/3d847eec1ebfd5ef7c7d88b2bdc5c0d0889a8f82)

- `packages/subapp-server`

  - feat: archetypes as functions ([#1646](https://github.com/electrode-io/electrode/pull/1646)) [commit](http://github.com/electrode-io/electrode/commit/3d847eec1ebfd5ef7c7d88b2bdc5c0d0889a8f82)

- `MISC`

  - add beta tag to lerna config [commit](http://github.com/electrode-io/electrode/commit/07742ed1843956a6ded2edcb0bca9bd1e7427cf4)

# 5/17/2020

- fix: use fastify-server for serving dev-server
- update to mime version 2
- [minor]: add fastify support to subapp-server

## Packages

- `@xarc/app@8.1.0` `(8.0.21 => 8.1.0)`
- `@xarc/app-dev@8.1.0` `(8.0.21 => 8.1.0)`
- `subapp-server@1.2.0` `(1.1.18 => 1.2.0)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: use fastify-server for serving dev-server ([#1640](https://github.com/electrode-io/electrode/pull/1640)) [commit](http://github.com/electrode-io/electrode/commit/fcceeb0c6a129fb615c5e17ca17153dc1f7b9864)
  - update to mime version 2 ([#1639](https://github.com/electrode-io/electrode/pull/1639)) [commit](http://github.com/electrode-io/electrode/commit/4a57109b4754ea420e693c347688518230cd9676)
  - [minor]: add fastify support to subapp-server ([#1642](https://github.com/electrode-io/electrode/pull/1642)) [commit](http://github.com/electrode-io/electrode/commit/c8d704530427b5bd623aed6fcc173e28c4092f77)

- `packages/subapp-server`

  - fix: consistent error response for routes ([#1638](https://github.com/electrode-io/electrode/pull/1638)) [commit](http://github.com/electrode-io/electrode/commit/874513becccc945934eb17113008d5a3c0995aba)
  - [minor]: add fastify support to subapp-server ([#1642](https://github.com/electrode-io/electrode/pull/1642)) [commit](http://github.com/electrode-io/electrode/commit/c8d704530427b5bd623aed6fcc173e28c4092f77)

# 5/7/2020

- dep: isomorphic-loader 3.1.0
- feat: ^C 2x makes dev-admin exit
- feat: dev-admin cleans child process automatically

## Packages

- `@xarc/app@8.0.21` `(8.0.20 => 8.0.21)`
- `@xarc/app-dev@8.0.21` `(8.0.20 => 8.0.21)`
- `@xarc/webpack@8.0.5` `(8.0.4 => 8.0.5)`

## Commits

- `packages/xarc-app[-dev]`

  - dep: isomorphic-loader 3.1.0 ([#1636](https://github.com/electrode-io/electrode/pull/1636)) [commit](http://github.com/electrode-io/electrode/commit/7e0da3ac9575288857bcc5ffda2786e342bee0c8)
  - feat: ^C 2x makes dev-admin exit ([#1634](https://github.com/electrode-io/electrode/pull/1634)) [commit](http://github.com/electrode-io/electrode/commit/fcf78dadb24b5273d80998947b84911209197220)
  - feat: dev-admin cleans child process automatically ([#1633](https://github.com/electrode-io/electrode/pull/1633)) [commit](http://github.com/electrode-io/electrode/commit/fd2c408507a91b2880295327ac5dd1be0a50ed4b)

- `packages/xarc-webpack`

  - dep: isomorphic-loader 3.1.0 ([#1636](https://github.com/electrode-io/electrode/pull/1636)) [commit](http://github.com/electrode-io/electrode/commit/7e0da3ac9575288857bcc5ffda2786e342bee0c8)

- `.github`

  - remove node 14 from github CI [commit](http://github.com/electrode-io/electrode/commit/7e0ccc4ae539284b0478553bad92d676d67a343a)
  - docs(github): one-command solution for collecting system stats ([#1637](https://github.com/electrode-io/electrode/pull/1637)) [commit](http://github.com/electrode-io/electrode/commit/6926618064aadaa6b24aa197a9af53881bb2d6f4)

# 4/29/2020

- added: mechanism to defer initial state read for sub apps

## Packages

### Directly Updated

- `subapp-web@1.0.26` `(1.0.25 => 1.0.26)`

### Lerna Updated

- `subapp-pbundle@0.0.20` `(0.0.19 => 0.0.20)`
- `subapp-react@0.0.17` `(0.0.16 => 0.0.17)`
- `subapp-redux@1.0.26` `(1.0.25 => 1.0.26)`

## Commits

- `packages/subapp-web`

  - added: mechanism to defer initial state read for sub apps ([#1630](https://github.com/electrode-io/electrode/pull/1630)) [commit](http://github.com/electrode-io/electrode/commit/bb36efb4f1f10db27b2d63c8eecdcd2a9f915275)
  - handle getInitialState for queued subapp starts ([#1632](https://github.com/electrode-io/electrode/pull/1632)) [commit](http://github.com/electrode-io/electrode/commit/2233fa82fb2f9dc6051cdf64d0bc9b6150b94998)

# 4/27/2020

- fix: update cdn mock to mime 1.0 downgrade

## Packages

- `@xarc/app@8.0.20` `(8.0.19 => 8.0.20)`
- `@xarc/app-dev@8.0.20` `(8.0.19 => 8.0.20)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: update cdn mock to mime 1.0 downgrade ([#1629](https://github.com/electrode-io/electrode/pull/1629)) [commit](http://github.com/electrode-io/electrode/commit/80ac506fcbc7a5e7e8efc4ece4ce66f4c8f0f524)

# 4/27/2020

- fix: upgrade fs-extra from 0.26.7 to 0.30.0
- fix: show some timing in dev admin startup
- feat: support mock CDN in dev-proxy for mock prod mode
- fix: upgrade karma-webpack from 4.0.0-rc.3 to 4.0.2

## Packages

- `@xarc/app@8.0.19` `(8.0.18 => 8.0.19)`
- `@xarc/app-dev@8.0.19` `(8.0.18 => 8.0.19)`
- `electrode-archetype-opt-karma@3.0.2` `(3.0.1 => 3.0.2)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: upgrade fs-extra from 0.26.7 to 0.30.0 ([#1621](https://github.com/electrode-io/electrode/pull/1621)) [commit](http://github.com/electrode-io/electrode/commit/47e249d4fb96c85be87ee2fa74216dba8892f29f)
  - fix: show some timing in dev admin startup ([#1620](https://github.com/electrode-io/electrode/pull/1620)) [commit](http://github.com/electrode-io/electrode/commit/b179ac5ceece0ab8bb1d52f1350e587440bd1839)
  - feat: support mock CDN in dev-proxy for mock prod mode ([#1627](https://github.com/electrode-io/electrode/pull/1627)) [commit](http://github.com/electrode-io/electrode/commit/638ed9b718082457084cdcdcb8aea286c6679d86)

- `packages/electrode-archetype-opt-karma`

  - fix: upgrade karma-webpack from 4.0.0-rc.3 to 4.0.2 ([#1625](https://github.com/electrode-io/electrode/pull/1625)) [commit](http://github.com/electrode-io/electrode/commit/c36f7ee7737b797d8a1143f18d49147f4136afc6)

# 4/23/2020

- fix: allow --inspect option to debug dev-admin
- search for dev certs from module in devDependencies
- fix: handle non JS/CSS assets for CDN

## Packages

### Directly Updated

- `@xarc/app@8.0.18` `(8.0.17 => 8.0.18)`
- `@xarc/app-dev@8.0.18` `(8.0.17 => 8.0.18)`
- `subapp-web@1.0.25` `(1.0.24 => 1.0.25)`

### Lerna Updated

- `@xarc/webpack@8.0.4` `(8.0.3 => 8.0.4)`
- `subapp-pbundle@0.0.19` `(0.0.18 => 0.0.19)`
- `subapp-react@0.0.16` `(0.0.15 => 0.0.16)`
- `subapp-redux@1.0.25` `(1.0.24 => 1.0.25)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: allow --inspect option to debug dev-admin ([#1613](https://github.com/electrode-io/electrode/pull/1613)) [commit](http://github.com/electrode-io/electrode/commit/1c9fc8d596262083cc3b6e9a9c599f6e61682737)
  - fix: CI failing due to linting errors [commit](http://github.com/electrode-io/electrode/commit/43436adca1deef5da8108aa7a4be9eca7505c63f)
  - search for dev certs from module in devDependencies ([#1612](https://github.com/electrode-io/electrode/pull/1612)) [commit](http://github.com/electrode-io/electrode/commit/268ce953399287df39a221bcceb8d0801b2a5543)

- `packages/subapp-web`

  - fix: handle non JS/CSS assets for CDN ([#1614](https://github.com/electrode-io/electrode/pull/1614)) [commit](http://github.com/electrode-io/electrode/commit/948658578c89224a219d0b604b44353e816f53a4)

- `MISC`

  - npmignore [commit](http://github.com/electrode-io/electrode/commit/e25f2a7768b64560eb6d13400ba24ba79b16afba)
  - 1.1.1 [commit](http://github.com/electrode-io/electrode/commit/118c4f605fcde4580d5fa9664de78739c47f50b5)
  - 1.1.0 [commit](http://github.com/electrode-io/electrode/commit/d8ce52379827a0d28f4b68b87b750796efd78e77)
  - Replace const with var to make bundle output friendlier to old IE. ([#1](https://github.com/electrode-io/electrode/pull/1)) [commit](http://github.com/electrode-io/electrode/commit/f84212d6f8b6e92bc3730c6475add5e87703384e)
  - update loader-utils [commit](http://github.com/electrode-io/electrode/commit/b1b360e27e681eb2f4f17599affaa11e518f834f)

# 4/20/2020

- improve dev-admin log handling and HTML viewer
- Fix subapp manifests found in sub directories of src/
- provide original error for debug purposes

## Packages

- `@xarc/app@8.0.17` `(8.0.16 => 8.0.17)`
- `@xarc/app-dev@8.0.17` `(8.0.16 => 8.0.17)`
- `@xarc/webpack@8.0.3` `(8.0.2 => 8.0.3)`
- `subapp-server@1.1.18` `(1.1.17 => 1.1.18)`

## Commits

- `packages/xarc-app[-dev]`

  - fix HTML log viewer fetching logs across different runs ([#1605](https://github.com/electrode-io/electrode/pull/1605)) [commit](http://github.com/electrode-io/electrode/commit/78201996f097382dc4ecfd8543ee4f218585494c)
  - improve HTML viewer ([#1604](https://github.com/electrode-io/electrode/pull/1604)) [commit](http://github.com/electrode-io/electrode/commit/11f6e6cde026b30d1662e6f369ddcfedd80fafe5)
  - fix: show all app log by default ([#1603](https://github.com/electrode-io/electrode/pull/1603)) [commit](http://github.com/electrode-io/electrode/commit/96af8972d841da4812f117b893afbf73b770ee36)
  - fix: persistent spinner breaks vscode context link detection ([#1602](https://github.com/electrode-io/electrode/pull/1602)) [commit](http://github.com/electrode-io/electrode/commit/065431ee1c117b374220ea25ce8c139aa387694f)
  - Add env var to set dev admin log level ([#1606](https://github.com/electrode-io/electrode/pull/1606)) [commit](http://github.com/electrode-io/electrode/commit/2c5ce68878d7d574ba4ff53e31d0341f09d3c915)

- `packages/xarc-webpack`

  - Fix subapp manifests found in sub directories of src/ ([#1601](https://github.com/electrode-io/electrode/pull/1601)) [commit](http://github.com/electrode-io/electrode/commit/b4bca3da148e8a174eb5315d121aceaf47164d1c)

- `packages/subapp-server`

  - [patch] provide original error for debug purposes ([#1600](https://github.com/electrode-io/electrode/pull/1600)) [commit](http://github.com/electrode-io/electrode/commit/3a1138841b72963cc200096bc3f7d4b88ba0e0f2)

- `docs`

  - Add env var to set dev admin log level ([#1606](https://github.com/electrode-io/electrode/pull/1606)) [commit](http://github.com/electrode-io/electrode/commit/2c5ce68878d7d574ba4ff53e31d0341f09d3c915)

# 4/14/2020

- dev-admin log enhancements and fixes: using visual-logger now, better webpack status display.
- fix: index.html rendering - verify and ensure consistent useStream flag
- fix: app can now configure useStream flag for index.html response.
- fix: more informative error if subapp name and dir mismatch

## Packages

### Directly Updated

- `@xarc/app-dev@8.0.16` `(8.0.15 => 8.0.16)`
- `@xarc/create-app@3.0.4` `(3.0.3 => 3.0.4)`
- `electrode-react-webapp@3.8.9` `(3.8.8 => 3.8.9)`
- `subapp-pbundle@0.0.18` `(0.0.17 => 0.0.18)`
- `subapp-react@0.0.15` `(0.0.14 => 0.0.15)`
- `subapp-server@1.1.17` `(1.1.16 => 1.1.17)`
- `subapp-util@1.0.5` `(1.0.4 => 1.0.5)`
- `subapp-web@1.0.24` `(1.0.23 => 1.0.24)`

### Lerna Updated

- `@xarc/app@8.0.16` `(8.0.15 => 8.0.16)`
- `subapp-redux@1.0.24` `(1.0.23 => 1.0.24)`

## Commits

- `packages/xarc-app[-dev]`

  - use visual-logger for dev-admin ([#1597](https://github.com/electrode-io/electrode/pull/1597)) [commit](http://github.com/electrode-io/electrode/commit/c1420c1e4e96412f02edb598049c52c3d6ddf479)
  - fix: avoid null \_child [commit](http://github.com/electrode-io/electrode/commit/ef82cfd5418acc68c608996e0f815df8a71bf3d6)
  - use line reader to process wds logs ([#1599](https://github.com/electrode-io/electrode/pull/1599)) [commit](http://github.com/electrode-io/electrode/commit/ef5f8c92c12eec528c22270b11203172e56f2b9f)

- `packages/create-app`

  - fix: correct prepare args ([#1598](https://github.com/electrode-io/electrode/pull/1598)) [commit](http://github.com/electrode-io/electrode/commit/8bc52132d6f913723cc220a0deaf3a4ad7239c6a)

- `packages/electrode-react-webapp`

  - fix: verify and ensure consistent useStream flag ([#1596](https://github.com/electrode-io/electrode/pull/1596)) [commit](http://github.com/electrode-io/electrode/commit/b73118b1a097bc7c3ba0e4fbfa2a025c8504c2fb)
  - fix: add tests [commit](http://github.com/electrode-io/electrode/commit/7d70bcd8419e7ef7d75f24721e2fca442ea03812)
  - fix: detect unexpected item to stringify [commit](http://github.com/electrode-io/electrode/commit/72288178dee4079409fdc59d82115fcbab3472a5)

- `packages/subapp-pbundle`

  - fix: verify and ensure consistent useStream flag ([#1596](https://github.com/electrode-io/electrode/pull/1596)) [commit](http://github.com/electrode-io/electrode/commit/b73118b1a097bc7c3ba0e4fbfa2a025c8504c2fb)

- `packages/subapp-react`

  - fix: verify and ensure consistent useStream flag ([#1596](https://github.com/electrode-io/electrode/pull/1596)) [commit](http://github.com/electrode-io/electrode/commit/b73118b1a097bc7c3ba0e4fbfa2a025c8504c2fb)

- `packages/subapp-server`

  - fix: verify and ensure consistent useStream flag ([#1596](https://github.com/electrode-io/electrode/pull/1596)) [commit](http://github.com/electrode-io/electrode/commit/b73118b1a097bc7c3ba0e4fbfa2a025c8504c2fb)
  - fix: allow app to control useStream option [commit](http://github.com/electrode-io/electrode/commit/d20e7e2aa2cfc381d672d7ca605422551dddff86)

- `packages/subapp-util`

  - fix: more informative error if subapp name and dir mismatch [commit](http://github.com/electrode-io/electrode/commit/abdf249768b8b01c71386e74f73944844fac2cf9)

- `packages/subapp-web`

  - fix: verify and ensure consistent useStream flag ([#1596](https://github.com/electrode-io/electrode/pull/1596)) [commit](http://github.com/electrode-io/electrode/commit/b73118b1a097bc7c3ba0e4fbfa2a025c8504c2fb)
  - fix: add tests [commit](http://github.com/electrode-io/electrode/commit/7d70bcd8419e7ef7d75f24721e2fca442ea03812)
  - fix: more informative error if subapp name and dir mismatch [commit](http://github.com/electrode-io/electrode/commit/abdf249768b8b01c71386e74f73944844fac2cf9)
  - fix: avoid log error in dev mode [commit](http://github.com/electrode-io/electrode/commit/8f16f114543b78ba6b0d575a7be9fc4897647043)

- `docs`

  - fix: correct prepare args ([#1598](https://github.com/electrode-io/electrode/pull/1598)) [commit](http://github.com/electrode-io/electrode/commit/8bc52132d6f913723cc220a0deaf3a4ad7239c6a)

# 4/9/2020

- Add "selectTemplate" to picked opts: subapp -> electrode-react-webapp

## Packages

- `subapp-server@1.1.16` `(1.1.15 => 1.1.16)`

## Commits

- `packages/subapp-server`

  - Add "selectTemplate" to picked opts: subapp -> electrode-react-webapp ([#1594](https://github.com/electrode-io/electrode/pull/1594)) [commit](http://github.com/electrode-io/electrode/commit/2865ec49ec43575b803abd705e20e5d0c39b066a)

# 4/8/2020

- fix: handle errors from subapp preparing and processing
- [feat]: support user intercept rendering flow through context

## Packages

### Directly Updated

- `@xarc/app@8.0.15` `(8.0.14 => 8.0.15)`
- `@xarc/app-dev@8.0.15` `(8.0.14 => 8.0.15)`
- `electrode-react-webapp@3.8.8` `(3.8.7 => 3.8.8)`
- `subapp-pbundle@0.0.17` `(0.0.16 => 0.0.17)`
- `subapp-server@1.1.15` `(1.1.14 => 1.1.15)`
- `subapp-web@1.0.23` `(1.0.22 => 1.0.23)`

### Lerna Updated

- `subapp-react@0.0.14` `(0.0.13 => 0.0.14)`
- `subapp-redux@1.0.23` `(1.0.22 => 1.0.23)`

## Commits

- `packages/xarc-app[-dev]`

  - [feat]: support user intercept rendering flow through context [commit](http://github.com/electrode-io/electrode/commit/3d01006b0e10c7b3cd7912b8dc7b843d8b8c75cf)

- `packages/electrode-react-webapp`

  - [feat]: support user intercept rendering flow through context [commit](http://github.com/electrode-io/electrode/commit/3d01006b0e10c7b3cd7912b8dc7b843d8b8c75cf)

- `packages/subapp-pbundle`

  - [feat]: support user intercept rendering flow through context [commit](http://github.com/electrode-io/electrode/commit/3d01006b0e10c7b3cd7912b8dc7b843d8b8c75cf)
  - fix: Use shallow check for existing redux-bundles to allow for updates ([#1592](https://github.com/electrode-io/electrode/pull/1592)) [commit](http://github.com/electrode-io/electrode/commit/6292a90b273e4f9761c2233d7c8bf24bffb0f2b6)

- `packages/subapp-server`

  - [feat]: support user intercept rendering flow through context [commit](http://github.com/electrode-io/electrode/commit/3d01006b0e10c7b3cd7912b8dc7b843d8b8c75cf)

- `packages/subapp-web`

  - [feat]: support user intercept rendering flow through context [commit](http://github.com/electrode-io/electrode/commit/3d01006b0e10c7b3cd7912b8dc7b843d8b8c75cf)
  - fix: handle errors from subapp preparing and processing [commit](http://github.com/electrode-io/electrode/commit/07c15ebceed5793758b3b2b9902eddb77ece8a66)

# 4/8/2020

- fix: consider .babelrc.js also
- fix: Use composeBundlesRaw instead of composeBundles

## Packages

- `@xarc/app@8.0.14` `(8.0.13 => 8.0.14)`
- `@xarc/app-dev@8.0.14` `(8.0.13 => 8.0.14)`
- `subapp-pbundle@0.0.16` `(0.0.15 => 0.0.16)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: consider .babelrc.js also ([#1591](https://github.com/electrode-io/electrode/pull/1591)) [commit](http://github.com/electrode-io/electrode/commit/80e09956a8f4a7eb4801d03b7f7b9d843cd63068)

- `packages/subapp-pbundle`

  - fix: Redux bundler no dup ([#1590](https://github.com/electrode-io/electrode/pull/1590)) [commit](http://github.com/electrode-io/electrode/commit/2fc74a9e23c80fb50a8c004b8af769c255d608f7)
  - fix: Use composeBundlesRaw instead of composeBundles ([#1589](https://github.com/electrode-io/electrode/pull/1589)) [commit](http://github.com/electrode-io/electrode/commit/26c373dfc912b37a64960e3f9f6bc06140b3a349)

# 4/6/2020

- many improvements on the dev admin app log handling
- dep: chalk@4, chalk@1.2.0, xaa@1.3.0, xclap@0.2.48
- fix: a single babel.config.js over .babelrc.js
- fix: add result from promise to output

## Packages

### Directly Updated

- `@xarc/app@8.0.13` `(8.0.12 => 8.0.13)`
- `@xarc/app-dev@8.0.13` `(8.0.12 => 8.0.13)`
- `@xarc/webpack@8.0.2` `(8.0.1 => 8.0.2)`
- `electrode-react-webapp@3.8.7` `(3.8.6 => 3.8.7)`
- `subapp-pbundle@0.0.15` `(0.0.14 => 0.0.15)`

### Lerna Updated

- `subapp-server@1.1.14` `(1.1.13 => 1.1.14)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: use timer to filter out logs unrelated to errors ([#1585](https://github.com/electrode-io/electrode/pull/1585)) [commit](http://github.com/electrode-io/electrode/commit/5ab2e90e322ee27c2c52439d54857d46dc26d39b)
  - dep: chalk@4, chalk@1.2.0, xaa@1.3.0, xclap@0.2.48 ([#1586](https://github.com/electrode-io/electrode/pull/1586)) [commit](http://github.com/electrode-io/electrode/commit/92270291156830971c6a9be18ad9e27ede2611cd)
  - fix: more informative app log handling in admin ([#1584](https://github.com/electrode-io/electrode/pull/1584)) [commit](http://github.com/electrode-io/electrode/commit/2d711437f2a8c4a628ae91e1ffc0c0106a0c7239)
  - fix: a single babel.config.js over .babelrc.js ([#1583](https://github.com/electrode-io/electrode/pull/1583)) [commit](http://github.com/electrode-io/electrode/commit/2fea74e5708d977ce9a9c3f487ba69219fefa2e7)

- `packages/xarc-webpack`

  - dep: chalk@4, chalk@1.2.0, xaa@1.3.0, xclap@0.2.48 ([#1586](https://github.com/electrode-io/electrode/pull/1586)) [commit](http://github.com/electrode-io/electrode/commit/92270291156830971c6a9be18ad9e27ede2611cd)

- `packages/electrode-archetype-react-component[-dev]`

  - fix CI [commit](http://github.com/electrode-io/electrode/commit/d16b995fb75ce09d351ace0c2f93a8a13b149da1)

- `packages/electrode-react-webapp`

  - fix: add result from promise to output ([#1587](https://github.com/electrode-io/electrode/pull/1587)) [commit](http://github.com/electrode-io/electrode/commit/5908531769ee277a35f2b0b75097d387d3a1897e)

- `packages/subapp-pbundle`

  - fix: pbundle test [commit](http://github.com/electrode-io/electrode/commit/69174e38bf4314fbc060a5ae615ccd27786db171)

# 4/2/2020

- fix: return 404 for /favicon.ico in webpack dev server (Hapi)
- fix: rename xarcReduxStore to store
- fix: throw errors from route setup

## Packages

- `@xarc/app@8.0.12` `(8.0.11 => 8.0.12)`
- `@xarc/app-dev@8.0.12` `(8.0.11 => 8.0.12)`
- `subapp-pbundle@0.0.14` `(0.0.13 => 0.0.14)`
- `subapp-server@1.1.13` `(1.1.12 => 1.1.13)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: return 404 for /favicon.ico in webpack dev server (Hapi) ([#1580](https://github.com/electrode-io/electrode/pull/1580)) [commit](http://github.com/electrode-io/electrode/commit/eae84f210ea5c362497174d114e94c9e4a2dcca3)

- `packages/subapp-pbundle`

  - fix: rename xarcReduxStore to store ([#1582](https://github.com/electrode-io/electrode/pull/1582)) [commit](http://github.com/electrode-io/electrode/commit/d21109d0fb586b698d6575d916e883c4c8a98c35)

- `packages/subapp-server`

  - fix: throw errors from route setup ([#1581](https://github.com/electrode-io/electrode/pull/1581)) [commit](http://github.com/electrode-io/electrode/commit/84ec240ba4466b553c952daefce71d32f675cfab)

# 3/30/2020

- fix: remove content hash from chunk names (subapps)
- fix: when using CDN assets, skip local asset URLs (subapps)

## Packages

### Directly Updated

- `@xarc/webpack@8.0.1` `(8.0.0 => 8.0.1)`
- `subapp-server@1.1.12` `(1.1.11 => 1.1.12)`
- `subapp-web@1.0.22` `(1.0.21 => 1.0.22)`

### Lerna Updated

- `@xarc/app@8.0.11` `(8.0.10 => 8.0.11)`
- `@xarc/app-dev@8.0.11` `(8.0.10 => 8.0.11)`
- `subapp-pbundle@0.0.13` `(0.0.12 => 0.0.13)`
- `subapp-react@0.0.13` `(0.0.12 => 0.0.13)`
- `subapp-redux@1.0.22` `(1.0.21 => 1.0.22)`

## Commits

- `packages/xarc-webpack`

  - fix: remove content hash from chunk names ([#1575](https://github.com/electrode-io/electrode/pull/1575)) [commit](http://github.com/electrode-io/electrode/commit/0d44b3fb574f855df6690e9ed1d4beacff3dd5e7)

- `packages/subapp-server`

  - fix: when using CDN assets, skip local asset URLs ([#1576](https://github.com/electrode-io/electrode/pull/1576)) [commit](http://github.com/electrode-io/electrode/commit/1bb6b8af3e5b235f8284e1ef5badb954b39902a7)

- `packages/subapp-web`

  - fix: remove content hash from chunk names ([#1575](https://github.com/electrode-io/electrode/pull/1575)) [commit](http://github.com/electrode-io/electrode/commit/0d44b3fb574f855df6690e9ed1d4beacff3dd5e7)
  - fix: when using CDN assets, skip local asset URLs ([#1576](https://github.com/electrode-io/electrode/pull/1576)) [commit](http://github.com/electrode-io/electrode/commit/1bb6b8af3e5b235f8284e1ef5badb954b39902a7)

# 3/25/2020

- dep: update xclap, and yarn message
- fix: ensure bundle asset file URL are properly formed
- show time diff used to load a subapp

## Packages

### Directly Updated

- `@xarc/app@8.0.10` `(8.0.9 => 8.0.10)`
- `@xarc/app-dev@8.0.10` `(8.0.9 => 8.0.10)`
- `subapp-server@1.1.11` `(1.1.10 => 1.1.11)`
- `subapp-web@1.0.21` `(1.0.20 => 1.0.21)`

### Lerna Updated

- `subapp-pbundle@0.0.12` `(0.0.11 => 0.0.12)`
- `subapp-react@0.0.12` `(0.0.11 => 0.0.12)`
- `subapp-redux@1.0.21` `(1.0.20 => 1.0.21)`

## Commits

- `packages/xarc-app[-dev]`

  - dep: update xclap, and yarn message [commit](http://github.com/electrode-io/electrode/commit/f681bf5d3935492cf0b3df60b8874cba3a1f8f19)

- `packages/subapp-server`

  - fix: ensure bundle asset file URL are properly formed [commit](http://github.com/electrode-io/electrode/commit/8d11390a72ac63c8e3745617e1850b31d9d67a09)

- `packages/subapp-web`

  - fix: ensure bundle asset file URL are properly formed [commit](http://github.com/electrode-io/electrode/commit/8d11390a72ac63c8e3745617e1850b31d9d67a09)
  - show time diff used to load a subapp [commit](http://github.com/electrode-io/electrode/commit/ee0b34db757d134ff3f0543b40d209882d0032f1)

# 3/23/2020

- feat: https support for dev reverse proxy
- extract webpack config to its own module (@xarc/webpack)
- subapp-web: Json script escape fix

## Packages

- `@xarc/app@8.0.9` `(8.0.8 => 8.0.9)`
- `@xarc/app-dev@8.0.9` `(8.0.8 => 8.0.9)`
- `@xarc/webpack@8.0.0` `(7.0.1 => 8.0.0)`
- `electrode-archetype-opt-karma@3.0.1` `(3.0.0 => 3.0.1)`
- `subapp-server@1.1.10` `(1.1.9 => 1.1.10)`
- `subapp-util@1.0.4` `(1.0.3 => 1.0.4)`
- `subapp-web@1.0.20` `(1.0.19 => 1.0.20)`

## Commits

- `packages/xarc-app[-dev]`

  - feat: https support for dev reverse proxy ([#1572](https://github.com/electrode-io/electrode/pull/1572)) [commit](http://github.com/electrode-io/electrode/commit/6aaed710ceef2c38adb5a7b26128c35672bb6c62)
  - extract webpack config to its own module ([#1569](https://github.com/electrode-io/electrode/pull/1569)) [commit](http://github.com/electrode-io/electrode/commit/41d81faa9da1d07a05a18db4535ede3e07b8a760)

- `packages/xarc-webpack`

  - extract webpack config to its own module ([#1569](https://github.com/electrode-io/electrode/pull/1569)) [commit](http://github.com/electrode-io/electrode/commit/41d81faa9da1d07a05a18db4535ede3e07b8a760)
  - [major] mark @xarc/webpack for first release [commit](http://github.com/electrode-io/electrode/commit/98babfee0b10fc409a240db225f8d820727b9ad6)

- `packages/electrode-archetype-opt-karma`

  - extract webpack config to its own module ([#1569](https://github.com/electrode-io/electrode/pull/1569)) [commit](http://github.com/electrode-io/electrode/commit/41d81faa9da1d07a05a18db4535ede3e07b8a760)

- `packages/subapp-server`

  - feat: https support for dev reverse proxy ([#1572](https://github.com/electrode-io/electrode/pull/1572)) [commit](http://github.com/electrode-io/electrode/commit/6aaed710ceef2c38adb5a7b26128c35672bb6c62)

- `packages/subapp-util`

  - feat: https support for dev reverse proxy ([#1572](https://github.com/electrode-io/electrode/pull/1572)) [commit](http://github.com/electrode-io/electrode/commit/6aaed710ceef2c38adb5a7b26128c35672bb6c62)

- `packages/subapp-web`

  - feat: https support for dev reverse proxy ([#1572](https://github.com/electrode-io/electrode/pull/1572)) [commit](http://github.com/electrode-io/electrode/commit/6aaed710ceef2c38adb5a7b26128c35672bb6c62)
  - subapp-web: Json script escape fix ([#1573](https://github.com/electrode-io/electrode/pull/1573)) [commit](http://github.com/electrode-io/electrode/commit/6c346548a02b9163f1011a8fb866f1e2a1569964)

- `docs`

  - feat: https support for dev reverse proxy ([#1572](https://github.com/electrode-io/electrode/pull/1572)) [commit](http://github.com/electrode-io/electrode/commit/6aaed710ceef2c38adb5a7b26128c35672bb6c62)

# 3/18/2020

- fix(throw on missing stats.json)
- fix: add helpful output to admin console and dev proxy
- allow user content set verbatim flag to use response status as is

## Packages

### Directly Updated

- `@xarc/app@8.0.8` `(8.0.7 => 8.0.8)`
- `@xarc/app-dev@8.0.8` `(8.0.7 => 8.0.8)`
- `electrode-react-webapp@3.8.6` `(3.8.5 => 3.8.6)`
- `subapp-web@1.0.19` `(1.0.18 => 1.0.19)`

### Lerna Updated

- `subapp-pbundle@0.0.11` `(0.0.10 => 0.0.11)`
- `subapp-react@0.0.11` `(0.0.10 => 0.0.11)`
- `subapp-redux@1.0.20` `(1.0.19 => 1.0.20)`
- `subapp-server@1.1.9` `(1.1.8 => 1.1.9)`

## Commits

- `packages/xarc-app[-dev]`

  - fix: add helpful output to admin console and dev proxy ([#1564](https://github.com/electrode-io/electrode/pull/1564)) [commit](http://github.com/electrode-io/electrode/commit/35500b49c893b4d3f14fd8b2341a7686b60b0cb5)
  - fix: dev admin check for null child ([#1567](https://github.com/electrode-io/electrode/pull/1567)) [commit](http://github.com/electrode-io/electrode/commit/9eb7259de687b051e3861a58a6e54f0534ed1ee7)

- `packages/electrode-react-webapp`

  - allow user content set verbatim flag to use response status as is ([#1562](https://github.com/electrode-io/electrode/pull/1562)) [commit](http://github.com/electrode-io/electrode/commit/c5b2069cfd605c6460955e17a8dec2a988d0b465)

- `packages/subapp-web`

  - fix(throw on missing stats.json) ([#1561](https://github.com/electrode-io/electrode/pull/1561)) [commit](http://github.com/electrode-io/electrode/commit/bd7f5c4ecc49467e994096c87f45c92577922bab)

# 3/10/2020

- Hardcode the optional features for the features task
- support join SubApp and DynSubApp as a single component

## Packages

### Directly Updated

- `@xarc/app@8.0.7` `(8.0.6 => 8.0.7)`
- `@xarc/app-dev@8.0.7` `(8.0.6 => 8.0.7)`
- `subapp-web@1.0.18` `(1.0.17 => 1.0.18)`

### Lerna Updated

- `subapp-pbundle@0.0.10` `(0.0.9 => 0.0.10)`
- `subapp-react@0.0.10` `(0.0.9 => 0.0.10)`
- `subapp-redux@1.0.19` `(1.0.18 => 1.0.19)`

## Commits

- `packages/xarc-app[-dev]`

  - Hardcode the optional features for the features task ([#1549](https://github.com/electrode-io/electrode/pull/1549)) [commit](http://github.com/electrode-io/electrode/commit/c403bf0cab60e8e42fc490694b87f4f7888f2842)

- `packages/subapp-web`

  - support join SubApp and DynSubApp as a single component ([#1550](https://github.com/electrode-io/electrode/pull/1550)) [commit](http://github.com/electrode-io/electrode/commit/03d4bed18b297679f2397e0c62a6ea3ab69dd5c9)

# 3/6/2020

- use original status for redirect
- Debugger messages marked as "debug" (shown in console)

## Packages

### Directly Updated

- `@xarc/app@8.0.6` `(8.0.5 => 8.0.6)`
- `@xarc/app-dev@8.0.6` `(8.0.5 => 8.0.6)`
- `electrode-react-webapp@3.8.5` `(3.8.4 => 3.8.5)`

## Commits

- `packages/xarc-app[-dev]`

  - Debugger messages marked as "debug" (shown in console) ([#1545](https://github.com/electrode-io/electrode/pull/1545)) [commit](http://github.com/electrode-io/electrode/commit/94e1a017b6beedcb3c349ab3abd7ee340b93fcd9)

- `packages/electrode-react-webapp`

  - use original status for redirect ([#1548](https://github.com/electrode-io/electrode/pull/1548)) [commit](http://github.com/electrode-io/electrode/commit/b8fe63a5bcbc94852cc369cc1bf0a1d8a5062e4c)

# 3/2/2020

- subapp-pbundle: send location to StartComponent and reduxStoreReady (#1544)
- Add some subapp web tests (#1543)
- avoid dev admin stuck waiting for a child to start (#1542)

## Packages

### Directly Updated

- `@xarc/app@8.0.5` `(8.0.4 => 8.0.5)`
- `@xarc/app-dev@8.0.5` `(8.0.4 => 8.0.5)`
- `subapp-pbundle@0.0.9` `(0.0.8 => 0.0.9)`
- `subapp-web@1.0.17` `(1.0.16 => 1.0.17)`

### Lerna Updated

- `subapp-react@0.0.9` `(0.0.8 => 0.0.9)`
- `subapp-redux@1.0.18` `(1.0.17 => 1.0.18)`

## Commits

- `packages/xarc-app[-dev]`

  - avoid dev admin stuck waiting for a child to start ([#1542](https://github.com/electrode-io/electrode/pull/1542)) [commit](http://github.com/electrode-io/electrode/commit/f181afc177634d2ca1bd958b97aceee7a6c379c2)

- `packages/subapp-pbundle`

  - subapp-pbundle: send location to StartComponent and reduxStoreReady ([#1544](https://github.com/electrode-io/electrode/pull/1544)) [commit](http://github.com/electrode-io/electrode/commit/35285f7f11e78e6cf91b89c7b3cd354ae3c410fe)

- `packages/subapp-web`

  - Add some subapp web tests ([#1543](https://github.com/electrode-io/electrode/pull/1543)) [commit](http://github.com/electrode-io/electrode/commit/7298f1e706b2ad9313338bbb1e777339416340c2)

# 2/26/2020

Release Notes:

- Increase minChunks to 10 for MINIMIZE_SUBAPP_CHUNKS
- ensure original error is preserved for subapp server routes

## Packages

- `@xarc/app@8.0.4` `(8.0.3 => 8.0.4)`
- `@xarc/app-dev@8.0.4` `(8.0.3 => 8.0.4)`
- `subapp-server@1.1.8` `(1.1.7 => 1.1.8)`

## Commits

- `packages/xarc-app[-dev]`

  - Increase minChunks to 10 for MINIMIZE_SUBAPP_CHUNKS ([#1541](https://github.com/electrode-io/electrode/pull/1541)) [commit](http://github.com/electrode-io/electrode/commit/9acb8b1ac91556e71554f15e471626d9f95c508a)

- `packages/subapp-server`

  - ensure original error is preserved ([#1540](https://github.com/electrode-io/electrode/pull/1540)) [commit](http://github.com/electrode-io/electrode/commit/d1bafc5045d17964bf610a86dfc57430df8a1a74)

# 2/20/2020

Release notes:

Git tag: `rel-v8-02202020`

- fix issue with starting with user webpack.config.js
  - if user generated webpack config is Electrode then use directly ([#1539](https://github.com/electrode-io/electrode/pull/1539))
- fix dynamic data element check
- remove xarc8 npm tag for ver 8 release

## Packages

### Directly Updated

- `@xarc/app@8.0.3` `(8.0.2 => 8.0.3)`
- `@xarc/app-dev@8.0.3` `(8.0.2 => 8.0.3)`
- `@xarc/create-app@3.0.3` `(3.0.2 => 3.0.3)`
- `subapp-web@1.0.16` `(1.0.15 => 1.0.16)`

### Lerna Updated

- `subapp-pbundle@0.0.8` `(0.0.7 => 0.0.8)`
- `subapp-react@0.0.8` `(0.0.7 => 0.0.8)`
- `subapp-redux@1.0.17` `(1.0.16 => 1.0.17)`

## Commits

- `packages/xarc-app[-dev]`

  - if user generated webpack config is Electrode then use directly ([#1539](https://github.com/electrode-io/electrode/pull/1539)) [commit](http://github.com/electrode-io/electrode/commit/668b5ef837abf823126ebcbb6c50d29e1048596a)
  - remove xarc8 npm tag for ver 8 release [commit](http://github.com/electrode-io/electrode/commit/7e6f77c166814ceab9881be9a254b7e867927373)

- `packages/create-app`

  - remove xarc8 npm tag for ver 8 release [commit](http://github.com/electrode-io/electrode/commit/7e6f77c166814ceab9881be9a254b7e867927373)

- `packages/subapp-web`

  - fix dynamic data element check ([#1538](https://github.com/electrode-io/electrode/pull/1538)) [commit](http://github.com/electrode-io/electrode/commit/544100d7021f375d2330b214f6192f364f8ad159)

# 2/17/2020

- New pbundle option "packReduxData" for SSR redux state
- make Electrode internal webpack config a little easier to override

## Packages

### Directly Updated

- `@xarc/app@8.0.2` `(8.0.1 => 8.0.2)`
- `@xarc/app-dev@8.0.2` `(8.0.1 => 8.0.2)`
- `subapp-pbundle@0.0.7` `(0.0.6 => 0.0.7)`
- `subapp-web@1.0.15` `(1.0.14 => 1.0.15)`
- `webpack-config-composer@1.1.3` `(1.1.2 => 1.1.3)`

### Lerna Updated

- `subapp-react@0.0.7` `(0.0.6 => 0.0.7)`
- `subapp-redux@1.0.16` `(1.0.15 => 1.0.16)`

## Commits

- `packages/xarc-app[-dev]`

  - make Electrode internal webpack config a little easier to override ([#1536](https://github.com/electrode-io/electrode/pull/1536)) [commit](http://github.com/electrode-io/electrode/commit/22b52347e082da52a8107bb7adfddcda15b3462e)
  - rename dir partial to partials ([#1534](https://github.com/electrode-io/electrode/pull/1534)) [commit](http://github.com/electrode-io/electrode/commit/b5f18ca80efb5d0b9e1a053b08d3a013a9bae046)

- `packages/subapp-pbundle`

  - New pbundle option "packReduxData" for SSR redux state ([#1532](https://github.com/electrode-io/electrode/pull/1532)) [commit](http://github.com/electrode-io/electrode/commit/35eca3b314b0c56a89684d9cb17a9aea9edb07cb)

- `packages/subapp-web`

  - more robust dynamic data retrieval from element ([#1535](https://github.com/electrode-io/electrode/pull/1535)) [commit](http://github.com/electrode-io/electrode/commit/7f7a24d42c5325dcfdae375bb7510c029758367a)

- `packages/webpack-config-composer`

  - make Electrode internal webpack config a little easier to override ([#1536](https://github.com/electrode-io/electrode/pull/1536)) [commit](http://github.com/electrode-io/electrode/commit/22b52347e082da52a8107bb7adfddcda15b3462e)

# 2/14/2020

## Packages

- `@xarc/app@8.0.1` `(8.0.0 => 8.0.1)`
- `@xarc/app-dev@8.0.1` `(8.0.0 => 8.0.1)`
- `@xarc/create-app@3.0.2` `(3.0.1 => 3.0.2)`

## Commits

- `packages/xarc-app[-dev]`

  - touch for release [commit](http://github.com/electrode-io/electrode/commit/43234d4e0138d521b3c8dc86f518f172b15ad785)

- `packages/create-app`

  - avoid copying removed files [commit](http://github.com/electrode-io/electrode/commit/89df3d6bc6eff0533c369fc3ac62a10cac2e56be)

# 2/14/2020

## Packages

- `@xarc/create-app@3.0.1` `(3.0.0 => 3.0.1)`

## Commits

- `packages/create-app`

  - minor fix for create app template [commit](http://github.com/electrode-io/electrode/commit/d4bd96157beaf55b2f3d54d4bc8de8a189b799cd)

# 2/14/2020

- rename main packages
- deprecating ignite and generator packages

## Packages

- `@xarc/app@8.0.0` `(7.0.7 => 8.0.0)`
- `@xarc/app-dev@8.0.0` `(7.0.7 => 8.0.0)`
- `@xarc/create-app@3.0.0` `(2.0.4 => 3.0.0)`

## Commits

- `packages/xarc-app[-dev]`

  - rename main packages [commit](http://github.com/electrode-io/electrode/commit/3577a7cc6696ab6014a6f64e3680f43714549741)
  - [major] mark for major bump [commit](http://github.com/electrode-io/electrode/commit/7d3ff3cdda5997ae138e4048696b0c258c474256)

- `packages/create-app`

  - update create app template with new package names [commit](http://github.com/electrode-io/electrode/commit/eae9bbfffa2e1cc5a2294805335003f2c2b4efec)
  - [major] mark for major bump [commit](http://github.com/electrode-io/electrode/commit/7d3ff3cdda5997ae138e4048696b0c258c474256)

- `packages/electrode-ignite`

  - deprecating ignite and generator packages [commit](http://github.com/electrode-io/electrode/commit/4b4c0d6545ca8bd855fe7abeaa7b207029ddccd3)

- `packages/generator-electrode`

  - deprecating ignite and generator packages [commit](http://github.com/electrode-io/electrode/commit/4b4c0d6545ca8bd855fe7abeaa7b207029ddccd3)

- `packages/ignite-core`

  - deprecating ignite and generator packages [commit](http://github.com/electrode-io/electrode/commit/4b4c0d6545ca8bd855fe7abeaa7b207029ddccd3)

- `tools`

  - update tools to handle renamed packages [commit](http://github.com/electrode-io/electrode/commit/0f73b282f53d3d23bed0bb57305f63ce8a4a50f5)

- `MISC`

  - Update changelog [commit](http://github.com/electrode-io/electrode/commit/31563075e98ccf1bc363ab3110ee53ddabc2cf2e)
  - add xarc8 npm tag for beta [commit](http://github.com/electrode-io/electrode/commit/fdad596ac840905eef150ddbabb04431d4ef72db)

# 2/14/2020

- avoid orphaned servers for dev admin

## Packages

- `electrode-archetype-react-app@7.0.6` `(7.0.5 => 7.0.6)`
- `electrode-archetype-react-app-dev@7.0.6` `(7.0.5 => 7.0.6)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - avoid orphaned servers ([#1531](https://github.com/electrode-io/electrode/pull/1531)) [commit](http://github.com/electrode-io/electrode/commit/ea27b35183bfee9c88b7ebca48ebc1f64bb8b9da)

# 2/12/2020

- support dynamic load inlining subapp

## Packages

### Directly Updated

- `subapp-web@1.0.14` `(1.0.13 => 1.0.14)`

### Lerna Updated

- `subapp-pbundle@0.0.6` `(0.0.5 => 0.0.6)`
- `subapp-react@0.0.6` `(0.0.5 => 0.0.6)`
- `subapp-redux@1.0.15` `(1.0.14 => 1.0.15)`

## Commits

- `packages/subapp-web`

  - support dynamic load inlining subapp [commit](http://github.com/electrode-io/electrode/commit/7068f1d5a1020b7faedea51c7adb9d57597b298c)

# 2/10/2020

- minor fixes

## Packages

- `electrode-archetype-react-app@7.0.5` `(7.0.4 => 7.0.5)`
- `electrode-archetype-react-app-dev@7.0.5` `(7.0.4 => 7.0.5)`
- `subapp-server@1.1.7` `(1.1.6 => 1.1.7)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - minor fixes ([#1528](https://github.com/electrode-io/electrode/pull/1528)) [commit](http://github.com/electrode-io/electrode/commit/3471092c4a1459a038a8d987e913b0c0c94b0999)

- `packages/subapp-server`

  - minor fixes ([#1528](https://github.com/electrode-io/electrode/pull/1528)) [commit](http://github.com/electrode-io/electrode/commit/3471092c4a1459a038a8d987e913b0c0c94b0999)

# 2/10/2020

- try to use hapi if electrodeServer is not found
- New webpack option to minimize the number of created subapp chunks
- subapp inlining

## Packages

- `electrode-archetype-react-app@7.0.4` `(7.0.3 => 7.0.4)`
- `electrode-archetype-react-app-dev@7.0.4` `(7.0.3 => 7.0.4)`
- `subapp-pbundle@0.0.5` `(0.0.4 => 0.0.5)`
- `subapp-react@0.0.5` `(0.0.4 => 0.0.5)`
- `subapp-redux@1.0.14` `(1.0.13 => 1.0.14)`
- `subapp-server@1.1.6` `(1.1.5 => 1.1.6)`
- `subapp-web@1.0.13` `(1.0.12 => 1.0.13)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - try to use hapi if electrodeServer is not found ([#1521](https://github.com/electrode-io/electrode/pull/1521)) [commit](http://github.com/electrode-io/electrode/commit/1bdbc0bf6caa624d22d7ab6032fb74c2cb83ef2b)
  - New webpack option to minimize the number of created subapp chunks ([#1520](https://github.com/electrode-io/electrode/pull/1520)) [commit](http://github.com/electrode-io/electrode/commit/3fac52093e32c60555218aa7052358ea5c590f66)

- `packages/subapp-pbundle`

  - collect all bundles and initial states before creating real redux store ([#1525](https://github.com/electrode-io/electrode/pull/1525)) [commit](http://github.com/electrode-io/electrode/commit/73d78d16d91b4fd75fd8ad7d4b79cffa911ca416)
  - more work to support subapp inlining subapp ([#1524](https://github.com/electrode-io/electrode/pull/1524)) [commit](http://github.com/electrode-io/electrode/commit/a985431cfa9d5ebd4950cf3d0d4e69ac7b33f714)
  - update pbundle with support for await prepare data ([#1517](https://github.com/electrode-io/electrode/pull/1517)) [commit](http://github.com/electrode-io/electrode/commit/4b8c4b29f25bfd4a1852f96da86ac7c77fb450c0)

- `packages/subapp-pkg-util`

  - collect all bundles and initial states before creating real redux store ([#1525](https://github.com/electrode-io/electrode/pull/1525)) [commit](http://github.com/electrode-io/electrode/commit/73d78d16d91b4fd75fd8ad7d4b79cffa911ca416)

- `packages/subapp-react`

  - support sharing redux store for a request ([#1518](https://github.com/electrode-io/electrode/pull/1518)) [commit](http://github.com/electrode-io/electrode/commit/a37d03a53e2395471afb36c33dc94babd11da1ce)
  - update pbundle with support for await prepare data ([#1517](https://github.com/electrode-io/electrode/pull/1517)) [commit](http://github.com/electrode-io/electrode/commit/4b8c4b29f25bfd4a1852f96da86ac7c77fb450c0)
  - refactor SSR flow to support await data prepare ([#1516](https://github.com/electrode-io/electrode/pull/1516)) [commit](http://github.com/electrode-io/electrode/commit/3fe407d2f985850ec046aace1c10a3927127b9ea)

- `packages/subapp-redux`

  - minor fix for initial state handling ([#1522](https://github.com/electrode-io/electrode/pull/1522)) [commit](http://github.com/electrode-io/electrode/commit/18dad287dcfad8788658a5b1a8e198a84476fd40)
  - support sharing redux store for a request ([#1518](https://github.com/electrode-io/electrode/pull/1518)) [commit](http://github.com/electrode-io/electrode/commit/a37d03a53e2395471afb36c33dc94babd11da1ce)

- `packages/subapp-server`

  - more work to support subapp inlining subapp ([#1524](https://github.com/electrode-io/electrode/pull/1524)) [commit](http://github.com/electrode-io/electrode/commit/a985431cfa9d5ebd4950cf3d0d4e69ac7b33f714)

- `packages/subapp-web`

  - general subApp.inline method ([#1527](https://github.com/electrode-io/electrode/pull/1527)) [commit](http://github.com/electrode-io/electrode/commit/963a9f4cc4c8d519899e516ab12b2f31fdce8095)
  - collect all bundles and initial states before creating real redux store ([#1525](https://github.com/electrode-io/electrode/pull/1525)) [commit](http://github.com/electrode-io/electrode/commit/73d78d16d91b4fd75fd8ad7d4b79cffa911ca416)
  - more work to support subapp inlining subapp ([#1524](https://github.com/electrode-io/electrode/pull/1524)) [commit](http://github.com/electrode-io/electrode/commit/a985431cfa9d5ebd4950cf3d0d4e69ac7b33f714)
  - minor fix for initial state handling ([#1522](https://github.com/electrode-io/electrode/pull/1522)) [commit](http://github.com/electrode-io/electrode/commit/18dad287dcfad8788658a5b1a8e198a84476fd40)
  - embed large initial state as JSON text ([#1519](https://github.com/electrode-io/electrode/pull/1519)) [commit](http://github.com/electrode-io/electrode/commit/e39afa7e86907eb3616e03a6a718ca979ab23db3)
  - refactor SSR flow to support await data prepare ([#1516](https://github.com/electrode-io/electrode/pull/1516)) [commit](http://github.com/electrode-io/electrode/commit/3fe407d2f985850ec046aace1c10a3927127b9ea)

- `.vscode`

  - more work to support subapp inlining subapp ([#1524](https://github.com/electrode-io/electrode/pull/1524)) [commit](http://github.com/electrode-io/electrode/commit/a985431cfa9d5ebd4950cf3d0d4e69ac7b33f714)

- `docs`

  - Update README.md ([#1523](https://github.com/electrode-io/electrode/pull/1523)) [commit](http://github.com/electrode-io/electrode/commit/3cda7f265f83ea5d36f57245ce9763f272ac1a55)

# 1/29/2020

- update create-app to use archetype ver7
- [major] fix change meant for v7: default all optionals to off
- support inline subapp with SSR

## Packages

- `@xarc/create-app@2.0.3` `(2.0.2 => 2.0.3)`
- `electrode-archetype-opt-critical-css@2.0.0` `(1.0.4 => 2.0.0)`
- `electrode-archetype-opt-eslint@2.0.0` `(1.0.4 => 2.0.0)`
- `electrode-archetype-opt-flow@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-jest@25.0.0` `(24.0.1 => 25.0.0)`
- `electrode-archetype-opt-karma@3.0.0` `(2.0.8 => 3.0.0)`
- `electrode-archetype-opt-less@2.0.0` `(1.0.3 => 2.0.0)`
- `electrode-archetype-opt-mocha@2.0.0` `(1.0.4 => 2.0.0)`
- `electrode-archetype-opt-phantomjs@2.0.0` `(1.0.3 => 2.0.0)`
- `electrode-archetype-opt-postcss@2.0.0` `(1.0.5 => 2.0.0)`
- `electrode-archetype-opt-preact@2.0.0` `(1.0.1 => 2.0.0)`
- `electrode-archetype-opt-pwa@2.0.0` `(1.0.7 => 2.0.0)`
- `electrode-archetype-opt-react@3.0.0` `(2.0.5 => 3.0.0)`
- `electrode-archetype-opt-react-intl@2.0.0` `(1.0.1 => 2.0.0)`
- `electrode-archetype-opt-sass@2.0.0` `(1.0.10 => 2.0.0)`
- `electrode-archetype-opt-sinon@2.0.0` `(1.0.4 => 2.0.0)`
- `electrode-archetype-opt-stylus@2.0.0` `(1.0.3 => 2.0.0)`
- `electrode-archetype-opt-typescript@2.0.0` `(1.0.4 => 2.0.0)`
- `electrode-archetype-react-app@7.0.3` `(7.0.2 => 7.0.3)`
- `electrode-archetype-react-app-dev@7.0.3` `(7.0.2 => 7.0.3)`
- `subapp-pbundle@0.0.4` `(0.0.3 => 0.0.4)`
- `subapp-react@0.0.4` `(0.0.3 => 0.0.4)`
- `subapp-redux@1.0.13` `(1.0.12 => 1.0.13)`
- `subapp-server@1.1.5` `(1.1.4 => 1.1.5)`
- `subapp-util@1.0.3` `(1.0.2 => 1.0.3)`
- `subapp-web@1.0.12` `(1.0.11 => 1.0.12)`

## Commits

- `packages/create-app`

  - update create-app to use archetype ver7 ([#1493](https://github.com/electrode-io/electrode/pull/1493)) [commit](http://github.com/electrode-io/electrode/commit/7966069105005062f7d6bd5fdbe1e6c91e725984)
  - udpate app template dep [commit](http://github.com/electrode-io/electrode/commit/dd17df618c257485799a8b2d8d57bf88a45d1396)

- `packages/electrode-archetype-opt-critical-css`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-eslint`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-flow`

  - drop i18n and flow from default ([#1501](https://github.com/electrode-io/electrode/pull/1501)) [commit](http://github.com/electrode-io/electrode/commit/ad62ae686f474d0374782b59b80f26755c47b299)

- `packages/electrode-archetype-opt-jest`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)
  - default jest to v24 ([#1488](https://github.com/electrode-io/electrode/pull/1488)) [commit](http://github.com/electrode-io/electrode/commit/11bbae9fa31e6fec59de2a6ba90e4307e421b289)
  - Publish [commit](http://github.com/electrode-io/electrode/commit/3564c26fb5c7b5c7ac55fe7cac41068d2361303f)
  - update auto gen files [commit](http://github.com/electrode-io/electrode/commit/e9af7120b731dadbf08066f5b63eb14dcb519315)
  - Publish [commit](http://github.com/electrode-io/electrode/commit/151d75c997b17e4a54559b8be0491b8cb1a00735)
  - add publishConfig [commit](http://github.com/electrode-io/electrode/commit/b0d534e503397c82d8b7194e7bbf303774646882)
  - update to jest@24.9.0 [commit](http://github.com/electrode-io/electrode/commit/1eac2150aa0c34711bab0ec9af8805935ec8736c)

- `packages/electrode-archetype-opt-karma`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-less`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-mocha`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-phantomjs`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-postcss`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)
  - [major] update all postcss deps to latest ([#1502](https://github.com/electrode-io/electrode/pull/1502)) [commit](http://github.com/electrode-io/electrode/commit/cf48c08d3aaa23128d923788c9d380c76ae6a714)

- `packages/electrode-archetype-opt-preact`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-pwa`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-react`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-react-intl`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-sass`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)
  - fix package main ([#1513](https://github.com/electrode-io/electrode/pull/1513)) [commit](http://github.com/electrode-io/electrode/commit/b1b0dbed55802494c65f5e4e743d80930ceb8c9c)

- `packages/electrode-archetype-opt-sinon`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-stylus`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-opt-typescript`

  - [major] fix change meant for v7: default all optionals to off ([#1511](https://github.com/electrode-io/electrode/pull/1511)) [commit](http://github.com/electrode-io/electrode/commit/75421bcdefbe39646c7722eb370cd05f9fe878af)

- `packages/electrode-archetype-react-app[-dev]`

  - always expect opt pkg to exist in dev mode ([#1514](https://github.com/electrode-io/electrode/pull/1514)) [commit](http://github.com/electrode-io/electrode/commit/94213d46371bd13674c3694215af8b157e825561)
  - fix style bundle filename in dev mode ([#1509](https://github.com/electrode-io/electrode/pull/1509)) [commit](http://github.com/electrode-io/electrode/commit/3e6209c60e58e25bb4e4660c3ffcf5772f421b89)
  - avoid duplicate style bundles in dev mode ([#1503](https://github.com/electrode-io/electrode/pull/1503)) [commit](http://github.com/electrode-io/electrode/commit/8a0724afada2d59de678d6f754c77ba6bc14d47c)
  - drop i18n and flow from default ([#1501](https://github.com/electrode-io/electrode/pull/1501)) [commit](http://github.com/electrode-io/electrode/commit/ad62ae686f474d0374782b59b80f26755c47b299)
  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)
  - ensure webpack treeshaking works for subapp packages ([#1496](https://github.com/electrode-io/electrode/pull/1496)) [commit](http://github.com/electrode-io/electrode/commit/c24c68ae9ab926756eab68e648876f708a8b2709)
  - optimize webpack runtime as a single chunk for subapps ([#1495](https://github.com/electrode-io/electrode/pull/1495)) [commit](http://github.com/electrode-io/electrode/commit/89a9c86f073f2add96c283e8b6e00390f2916b92)
  - default jest to v24 ([#1488](https://github.com/electrode-io/electrode/pull/1488)) [commit](http://github.com/electrode-io/electrode/commit/11bbae9fa31e6fec59de2a6ba90e4307e421b289)

- `packages/opt-archetype-check`

  - check user's dep even if no archetype config found ([#1335](https://github.com/electrode-io/electrode/pull/1335)) [commit](http://github.com/electrode-io/electrode/commit/d619658eb5617e4e18e8f901d327f17f3d78739a)

- `packages/subapp-pbundle`

  - Add new function for subapps: waitForSubApp [commit](http://github.com/electrode-io/electrode/commit/15b94ce3f53184a106bf7a6537db5633f7e4f589)
  - Set new store container for each request in subapp-pbundle ([#1508](https://github.com/electrode-io/electrode/pull/1508)) [commit](http://github.com/electrode-io/electrode/commit/5d05c01661089ff04c627fb5fc763877ca2c7022)
  - Add option for reduxStoreReady for subapp pbundle ([#1507](https://github.com/electrode-io/electrode/pull/1507)) [commit](http://github.com/electrode-io/electrode/commit/55ebfb0e4fdba2d6d62a6dec67e56c49c5a747dc)
  - first step at supporting SSR for preact+redux-bundler ([#1506](https://github.com/electrode-io/electrode/pull/1506)) [commit](http://github.com/electrode-io/electrode/commit/93206c59f757a4a904679210d6ce6c2542d3b5d2)
  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)
  - ensure webpack treeshaking works for subapp packages ([#1496](https://github.com/electrode-io/electrode/pull/1496)) [commit](http://github.com/electrode-io/electrode/commit/c24c68ae9ab926756eab68e648876f708a8b2709)
  - dep: preact@10.2.1 [commit](http://github.com/electrode-io/electrode/commit/0e860f554895c4535f21b178d19de05b71fcd918)
  - minor redux-bundler fix and demo in sample app ([#1490](https://github.com/electrode-io/electrode/pull/1490)) [commit](http://github.com/electrode-io/electrode/commit/b3674a560d86f3bcf0c2caeff8b92cd3302f8829)
  - lock preact@10.1.1 to pass issue with 10.2.0 [commit](http://github.com/electrode-io/electrode/commit/75c7320fb4b9466e069363eebe4353ba76b309d4)
  - Add redux-bundler support for Electrode subapps ([#1484](https://github.com/electrode-io/electrode/pull/1484)) [commit](http://github.com/electrode-io/electrode/commit/ceaa8b4f96c2d3b7ed51fd5dd66729b877c836a7)

- `packages/subapp-pkg-util`

  - prepare data before invoking SSR'ed subapp that's inlined [commit](http://github.com/electrode-io/electrode/commit/264878cfef69d81cd245e9ddc970fa77ea8309fd)
  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)

- `packages/subapp-react`

  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)

- `packages/subapp-redux`

  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)
  - only call reduxCreateStore if it's user provided ([#1494](https://github.com/electrode-io/electrode/pull/1494)) [commit](http://github.com/electrode-io/electrode/commit/8d12e0d661fb16ae66cfc256bbf55d1a9eb8c7f2)

- `packages/subapp-server`

  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)

- `packages/subapp-util`

  - show error on subapp name mismatch ([#1505](https://github.com/electrode-io/electrode/pull/1505)) [commit](http://github.com/electrode-io/electrode/commit/b26a6dda4ba37f2df487dd2ef320b0722e5fc0ab)

- `packages/subapp-web`

  - Fix for non-string (numeric) subapp bundle ids ([#1515](https://github.com/electrode-io/electrode/pull/1515)) [commit](http://github.com/electrode-io/electrode/commit/51375063c92e6adf9d76d0798dd57dfbdb3bfebe)
  - New subapp-web function: isLoaded [commit](http://github.com/electrode-io/electrode/commit/5ff500542f36246e8e5139471a12db3c9b2e89fe)
  - Add new function for subapps: waitForSubApp [commit](http://github.com/electrode-io/electrode/commit/15b94ce3f53184a106bf7a6537db5633f7e4f589)
  - prepare data before invoking SSR'ed subapp that's inlined [commit](http://github.com/electrode-io/electrode/commit/264878cfef69d81cd245e9ddc970fa77ea8309fd)
  - fix function call ([#1504](https://github.com/electrode-io/electrode/pull/1504)) [commit](http://github.com/electrode-io/electrode/commit/ce35f85c6adfae0f6e4104cbb2d7b607a06e03d0)
  - default to babel runtime and polyfill for subapps [commit](http://github.com/electrode-io/electrode/commit/3e75bfc2352db6e33d156cd4441efc49166e3c87)
  - scope client side lib for subapps [commit](http://github.com/electrode-io/electrode/commit/7da7cadd89b599b5b547756626ad6abb210db3d5)
  - handle css bundles for subapps [commit](http://github.com/electrode-io/electrode/commit/9d85e259fd7908f2190682a77f37afdf917747c1)
  - ensure webpack treeshaking works for subapp packages ([#1496](https://github.com/electrode-io/electrode/pull/1496)) [commit](http://github.com/electrode-io/electrode/commit/c24c68ae9ab926756eab68e648876f708a8b2709)
  - optimize webpack runtime as a single chunk for subapps ([#1495](https://github.com/electrode-io/electrode/pull/1495)) [commit](http://github.com/electrode-io/electrode/commit/89a9c86f073f2add96c283e8b6e00390f2916b92)
  - transpile src to multi targets ([#1492](https://github.com/electrode-io/electrode/pull/1492)) [commit](http://github.com/electrode-io/electrode/commit/1553f9ae6c40460ec52f9a4202f45400387a54a3)

- `docs`

  - First pass of an Electrode subapp guide ([#1497](https://github.com/electrode-io/electrode/pull/1497)) [commit](http://github.com/electrode-io/electrode/commit/12e87c06a4a44e591ef4ca3db1727045cfe3e28a)

- `MISC`

  - Update changelog [commit](http://github.com/electrode-io/electrode/commit/852812743f6280723c8645bb1d96d2abaed6c435)
  - Update changelog [commit](http://github.com/electrode-io/electrode/commit/59e4f8eb5ff2e2b42a935ac1fe5a7e37ed90a44b)

# 1/7/2020

- remove beta from ver7

## Packages

- `@xarc/create-app@2.0.2` `(2.0.1 => 2.0.2)`
- `electrode-archetype-react-app@7.0.2` `(7.0.1 => 7.0.2)`
- `electrode-archetype-react-app-dev@7.0.2` `(7.0.1 => 7.0.2)`
- `electrode-archetype-react-component@7.0.2` `(7.0.1 => 7.0.2)`
- `electrode-archetype-react-component-dev@7.0.2` `(7.0.1 => 7.0.2)`
- `electrode-ignite@3.0.17` `(3.0.16 => 3.0.17)`
- `generator-electrode@6.0.2` `(6.0.1 => 6.0.2)`
- `subapp-pbundle@0.0.3` `(0.0.2 => 0.0.3)`
- `subapp-react@0.0.3` `(0.0.2 => 0.0.3)`
- `subapp-redux@1.0.12` `(1.0.11 => 1.0.12)`
- `subapp-web@1.0.11` `(1.0.10 => 1.0.11)`

## Commits

- `packages/create-app`

  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/electrode-archetype-react-app[-dev]`

  - Publish [commit](http://github.com/electrode-io/electrode/commit/1086a008be2ee61c8080083073606a914b6dbd4e)
  - avoid dev mode stuff in production mode ([#1483](https://github.com/electrode-io/electrode/pull/1483)) [commit](http://github.com/electrode-io/electrode/commit/990f0b33dd2bab176d000e280912e3346bcd83da)
  - Publish [commit](http://github.com/electrode-io/electrode/commit/55c491cf5935fe15fb4725a61f3c640713a8d689)
  - react-app-dev: Add dev-admin for fastify ([#1478](https://github.com/electrode-io/electrode/pull/1478)) [commit](http://github.com/electrode-io/electrode/commit/4a018e1457f9811b2b146fe06879adac77b61850)
  - dev admin webpack plugin for fastify ([#1474](https://github.com/electrode-io/electrode/pull/1474)) [commit](http://github.com/electrode-io/electrode/commit/93e967ad76fe1f5a5956336f6bdbf916212babe9)
  - Fix tests ([#1475](https://github.com/electrode-io/electrode/pull/1475)) [commit](http://github.com/electrode-io/electrode/commit/a3114aac60257648671a449121a5c8d43e9a7ff8)
  - dev admin only read keys in TTY mode ([#1470](https://github.com/electrode-io/electrode/pull/1470)) [commit](http://github.com/electrode-io/electrode/commit/9cd31c465b9b30478e128ec0a999324703deda26)
  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/electrode-archetype-react-component[-dev]`

  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/electrode-ignite`

  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/generator-electrode`

  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/subapp-pbundle`

  - add subapp support for preact & redux-bundler ([#1487](https://github.com/electrode-io/electrode/pull/1487)) [commit](http://github.com/electrode-io/electrode/commit/7619241cb0b530e22190ae9d5a87573f8eb88d75)
  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/subapp-react`

  - add subapp support for preact & redux-bundler ([#1487](https://github.com/electrode-io/electrode/pull/1487)) [commit](http://github.com/electrode-io/electrode/commit/7619241cb0b530e22190ae9d5a87573f8eb88d75)
  - add tests for subapp-react ([#1486](https://github.com/electrode-io/electrode/pull/1486)) [commit](http://github.com/electrode-io/electrode/commit/6aac4309903600941616d467ed4886acbd0deb2e)
  - extract React specific code into subapp-react module ([#1485](https://github.com/electrode-io/electrode/pull/1485)) [commit](http://github.com/electrode-io/electrode/commit/599e4b7bd40750d614e2c9411eeebcd29b27df9f)
  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/subapp-redux`

  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `packages/subapp-web`

  - extract React specific code into subapp-react module ([#1485](https://github.com/electrode-io/electrode/pull/1485)) [commit](http://github.com/electrode-io/electrode/commit/599e4b7bd40750d614e2c9411eeebcd29b27df9f)
  - extract FE React specific code to another file ([#1482](https://github.com/electrode-io/electrode/pull/1482)) [commit](http://github.com/electrode-io/electrode/commit/880d5e35a572eebd2ff47c5f501f1b297741c8f8)
  - multi framework support, step1: extract framework specific code ([#1480](https://github.com/electrode-io/electrode/pull/1480)) [commit](http://github.com/electrode-io/electrode/commit/342f3a07bc659523d5655c70e1dc1ff88eff47f6)
  - subapp.start handles inline rendering ([#1477](https://github.com/electrode-io/electrode/pull/1477)) [commit](http://github.com/electrode-io/electrode/commit/bcad095b47d46e98312c374775a72615958c8cfc)
  - first inline SubApp PoC ([#1472](https://github.com/electrode-io/electrode/pull/1472)) [commit](http://github.com/electrode-io/electrode/commit/ca708a1871ded2773f38c21749e93ab92ed36287)
  - remove beta from ver7 [commit](http://github.com/electrode-io/electrode/commit/f84dbd825e2755f8a76c5b0cd41f87633db90034)

- `.vscode`

  - extract React specific code into subapp-react module ([#1485](https://github.com/electrode-io/electrode/pull/1485)) [commit](http://github.com/electrode-io/electrode/commit/599e4b7bd40750d614e2c9411eeebcd29b27df9f)

- `docs`

  - doc link fixes 2 ([#1479](https://github.com/electrode-io/electrode/pull/1479)) [commit](http://github.com/electrode-io/electrode/commit/ea206268010ee0fa6bd8a010464bef3dbaac80df)
  - link fixes ([#1476](https://github.com/electrode-io/electrode/pull/1476)) [commit](http://github.com/electrode-io/electrode/commit/4ce9bf9e83d5295a7596dfce7c2b163467f5f5a1)

- `MISC`

  - Update changelog [commit](http://github.com/electrode-io/electrode/commit/1a601ffc811f0fa0c23e24149b116b2aeaf65ca0)
  - Update changelog [commit](http://github.com/electrode-io/electrode/commit/336541cbb64d5c4ed5647abbfe25a413307dbd9e)

# 1/3/2020

- avoid dev mode stuff in production mode

## Packages

- `electrode-archetype-react-app@6.5.23` `(6.5.22 => 6.5.23)`
- `electrode-archetype-react-app-dev@6.5.23` `(6.5.22 => 6.5.23)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - avoid dev mode stuff in production mode ([#1483](https://github.com/electrode-io/electrode/pull/1483)) [commit](http://github.com/electrode-io/electrode/commit/990f0b33dd2bab176d000e280912e3346bcd83da)
