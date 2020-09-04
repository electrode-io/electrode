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

# 12/31/2019

- dev admin only read keys in TTY mode

## Packages

- `electrode-archetype-react-app@6.5.22` `(6.5.21 => 6.5.22)`
- `electrode-archetype-react-app-dev@6.5.22` `(6.5.21 => 6.5.22)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - Fix tests ([#1475](https://github.com/electrode-io/electrode/pull/1475)) [commit](http://github.com/electrode-io/electrode/commit/a3114aac60257648671a449121a5c8d43e9a7ff8)
  - dev admin only read keys in TTY mode ([#1470](https://github.com/electrode-io/electrode/pull/1470)) [commit](http://github.com/electrode-io/electrode/commit/9cd31c465b9b30478e128ec0a999324703deda26)

- `docs`

  - link fixes ([#1476](https://github.com/electrode-io/electrode/pull/1476)) [commit](http://github.com/electrode-io/electrode/commit/4ce9bf9e83d5295a7596dfce7c2b163467f5f5a1)
  - doc link fixes 2 ([#1479](https://github.com/electrode-io/electrode/pull/1479)) [commit](http://github.com/electrode-io/electrode/commit/ea206268010ee0fa6bd8a010464bef3dbaac80df)

# 12/16/2019

## Packages

### Directly Updated

- `@xarc/create-app@2.0.0-beta7.0` `(1.0.3 => 2.0.0-beta7.0)`
- `electrode-archetype-opt-critical-css@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-eslint@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-flow@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-inferno@0.2.12` `(0.2.11 => 0.2.12)`
- `electrode-archetype-opt-jest@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-karma@2.0.8` `(2.0.7 => 2.0.8)`
- `electrode-archetype-opt-less@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-mocha@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-phantomjs@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-postcss@1.0.5` `(1.0.4 => 1.0.5)`
- `electrode-archetype-opt-preact@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-pwa@1.0.7` `(1.0.6 => 1.0.7)`
- `electrode-archetype-opt-react@2.0.5` `(2.0.4 => 2.0.5)`
- `electrode-archetype-opt-react-intl@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-sass@1.0.10` `(1.0.9 => 1.0.10)`
- `electrode-archetype-opt-sinon@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-stylus@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-typescript@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-react-app@7.0.0-beta7.0` `(6.5.21 => 7.0.0-beta7.0)`
- `electrode-archetype-react-app-dev@7.0.0-beta7.0` `(6.5.21 => 7.0.0-beta7.0)`
- `electrode-archetype-react-component@7.0.0-beta7.0` `(6.1.11 => 7.0.0-beta7.0)`
- `electrode-archetype-react-component-dev@7.0.0-beta7.0` `(6.1.11 => 7.0.0-beta7.0)`
- `electrode-redux-router-engine@4.0.0` `(3.0.0 => 4.0.0)`
- `generator-electrode@6.0.0-beta7.0` `(5.1.10 => 6.0.0-beta7.0)`

### Lerna Updated

- `electrode-ignite@3.0.15` `(3.0.14 => 3.0.15)`

## Commits

- `packages/create-app`

  - [major] update archetype dep to beta7 [commit](http://github.com/electrode-io/electrode/commit/766a695b09dc23ad505b32e076ee23959c6f7813)
  - create-app stylus default off [commit](http://github.com/electrode-io/electrode/commit/e4d979d71a43073a2d91849570fa25dde0b8fb43)
  - test-create-app task [commit](http://github.com/electrode-io/electrode/commit/bab537840c07a436817098d848637b6349578851)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)
  - Drop webpack dev server ([#1431](https://github.com/electrode-io/electrode/pull/1431)) [commit](http://github.com/electrode-io/electrode/commit/bfc8794ad6482959a1325fb1766f1080c1b48f56)
  - Remove electrode-bundle-analyzer ([#1420](https://github.com/electrode-io/electrode/pull/1420)) [commit](http://github.com/electrode-io/electrode/commit/dc3ab6fe699b2c1dd69b1406ecce7ac0e862aa4f)

- `packages/electrode-archetype-opt-critical-css`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-eslint`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-flow`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-inferno`

  - Add archetype Preact support ([#1465](https://github.com/electrode-io/electrode/pull/1465)) [commit](http://github.com/electrode-io/electrode/commit/e1693c2fd6f99f94725a09de662a4e8e1ba3595f)
  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-jest`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-karma`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-less`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-mocha`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-phantomjs`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-postcss`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-preact`

  - Add archetype Preact support ([#1465](https://github.com/electrode-io/electrode/pull/1465)) [commit](http://github.com/electrode-io/electrode/commit/e1693c2fd6f99f94725a09de662a4e8e1ba3595f)

- `packages/electrode-archetype-opt-pwa`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-react`

  - Add archetype Preact support ([#1465](https://github.com/electrode-io/electrode/pull/1465)) [commit](http://github.com/electrode-io/electrode/commit/e1693c2fd6f99f94725a09de662a4e8e1ba3595f)
  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-react-intl`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)
  - Remove electrode-bundle-analyzer ([#1420](https://github.com/electrode-io/electrode/pull/1420)) [commit](http://github.com/electrode-io/electrode/commit/dc3ab6fe699b2c1dd69b1406ecce7ac0e862aa4f)

- `packages/electrode-archetype-opt-sass`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-sinon`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-stylus`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-opt-typescript`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)

- `packages/electrode-archetype-react-app[-dev]`

  - update archetype peer dep for v7 beta [commit](http://github.com/electrode-io/electrode/commit/3bf570b3d5a551b591536c926b686449e45dbf56)
  - Add archetype Preact support ([#1465](https://github.com/electrode-io/electrode/pull/1465)) [commit](http://github.com/electrode-io/electrode/commit/e1693c2fd6f99f94725a09de662a4e8e1ba3595f)
  - Include description in features selector ([#1456](https://github.com/electrode-io/electrode/pull/1456)) [commit](http://github.com/electrode-io/electrode/commit/9c2e7fb64e0bf0c161f942fd282fdca963e8182e)
  - Create a features menu for random-access feature selection ([#1455](https://github.com/electrode-io/electrode/pull/1455)) [commit](http://github.com/electrode-io/electrode/commit/7e0a793e60a23faaeffb2a8c93c04d597e7fa763)
  - add dep for dev: prompts@2.2.1 ([#1453](https://github.com/electrode-io/electrode/pull/1453)) [commit](http://github.com/electrode-io/electrode/commit/b93490d1417bff46c8bc98c08ab4e1f60ed104ad)
  - Fix defect where exception is thrown if package is not available ([#1451](https://github.com/electrode-io/electrode/pull/1451)) [commit](http://github.com/electrode-io/electrode/commit/4a7c46497238569b089a2963305c7eef8653298d)
  - If devOnly is undefined, default to true. ([#1450](https://github.com/electrode-io/electrode/pull/1450)) [commit](http://github.com/electrode-io/electrode/commit/3dac9f69da37025091b4be9d1274e05fadb36989)
  - Allow use to break out of prompts in features task ([#1452](https://github.com/electrode-io/electrode/pull/1452)) [commit](http://github.com/electrode-io/electrode/commit/2f17574caf883e4617a2bf0aadf10d58bd098e77)
  - Do not run npm install by default ([#1454](https://github.com/electrode-io/electrode/pull/1454)) [commit](http://github.com/electrode-io/electrode/commit/2a0c8ceace76a81e6dbfeb32962bd44275dd0e27)
  - avoid failure checking for options in clap [commit](http://github.com/electrode-io/electrode/commit/08427ffaceb64ec63b5a564197e96a29314e8df5)
  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)
  - new task features ([#1439](https://github.com/electrode-io/electrode/pull/1439)) [commit](http://github.com/electrode-io/electrode/commit/b3cba6f3d94cae0a82d2ce6f433d30301d5bee9e)
  - Make lib/src directory structure default ([#1436](https://github.com/electrode-io/electrode/pull/1436)) [commit](http://github.com/electrode-io/electrode/commit/80749da538f71abcb874c22901ce97c79d9dd6b4)
  - Drop webpack dev server ([#1431](https://github.com/electrode-io/electrode/pull/1431)) [commit](http://github.com/electrode-io/electrode/commit/bfc8794ad6482959a1325fb1766f1080c1b48f56)
  - Removing electrode-webpack-reporter ([#1425](https://github.com/electrode-io/electrode/pull/1425)) [commit](http://github.com/electrode-io/electrode/commit/2ea9250cb42d33d637f072189ba696a636dd6696)
  - Remove nodemon and associated tasks ([#1424](https://github.com/electrode-io/electrode/pull/1424)) [commit](http://github.com/electrode-io/electrode/commit/c6d984c94504eb9850836d0dbf064ed82cd1c746)
  - Remove cssModuleStylusSupport flag ([#1423](https://github.com/electrode-io/electrode/pull/1423)) [commit](http://github.com/electrode-io/electrode/commit/aacafe7572d9e33e0161e46f6078b8bc1b79b643)
  - Remove OPTIMIZE_STATS and associated tasks ([#1421](https://github.com/electrode-io/electrode/pull/1421)) [commit](http://github.com/electrode-io/electrode/commit/8ad412896fc138a279228c4afb7a157cf4e98383)
  - Remove electrode-bundle-analyzer ([#1420](https://github.com/electrode-io/electrode/pull/1420)) [commit](http://github.com/electrode-io/electrode/commit/dc3ab6fe699b2c1dd69b1406ecce7ac0e862aa4f)
  - removing prop-types ([#1418](https://github.com/electrode-io/electrode/pull/1418)) [commit](http://github.com/electrode-io/electrode/commit/d330c97e7472a8fee1993b74477162a69e7dd2e2)
  - [major] Drop optimizeModulesForProduction option ([#1416](https://github.com/electrode-io/electrode/pull/1416)) [commit](http://github.com/electrode-io/electrode/commit/7155a0d6ba36684a8a217b93aa90e44d19229bcb)
  - [major] Replace webpack [hash] with [contenthash](<[#1373](https://github.com/electrode-io/electrode/pull/1373)>) [commit](http://github.com/electrode-io/electrode/commit/180215a1e29b2d8f664b3070a1b0086600cd3be1)

- `packages/electrode-archetype-react-component[-dev]`

  - update archetype peer dep for v7 beta [commit](http://github.com/electrode-io/electrode/commit/3bf570b3d5a551b591536c926b686449e45dbf56)
  - [major] Drop support for React version < 16 ([#1426](https://github.com/electrode-io/electrode/pull/1426)) [commit](http://github.com/electrode-io/electrode/commit/ba4bd3666f65cda4fc2470e9923ac79dc66adf6f)
  - Remove nodemon and associated tasks ([#1424](https://github.com/electrode-io/electrode/pull/1424)) [commit](http://github.com/electrode-io/electrode/commit/c6d984c94504eb9850836d0dbf064ed82cd1c746)
  - Remove cssModuleStylusSupport flag ([#1423](https://github.com/electrode-io/electrode/pull/1423)) [commit](http://github.com/electrode-io/electrode/commit/aacafe7572d9e33e0161e46f6078b8bc1b79b643)
  - Remove electrode-bundle-analyzer ([#1420](https://github.com/electrode-io/electrode/pull/1420)) [commit](http://github.com/electrode-io/electrode/commit/dc3ab6fe699b2c1dd69b1406ecce7ac0e862aa4f)
  - removing prop-types ([#1418](https://github.com/electrode-io/electrode/pull/1418)) [commit](http://github.com/electrode-io/electrode/commit/d330c97e7472a8fee1993b74477162a69e7dd2e2)

- `packages/electrode-redux-router-engine`

  - [major] Drop support for React version < 16 ([#1426](https://github.com/electrode-io/electrode/pull/1426)) [commit](http://github.com/electrode-io/electrode/commit/ba4bd3666f65cda4fc2470e9923ac79dc66adf6f)

- `packages/generator-electrode`

  - [major] update archetype dep to v7 beta [commit](http://github.com/electrode-io/electrode/commit/cf3d78a7938ace248f71d0a472d735837ee469d6)
  - Drop webpack dev server ([#1431](https://github.com/electrode-io/electrode/pull/1431)) [commit](http://github.com/electrode-io/electrode/commit/bfc8794ad6482959a1325fb1766f1080c1b48f56)
  - Removing electrode-webpack-reporter ([#1425](https://github.com/electrode-io/electrode/pull/1425)) [commit](http://github.com/electrode-io/electrode/commit/2ea9250cb42d33d637f072189ba696a636dd6696)
  - Remove cssModuleStylusSupport flag ([#1423](https://github.com/electrode-io/electrode/pull/1423)) [commit](http://github.com/electrode-io/electrode/commit/aacafe7572d9e33e0161e46f6078b8bc1b79b643)

- `packages/opt-archetype-check`

  - Do not fail the optional-check if both archetype config and package.json ([#1449](https://github.com/electrode-io/electrode/pull/1449)) [commit](http://github.com/electrode-io/electrode/commit/ae4adeb62c161182c8de5c40e747c766270aaeb5)

- `docs`

  - Default optional add-ons to off ([#1445](https://github.com/electrode-io/electrode/pull/1445)) [commit](http://github.com/electrode-io/electrode/commit/9a4f33678fe610c26c9d3bfbcbc3901e966d39ec)
  - Drop webpack dev server ([#1431](https://github.com/electrode-io/electrode/pull/1431)) [commit](http://github.com/electrode-io/electrode/commit/bfc8794ad6482959a1325fb1766f1080c1b48f56)
  - Removing electrode-webpack-reporter ([#1425](https://github.com/electrode-io/electrode/pull/1425)) [commit](http://github.com/electrode-io/electrode/commit/2ea9250cb42d33d637f072189ba696a636dd6696)
  - Remove cssModuleStylusSupport flag ([#1423](https://github.com/electrode-io/electrode/pull/1423)) [commit](http://github.com/electrode-io/electrode/commit/aacafe7572d9e33e0161e46f6078b8bc1b79b643)
  - Remove OPTIMIZE_STATS and associated tasks ([#1421](https://github.com/electrode-io/electrode/pull/1421)) [commit](http://github.com/electrode-io/electrode/commit/8ad412896fc138a279228c4afb7a157cf4e98383)
  - Remove electrode-bundle-analyzer ([#1420](https://github.com/electrode-io/electrode/pull/1420)) [commit](http://github.com/electrode-io/electrode/commit/dc3ab6fe699b2c1dd69b1406ecce7ac0e862aa4f)

- `tools`

  - use new version with npm tag [commit](http://github.com/electrode-io/electrode/commit/a173f43a14864e5e1a50589670bb0f71a8a7cf76)

- `MISC`

  - CI on node 10 [commit](http://github.com/electrode-io/electrode/commit/028ae621aaf500543c53ab892c77303b0251abe8)
  - set v7 tag [commit](http://github.com/electrode-io/electrode/commit/a218558f42b30352abf95558ac4c69258066f9a1)
  - add beta7 npm tag [commit](http://github.com/electrode-io/electrode/commit/20c9dd51469a3303f491d66aea5a530da4c8d667)

# 12/16/2019

- fix dev-admin process command
- support shared redux store for subapps

## Packages

- `electrode-archetype-react-app@6.5.21` `(6.5.20 => 6.5.21)`
- `electrode-archetype-react-app-dev@6.5.21` `(6.5.20 => 6.5.21)`
- `subapp-redux@1.0.10` `(1.0.9 => 1.0.10)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - When running dev-admin, no longer await command before listening ([#1469](https://github.com/electrode-io/electrode/pull/1469)) [commit](http://github.com/electrode-io/electrode/commit/e30c58c8bbb44384fa5b5d0018d19065a451130b)
  - Fix defect in which menu was unresponsive after inspect-brk mode ([#1468](https://github.com/electrode-io/electrode/pull/1468)) [commit](http://github.com/electrode-io/electrode/commit/1c599ceaf175671a53b950e5168aee59a57c2098)
  - support replace reducers for share redux store ([#1467](https://github.com/electrode-io/electrode/pull/1467)) [commit](http://github.com/electrode-io/electrode/commit/21f9c5b5255a6ae985410d032ec6834a64d443b4)
  - Should detect all Unhandled rejection messages as an error in log-parser ([#1466](https://github.com/electrode-io/electrode/pull/1466)) [commit](http://github.com/electrode-io/electrode/commit/bc12bb943925d5115f6ef34b29ce009e1b4dec6a)

- `packages/subapp-redux`

  - support replace reducers for share redux store ([#1467](https://github.com/electrode-io/electrode/pull/1467)) [commit](http://github.com/electrode-io/electrode/commit/21f9c5b5255a6ae985410d032ec6834a64d443b4)

- `.vscode`

  - support replace reducers for share redux store ([#1467](https://github.com/electrode-io/electrode/pull/1467)) [commit](http://github.com/electrode-io/electrode/commit/21f9c5b5255a6ae985410d032ec6834a64d443b4)

- `MISC`

  - update release instructions [commit](http://github.com/electrode-io/electrode/commit/05172e10861605e149911b158bb2726550223ee3)

# 12/5/2019

- Added --no-single-run support for karma tests
- Logging web interface
- Subapp redux store sharing

## Packages

- `electrode-archetype-react-app@6.5.20` `(6.5.19 => 6.5.20)`
- `electrode-archetype-react-app-dev@6.5.20` `(6.5.19 => 6.5.20)`
- `subapp-redux@1.0.9` `(1.0.8 => 1.0.9)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - Added --no-single-run support for karma tests ([#1464](https://github.com/electrode-io/electrode/pull/1464)) [commit](http://github.com/electrode-io/electrode/commit/cb4de9f83451e7b4b110bf7e558eaddc88f8fbc3)
  - Document dev-admin logging ([#1462](https://github.com/electrode-io/electrode/pull/1462)) [commit](http://github.com/electrode-io/electrode/commit/9de84908cb5408798327459f6589dd01fa9a82da)
  - Logging web interface ([#1460](https://github.com/electrode-io/electrode/pull/1460)) [commit](http://github.com/electrode-io/electrode/commit/60c6127e903b496d066386dacf5d88c40a53d6e1)
  - remove overridetestDescription ([#1459](https://github.com/electrode-io/electrode/pull/1459)) [commit](http://github.com/electrode-io/electrode/commit/64c0b2c2617df517e5bd10f3dee1db6f66a52a55)

- `packages/subapp-redux`

  - Subapp redux store sharing ([#1463](https://github.com/electrode-io/electrode/pull/1463)) [commit](http://github.com/electrode-io/electrode/commit/460ddbf755a165099b2e6f8a233f4bc965d4aafa)

- `docs`

  - Document dev-admin logging ([#1462](https://github.com/electrode-io/electrode/pull/1462)) [commit](http://github.com/electrode-io/electrode/commit/9de84908cb5408798327459f6589dd01fa9a82da)

- `MISC`

  - [ci] add node 12 [commit](http://github.com/electrode-io/electrode/commit/2d5f73e207438ae4d393a89212b46db1c7d3e158)

# 11/25/2019

Minor fixes:

- Add back sonarQubeUnitReporter to Karma test coverage
- lock dep to workaround babel 7.7.0 issue

## Packages

### Directly Updated

- `electrode-archetype-opt-karma@2.0.7` `(2.0.6 => 2.0.7)`
- `electrode-archetype-react-app@6.5.19` `(6.5.18 => 6.5.19)`
- `electrode-archetype-react-app-dev@6.5.19` `(6.5.18 => 6.5.19)`
- `subapp-web@1.0.9` `(1.0.8 => 1.0.9)`

### Lerna Updated

- `subapp-redux@1.0.8` `(1.0.7 => 1.0.8)`

## Commits

- `packages/electrode-archetype-opt-karma`

  - Add back sonarQubeUnitReporter to Karma test coverage ([#1448](https://github.com/electrode-io/electrode/pull/1448)) [commit](http://github.com/electrode-io/electrode/commit/5a417e2d238842b7db53a364db9bebcdeacdc2e3)

- `packages/electrode-archetype-react-app[-dev]`

  - Add back sonarQubeUnitReporter to Karma test coverage ([#1448](https://github.com/electrode-io/electrode/pull/1448)) [commit](http://github.com/electrode-io/electrode/commit/5a417e2d238842b7db53a364db9bebcdeacdc2e3)
  - Fix config fail to load ([#1446](https://github.com/electrode-io/electrode/pull/1446)) [commit](http://github.com/electrode-io/electrode/commit/c5ffca01d87510f9dc367aff001b9c5ba1826b99)

- `packages/subapp-web`

  - lock dep to workaround babel 7.7.0 issue [commit](http://github.com/electrode-io/electrode/commit/eb091d82bc536caca89836f1fa4a7d0560f25307)

- `.vscode`

  - CI: update to node 10 [commit](http://github.com/electrode-io/electrode/commit/b80c3643ed88aa5f4ef32c13ee663d232cbdc840)

- `docs`

  - Polyfilling now uses core-js ([#1447](https://github.com/electrode-io/electrode/pull/1447)) [commit](http://github.com/electrode-io/electrode/commit/79b0226ec539e42f1638c1517dedd9d314f5ecea)
  - Typo fix ([#1444](https://github.com/electrode-io/electrode/pull/1444)) [commit](http://github.com/electrode-io/electrode/commit/b4d87b87abe6d0e292499704bb3594464f724681)

# 11/4/2019

- fix dev proxy issues (SIGHUP) on windows
- no-ssr-sync flag added to reload client only without app server restart
- minor subapp load fixes

## Packages

### Directly Updated

- `@xarc/create-app@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-react-app@6.5.18` `(6.5.17 => 6.5.18)`
- `electrode-archetype-react-app-dev@6.5.18` `(6.5.17 => 6.5.18)`
- `subapp-web@1.0.8` `(1.0.7 => 1.0.8)`

### Lerna Updated

- `subapp-redux@1.0.7` `(1.0.6 => 1.0.7)`

## Commits

- `packages/create-app`

  - style subapps for create-app sample ([#1441](https://github.com/electrode-io/electrode/pull/1441)) [commit](http://github.com/electrode-io/electrode/commit/77be05fad310c3fc2b790aa74e3a971f7567e437)

- `packages/electrode-archetype-react-app[-dev]`

  - fix dev proxy issues (SIGHUP) on windows ([#1440](https://github.com/electrode-io/electrode/pull/1440)) [commit](http://github.com/electrode-io/electrode/commit/24f57e8e0eaaeeee265f5c4039d8eba009982b4a)
  - no-ssr-sync flag added to reload client only without app server restart ([#1437](https://github.com/electrode-io/electrode/pull/1437)) [commit](http://github.com/electrode-io/electrode/commit/67db96f4924b6d5c8ca26cbef691630642be5ea1)
  - notify dev-admin app server started ASAP ([#1434](https://github.com/electrode-io/electrode/pull/1434)) [commit](http://github.com/electrode-io/electrode/commit/9bd8cfa7bf7b6eecd7e5e1b15a5a15b4b20d2867)

- `packages/subapp-web`

  - handle chunks asset could be an array ([#1442](https://github.com/electrode-io/electrode/pull/1442)) [commit](http://github.com/electrode-io/electrode/commit/99e0af2fb9f4b30a471a89039f6d0c2301802047)
  - Handle load subapp error ([#1443](https://github.com/electrode-io/electrode/pull/1443)) [commit](http://github.com/electrode-io/electrode/commit/88db73fdc9c055ad89ef354de21c4b0f45326fca)

# 10/29/2019

- Move enzyme dependencies into the opt archetype
- Move chai dependencies into the opt archetype
- Move react-intl into optional archetype
- avoid overriding exist FORCE_COLOR env
- use process.send to transfer isomorphic config from wds to app
- show profiles/partials used to compose webpack config
- update config to split more vendor/shared bundles (subapps)
- Remove react-test-renderer from dev archetype
- update react-redux-router-engine to react-router 5

## Packages

### Directly Updated

- `@xarc/create-app@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-critical-css@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-eslint@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-flow@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-inferno@0.2.11` `(0.2.10 => 0.2.11)`
- `electrode-archetype-opt-jest@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-karma@2.0.6` `(2.0.5 => 2.0.6)`
- `electrode-archetype-opt-less@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-mocha@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-phantomjs@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-postcss@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-pwa@1.0.6` `(1.0.5 => 1.0.6)`
- `electrode-archetype-opt-react@2.0.4` `(2.0.3 => 2.0.4)`
- `electrode-archetype-opt-react-intl@1.0.0` `(0.1.0 => 1.0.0)`
- `electrode-archetype-opt-sass@1.0.9` `(1.0.8 => 1.0.9)`
- `electrode-archetype-opt-sinon@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-stylus@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-typescript@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-react-app@6.5.17` `(6.5.16 => 6.5.17)`
- `electrode-archetype-react-app-dev@6.5.17` `(6.5.16 => 6.5.17)`
- `electrode-archetype-react-component@6.1.11` `(6.1.10 => 6.1.11)`
- `electrode-archetype-react-component-dev@6.1.11` `(6.1.10 => 6.1.11)`
- `electrode-archetype-webpack-dll@2.0.1` `(2.0.0 => 2.0.1)`
- `electrode-archetype-webpack-dll-dev@2.0.1` `(2.0.0 => 2.0.1)`
- `electrode-redux-router-engine@3.0.0` `(2.3.2 => 3.0.0)`
- `generator-electrode@5.1.10` `(5.1.9 => 5.1.10)`
- `subapp-web@1.0.7` `(1.0.6 => 1.0.7)`
- `webpack-config-composer@1.1.2` `(1.1.1 => 1.1.2)`

### Lerna Updated

- `electrode-ignite@3.0.14` `(3.0.13 => 3.0.14)`
- `subapp-redux@1.0.6` `(1.0.5 => 1.0.6)`

## Commits

- `packages/create-app`

  - Move react-intl into optional archetype ([#1419](https://github.com/electrode-io/electrode/pull/1419)) [commit](http://github.com/electrode-io/electrode/commit/89c3d168176b2c6c4333f86a7108656e3e7f0dfb)

- `packages/electrode-archetype-opt-critical-css`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-eslint`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-flow`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-inferno`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-jest`

  - Move enzyme dependencies into the opt archetype that uses them ([#1415](https://github.com/electrode-io/electrode/pull/1415)) [commit](http://github.com/electrode-io/electrode/commit/bd6728dabfed990f4b55911cf1cd400e3b16e35c)
  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-karma`

  - Move enzyme dependencies into the opt archetype that uses them ([#1415](https://github.com/electrode-io/electrode/pull/1415)) [commit](http://github.com/electrode-io/electrode/commit/bd6728dabfed990f4b55911cf1cd400e3b16e35c)
  - Move chai dependencies into the opt archetype that uses them ([#1414](https://github.com/electrode-io/electrode/pull/1414)) [commit](http://github.com/electrode-io/electrode/commit/6ac63e70e1ed5af684b8d28f5a83a1ac13f52788)
  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-less`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-mocha`

  - Move enzyme dependencies into the opt archetype that uses them ([#1415](https://github.com/electrode-io/electrode/pull/1415)) [commit](http://github.com/electrode-io/electrode/commit/bd6728dabfed990f4b55911cf1cd400e3b16e35c)
  - Move chai dependencies into the opt archetype that uses them ([#1414](https://github.com/electrode-io/electrode/pull/1414)) [commit](http://github.com/electrode-io/electrode/commit/6ac63e70e1ed5af684b8d28f5a83a1ac13f52788)
  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-phantomjs`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-postcss`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-pwa`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-react`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-react-intl`

  - [major] prepare for first release [commit](http://github.com/electrode-io/electrode/commit/960afcce0dc1017e1dd28bf273e742f103c2048a)
  - Move react-intl into optional archetype ([#1419](https://github.com/electrode-io/electrode/pull/1419)) [commit](http://github.com/electrode-io/electrode/commit/89c3d168176b2c6c4333f86a7108656e3e7f0dfb)

- `packages/electrode-archetype-opt-sass`

  - add shx to missed opt package [commit](http://github.com/electrode-io/electrode/commit/1db9284ff9267ef8c824e4a89a23477d43b4dea3)
  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-sinon`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-stylus`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-opt-typescript`

  - windows compat: use shx to execute copy command ([#1411](https://github.com/electrode-io/electrode/pull/1411)) [commit](http://github.com/electrode-io/electrode/commit/7f28c5aaab3fbfc442fe85b1c88e14615e479cef)

- `packages/electrode-archetype-react-app[-dev]`

  - avoid overriding exist FORCE_COLOR env ([#1430](https://github.com/electrode-io/electrode/pull/1430)) [commit](http://github.com/electrode-io/electrode/commit/51485fd4205c783b951a78a9f6c8d7b988930296)
  - use process.send to transfer isomorphic config from wds to app ([#1427](https://github.com/electrode-io/electrode/pull/1427)) [commit](http://github.com/electrode-io/electrode/commit/b1728ce4418c417b04c6d800518a692f7a7a5e41)
  - show profiles/partials used to compose webpack config ([#1429](https://github.com/electrode-io/electrode/pull/1429)) [commit](http://github.com/electrode-io/electrode/commit/719a69c2835cfe8c441f67eb4bd4637023e5bae7)
  - update config to split more vendor/shared bundles ([#1428](https://github.com/electrode-io/electrode/pull/1428)) [commit](http://github.com/electrode-io/electrode/commit/bf9c379414f6fa88ca8f4234c8f205cc598def0c)
  - Move react-intl into optional archetype ([#1419](https://github.com/electrode-io/electrode/pull/1419)) [commit](http://github.com/electrode-io/electrode/commit/89c3d168176b2c6c4333f86a7108656e3e7f0dfb)
  - Remove react-test-renderer ([#1417](https://github.com/electrode-io/electrode/pull/1417)) [commit](http://github.com/electrode-io/electrode/commit/39fde52810b3d0c67992d2fd71479becb24a7a3e)
  - Move enzyme dependencies into the opt archetype that uses them ([#1415](https://github.com/electrode-io/electrode/pull/1415)) [commit](http://github.com/electrode-io/electrode/commit/bd6728dabfed990f4b55911cf1cd400e3b16e35c)
  - Move chai dependencies into the opt archetype that uses them ([#1414](https://github.com/electrode-io/electrode/pull/1414)) [commit](http://github.com/electrode-io/electrode/commit/6ac63e70e1ed5af684b8d28f5a83a1ac13f52788)

- `packages/electrode-archetype-react-component[-dev]`

  - Move react-intl into optional archetype ([#1419](https://github.com/electrode-io/electrode/pull/1419)) [commit](http://github.com/electrode-io/electrode/commit/89c3d168176b2c6c4333f86a7108656e3e7f0dfb)
  - Remove react-test-renderer ([#1417](https://github.com/electrode-io/electrode/pull/1417)) [commit](http://github.com/electrode-io/electrode/commit/39fde52810b3d0c67992d2fd71479becb24a7a3e)
  - Move enzyme dependencies into the opt archetype that uses them ([#1415](https://github.com/electrode-io/electrode/pull/1415)) [commit](http://github.com/electrode-io/electrode/commit/bd6728dabfed990f4b55911cf1cd400e3b16e35c)
  - Move chai dependencies into the opt archetype that uses them ([#1414](https://github.com/electrode-io/electrode/pull/1414)) [commit](http://github.com/electrode-io/electrode/commit/6ac63e70e1ed5af684b8d28f5a83a1ac13f52788)

- `packages/electrode-archetype-webpack-dll[-dev]`

  - avoid overriding exist FORCE_COLOR env ([#1430](https://github.com/electrode-io/electrode/pull/1430)) [commit](http://github.com/electrode-io/electrode/commit/51485fd4205c783b951a78a9f6c8d7b988930296)

- `packages/electrode-redux-router-engine`

  - [major] mark for major bump due to react-router 5 ([#1432](https://github.com/electrode-io/electrode/pull/1432)) [commit](http://github.com/electrode-io/electrode/commit/89e307d29fa16fe256901d6cff2ddf88d7306683)
  - [minor][dep] react router 5.x.x ([#1409](https://github.com/electrode-io/electrode/pull/1409)) [commit](http://github.com/electrode-io/electrode/commit/4367abd181ba110a299dbdce0e82bdac3447fa39)

- `packages/generator-electrode`

  - update generator to create app for react-router 5 ([#1433](https://github.com/electrode-io/electrode/pull/1433)) [commit](http://github.com/electrode-io/electrode/commit/3ef79c7217982a59f345932e66a218aedfd18ee0)
  - generate app to use redux-router-engine@3 [commit](http://github.com/electrode-io/electrode/commit/d0436ae35c08d7fa5b924c38f8b04a7a54a5606d)

- `packages/subapp-web`

  - update config to split more vendor/shared bundles ([#1428](https://github.com/electrode-io/electrode/pull/1428)) [commit](http://github.com/electrode-io/electrode/commit/bf9c379414f6fa88ca8f4234c8f205cc598def0c)

- `packages/webpack-config-composer`

  - show profiles/partials used to compose webpack config ([#1429](https://github.com/electrode-io/electrode/pull/1429)) [commit](http://github.com/electrode-io/electrode/commit/719a69c2835cfe8c441f67eb4bd4637023e5bae7)

- `docs`

  - Add flow to summary ([#1422](https://github.com/electrode-io/electrode/pull/1422)) [commit](http://github.com/electrode-io/electrode/commit/b4634fbea437ddf744de33c02bab571e3d07bb2c)

# 10/17/2019

- fix subapp to handle bundles with multiple assets
- fix eslint to look at `__tests__` etc dirs

## Packages

### Directly Updated

- `@xarc/create-app@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-react-app@6.5.16` `(6.5.15 => 6.5.16)`
- `electrode-archetype-react-app-dev@6.5.16` `(6.5.15 => 6.5.16)`
- `subapp-web@1.0.6` `(1.0.5 => 1.0.6)`

### Lerna Updated

- `subapp-redux@1.0.5` `(1.0.4 => 1.0.5)`

## Commits

- `packages/create-app`

  - update app template ([#1408](https://github.com/electrode-io/electrode/pull/1408)) [commit](http://github.com/electrode-io/electrode/commit/6928988f04af0d3c9166118f4ebd59b673874ad7)

- `packages/electrode-archetype-react-app[-dev]`

  - [auto] prettier format [commit](http://github.com/electrode-io/electrode/commit/c67201d0d1c1e3a95cc015cc9b23942145d94cb8)
  - Add additional directories to linter ([#1407](https://github.com/electrode-io/electrode/pull/1407)) [commit](http://github.com/electrode-io/electrode/commit/024c08b181934c721fb025fc097ad61de1c74fe4)

- `packages/subapp-web`

  - handle bundles with multiple assets ([#1410](https://github.com/electrode-io/electrode/pull/1410)) [commit](http://github.com/electrode-io/electrode/commit/696439b6fb6596c361b9df66f6c4d6d0a05a90f9)

- `.vscode`

  - [auto] save vscode settings for prettier [commit](http://github.com/electrode-io/electrode/commit/0fc451f74293854415617aced139ee03e7654335)

# 10/9/2019

## Packages

- `electrode-archetype-react-app@6.5.15` `(6.5.14 => 6.5.15)`
- `electrode-archetype-react-app-dev@6.5.15` `(6.5.14 => 6.5.15)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - fix babel rc extends path ([#1406](https://github.com/electrode-io/electrode/pull/1406)) [commit](http://github.com/electrode-io/electrode/commit/366a5e0b2f89d8dec21cbc45408fae180fc39a58)

# 10/8/2019

- subapp updates
- drop istanbul for nyc

## Packages

### Directly Updated

- `@xarc/create-app@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-react-app@6.5.14` `(6.5.13 => 6.5.14)`
- `electrode-archetype-react-app-dev@6.5.14` `(6.5.13 => 6.5.14)`
- `electrode-archetype-react-component@6.1.10` `(6.1.9 => 6.1.10)`
- `electrode-archetype-react-component-dev@6.1.10` `(6.1.9 => 6.1.10)`
- `subapp-web@1.0.5` `(1.0.4 => 1.0.5)`

## Commits

- `packages/create-app`

  - prompt to overwrite dir ([#1400](https://github.com/electrode-io/electrode/pull/1400)) [commit](http://github.com/electrode-io/electrode/commit/bae39cd2e7558fc019ff3524235b5f815317b8ec)
  - [major] new @xarc/creat-app package for npm init ([#1395](https://github.com/electrode-io/electrode/pull/1395)) [commit](http://github.com/electrode-io/electrode/commit/dc6b650d12d437ee4681365331fb5b9211f22fc9)

- `packages/electrode-archetype-react-app[-dev]`

  - Change webpack include priority in searchUserCustomConfig ([#1405](https://github.com/electrode-io/electrode/pull/1405)) [commit](http://github.com/electrode-io/electrode/commit/0b01ac42e63aa8a354ed53af52ebb47574195ecc)
  - default jest to v24 ([#1403](https://github.com/electrode-io/electrode/pull/1403)) [commit](http://github.com/electrode-io/electrode/commit/5bddea39da36e09098634f7e31e1dcbcad38ae5f)
  - enable tty for jest so it can run in watch mode ([#1402](https://github.com/electrode-io/electrode/pull/1402)) [commit](http://github.com/electrode-io/electrode/commit/de11fbb7883be50539446c9235f277f8b8925e35)
  - look for _test_ dirs under src for tests ([#1399](https://github.com/electrode-io/electrode/pull/1399)) [commit](http://github.com/electrode-io/electrode/commit/eb3bea49e8123d201cc5c46de6f293f023f88997)
  - fix subapp handling shared bundles ([#1398](https://github.com/electrode-io/electrode/pull/1398)) [commit](http://github.com/electrode-io/electrode/commit/2faa16bff7c8843238630ef6df059624d8a86d47)
  - add contributors field to package.json ([#1396](https://github.com/electrode-io/electrode/pull/1396)) [commit](http://github.com/electrode-io/electrode/commit/ed6dcb8990bd03958435ad71a88546a3335605a1)
  - switch to nyc from istanbul ([#1388](https://github.com/electrode-io/electrode/pull/1388)) [commit](http://github.com/electrode-io/electrode/commit/8fb08e02491241d5ee7d4f3abdbc40d0f67fcb1f)

- `packages/electrode-archetype-react-component[-dev]`

  - switch to nyc from istanbul ([#1388](https://github.com/electrode-io/electrode/pull/1388)) [commit](http://github.com/electrode-io/electrode/commit/8fb08e02491241d5ee7d4f3abdbc40d0f67fcb1f)

* `packages/subapp-web`

  - load subapp bundles by their entry points and id ([#1401](https://github.com/electrode-io/electrode/pull/1401)) [commit](http://github.com/electrode-io/electrode/commit/2ccbd5946a8a6f0eed62ed5217ab504f66dba23f)
  - fix subapp handling shared bundles ([#1398](https://github.com/electrode-io/electrode/pull/1398)) [commit](http://github.com/electrode-io/electrode/commit/2faa16bff7c8843238630ef6df059624d8a86d47)
  - add contributors field to package.json ([#1396](https://github.com/electrode-io/electrode/pull/1396)) [commit](http://github.com/electrode-io/electrode/commit/ed6dcb8990bd03958435ad71a88546a3335605a1)

* `tools`

  - fix tools for package with scopes [commit](http://github.com/electrode-io/electrode/commit/57350fdbc9b4ae1f29449d6e35be6e398f6992d9)

# 10/3/2019

- minor fixes

## Packages

- `electrode-archetype-opt-critical-css@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-eslint@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-flow@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-inferno@0.2.10` `(0.2.9 => 0.2.10)`
- `electrode-archetype-opt-jest@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-karma@2.0.5` `(2.0.4 => 2.0.5)`
- `electrode-archetype-opt-less@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-mocha@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-phantomjs@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-postcss@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-pwa@1.0.5` `(1.0.4 => 1.0.5)`
- `electrode-archetype-opt-react@2.0.3` `(2.0.2 => 2.0.3)`
- `electrode-archetype-opt-sass@1.0.8` `(1.0.7 => 1.0.8)`
- `electrode-archetype-opt-sinon@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-stylus@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-typescript@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-react-app@6.5.13` `(6.5.12 => 6.5.13)`
- `electrode-archetype-react-app-dev@6.5.13` `(6.5.12 => 6.5.13)`

## Commits

- `packages/electrode-archetype-opt-critical-css`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-eslint`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-flow`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-inferno`

  - add onlyOneOf options to optional archetypes check ([#1392](https://github.com/electrode-io/electrode/pull/1392)) [commit](http://github.com/electrode-io/electrode/commit/0eed5fd05703eb95f31cbc20a58ac519339b2a96)

- `packages/electrode-archetype-opt-jest`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-karma`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-less`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-mocha`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-phantomjs`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-postcss`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-pwa`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-react`

  - add onlyOneOf options to optional archetypes check ([#1392](https://github.com/electrode-io/electrode/pull/1392)) [commit](http://github.com/electrode-io/electrode/commit/0eed5fd05703eb95f31cbc20a58ac519339b2a96)

- `packages/electrode-archetype-opt-sass`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-sinon`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-stylus`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-opt-typescript`

  - [auto] update optional check [commit](http://github.com/electrode-io/electrode/commit/7bf5f3b361aed1fd81d2035f084b63fa055cc3c2)

- `packages/electrode-archetype-react-app[-dev]`

  - Add some unit tests for generate-config ([#1394](https://github.com/electrode-io/electrode/pull/1394)) [commit](http://github.com/electrode-io/electrode/commit/3afed1c9e7a2f01fa1fd522553c50c430618de73)
  - Change searchUserCustomConfig to guarantee a search for "webpack.config" ([#1393](https://github.com/electrode-io/electrode/pull/1393)) [commit](http://github.com/electrode-io/electrode/commit/d659cf0d6b1c1e1927ec87af3a10d5797629aa6c)
  - add onlyOneOf options to optional archetypes check ([#1392](https://github.com/electrode-io/electrode/pull/1392)) [commit](http://github.com/electrode-io/electrode/commit/0eed5fd05703eb95f31cbc20a58ac519339b2a96)
  - test frameworks require chai/etc gracefully ([#1391](https://github.com/electrode-io/electrode/pull/1391)) [commit](http://github.com/electrode-io/electrode/commit/486819ee21254bce6637409fc76b669f5518f2be)
  - fix deleting babel ignore files after build ([#1390](https://github.com/electrode-io/electrode/pull/1390)) [commit](http://github.com/electrode-io/electrode/commit/7ecdb9e3069d7c0eef87f9687b104d562412afe8)
  - add styl, less, scss, sass to jest identify proxy ([#1389](https://github.com/electrode-io/electrode/pull/1389)) [commit](http://github.com/electrode-io/electrode/commit/152398ac4c2d8af4465d0432eb575935f03e57b7)

- `packages/opt-archetype-check`

  - add onlyOneOf options to optional archetypes check ([#1392](https://github.com/electrode-io/electrode/pull/1392)) [commit](http://github.com/electrode-io/electrode/commit/0eed5fd05703eb95f31cbc20a58ac519339b2a96)

# 9/30/2019

- add optionals: flow, less, phantomjs, stylus
- app archetype: fixes and updates

## Packages

### Directly Updated

- `electrode-archetype-opt-flow@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-karma@2.0.4` `(2.0.3 => 2.0.4)`
- `electrode-archetype-opt-less@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-phantomjs@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-postcss@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-pwa@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-stylus@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-react-app@6.5.12` `(6.5.11 => 6.5.12)`
- `electrode-archetype-react-app-dev@6.5.12` `(6.5.11 => 6.5.12)`
- `electrode-archetype-react-component@6.1.9` `(6.1.8 => 6.1.9)`
- `electrode-archetype-react-component-dev@6.1.9` `(6.1.8 => 6.1.9)`
- `electrode-react-webapp@3.8.4` `(3.8.3 => 3.8.4)`
- `electrode-redux-router-engine@2.3.2` `(2.3.1 => 2.3.2)`
- `generator-electrode@5.1.9` `(5.1.8 => 5.1.9)`
- `subapp-redux@1.0.4` `(1.0.3 => 1.0.4)`
- `subapp-server@1.1.4` `(1.1.3 => 1.1.4)`
- `subapp-util@1.0.2` `(1.0.1 => 1.0.2)`
- `subapp-web@1.0.4` `(1.0.3 => 1.0.4)`

### Lerna Updated

- `electrode-ignite@3.0.13` `(3.0.12 => 3.0.13)`

## Commits

- `packages/electrode-archetype-opt-flow`

  - make flow an optional add on ([#1351](https://github.com/electrode-io/electrode/pull/1351)) [commit](http://github.com/electrode-io/electrode/commit/1c1c8e947cf3109508bd2058843849f0f08d9fed)
  - [major] mark for initial release [commit](http://github.com/electrode-io/electrode/commit/ffc98c375e8087d64efe1445be8ebf02296c5e2e)

- `packages/electrode-archetype-opt-karma`

  - Make phantomjs optional ([#1344](https://github.com/electrode-io/electrode/pull/1344)) [commit](http://github.com/electrode-io/electrode/commit/fc411c0141444403a62b38c8551397ab855280ce)

- `packages/electrode-archetype-opt-less`

  - make less support optional ([#1353](https://github.com/electrode-io/electrode/pull/1353)) [commit](http://github.com/electrode-io/electrode/commit/e29963ea32a59a3ceac431597b70ed085ee6f483)
  - [major] mark for initial release [commit](http://github.com/electrode-io/electrode/commit/ffc98c375e8087d64efe1445be8ebf02296c5e2e)

- `packages/electrode-archetype-opt-phantomjs`

  - Make phantomjs optional ([#1344](https://github.com/electrode-io/electrode/pull/1344)) [commit](http://github.com/electrode-io/electrode/commit/fc411c0141444403a62b38c8551397ab855280ce)
  - [major] mark for initial release [commit](http://github.com/electrode-io/electrode/commit/ffc98c375e8087d64efe1445be8ebf02296c5e2e)

- `packages/electrode-archetype-opt-postcss`

  - add demo for sugarss and move dep to postcss optional ([#1380](https://github.com/electrode-io/electrode/pull/1380)) [commit](http://github.com/electrode-io/electrode/commit/d724902ed6c9cdade73e06a026f841263288b4b6)

- `packages/electrode-archetype-opt-pwa`

  - fix pwa if it's turned off [commit](http://github.com/electrode-io/electrode/commit/58fd524463a6589471e639629a85e29ba3107209)

- `packages/electrode-archetype-opt-stylus`

  - make stylus optional ([#1352](https://github.com/electrode-io/electrode/pull/1352)) [commit](http://github.com/electrode-io/electrode/commit/e4bbc72d97316150bfbc2efe13a9c0e9d742e62c)
  - [major] mark for initial release [commit](http://github.com/electrode-io/electrode/commit/ffc98c375e8087d64efe1445be8ebf02296c5e2e)

- `packages/electrode-archetype-react-app[-dev]`

  - fix webpack dev progress logging ([#1387](https://github.com/electrode-io/electrode/pull/1387)) [commit](http://github.com/electrode-io/electrode/commit/774a19cf5cf4cc041eb18d02e6608d9cbc92ff5f)
  - defer loading app mode in config/archetype ([#1386](https://github.com/electrode-io/electrode/pull/1386)) [commit](http://github.com/electrode-io/electrode/commit/cd624069968709b589d131be0b3449edb747ef84)
  - hash vendor bundle names to avoid lonnng filename ([#1385](https://github.com/electrode-io/electrode/pull/1385)) [commit](http://github.com/electrode-io/electrode/commit/857883f8340de4c6e2d184efd17c41555e064612)
  - save chunks and entrypoints to webpack stats ([#1384](https://github.com/electrode-io/electrode/pull/1384)) [commit](http://github.com/electrode-io/electrode/commit/7e9141c68de4c2c62aeb4043b5da5dcb141da05d)
  - add demo for sugarss and move dep to postcss optional ([#1380](https://github.com/electrode-io/electrode/pull/1380)) [commit](http://github.com/electrode-io/electrode/commit/d724902ed6c9cdade73e06a026f841263288b4b6)
  - dep: electrode-hapi-compat@1.2.0 for hapi 18 support ([#1378](https://github.com/electrode-io/electrode/pull/1378)) [commit](http://github.com/electrode-io/electrode/commit/d9303c380227cf46781c3e9584db396937451201)
  - scan subapp dir for reducers and create HMR createStore method ([#1377](https://github.com/electrode-io/electrode/pull/1377)) [commit](http://github.com/electrode-io/electrode/commit/e9c90f3abbc35a354ce076bdc013e0bf75d1c989)
  - Further improvements to invalid host message ([#1376](https://github.com/electrode-io/electrode/pull/1376)) [commit](http://github.com/electrode-io/electrode/commit/274c9b56238b16657f1dc472d0fb4514d11a345b)
  - Hapi 18 compatibility ([#1375](https://github.com/electrode-io/electrode/pull/1375)) [commit](http://github.com/electrode-io/electrode/commit/ed107aa012237dde9112d7230ba0cb056aee0f28)
  - Fix typo in "notFound" error page ([#1372](https://github.com/electrode-io/electrode/pull/1372)) [commit](http://github.com/electrode-io/electrode/commit/4cd29ddd44b740ddee3a8bb7245831f217fcfbc4)
  - Fix indentation and add color to message ([#1371](https://github.com/electrode-io/electrode/pull/1371)) [commit](http://github.com/electrode-io/electrode/commit/843abdd506117d90bf841c8f48f37742b3383e7c)
  - More descriptive 404 message for non-matching host ([#1365](https://github.com/electrode-io/electrode/pull/1365)) [commit](http://github.com/electrode-io/electrode/commit/29d6598607d6f95c9d2ecc02153ae79088385af7)
  - export webpack dev plugin and middlewares ([#1361](https://github.com/electrode-io/electrode/pull/1361)) [commit](http://github.com/electrode-io/electrode/commit/05e4d5d74fbe1437197f2257e55cc1bd71754d97)
  - fix webpack de\$ middleware loading config ([#1360](https://github.com/electrode-io/electrode/pull/1360)) [commit](http://github.com/electrode-io/electrode/commit/a1c5ad099fac26ff3adc00b0104beb319963d4aa)
  - fix css module detection ([#1358](https://github.com/electrode-io/electrode/pull/1358)) [commit](http://github.com/electrode-io/electrode/commit/1e9ac6806f8f0001f882f842d56579a6d7de4a0c)
  - use filter-scan-dir over glob ([#1357](https://github.com/electrode-io/electrode/pull/1357)) [commit](http://github.com/electrode-io/electrode/commit/547894b481985d6180455a423bef65df3fb4e245)
  - fix errors [commit](http://github.com/electrode-io/electrode/commit/37c2fbcc9122e4d3cc9403eb1260a5f522c10f59)
  - fix config file detection [commit](http://github.com/electrode-io/electrode/commit/a7fcc81d3d9e61d4701c9122ff36f360c1768605)
  - fix lint [commit](http://github.com/electrode-io/electrode/commit/589a3de52b9bedc36ad661af13a3a58c5b85aa07)
  - update custom-check for webpack config [commit](http://github.com/electrode-io/electrode/commit/55cccf2e911cefc9e88ae67d5ea85ec15fddcc42)
  - allow user to init a webpack config composer first [commit](http://github.com/electrode-io/electrode/commit/9023d86188f1a46b552ddc21da406fbfd6f8c935)
  - cleanup/refactor/fix app control webpack config [commit](http://github.com/electrode-io/electrode/commit/4250b7f95b91799a0c21bc947a622718e55e4474)
  - make less support optional ([#1353](https://github.com/electrode-io/electrode/pull/1353)) [commit](http://github.com/electrode-io/electrode/commit/e29963ea32a59a3ceac431597b70ed085ee6f483)
  - make stylus optional ([#1352](https://github.com/electrode-io/electrode/pull/1352)) [commit](http://github.com/electrode-io/electrode/commit/e4bbc72d97316150bfbc2efe13a9c0e9d742e62c)
  - make flow an optional add on ([#1351](https://github.com/electrode-io/electrode/pull/1351)) [commit](http://github.com/electrode-io/electrode/commit/1c1c8e947cf3109508bd2058843849f0f08d9fed)
  - Use nyc to run coverage for server test ([#1350](https://github.com/electrode-io/electrode/pull/1350)) [commit](http://github.com/electrode-io/electrode/commit/8e11c0a81ce4e965ee0e5e789070300f3f6a246e)
  - fix pwa if it's turned off [commit](http://github.com/electrode-io/electrode/commit/58fd524463a6589471e639629a85e29ba3107209)
  - Make phantomjs optional ([#1344](https://github.com/electrode-io/electrode/pull/1344)) [commit](http://github.com/electrode-io/electrode/commit/fc411c0141444403a62b38c8551397ab855280ce)
  - subapp update - more consistent interface, auto hmr, simplified routing ([#1343](https://github.com/electrode-io/electrode/pull/1343)) [commit](http://github.com/electrode-io/electrode/commit/c60b33ed4a76e10d9f2e6fad35d0640944455785)

- `packages/electrode-archetype-react-component[-dev]`

  - Make phantomjs optional ([#1344](https://github.com/electrode-io/electrode/pull/1344)) [commit](http://github.com/electrode-io/electrode/commit/fc411c0141444403a62b38c8551397ab855280ce)

- `packages/electrode-react-webapp`

  - hash vendor bundle names to avoid lonnng filename ([#1385](https://github.com/electrode-io/electrode/pull/1385)) [commit](http://github.com/electrode-io/electrode/commit/857883f8340de4c6e2d184efd17c41555e064612)
  - dep: electrode-hapi-compat@1.2.0 for hapi 18 support ([#1378](https://github.com/electrode-io/electrode/pull/1378)) [commit](http://github.com/electrode-io/electrode/commit/d9303c380227cf46781c3e9584db396937451201)

- `packages/electrode-redux-router-engine`

  - Ensure that redux-router-engine works with hapi@18 request url ([#1362](https://github.com/electrode-io/electrode/pull/1362)) [commit](http://github.com/electrode-io/electrode/commit/389249ae11562abb98c5bb5910676ffd6d9780f0)

- `packages/generator-electrode`

  - Remove extraneous braces in styleName props ([#1366](https://github.com/electrode-io/electrode/pull/1366)) [commit](http://github.com/electrode-io/electrode/commit/3100b692a03904e4ee3fe336fd291164d07cdf40)

- `packages/subapp-redux`

  - scan subapp dir for reducers and create HMR createStore method ([#1377](https://github.com/electrode-io/electrode/pull/1377)) [commit](http://github.com/electrode-io/electrode/commit/e9c90f3abbc35a354ce076bdc013e0bf75d1c989)
  - handle isomorphic invoking prepare for initial state [commit](http://github.com/electrode-io/electrode/commit/7707c40bb65212453b5319c5f4b8396d5eb04bd9)
  - subapp update - more consistent interface, auto hmr, simplified routing ([#1343](https://github.com/electrode-io/electrode/pull/1343)) [commit](http://github.com/electrode-io/electrode/commit/c60b33ed4a76e10d9f2e6fad35d0640944455785)

- `packages/subapp-server`

  - hash vendor bundle names to avoid lonnng filename ([#1385](https://github.com/electrode-io/electrode/pull/1385)) [commit](http://github.com/electrode-io/electrode/commit/857883f8340de4c6e2d184efd17c41555e064612)
  - use app port if dev proxy is active ([#1383](https://github.com/electrode-io/electrode/pull/1383)) [commit](http://github.com/electrode-io/electrode/commit/51f06a93b75ba7a5b61f9fc0c67da10d424b66e7)
  - refactor hapi route setup ([#1379](https://github.com/electrode-io/electrode/pull/1379)) [commit](http://github.com/electrode-io/electrode/commit/3e84e7b3a990b6cfbb7c149a8126d7588af9c7ca)
  - set text/html type for stream response ([#1374](https://github.com/electrode-io/electrode/pull/1374)) [commit](http://github.com/electrode-io/electrode/commit/c39c16b3462a06ebe9aaa7dc58185d8f6c8357b2)
  - update hapi plugin options and drop v16 support ([#1348](https://github.com/electrode-io/electrode/pull/1348)) [commit](http://github.com/electrode-io/electrode/commit/00c95d9528c51a4f248c98c7c072656868b472cb)
  - catch error from promise ([#1347](https://github.com/electrode-io/electrode/pull/1347)) [commit](http://github.com/electrode-io/electrode/commit/9b3c33aa1b6e71a509f8b6df968dab5370608aaa)
  - let plugin opts override opts loaded from routes file ([#1346](https://github.com/electrode-io/electrode/pull/1346)) [commit](http://github.com/electrode-io/electrode/commit/93a68259e0040bd719df1764fb3350cf4a011fe0)
  - export hapi plugin with new hapiPlugin field [commit](http://github.com/electrode-io/electrode/commit/5085d3223806cbd9ff0cd8087ce5937ea1fc41b6)
  - fix missing await [commit](http://github.com/electrode-io/electrode/commit/3ab6867d3370f970bd40617dcba6b41cb37f3985)
  - subapp update - more consistent interface, auto hmr, simplified routing ([#1343](https://github.com/electrode-io/electrode/pull/1343)) [commit](http://github.com/electrode-io/electrode/commit/c60b33ed4a76e10d9f2e6fad35d0640944455785)

- `packages/subapp-util`

  - hash vendor bundle names to avoid lonnng filename ([#1385](https://github.com/electrode-io/electrode/pull/1385)) [commit](http://github.com/electrode-io/electrode/commit/857883f8340de4c6e2d184efd17c41555e064612)
  - scan subapp dir for reducers and create HMR createStore method ([#1377](https://github.com/electrode-io/electrode/pull/1377)) [commit](http://github.com/electrode-io/electrode/commit/e9c90f3abbc35a354ce076bdc013e0bf75d1c989)
  - subapp update - more consistent interface, auto hmr, simplified routing ([#1343](https://github.com/electrode-io/electrode/pull/1343)) [commit](http://github.com/electrode-io/electrode/commit/c60b33ed4a76e10d9f2e6fad35d0640944455785)

- `packages/subapp-web`

  - hash vendor bundle names to avoid lonnng filename ([#1385](https://github.com/electrode-io/electrode/pull/1385)) [commit](http://github.com/electrode-io/electrode/commit/857883f8340de4c6e2d184efd17c41555e064612)
  - use pathname from URL object ([#1382](https://github.com/electrode-io/electrode/pull/1382)) [commit](http://github.com/electrode-io/electrode/commit/a937ecae9318435afd52fffd9e4795480c99e807)
  - adding app context to supply SSR data ([#1368](https://github.com/electrode-io/electrode/pull/1368)) [commit](http://github.com/electrode-io/electrode/commit/7b8c6746ab92fa06b1b6051132f7eb59c8c7a145)
  - support for suspense SSR subapp ([#1364](https://github.com/electrode-io/electrode/pull/1364)) [commit](http://github.com/electrode-io/electrode/commit/77b53e316b8a4ca7e477c2a96baa5d33ddcf50b6)
  - pass initial props for non redux case ([#1363](https://github.com/electrode-io/electrode/pull/1363)) [commit](http://github.com/electrode-io/electrode/commit/ef3b4149b6c0d3135871062253e926f9e90fdedb)
  - handle isomorphic invoking prepare for initial state [commit](http://github.com/electrode-io/electrode/commit/7707c40bb65212453b5319c5f4b8396d5eb04bd9)
  - update subapp prepare invoke logic [commit](http://github.com/electrode-io/electrode/commit/0ebb50adfdba5b46114955baf1cb710eb3ed1c49)
  - subapp update - more consistent interface, auto hmr, simplified routing ([#1343](https://github.com/electrode-io/electrode/pull/1343)) [commit](http://github.com/electrode-io/electrode/commit/c60b33ed4a76e10d9f2e6fad35d0640944455785)

- `.vscode`

  - subapp update - more consistent interface, auto hmr, simplified routing ([#1343](https://github.com/electrode-io/electrode/pull/1343)) [commit](http://github.com/electrode-io/electrode/commit/c60b33ed4a76e10d9f2e6fad35d0640944455785)

# 9/3/2019

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.5.11` `(6.5.10 => 6.5.11)`
- `electrode-archetype-react-app-dev@6.5.11` `(6.5.10 => 6.5.11)`
- `electrode-archetype-react-component@6.1.8` `(6.1.7 => 6.1.8)`
- `electrode-archetype-react-component-dev@6.1.8` `(6.1.7 => 6.1.8)`
- `electrode-react-webapp@3.8.3` `(3.8.2 => 3.8.3)`

### Lerna Updated

- `subapp-server@1.1.3` `(1.1.2 => 1.1.3)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - revert creating project wide babel config file [commit](http://github.com/electrode-io/electrode/commit/4f7979fa197497f91a393b1c814b19cc23b84e6f)
  - Disabling Karma tests if mocha is set as false ([#1340](https://github.com/electrode-io/electrode/pull/1340)) [commit](http://github.com/electrode-io/electrode/commit/fbf19f488cbcf7d59c0e9a82a9cb3938db41abfb)
  - Removed es6 code from karma setup ([#1339](https://github.com/electrode-io/electrode/pull/1339)) [commit](http://github.com/electrode-io/electrode/commit/93572a18c26b18f36985794a2a6b796f2426a529)
  - simplify .browserrc generation [commit](http://github.com/electrode-io/electrode/commit/ad60d3e819273765fc459cdb5576fc59dbe70e7a)

- `packages/electrode-archetype-react-component[-dev]`

  - Disabling Karma tests if mocha is set as false ([#1340](https://github.com/electrode-io/electrode/pull/1340)) [commit](http://github.com/electrode-io/electrode/commit/fbf19f488cbcf7d59c0e9a82a9cb3938db41abfb)

- `packages/electrode-react-webapp`

  - use default index template if selectTemplate didn't return one ([#1337](https://github.com/electrode-io/electrode/pull/1337)) [commit](http://github.com/electrode-io/electrode/commit/2cf8ca182286f52f736ae18fa29c403361dc6048)

- `docs`

  - Set theme jekyll-theme-minimal [commit](http://github.com/electrode-io/electrode/commit/f4874f48adc0e01908261c1aba8ab55f92c8042f)
  - how to customize with own config file ([#1338](https://github.com/electrode-io/electrode/pull/1338)) [commit](http://github.com/electrode-io/electrode/commit/7c1690926e652b384fc77e8b5992133c1b240b4a)
  - fix typo in docs [commit](http://github.com/electrode-io/electrode/commit/c0000174173d1016ce92c2a6432e790dba8464b2)
  - change docs outline structure ([#1336](https://github.com/electrode-io/electrode/pull/1336)) [commit](http://github.com/electrode-io/electrode/commit/36c173cc9bdeb75605d26d7408e56b4c79f4fefc)

# 8/23/2019

## Packages

- `electrode-archetype-opt-critical-css@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-eslint@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-inferno@0.2.9` `(0.2.8 => 0.2.9)`
- `electrode-archetype-opt-jest@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-karma@2.0.3` `(2.0.2 => 2.0.3)`
- `electrode-archetype-opt-mocha@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-postcss@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-react@2.0.2` `(2.0.1 => 2.0.2)`
- `electrode-archetype-opt-sass@1.0.7` `(1.0.6 => 1.0.7)`
- `electrode-archetype-opt-sinon@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-opt-typescript@1.0.1` `(1.0.0 => 1.0.1)`
- `electrode-archetype-react-app@6.5.10` `(6.5.9 => 6.5.10)`
- `electrode-archetype-react-app-dev@6.5.10` `(6.5.9 => 6.5.10)`

## Commits

- `packages/electrode-archetype-opt-critical-css`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-eslint`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-inferno`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-jest`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)
  - dep: @types/jest, eslint-plugin-jest ([#1332](https://github.com/electrode-io/electrode/pull/1332)) [commit](http://github.com/electrode-io/electrode/commit/7b235a5db660b766fb8378c932358c1631958698)

- `packages/electrode-archetype-opt-karma`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-mocha`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)
  - dep: @types/mocha ([#1334](https://github.com/electrode-io/electrode/pull/1334)) [commit](http://github.com/electrode-io/electrode/commit/34099ad82952398a54e654ffa72adc9d1d44fdbe)

- `packages/electrode-archetype-opt-postcss`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-react`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-sass`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-sinon`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-opt-typescript`

  - commit auto gen files [commit](http://github.com/electrode-io/electrode/commit/3f85b13974d6f262edd7694cb075bd47e4b79fda)

- `packages/electrode-archetype-react-app[-dev]`

  - add proposal decorators ([#1324](https://github.com/electrode-io/electrode/pull/1324)) [commit](http://github.com/electrode-io/electrode/commit/5462aa2ddd901f31faae627afe5ba80baad37049)
  - handle jest config by major version ([#1333](https://github.com/electrode-io/electrode/pull/1333)) [commit](http://github.com/electrode-io/electrode/commit/f5dc57c1c85fbe62168997f38db7aed5a189e790)

- `packages/opt-archetype-check`

  - check user's dep even if no archetype config found ([#1335](https://github.com/electrode-io/electrode/pull/1335)) [commit](http://github.com/electrode-io/electrode/commit/c68148447074fb690bc1c90bfe6b9e4af71229f0)

- `docs`

  - Updated document for reverse proxy ([#1329](https://github.com/electrode-io/electrode/pull/1329)) [commit](http://github.com/electrode-io/electrode/commit/7ce42b7627ec0a082fde09bda67f62ad866362e3)

# 8/22/2019

## Packages

- `electrode-archetype-opt-jest@24.0.1` `(24.0.0 => 24.0.1)`

## Commits

- `packages/electrode-archetype-opt-jest`

  - update auto gen files [commit](http://github.com/electrode-io/electrode/commit/e9af7120b731dadbf08066f5b63eb14dcb519315)

- `packages/opt-archetype-check`

  - check user's dep even if no archetype config found ([#1335](https://github.com/electrode-io/electrode/pull/1335)) [commit](http://github.com/electrode-io/electrode/commit/d619658eb5617e4e18e8f901d327f17f3d78739a)

# 8/22/2019

## Packages

- `electrode-archetype-opt-jest@24.0.0` `(1.0.0 => 24.0.0)`

## Commits

- `packages/electrode-archetype-opt-jest`

  - update to jest@24.9.0 [commit](http://github.com/electrode-io/electrode/commit/1eac2150aa0c34711bab0ec9af8805935ec8736c)
  - dep: @types/jest, eslint-plugin-jest ([#1332](https://github.com/electrode-io/electrode/pull/1332)) [commit](http://github.com/electrode-io/electrode/commit/7b235a5db660b766fb8378c932358c1631958698)
  - add publishConfig [commit](http://github.com/electrode-io/electrode/commit/b0d534e503397c82d8b7194e7bbf303774646882)

# 8/21/2019

## Packages

- `electrode-archetype-opt-critical-css@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-eslint@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-inferno@0.2.8` `(0.2.7 => 0.2.8)`
- `electrode-archetype-opt-jest@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-karma@2.0.2` `(2.0.1 => 2.0.2)`
- `electrode-archetype-opt-mocha@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-postcss@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-pwa@1.0.3` `(1.0.2 => 1.0.3)`
- `electrode-archetype-opt-react@2.0.1` `(2.0.0 => 2.0.1)`
- `electrode-archetype-opt-sass@1.0.6` `(1.0.5 => 1.0.6)`
- `electrode-archetype-opt-sinon@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-opt-typescript@1.0.0` `(0.0.2 => 1.0.0)`
- `electrode-archetype-react-app@6.5.9` `(6.5.8 => 6.5.9)`
- `electrode-archetype-react-app-dev@6.5.9` `(6.5.8 => 6.5.9)`
- `electrode-archetype-react-component@6.1.7` `(6.1.6 => 6.1.7)`
- `electrode-archetype-react-component-dev@6.1.7` `(6.1.6 => 6.1.7)`
- `electrode-ignite@3.0.12` `(3.0.11 => 3.0.12)`
- `generator-electrode@5.1.8` `(5.1.7 => 5.1.8)`

## Commits

- `packages/electrode-archetype-opt-critical-css`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)
  - update generated code [commit](http://github.com/electrode-io/electrode/commit/f54b569b282f9f5733877229b1340f38a796b738)
  - [feat] make critical CSS optional archetype ([#1306](https://github.com/electrode-io/electrode/pull/1306)) [commit](http://github.com/electrode-io/electrode/commit/c6e56d016d5de3ab3d092029847baf974f3140f7)

- `packages/electrode-archetype-opt-eslint`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)
  - update generated code [commit](http://github.com/electrode-io/electrode/commit/f54b569b282f9f5733877229b1340f38a796b738)
  - eslint as an optional archetype ([#1322](https://github.com/electrode-io/electrode/pull/1322)) [commit](http://github.com/electrode-io/electrode/commit/205428bd47551a3f2dfd115c254acb00e16c88d7)

- `packages/electrode-archetype-opt-inferno`

  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)

- `packages/electrode-archetype-opt-jest`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)
  - update generated code [commit](http://github.com/electrode-io/electrode/commit/f54b569b282f9f5733877229b1340f38a796b738)
  - Changes to make 'jest' an optional archetype ([#1303](https://github.com/electrode-io/electrode/pull/1303)) [commit](http://github.com/electrode-io/electrode/commit/6d7a2a34df7d0f4aa8d0a6470bc245c66060dbe2)

- `packages/electrode-archetype-opt-karma`

  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)

- `packages/electrode-archetype-opt-mocha`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)
  - update generated code [commit](http://github.com/electrode-io/electrode/commit/f54b569b282f9f5733877229b1340f38a796b738)
  - make mocha an optional archetype ([#1320](https://github.com/electrode-io/electrode/pull/1320)) [commit](http://github.com/electrode-io/electrode/commit/7116e7dbdac9c10b2c0886e4a29544405596dd60)

- `packages/electrode-archetype-opt-postcss`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - rename electrode-archetype-opt-css-module [commit](http://github.com/electrode-io/electrode/commit/4bcb0ba49f20467c17e5ca4f52308815de97b188)

- `packages/electrode-archetype-opt-pwa`

  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)

- `packages/electrode-archetype-opt-react`

  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)

- `packages/electrode-archetype-opt-sass`

  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)

- `packages/electrode-archetype-opt-sinon`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)
  - update generated code [commit](http://github.com/electrode-io/electrode/commit/f54b569b282f9f5733877229b1340f38a796b738)
  - Make 'sinon' an optional archetype ([#1315](https://github.com/electrode-io/electrode/pull/1315)) [commit](http://github.com/electrode-io/electrode/commit/53685c3906264b4e9bee5903ed53a464cb8696bd)

- `packages/electrode-archetype-opt-typescript`

  - [major] mark new packages for first release [commit](http://github.com/electrode-io/electrode/commit/f4687ff4a59eab258e2b5d87a89773767f9c044a)
  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)
  - formatting files [commit](http://github.com/electrode-io/electrode/commit/aed5bba3410f558555ae7296ee5290390a099506)
  - update generated code [commit](http://github.com/electrode-io/electrode/commit/f54b569b282f9f5733877229b1340f38a796b738)
  - Making typescript an optional archetype ([#1312](https://github.com/electrode-io/electrode/pull/1312)) [commit](http://github.com/electrode-io/electrode/commit/83748fbe47dc58197600941ee33c9b47a37e5ca9)

- `packages/electrode-archetype-react-app[-dev]`

  - add jest task and allow passing CLI flags ([#1331](https://github.com/electrode-io/electrode/pull/1331)) [commit](http://github.com/electrode-io/electrode/commit/344514758615eab1374b0d8796f1df2558ef849d)
  - update tests with more informative \_name [commit](http://github.com/electrode-io/electrode/commit/f6a992eea08fabb756a2be70dc6aae58733397e4)
  - fix lint [commit](http://github.com/electrode-io/electrode/commit/fa018d9f17e745bb8b2932530166ecb0ae8fea11)
  - env flag USE_APP_WEBPACK_CONFIG to opt-in direct webpack config ([#1327](https://github.com/electrode-io/electrode/pull/1327)) [commit](http://github.com/electrode-io/electrode/commit/ecd6a8abbdcdfa0158812dfdc397898e3d609a55)
  - add inert plugin so reply.file works ([#1325](https://github.com/electrode-io/electrode/pull/1325)) [commit](http://github.com/electrode-io/electrode/commit/08a94b51f3340901cafc433b47e2e45c2c249a73)
  - use path.resolve correctly [commit](http://github.com/electrode-io/electrode/commit/05f82c4dea0e2a5d3599255dab2f29e4a12245be)
  - format code [commit](http://github.com/electrode-io/electrode/commit/4acbb9a6a239c1083c9d5de56768a6e46daa75e4)
  - make postcss + css module optional archetype [commit](http://github.com/electrode-io/electrode/commit/2527fe8adda66268885efc4bacfdb0963126e667)
  - sort depdencies [commit](http://github.com/electrode-io/electrode/commit/bfd6b6a2f007699b5b4a69d3b22588533cd3f27b)
  - eslint as an optional archetype ([#1322](https://github.com/electrode-io/electrode/pull/1322)) [commit](http://github.com/electrode-io/electrode/commit/205428bd47551a3f2dfd115c254acb00e16c88d7)
  - support user webpack config with direct control ([#1318](https://github.com/electrode-io/electrode/pull/1318)) [commit](http://github.com/electrode-io/electrode/commit/758517ae25fbbff49e1f5583f70490d4eea9eeff)
  - make mocha an optional archetype ([#1320](https://github.com/electrode-io/electrode/pull/1320)) [commit](http://github.com/electrode-io/electrode/commit/7116e7dbdac9c10b2c0886e4a29544405596dd60)
  - [feat] make critical CSS optional archetype ([#1306](https://github.com/electrode-io/electrode/pull/1306)) [commit](http://github.com/electrode-io/electrode/commit/c6e56d016d5de3ab3d092029847baf974f3140f7)
  - Fix component demo app ([#1316](https://github.com/electrode-io/electrode/pull/1316)) [commit](http://github.com/electrode-io/electrode/commit/f4ef431f82ba0876cd20009f41a2b1b961c26cf0)
  - Make 'sinon' an optional archetype ([#1315](https://github.com/electrode-io/electrode/pull/1315)) [commit](http://github.com/electrode-io/electrode/commit/53685c3906264b4e9bee5903ed53a464cb8696bd)
  - Making typescript an optional archetype ([#1312](https://github.com/electrode-io/electrode/pull/1312)) [commit](http://github.com/electrode-io/electrode/commit/83748fbe47dc58197600941ee33c9b47a37e5ca9)
  - Changes to make 'jest' an optional archetype ([#1303](https://github.com/electrode-io/electrode/pull/1303)) [commit](http://github.com/electrode-io/electrode/commit/6d7a2a34df7d0f4aa8d0a6470bc245c66060dbe2)

- `packages/electrode-archetype-react-component[-dev]`

  - eslint as an optional archetype ([#1322](https://github.com/electrode-io/electrode/pull/1322)) [commit](http://github.com/electrode-io/electrode/commit/205428bd47551a3f2dfd115c254acb00e16c88d7)
  - make mocha an optional archetype ([#1320](https://github.com/electrode-io/electrode/pull/1320)) [commit](http://github.com/electrode-io/electrode/commit/7116e7dbdac9c10b2c0886e4a29544405596dd60)
  - Make 'sinon' an optional archetype ([#1315](https://github.com/electrode-io/electrode/pull/1315)) [commit](http://github.com/electrode-io/electrode/commit/53685c3906264b4e9bee5903ed53a464cb8696bd)
  - Changes to make 'jest' an optional archetype ([#1303](https://github.com/electrode-io/electrode/pull/1303)) [commit](http://github.com/electrode-io/electrode/commit/6d7a2a34df7d0f4aa8d0a6470bc245c66060dbe2)

- `packages/electrode-ignite`

  - Fix component demo app ([#1316](https://github.com/electrode-io/electrode/pull/1316)) [commit](http://github.com/electrode-io/electrode/commit/f4ef431f82ba0876cd20009f41a2b1b961c26cf0)

- `packages/generator-electrode`

  - update generating archetype config [commit](http://github.com/electrode-io/electrode/commit/7cc48bc8c9fa12d3d2becc9c278ed5f1757cdac2)
  - create configs for disabled optionals only ([#1323](https://github.com/electrode-io/electrode/pull/1323)) [commit](http://github.com/electrode-io/electrode/commit/834ac060c60571c83a7c46dc1d557893fb31b337)
  - Fix component demo app ([#1316](https://github.com/electrode-io/electrode/pull/1316)) [commit](http://github.com/electrode-io/electrode/commit/f4ef431f82ba0876cd20009f41a2b1b961c26cf0)
  - [feat] update app generator for optional features ([#1317](https://github.com/electrode-io/electrode/pull/1317)) [commit](http://github.com/electrode-io/electrode/commit/1784635106bd2638de611273974a77b5844724dd)

- `packages/opt-archetype-check`

  - optional check skip if user dep on a diff major version ([#1330](https://github.com/electrode-io/electrode/pull/1330)) [commit](http://github.com/electrode-io/electrode/commit/5345684f2f226580363d9d4d941df7997612c2f6)
  - fix optional check [commit](http://github.com/electrode-io/electrode/commit/155b9b83fe7ea2e49e0b3491236e9fc3b74e2fd0)

- `.vscode`

  - Fix component demo app ([#1316](https://github.com/electrode-io/electrode/pull/1316)) [commit](http://github.com/electrode-io/electrode/commit/f4ef431f82ba0876cd20009f41a2b1b961c26cf0)

- `docs`

  - eslint as an optional archetype ([#1322](https://github.com/electrode-io/electrode/pull/1322)) [commit](http://github.com/electrode-io/electrode/commit/205428bd47551a3f2dfd115c254acb00e16c88d7)
  - Making typescript an optional archetype ([#1312](https://github.com/electrode-io/electrode/pull/1312)) [commit](http://github.com/electrode-io/electrode/commit/83748fbe47dc58197600941ee33c9b47a37e5ca9)
  - Changes to make 'jest' an optional archetype ([#1303](https://github.com/electrode-io/electrode/pull/1303)) [commit](http://github.com/electrode-io/electrode/commit/6d7a2a34df7d0f4aa8d0a6470bc245c66060dbe2)

- `tools`

  - tool: skip packages no longer exist when updating changelog [commit](http://github.com/electrode-io/electrode/commit/0e77514381d28949f3a1548e943c4e995635be92)

# 7/31/2019

## Packages

- `electrode-archetype-opt-inferno@0.2.7` `(0.2.6 => 0.2.7)`
- `electrode-archetype-opt-karma@2.0.1` `(2.0.0 => 2.0.1)`
- `electrode-archetype-opt-pwa@1.0.2` `(1.0.1 => 1.0.2)`
- `electrode-archetype-opt-react@1.0.4` `(1.0.3 => 1.0.4)`
- `electrode-archetype-opt-sass@1.0.5` `(1.0.4 => 1.0.5)`
- `electrode-archetype-react-app@6.5.8` `(6.5.7 => 6.5.8)`
- `electrode-archetype-react-app-dev@6.5.8` `(6.5.7 => 6.5.8)`

## Commits

- `packages/electrode-archetype-opt-css-module`

  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/electrode-archetype-opt-inferno`

  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/electrode-archetype-opt-karma`

  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/electrode-archetype-opt-pwa`

  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/electrode-archetype-opt-react`

  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/electrode-archetype-opt-sass`

  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/electrode-archetype-react-app[-dev]`

  - [fix] default false for dynamic import [commit](http://github.com/electrode-io/electrode/commit/3dd9907d283c03cf48d9c375b32c7e0d4e75e45c)
  - update optional-check for all opt archetypes ([#1311](https://github.com/electrode-io/electrode/pull/1311)) [commit](http://github.com/electrode-io/electrode/commit/2e8e29559411ef9ac5295a7b29017cef8419a12b)

- `packages/opt-archetype-check`

  - opt archetype install if app has it in dependencies ([#1310](https://github.com/electrode-io/electrode/pull/1310)) [commit](http://github.com/electrode-io/electrode/commit/fba9ddb5386d6a85e649c665df935e4e1a89127b)

# 7/30/2019

## Packages

- `electrode-archetype-react-app@6.5.7` `(6.5.6 => 6.5.7)`
- `electrode-archetype-react-app-dev@6.5.7` `(6.5.6 => 6.5.7)`
- `electrode-archetype-react-component@6.1.6` `(6.1.5 => 6.1.6)`
- `electrode-archetype-react-component-dev@6.1.6` `(6.1.5 => 6.1.6)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [bug] diff configFile for isomorphic-loader webpack plugin by babel target ([#1307](https://github.com/electrode-io/electrode/pull/1307)) [commit](http://github.com/electrode-io/electrode/commit/9bd2327c44b6dfcaac5b261e4c72d63e2e9f8351)
  - [feat] add `enableDynamicImport` to archetype ([#1305](https://github.com/electrode-io/electrode/pull/1305)) [commit](http://github.com/electrode-io/electrode/commit/39f77f2127acb8a9aa2c978f23bb0c9b3a8bd0da)
  - [bug] fix css module hook check when loading node.js support ([#1309](https://github.com/electrode-io/electrode/pull/1309)) [commit](http://github.com/electrode-io/electrode/commit/e76fed1a4240826b30f1006c0e98fcc0c158d3b0)

- `packages/electrode-archetype-react-component[-dev]`

  - dep: babel-core@7.0.0-bridge.0 ([#1304](https://github.com/electrode-io/electrode/pull/1304)) [commit](http://github.com/electrode-io/electrode/commit/23f532aadd5c8dc8f26e7e926c30921fd67c493a)
  - peerDep: electrode-archetype-react-component@6 ([#1302](https://github.com/electrode-io/electrode/pull/1302)) [commit](http://github.com/electrode-io/electrode/commit/da17ad494235fe32b7eff2b80f7cb4ea4e52dee7)

# 7/19/2019

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.5.6` `(6.5.5 => 6.5.6)`
- `electrode-archetype-react-app-dev@6.5.6` `(6.5.5 => 6.5.6)`
- `electrode-react-webapp@3.8.2` `(3.8.1 => 3.8.2)`
- `electrode-ui-config@1.3.1` `(1.3.0 => 1.3.1)`
- `subapp-redux@1.0.3` `(1.0.2 => 1.0.3)`
- `subapp-web@1.0.3` `(1.0.2 => 1.0.3)`

### Lerna Updated

- `electrode-ui-logger@1.1.5` `(1.1.4 => 1.1.5)`
- `subapp-server@1.1.2` `(1.1.1 => 1.1.2)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - fix xclap task critical-css ([#1301](https://github.com/electrode-io/electrode/pull/1301)) [commit](http://github.com/electrode-io/electrode/commit/1d6585388b4dbd0138c35f419437429fad1b42e6)
  - dep: serve-index-fs@1.10.1 ([#1300](https://github.com/electrode-io/electrode/pull/1300)) [commit](http://github.com/electrode-io/electrode/commit/a46f73388333ae141f8c36871b0ce66c93b5a858)
  - dep: serve-index-fs@1.10.0 ([#1298](https://github.com/electrode-io/electrode/pull/1298)) [commit](http://github.com/electrode-io/electrode/commit/6cd4f47243ac6b6620adf840cae7c80214236d0a)
  - [patch][bug] Fix broken Windows memfs page ([#1295](https://github.com/electrode-io/electrode/pull/1295)) [commit](http://github.com/electrode-io/electrode/commit/b8f7253271a185ab8668e06806b8a95908b1c522)
  - App Archetype import scss in SSR ([#1297](https://github.com/electrode-io/electrode/pull/1297)) [commit](http://github.com/electrode-io/electrode/commit/907ec6f3f58c24ba95212cdcb3feb28d6795a338)

- `packages/electrode-react-webapp`

  - [patch][bug] handle when server side rendering is disabled ([#1299](https://github.com/electrode-io/electrode/pull/1299)) [commit](http://github.com/electrode-io/electrode/commit/2c103b16d0338ceed0f0dbf747a9c367b3a1a59f)
  - add overrideOptions for each route path ([#1296](https://github.com/electrode-io/electrode/pull/1296)) [commit](http://github.com/electrode-io/electrode/commit/e8d4b89abe3e78e6a13681f418fbbbe43469199e)

- `packages/electrode-ui-config`

  - [chore][ci] fix tests on windows [commit](http://github.com/electrode-io/electrode/commit/34c1190c350ae3078effbbeceacdd55c251d54ae)

- `packages/subapp-redux`

  - [chore] fix CI on windows [commit](http://github.com/electrode-io/electrode/commit/3a14f4a4d137403de210791ec55412e8f8292c33)

- `packages/subapp-web`

  - [chore] fix CI on windows [commit](http://github.com/electrode-io/electrode/commit/3a14f4a4d137403de210791ec55412e8f8292c33)

# 7/9/2019

## Packages

- `electrode-archetype-react-app@6.5.5` `(6.5.4 => 6.5.5)`
- `electrode-archetype-react-app-dev@6.5.5` `(6.5.4 => 6.5.5)`
- `electrode-react-webapp@3.8.1` `(3.8.0 => 3.8.1)`
- `subapp-server@1.1.1` `(1.1.0 => 1.1.1)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch] generate .browserlistrc config for the new autoprefixer ([#1288](https://github.com/electrode-io/electrode/pull/1288)) [commit](http://github.com/electrode-io/electrode/commit/0fee744f36e1438395a33766ea2162cfad9de27f)

- `packages/electrode-react-webapp`

  - allow token props to turn off insert id option ([#1294](https://github.com/electrode-io/electrode/pull/1294)) [commit](http://github.com/electrode-io/electrode/commit/647ea269011d6c900a509cbe55662555a512fd39)
  - set each route's path and data in its options ([#1293](https://github.com/electrode-io/electrode/pull/1293)) [commit](http://github.com/electrode-io/electrode/commit/ca141a457a0741a81b561d7424ea2419920b3ca5)

- `packages/subapp-server`

  - [bug] fix h.continue on hapi 17 ([#1291](https://github.com/electrode-io/electrode/pull/1291)) [commit](http://github.com/electrode-io/electrode/commit/e005c1b468da3362aa445caf06ed23b440b9d9ec)

- `samples/demo-tree-shaking`

  - [chore] update auto gen files for samples [commit](http://github.com/electrode-io/electrode/commit/45218d8a0af956557c1df6702dad36844da536a2)

- `samples/stylus-sample`

  - [chore] update auto gen files for samples [commit](http://github.com/electrode-io/electrode/commit/45218d8a0af956557c1df6702dad36844da536a2)

- `samples/universal-react-node`

  - [chore] update auto gen files for samples [commit](http://github.com/electrode-io/electrode/commit/45218d8a0af956557c1df6702dad36844da536a2)

# 6/27/2019

## Packages

- `electrode-archetype-react-app@6.5.4` `(6.5.3 => 6.5.4)`
- `electrode-archetype-react-app-dev@6.5.4` `(6.5.3 => 6.5.4)`
- `electrode-ignite@3.0.11` `(3.0.10 => 3.0.11)`
- `generator-electrode@5.1.7` `(5.1.6 => 5.1.7)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [bug] no need to transfer assetsFile in webpack dev mode ([#1289](https://github.com/electrode-io/electrode/pull/1289)) [commit](http://github.com/electrode-io/electrode/commit/c2fce808e7f5373684c286bfc2268338442a727f)

- `packages/electrode-ignite`

  - [bug] help yo find generator with resolved full path ([#1287](https://github.com/electrode-io/electrode/pull/1287)) [commit](http://github.com/electrode-io/electrode/commit/38ad700a4de4a9028c22a19ee11a9b45c884b385)

- `packages/generator-electrode`

  - [bug] help yo find generator with resolved full path ([#1287](https://github.com/electrode-io/electrode/pull/1287)) [commit](http://github.com/electrode-io/electrode/commit/38ad700a4de4a9028c22a19ee11a9b45c884b385)

# 6/20/2019

## Packages

- `electrode-archetype-react-app@6.5.3` `(6.5.2 => 6.5.3)`
- `electrode-archetype-react-app-dev@6.5.3` `(6.5.2 => 6.5.3)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [fix] use posix path for memory-fs ([#1285](https://github.com/electrode-io/electrode/pull/1285)) [commit](http://github.com/electrode-io/electrode/commit/324bca0fb84674c7c63bbbf822887b2bc1943a91)

# 6/19/2019

- fix font paths in CSS bundle

## Packages

- `electrode-archetype-react-app@6.5.2` `(6.5.1 => 6.5.2)`
- `electrode-archetype-react-app-dev@6.5.2` `(6.5.1 => 6.5.2)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - revert-pr1261 for style and font publicPath ([#1283](https://github.com/electrode-io/electrode/pull/1283)) [commit](http://github.com/electrode-io/electrode/commit/98611c0e24b0d6b0614c12c763849c58a6284c5a)
  - [fix] rm public path for font ([#1284](https://github.com/electrode-io/electrode/pull/1284)) [commit](http://github.com/electrode-io/electrode/commit/2dd5e50f56edc417b75e6aa47bd497f2472dcf88)

# 6/17/2019

## Packages

- `electrode-archetype-react-app@6.5.1` `(6.5.0 => 6.5.1)`
- `electrode-archetype-react-app-dev@6.5.1` `(6.5.0 => 6.5.1)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [bug] update dep in dev app archtype: isomorphic-loader ([#1280](https://github.com/electrode-io/electrode/pull/1280)) [commit](http://github.com/electrode-io/electrode/commit/ec263573807ecf3dbecacc601f0ebc8318427f06)

# 6/17/2019

- new development reverse proxy using redbird
- fixes and dep updates

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.5.0` `(6.4.7 => 6.5.0)`
- `electrode-archetype-react-app-dev@6.5.0` `(6.4.7 => 6.5.0)`
- `electrode-react-webapp@3.8.0` `(3.7.0 => 3.8.0)`
- `electrode-redux-router-engine@2.3.1` `(2.3.0 => 2.3.1)`
- `generator-electrode@5.1.6` `(5.1.5 => 5.1.6)`
- `subapp-server@1.1.0` `(1.0.7 => 1.1.0)`
- `subapp-web@1.0.2` `(1.0.1 => 1.0.2)`

### Lerna Updated

- `electrode-ignite@3.0.10` `(3.0.9 => 3.0.10)`
- `subapp-redux@1.0.2` `(1.0.1 => 1.0.2)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - update mini-css-extract-plugin ([#1279](https://github.com/electrode-io/electrode/pull/1279)) [commit](http://github.com/electrode-io/electrode/commit/107beb949282430ebfc91c700be2dd5673db2a63)
  - update dep autoprefixer and use new option to suppress warning ([#1276](https://github.com/electrode-io/electrode/pull/1276)) [commit](http://github.com/electrode-io/electrode/commit/f0bc599c02a565caf43576bc27dab1260139c508)
  - [minor] development reverse proxy using redbird ([#1273](https://github.com/electrode-io/electrode/pull/1273)) [commit](http://github.com/electrode-io/electrode/commit/78908e7343e2b39acb24d0ad321f88ca7aa55273)
  - [dep] update isomorphic-loader to 2.1.0 ([#1267](https://github.com/electrode-io/electrode/pull/1267)) [commit](http://github.com/electrode-io/electrode/commit/cda85c7e7612a98b00fdeefcb27cd5c24598fdb5)
  - [bug] fix `isomorphic-assets.json` write path ([#1264](https://github.com/electrode-io/electrode/pull/1264)) [commit](http://github.com/electrode-io/electrode/commit/2c266cff730ede15b7ce834dfdb539840c0dc1f9)
  - [bug] use @babel/register in archetype run time support in dev mode ([#1265](https://github.com/electrode-io/electrode/pull/1265)) [commit](http://github.com/electrode-io/electrode/commit/dd072756c8a88bbda924a138660836dde372c07c)
  - [bug] fix nodemon starting app server in dev mode ([#1263](https://github.com/electrode-io/electrode/pull/1263)) [commit](http://github.com/electrode-io/electrode/commit/10c4bf722fe183086943b065b8bc7b5a631fb7cd)
  - [bug] fix styles in HMR mode ([#1262](https://github.com/electrode-io/electrode/pull/1262)) [commit](http://github.com/electrode-io/electrode/commit/e57874541fbe7f8d9e23d83dcd391e0840fe00d3)
  - [bug] fix publicPath issue of migration to `mini-css-extract-plugin` ([#1261](https://github.com/electrode-io/electrode/pull/1261)) [commit](http://github.com/electrode-io/electrode/commit/7f3f00b2b78929ffeec87582ec5614e5da42e0be)
  - [bug] fix webpack dev server memfs serving ([#1260](https://github.com/electrode-io/electrode/pull/1260)) [commit](http://github.com/electrode-io/electrode/commit/3db1d328bc8cbbb00d0538190d8482c32bdef20c)
  - [bug] fix loadable-stats.json path in dev mode ([#1259](https://github.com/electrode-io/electrode/pull/1259)) [commit](http://github.com/electrode-io/electrode/commit/8de7ff7cac8088f447e1a69f50863de2248a3e1c)
  - dynamically imported components server side rendering ([#1240](https://github.com/electrode-io/electrode/pull/1240)) [commit](http://github.com/electrode-io/electrode/commit/c15be2efcd137931abc5d6c856e827cb087bd6f6)
  - [minor] add preset-react to server babelrc so JSX will be transpiled ([#1251](https://github.com/electrode-io/electrode/pull/1251)) [commit](http://github.com/electrode-io/electrode/commit/e83e81244e8a6db5f6b0a6a5038ef1cd26b287cb)

- `packages/electrode-react-webapp`

  - [minor] development reverse proxy using redbird ([#1273](https://github.com/electrode-io/electrode/pull/1273)) [commit](http://github.com/electrode-io/electrode/commit/78908e7343e2b39acb24d0ad321f88ca7aa55273)
  - [patch] uniq instances for multiple tokens of same \_id ([#1252](https://github.com/electrode-io/electrode/pull/1252)) [commit](http://github.com/electrode-io/electrode/commit/5897304008951dfe17467ccc251a0b7b1ee83b56)

- `packages/electrode-redux-router-engine`

  - dynamically imported components server side rendering ([#1240](https://github.com/electrode-io/electrode/pull/1240)) [commit](http://github.com/electrode-io/electrode/commit/c15be2efcd137931abc5d6c856e827cb087bd6f6)

- `packages/generator-electrode`

  - [patch] generate app to look at APP_SERVER_PORT ([#1275](https://github.com/electrode-io/electrode/pull/1275)) [commit](http://github.com/electrode-io/electrode/commit/d17b6612b77d08e65be17d9ae226b9faa3aa303e)
  - [bug] generate gitignore to ignore lock files ([#1266](https://github.com/electrode-io/electrode/pull/1266)) [commit](http://github.com/electrode-io/electrode/commit/3bae728aaf3df672b8c6a77d1079216506588c47)
  - dynamically imported components server side rendering ([#1240](https://github.com/electrode-io/electrode/pull/1240)) [commit](http://github.com/electrode-io/electrode/commit/c15be2efcd137931abc5d6c856e827cb087bd6f6)

- `packages/subapp-server`

  - export index page JSX template tokens in subapp-server [commit](http://github.com/electrode-io/electrode/commit/b74d7fea8a3ea86450b76711239d66a4a6d72c59)
  - [minor] support JSX template for subapp routes ([#1254](https://github.com/electrode-io/electrode/pull/1254)) [commit](http://github.com/electrode-io/electrode/commit/8bceec16099c4642cf196d86b4d9c3b08182bb84)

- `packages/subapp-web`

  - subapp - handle load JS bundles from CDN mapped URLs ([#1258](https://github.com/electrode-io/electrode/pull/1258)) [commit](http://github.com/electrode-io/electrode/commit/aebd9afc4e86a77876a07ba35673af0ea23d5dc1)
  - handle array of bundles to find JS chunk [commit](http://github.com/electrode-io/electrode/commit/2bbcb43dea0bf76d66cc4d8859afdfa180178cf6)

- `samples/hapi-app`

  - [minor] development reverse proxy using redbird ([#1273](https://github.com/electrode-io/electrode/pull/1273)) [commit](http://github.com/electrode-io/electrode/commit/78908e7343e2b39acb24d0ad321f88ca7aa55273)

- `samples/poc-subapp`

  - export index page JSX template tokens in subapp-server [commit](http://github.com/electrode-io/electrode/commit/b74d7fea8a3ea86450b76711239d66a4a6d72c59)
  - [minor] support JSX template for subapp routes ([#1254](https://github.com/electrode-io/electrode/pull/1254)) [commit](http://github.com/electrode-io/electrode/commit/8bceec16099c4642cf196d86b4d9c3b08182bb84)
  - [chore] update generated lockfile [commit](http://github.com/electrode-io/electrode/commit/c6d6eea9848093340ed77e645e69b85f60634621)

- `samples/universal-react-node`

  - [minor] add preset-react to server babelrc so JSX will be transpiled ([#1251](https://github.com/electrode-io/electrode/pull/1251)) [commit](http://github.com/electrode-io/electrode/commit/e83e81244e8a6db5f6b0a6a5038ef1cd26b287cb)
  - [chore] update auto gen files for samples [commit](http://github.com/electrode-io/electrode/commit/8f7972bf20e6c446c85397492e0a199c782b00f8)

- `docs`

  - [docs] create doc for dev admin and reverse proxy ([#1274](https://github.com/electrode-io/electrode/pull/1274)) [commit](http://github.com/electrode-io/electrode/commit/c57f379feb41dd2f91596622807b167d95677593)
  - update doc for archetype v6 env variables format ([#1270](https://github.com/electrode-io/electrode/pull/1270)) [commit](http://github.com/electrode-io/electrode/commit/e9ff3c262cdab4afe0452f3dd6d7544c05d2d16d)
  - [doc] update doc for archetype v6 env variables ([#1233](https://github.com/electrode-io/electrode/pull/1233)) [commit](http://github.com/electrode-io/electrode/commit/4b96c6978dae34c009f3e3e3b959763c0ff8eb79)

# 5/22/2019

- migrate `extract-text-webpack-plugin` to `mini-css-extract-plugin`

## Packages

- `electrode-archetype-react-app@6.4.7` `(6.4.6 => 6.4.7)`
- `electrode-archetype-react-app-dev@6.4.7` `(6.4.6 => 6.4.7)`
- `subapp-server@1.0.7` `(1.0.6 => 1.0.7)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - migrate `extract-text-webpack-plugin` to `mini-css-extract-plugin` ([#1247](https://github.com/electrode-io/electrode/pull/1247)) [commit](http://github.com/electrode-io/electrode/commit/e8e75ccaa100fa99533951b35ebfb2ff99b9d377)

- `packages/subapp-server`

  - add tests for package subapp-server ([#1248](https://github.com/electrode-io/electrode/pull/1248)) [commit](http://github.com/electrode-io/electrode/commit/34e026e3d43c2b865e16995d592e54c0f3213a5b)

- `samples/universal-react-node`

  - [chore] update generated lockfile for samples [commit](http://github.com/electrode-io/electrode/commit/747f39a66a96ca5b2ea26b1f0a37b8bd13e596b7)

# 5/15/2019

- add flag to turn off JS minify in production build
- support index HTML template wirtten in JSX
- fix #1189 - eslint error in generated app
- fix uglifyJs issue
- fix stylesheet has in name when transpiling for a single env target
- update OTA docs

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.4.6` `(6.4.5 => 6.4.6)`
- `electrode-archetype-react-app-dev@6.4.6` `(6.4.5 => 6.4.6)`
- `electrode-archetype-react-component@6.1.5` `(6.1.4 => 6.1.5)`
- `electrode-archetype-react-component-dev@6.1.5` `(6.1.4 => 6.1.5)`
- `electrode-react-webapp@3.7.0` `(3.6.1 => 3.7.0)`
- `generator-electrode@5.1.5` `(5.1.4 => 5.1.5)`
- `ignite-core@1.1.9` `(1.1.8 => 1.1.9)`

### Lerna Updated

- `electrode-ignite@3.0.9` `(3.0.8 => 3.0.9)`
- `subapp-server@1.0.6` `(1.0.5 => 1.0.6)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - add minify flag to archetype v6 ([#1232](https://github.com/electrode-io/electrode/pull/1232)) [commit](http://github.com/electrode-io/electrode/commit/407afa1454602d5a42399fcc5688c83b91015d4e)
  - fix stylesheet hash in name when single target ([#1231](https://github.com/electrode-io/electrode/pull/1231)) [commit](http://github.com/electrode-io/electrode/commit/d6eaa5bd42fb855f346394e91ebd6aad88b05b60)

- `packages/electrode-archetype-react-component[-dev]`

  - fix uglifyJs issue [commit](http://github.com/electrode-io/electrode/commit/78e45bde2912c95b6f77d76c85b181e0dda527cd)

- `packages/electrode-react-webapp`

  - [minor][feat] support template written in JSX ([#1244](https://github.com/electrode-io/electrode/pull/1244)) [commit](http://github.com/electrode-io/electrode/commit/1b5b35df5966ca1545e7c1ddfea71937eed20cae)
  - update to babel 7 for transpiling test code ([#1243](https://github.com/electrode-io/electrode/pull/1243)) [commit](http://github.com/electrode-io/electrode/commit/11435873f7e68b91d027f6c038c61ddbaadc8a0f)

- `packages/generator-electrode`

  - commented reporterOptions in default.js ([#1237](https://github.com/electrode-io/electrode/pull/1237)) [commit](http://github.com/electrode-io/electrode/commit/cbc734fdcdd91026f3bb9b7896d33ec2d5f9428f)

- `packages/ignite-core`

  - skip tests that keep time out due to network [commit](http://github.com/electrode-io/electrode/commit/71852f91be4d4559634988f54f0fd1934ad5a482)

- `samples/demo-tree-shaking`

  - [chore] update samples generated files [commit](http://github.com/electrode-io/electrode/commit/f1c080f5e6b5bc336a08319de875511c0d14966c)

- `samples/stylus-sample`

  - [chore] update samples generated files [commit](http://github.com/electrode-io/electrode/commit/f1c080f5e6b5bc336a08319de875511c0d14966c)

- `samples/universal-react-node`

  - [chore] update samples generated files [commit](http://github.com/electrode-io/electrode/commit/f1c080f5e6b5bc336a08319de875511c0d14966c)

- `.vscode`

  - commented reporterOptions in default.js ([#1237](https://github.com/electrode-io/electrode/pull/1237)) [commit](http://github.com/electrode-io/electrode/commit/cbc734fdcdd91026f3bb9b7896d33ec2d5f9428f)

- `docs`

  - Update OTA documentation ([#1234](https://github.com/electrode-io/electrode/pull/1234)) [commit](http://github.com/electrode-io/electrode/commit/fc9f9f530db6c4902655a46f3478f141964d4788)

# 4/25/2019

- [dep] use core-js and regenerator-runtime to replace deprecated @babel/polyfill
- [fix] Bypass webpackDev resolve if SSR off

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.4.5` `(6.4.4 => 6.4.5)`
- `electrode-archetype-react-app-dev@6.4.5` `(6.4.4 => 6.4.5)`
- `electrode-react-webapp@3.6.1` `(3.6.0 => 3.6.1)`

### Lerna Updated

- `subapp-server@1.0.5` `(1.0.4 => 1.0.5)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - use core-js and regenerator-runtime to replace deprecated @babel/polyfill ([#1227](https://github.com/electrode-io/electrode/pull/1227)) [commit](http://github.com/electrode-io/electrode/commit/8fa5a5bd5f5b88c9ac2d04e2c1823b7df645287d)

- `packages/electrode-react-webapp`

  - Bypass webpackDev resolve if SSR off ([#1228](https://github.com/electrode-io/electrode/pull/1228)) [commit](http://github.com/electrode-io/electrode/commit/fb3a82b58e7dfcbc31a2db1ff8b2981ac15ac587)
  - update react-webapp doc ([#1225](https://github.com/electrode-io/electrode/pull/1225)) [commit](http://github.com/electrode-io/electrode/commit/aa9df7afa04b82d0eac5125e8c3744dd2d94b3ad)

- `samples/hapi-app`

  - [chore] update hapi-app sample lockfile [commit](http://github.com/electrode-io/electrode/commit/f93fc54f6a1c9d03b5fdd02aa2162f4dd397ed1c)

- `samples/poc-subapp`

  - subapp sample: add large component for SSR perf test ([#1223](https://github.com/electrode-io/electrode/pull/1223)) [commit](http://github.com/electrode-io/electrode/commit/62c7f9e8078b1c199d71db5a88af278d1bb7f851)

- `samples/react-vendor-dll`

  - [chore] update samples lockfile [commit](http://github.com/electrode-io/electrode/commit/343ed72bffb0122e82d63514a4bbe08c99ceeb3c)

- `samples/universal-react-node`

  - [chore] update samples lockfile [commit](http://github.com/electrode-io/electrode/commit/343ed72bffb0122e82d63514a4bbe08c99ceeb3c)

- `xchangelog`

  - [chore] archive 2018 changelogs [commit](http://github.com/electrode-io/electrode/commit/218fedf3b567c3d2ab00c1e09ff1d50a660f2afa)

# 4/18/2019

- fix subapp in prod mode
- support for React16's renderToNodeStream
- remove css-split-plugin
- allow sourcemap to work in local prod mode
- babel extendLoader babel config through babel-loader instead of babelrc

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.4.4` `(6.4.3 => 6.4.4)`
- `electrode-archetype-react-app-dev@6.4.4` `(6.4.3 => 6.4.4)`
- `electrode-react-webapp@3.6.0` `(3.5.2 => 3.6.0)`
- `electrode-redux-router-engine@2.3.0` `(2.2.0 => 2.3.0)`
- `subapp-server@1.0.4` `(1.0.3 => 1.0.4)`
- `subapp-util@1.0.1` `(1.0.0 => 1.0.1)`
- `subapp-web@1.0.1` `(1.0.0 => 1.0.1)`

### Lerna Updated

- `subapp-redux@1.0.1` `(1.0.0 => 1.0.1)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - allow sourcemap to work in local prod mode ([#1216](https://github.com/electrode-io/electrode/pull/1216)) [commit](http://github.com/electrode-io/electrode/commit/dc4e1dac89e57cd56a510b8cc36d3a9c1375bd56)
  - remove css-split-plugin ([#1215](https://github.com/electrode-io/electrode/pull/1215)) [commit](http://github.com/electrode-io/electrode/commit/628e957fb1ac484dd0cdbac81d03fa4b21ad504e)
  - use all code under src and dirs starts with server as server ([#1211](https://github.com/electrode-io/electrode/pull/1211)) [commit](http://github.com/electrode-io/electrode/commit/c868210f317b933263c2f85221a729f159a2db3a)
  - separate hasMultiTargets & add extendLoader ([#1209](https://github.com/electrode-io/electrode/pull/1209)) [commit](http://github.com/electrode-io/electrode/commit/34382d2409e8c1386379aa466593106ee15e1136)
  - [patch] fix webpack entry partial context for subapps ([#1206](https://github.com/electrode-io/electrode/pull/1206)) [commit](http://github.com/electrode-io/electrode/commit/b24debb6c985204586fbfb4a58826ce94bf0b92d)
  - [patch] fix webpack dev detection and loading iso loader config ([#1204](https://github.com/electrode-io/electrode/pull/1204)) [commit](http://github.com/electrode-io/electrode/commit/248ba799d3b13ce2c2357cee5db31175f13437d2)
  - skip dev middleware for production with express and koa ([#1199](https://github.com/electrode-io/electrode/pull/1199)) [commit](http://github.com/electrode-io/electrode/commit/191f1f1ecb9532bceeadb2e05f658f2eb2e12176)
  - Add useBuiltIns for @babel/preset-env ([#1195](https://github.com/electrode-io/electrode/pull/1195)) [commit](http://github.com/electrode-io/electrode/commit/04b5395cae88b97da78cfc8aa0d71da1093002d8)
  - [patch] handle @babel/polyfill in entry for multi target's default ([#1194](https://github.com/electrode-io/electrode/pull/1194)) [commit](http://github.com/electrode-io/electrode/commit/178a3ed76d49746edcdefe7f8ee02a52908d2756)
  - babel ignore test files under entire src ([#1192](https://github.com/electrode-io/electrode/pull/1192)) [commit](http://github.com/electrode-io/electrode/commit/de33e170c5a0a52c044130a9224cfa33b1cfc1f6)

- `packages/electrode-react-webapp`

  - handle SSR stream errors ([#1221](https://github.com/electrode-io/electrode/pull/1221)) [commit](http://github.com/electrode-io/electrode/commit/bfefe2675a73704f59b51faf06fe88ae252043c3)
  - allow renderToNodeStream for subapp ([#1210](https://github.com/electrode-io/electrode/pull/1210)) [commit](http://github.com/electrode-io/electrode/commit/cbe0da0474f1b6bf1ef807507f6d1cfa71d92dfa)
  - [minor] allow content to specify use streams for generating output ([#1201](https://github.com/electrode-io/electrode/pull/1201)) [commit](http://github.com/electrode-io/electrode/commit/690dec1295234c038575cc2b189af873d96fa2d3)

- `packages/electrode-redux-router-engine`

  - [minor] support using render to stream APIs for SSR ([#1202](https://github.com/electrode-io/electrode/pull/1202)) [commit](http://github.com/electrode-io/electrode/commit/965e70f75ec59866f65657dbeca126bcd0407ecc)

- `packages/subapp-server`

  - allow renderToNodeStream for subapp ([#1210](https://github.com/electrode-io/electrode/pull/1210)) [commit](http://github.com/electrode-io/electrode/commit/cbe0da0474f1b6bf1ef807507f6d1cfa71d92dfa)

- `packages/subapp-util`

  - fix subapp in prod mode ([#1212](https://github.com/electrode-io/electrode/pull/1212)) [commit](http://github.com/electrode-io/electrode/commit/6829049401d23bfd15acd26582cd25717569f5d0)
  - add subapp-util test ([#1222](https://github.com/electrode-io/electrode/pull/1222)) [commit](http://github.com/electrode-io/electrode/commit/6a407805fb4b516a8c155ef58a56392f5c4dde0e)

- `packages/subapp-web`

  - fix get vendor bundles for prod mode ([#1219](https://github.com/electrode-io/electrode/pull/1219)) [commit](http://github.com/electrode-io/electrode/commit/092160187842375d163c099399cda8686175ea01)
  - allow renderToNodeStream for subapp ([#1210](https://github.com/electrode-io/electrode/pull/1210)) [commit](http://github.com/electrode-io/electrode/commit/cbe0da0474f1b6bf1ef807507f6d1cfa71d92dfa)

- `samples/hapi-app`

  - update samples lock and auto gen files [commit](http://github.com/electrode-io/electrode/commit/b689c165b1434718db01f00e1d830e4350d34984)
  - update sample lockfile [commit](http://github.com/electrode-io/electrode/commit/41caa73c31679cdaa3d2ef4528fd34cf24577269)

- `samples/poc-subapp`

  - update samples lock and auto gen files [commit](http://github.com/electrode-io/electrode/commit/b689c165b1434718db01f00e1d830e4350d34984)
  - allow renderToNodeStream for subapp ([#1210](https://github.com/electrode-io/electrode/pull/1210)) [commit](http://github.com/electrode-io/electrode/commit/cbe0da0474f1b6bf1ef807507f6d1cfa71d92dfa)

- `docs`

  - [minor] support using render to stream APIs for SSR ([#1202](https://github.com/electrode-io/electrode/pull/1202)) [commit](http://github.com/electrode-io/electrode/commit/965e70f75ec59866f65657dbeca126bcd0407ecc)
  - Fix broken image URLs ([#1203](https://github.com/electrode-io/electrode/pull/1203)) [commit](http://github.com/electrode-io/electrode/commit/42821703df38bdc32d4a2163ae412b1c3eb1fb2a)
  - update doc of extract-style part ([#1184](https://github.com/electrode-io/electrode/pull/1184)) [commit](http://github.com/electrode-io/electrode/commit/5a0aa5e73e31226554e7276cbfd5f0c653a87aa9)

# 3/26/2019

- electrode-react-webapp
  - handle multi targeted bundle selection when user defined entries

## Packages

### Directly Updated

- `electrode-react-webapp@3.5.2` `(3.5.1 => 3.5.2)`

### Lerna Updated

## Commits

- `packages/electrode-react-webapp`

  - handle multi targeted bundle selection when user defined entries ([#1191](https://github.com/electrode-io/electrode/pull/1191)) [commit](http://github.com/electrode-io/electrode/commit/525b8a6a7f966c30c4984d48ecf5a138277b5827)

- `packages/webpack-config-composer`

  - [chore] update CI scripts [commit](http://github.com/electrode-io/electrode/commit/49e54bdb768eac78ec32603a352e1d0d7e7474e9)

- `samples/universal-react-node`

  - [chore] update sample lockfile [commit](http://github.com/electrode-io/electrode/commit/5794b307d47835bc7824e5e5cf1b3330307e0b57)

# 3/21/2019

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.4.3` `(6.4.2 => 6.4.3)`
- `electrode-archetype-react-app-dev@6.4.3` `(6.4.2 => 6.4.3)`
- `electrode-react-webapp@3.5.1` `(3.5.0 => 3.5.1)`
- `generator-electrode@5.1.4` `(5.1.3 => 5.1.4)`

### Lerna Updated

- `subapp-server@1.0.3` `(1.0.2 => 1.0.3)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - keep original behavior if no extra babel targets specified ([#1188](https://github.com/electrode-io/electrode/pull/1188)) [commit](http://github.com/electrode-io/electrode/commit/2319643556ae6250ce9d3e529643d8f88d9a70c3)

- `packages/electrode-ignite`

  - [chore] update CI scripts [commit](http://github.com/electrode-io/electrode/commit/5479e3471525ce3f622f903402d9576c914627e1)

- `packages/electrode-react-webapp`

  - keep original behavior if no extra babel targets specified ([#1188](https://github.com/electrode-io/electrode/pull/1188)) [commit](http://github.com/electrode-io/electrode/commit/2319643556ae6250ce9d3e529643d8f88d9a70c3)

- `packages/generator-electrode`

  - keep original behavior if no extra babel targets specified ([#1188](https://github.com/electrode-io/electrode/pull/1188)) [commit](http://github.com/electrode-io/electrode/commit/2319643556ae6250ce9d3e529643d8f88d9a70c3)

- `samples/hapi-app`

  - update hapi-app sample with dynamic import ([#1186](https://github.com/electrode-io/electrode/pull/1186)) [commit](http://github.com/electrode-io/electrode/commit/f540d4f348af9456ac9cb3fa042d4509fc219d9c)

# 3/20/2019

- electrode-react-app-archetype:
  - support .less styles
  - dynamic import support and demo
  - fix cssModuleSupport flag
  - support webappPrefix for apps

## Packages

### Directly Updated

- `electrode-archetype-react-app-dev@6.4.2` `(6.4.1 => 6.4.2)`
- `electrode-react-webapp@3.5.0` `(3.4.1 => 3.5.0)`
- `electrode-redux-router-engine@2.2.0` `(2.1.8 => 2.2.0)`
- `electrode-ui-config@1.3.0` `(1.2.0 => 1.3.0)`
- `generator-electrode@5.1.3` `(5.1.2 => 5.1.3)`

### Lerna Updated

- `electrode-archetype-react-app@6.4.2` `(6.4.1 => 6.4.2)`

## Commits

- `packages/electrode-archetype-opt-css-module`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-archetype-opt-inferno`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-archetype-react-app[-dev]`

  - change cssModuleSupport type to boolean ([#1187](https://github.com/electrode-io/electrode/pull/1187)) [commit](http://github.com/electrode-io/electrode/commit/60c2131b18933218e7e4571222325e13c4f8650b)
  - add dynamic demo in templates ([#1176](https://github.com/electrode-io/electrode/pull/1176)) [commit](http://github.com/electrode-io/electrode/commit/c5f9705a42bac8e3bcdecfcd975a9fca92f686a9)
  - support .less style ([#1181](https://github.com/electrode-io/electrode/pull/1181)) [commit](http://github.com/electrode-io/electrode/commit/74a6d9d9317bf31a20577b6d51d73f0dc4f62afd)
  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-cookies`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-ignite`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-react-context`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-react-webapp`

  - [minor] handle webappPrefix for ui config ([#1185](https://github.com/electrode-io/electrode/pull/1185)) [commit](http://github.com/electrode-io/electrode/commit/267afb5ba673c782defc7a7c9254c4f717edbf38)
  - add missing test cases in electrode-react-webapp ([#1183](https://github.com/electrode-io/electrode/pull/1183)) [commit](http://github.com/electrode-io/electrode/commit/dcc5bc4cb7e22ea49a25213d5a1d621d549ecd9b)
  - [minor] support webappPrefix to allow multiple apps on the same page ([#1182](https://github.com/electrode-io/electrode/pull/1182)) [commit](http://github.com/electrode-io/electrode/commit/a3a087fbc690d06c13cd394c87197b034563e934)

- `packages/electrode-redux-router-engine`

  - [minor] support webappPrefix to allow multiple apps on the same page ([#1182](https://github.com/electrode-io/electrode/pull/1182)) [commit](http://github.com/electrode-io/electrode/commit/a3a087fbc690d06c13cd394c87197b034563e934)

- `packages/electrode-ui-config`

  - [minor] handle webappPrefix for ui config ([#1185](https://github.com/electrode-io/electrode/pull/1185)) [commit](http://github.com/electrode-io/electrode/commit/267afb5ba673c782defc7a7c9254c4f717edbf38)

- `packages/electrode-ui-logger`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/electrode-webpack-reporter`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/generator-electrode`

  - add dynamic demo in templates ([#1176](https://github.com/electrode-io/electrode/pull/1176)) [commit](http://github.com/electrode-io/electrode/commit/c5f9705a42bac8e3bcdecfcd975a9fca92f686a9)
  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/ignite-core`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/subapp-redux`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/subapp-server`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/subapp-util`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/subapp-web`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `packages/webpack-config-composer`

  - [chore] CI runs coverage [commit](http://github.com/electrode-io/electrode/commit/5ad18247c8634d2da3ef09bbe884a392a58fdead)

- `samples/hapi-app`

  - [minor] handle webappPrefix for ui config ([#1185](https://github.com/electrode-io/electrode/pull/1185)) [commit](http://github.com/electrode-io/electrode/commit/267afb5ba673c782defc7a7c9254c4f717edbf38)
  - [minor] support webappPrefix to allow multiple apps on the same page ([#1182](https://github.com/electrode-io/electrode/pull/1182)) [commit](http://github.com/electrode-io/electrode/commit/a3a087fbc690d06c13cd394c87197b034563e934)

- `samples/universal-react-node`

  - [chore] update sample lockfile [commit](http://github.com/electrode-io/electrode/commit/c98f08f43d5e0d7dde35dd961509d80d019fb570)

# 3/18/2019

- server side bundle selection for different babel targets

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.4.1` `(6.4.0 => 6.4.1)`
- `electrode-archetype-react-app-dev@6.4.1` `(6.4.0 => 6.4.1)`
- `electrode-react-webapp@3.4.1` `(3.4.0 => 3.4.1)`

### Lerna Updated

- `subapp-server@1.0.2` `(1.0.1 => 1.0.2)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [chore] use xclap.concurrent to make concurrent tasks ([#1175](https://github.com/electrode-io/electrode/pull/1175)) [commit](http://github.com/electrode-io/electrode/commit/b1eb3b6ebaabf94c618a50228bb220578798d19e)
  - server side bundle selection for different targets ([#1166](https://github.com/electrode-io/electrode/pull/1166)) [commit](http://github.com/electrode-io/electrode/commit/2eac014736f462a030917cc1a26575aefc48bcd3)
  - [patch] remove transform plugins already in @babel/preset-env ([#1174](https://github.com/electrode-io/electrode/pull/1174)) [commit](http://github.com/electrode-io/electrode/commit/5688e8f81710c2d2de2fb34bce37beabb9eb54c6)

- `packages/electrode-react-webapp`

  - server side bundle selection for different targets ([#1166](https://github.com/electrode-io/electrode/pull/1166)) [commit](http://github.com/electrode-io/electrode/commit/2eac014736f462a030917cc1a26575aefc48bcd3)

- `samples/universal-react-node`

  - [chore] update sample lockfile [commit](http://github.com/electrode-io/electrode/commit/fb4e55f680740f25f911914976ec58d51d5e5a56)

# 3/12/2019

- electrode-react-webapp - [feat] run time select template support

## Packages

### Directly Updated

- `electrode-react-webapp@3.4.0` `(3.3.3 => 3.4.0)`

### Lerna Updated

- `subapp-server@1.0.1` `(1.0.0 => 1.0.1)`

## Commits

- `packages/electrode-react-webapp`

  - [minor] allow user to specify template cache key ([#1172](https://github.com/electrode-io/electrode/pull/1172)) [commit](http://github.com/electrode-io/electrode/commit/6317129572370ff453d90d808961577e86d48817)
  - [minor] support run time selectTemplate ([#1167](https://github.com/electrode-io/electrode/pull/1167)) [commit](http://github.com/electrode-io/electrode/commit/3c54ce0e0742b39f101158d0c5cc2474cc5978ff)
  - [patch] selectTemplate can return options for route ([#1173](https://github.com/electrode-io/electrode/pull/1173)) [commit](http://github.com/electrode-io/electrode/commit/b8368e292eb1f82748ec814658f380c32fe2ee16)

# 3/7/2019

- Fix: getHeader missing for webpack-dev-middleware
- New features (beta)
  - subapp support
  - output multiple bundles targetting different browsers

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.4.0` `(6.3.2 => 6.4.0)`
- `electrode-archetype-react-app-dev@6.4.0` `(6.3.2 => 6.4.0)`
- `subapp-redux@1.0.0` `(0.1.0 => 1.0.0)`
- `subapp-server@1.0.0` `(0.1.0 => 1.0.0)`
- `subapp-util@1.0.0` `(0.1.0 => 1.0.0)`
- `subapp-web@1.0.0` `(0.1.0 => 1.0.0)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch] fix multi webpack build startup racing ([#1164](https://github.com/electrode-io/electrode/pull/1164)) [commit](http://github.com/electrode-io/electrode/commit/71ae63240c7e407772fd9405351366ccde5faf6e)
  - [patch] fix output `dist-X` issue ([#1163](https://github.com/electrode-io/electrode/pull/1163)) [commit](http://github.com/electrode-io/electrode/commit/08dc5101c1a95febbd2a97ffe7aacdb5cf9cad25)
  - [chore] fix lint error [commit](http://github.com/electrode-io/electrode/commit/42a6abe2200e9c03894aad262cd115bffd00f9a8)
  - [patch] add getHeader() to middleware ([#1162](https://github.com/electrode-io/electrode/pull/1162)) [commit](http://github.com/electrode-io/electrode/commit/2c5951ffc08dfb71eda2fd2bd71efce483d9b016)
  - [patch] support multiple babel preset-env targets ([#1160](https://github.com/electrode-io/electrode/pull/1160)) [commit](http://github.com/electrode-io/electrode/commit/d9ad0aba3c5380505215a3f07c7b1d2099b3f8df)
  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)

- `packages/subapp-redux`

  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)
  - [major] subapp first beta release [commit](http://github.com/electrode-io/electrode/commit/24167ccdb10ec4f5f19966f6136e26912e5a1526)

- `packages/subapp-server`

  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)
  - [major] subapp first beta release [commit](http://github.com/electrode-io/electrode/commit/24167ccdb10ec4f5f19966f6136e26912e5a1526)

- `packages/subapp-util`

  - [patch] fix scaning for subapp server entry ([#1159](https://github.com/electrode-io/electrode/pull/1159)) [commit](http://github.com/electrode-io/electrode/commit/6f15a2bdc4b60ad3087a1376e72ae867137e0a7e)
  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)
  - [major] subapp first beta release [commit](http://github.com/electrode-io/electrode/commit/24167ccdb10ec4f5f19966f6136e26912e5a1526)

- `packages/subapp-web`

  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)
  - [major] subapp first beta release [commit](http://github.com/electrode-io/electrode/commit/24167ccdb10ec4f5f19966f6136e26912e5a1526)

- `samples/hapi-app`

  - [patch] fix multi webpack build startup racing ([#1164](https://github.com/electrode-io/electrode/pull/1164)) [commit](http://github.com/electrode-io/electrode/commit/71ae63240c7e407772fd9405351366ccde5faf6e)
  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)
  - [chore] update sample gitignore and lockfile [commit](http://github.com/electrode-io/electrode/commit/94b555b3f7dffdb9216a3f7466e4920a31e2ab17)

- `samples/poc-subapp`

  - [patch] fix scaning for subapp server entry ([#1159](https://github.com/electrode-io/electrode/pull/1159)) [commit](http://github.com/electrode-io/electrode/commit/6f15a2bdc4b60ad3087a1376e72ae867137e0a7e)
  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)

- `samples/react-vendor-dll`

  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)

- `samples/universal-react-node`

  - [minor][feat] subapp support ([#1158](https://github.com/electrode-io/electrode/pull/1158)) [commit](http://github.com/electrode-io/electrode/commit/2bcc5922984edcf314aac29ea0ab78485f0bbeda)

# 2/26/2019

- electrode-archetype-react-app
  - minor updates and fixes for dev admin server
  - always save stats to disk in webpack dev mode
- electrode-react-webapp
  - use require to load module for token
  - insert more informative token ids in rendered output with props

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.3.2` `(6.3.1 => 6.3.2)`
- `electrode-archetype-react-app-dev@6.3.2` `(6.3.1 => 6.3.2)`
- `electrode-react-webapp@3.3.3` `(3.3.2 => 3.3.3)`
- `ignite-core@1.1.8` `(1.1.7 => 1.1.8)`

### Lerna Updated

- `electrode-ignite@3.0.8` `(3.0.7 => 3.0.8)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch] make dev admin key input case insensitive ([#1152](https://github.com/electrode-io/electrode/pull/1152)) [commit](http://github.com/electrode-io/electrode/commit/a3ce7a341f26a0506e48b709264febd602feb022)
  - [patch] detect unexpect server exit before start message received [commit](http://github.com/electrode-io/electrode/commit/e33cc24750b1d97dd42491225e68c3b78211e85e)
  - [patch] enable same controls for webpack dev server ([#1149](https://github.com/electrode-io/electrode/pull/1149)) [commit](http://github.com/electrode-io/electrode/commit/41668f1be751c72bc4ea510982f7fec89241c2d5)
  - [patch] always save stats to disk in webpack dev mode ([#1148](https://github.com/electrode-io/electrode/pull/1148)) [commit](http://github.com/electrode-io/electrode/commit/8eac8c814e0109e6e04ffe26d2baf6c6e8889a95)

- `packages/electrode-react-webapp`

  - [patch] use require to load module for token ([#1156](https://github.com/electrode-io/electrode/pull/1156)) [commit](http://github.com/electrode-io/electrode/commit/c0ea998a62759fc09b7f00221abea4973b25e279)
  - [patch] insert more informative token ids in rendered output with props ([#1150](https://github.com/electrode-io/electrode/pull/1150)) [commit](http://github.com/electrode-io/electrode/commit/1adbe96b7d07d19995dd7685cffb5cd8bec170bf)

- `packages/ignite-core`

  - [patch] use nix-clap [commit](http://github.com/electrode-io/electrode/commit/4bd2c54c4c1a976cc9e3421dfbb0f9f2aba476ef)

- `samples/universal-react-node`

  - [chore] update lockfile for sample [commit](http://github.com/electrode-io/electrode/commit/14dd37266632965b44b1404b818019cf5956cf88)

# 2/5/2019

- app archetype

  - fix to support custom jest config
  - fix dev admin to watch for app-setup only for app start

- generator

  - make ui config module an option param

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.3.1` `(6.3.0 => 6.3.1)`
- `electrode-archetype-react-app-dev@6.3.1` `(6.3.0 => 6.3.1)`
- `generator-electrode@5.1.2` `(5.1.1 => 5.1.2)`

### Lerna Updated

- `electrode-ignite@3.0.7` `(3.0.6 => 3.0.7)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch] read custom jest config ([#1145](https://github.com/electrode-io/electrode/pull/1145)) [commit](http://github.com/electrode-io/electrode/commit/557bda40de8e1c4d0ecb8b68482832f77148387b)
  - [patch] dev admin should watch for app-setup only for app start ([#1147](https://github.com/electrode-io/electrode/pull/1147)) [commit](http://github.com/electrode-io/electrode/commit/41c2e57037dd1cb3027f7ac0ba1468b0fa2ce50f)

- `packages/generator-electrode`

  - [patch] make ui config module a param ([#1146](https://github.com/electrode-io/electrode/pull/1146)) [commit](http://github.com/electrode-io/electrode/commit/95940bde0e0de2865d4928563587196d46752ffb)

# 2/4/2019

- added development admin console - allow controlling webpack dev server and app server without shutdown everything.

## Packages

- `electrode-archetype-react-app@6.3.0` `(6.2.2 => 6.3.0)`
- `electrode-archetype-react-app-dev@6.3.0` `(6.2.2 => 6.3.0)`
- `electrode-react-webapp@3.3.2` `(3.3.1 => 3.3.2)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch][log] log errors for missing required env vars ([#1142](https://github.com/electrode-io/electrode/pull/1142)) [commit](http://github.com/electrode-io/electrode/commit/97e6dca09fe9dfe398147f13314a44da343ce579)
  - [patch][fix] re-enable HMR for webpack-dev-server ([#1141](https://github.com/electrode-io/electrode/pull/1141)) [commit](http://github.com/electrode-io/electrode/commit/095277e3979f91be7ea74a9b03cea0007017d858)
  - [minor] dev admin server ([#1144](https://github.com/electrode-io/electrode/pull/1144)) [commit](http://github.com/electrode-io/electrode/commit/e424803ebb3695567c71ad20f6dc3bb442187c64)

- `packages/electrode-react-webapp`

  - [patch] consolidate and fix content resolve for all frameworks ([#1143](https://github.com/electrode-io/electrode/pull/1143)) [commit](http://github.com/electrode-io/electrode/commit/f47eb270d4f259fb0c224ce388456011789f59fc)

# 1/31/2019

- fix koa app
- fix source map issue
- compile to commonjs in non prod mode to allow stub ES modules in test

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.2.2` `(6.2.1 => 6.2.2)`
- `electrode-archetype-react-app-dev@6.2.2` `(6.2.1 => 6.2.2)`
- `electrode-react-webapp@3.3.1` `(3.3.0 => 3.3.1)`
- `generator-electrode@5.1.1` `(5.1.0 => 5.1.1)`

### Lerna Updated

- `electrode-ignite@3.0.6` `(3.0.5 => 3.0.6)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch][fix] keep modules auto in prod mode ([#1138](https://github.com/electrode-io/electrode/pull/1138)) [commit](http://github.com/electrode-io/electrode/commit/2d73f850850c6cadff40530b859c9abe2dd75f98)
  - [patch][bug] fix source map issue ([#1137](https://github.com/electrode-io/electrode/pull/1137)) [commit](http://github.com/electrode-io/electrode/commit/44f04048f6d52aaa905fa2d1e358b094cefae59f)
  - [patch][fix] get koa app to work with latest archetype ([#1135](https://github.com/electrode-io/electrode/pull/1135)) [commit](http://github.com/electrode-io/electrode/commit/2ebd42119392064d4d33d34d0d28959c736f5038)

- `packages/electrode-react-webapp`

  - [patch] fix dep for koa-router [commit](http://github.com/electrode-io/electrode/commit/f2f24f5c815598acc09c966ba991e621b9e5b71d)
  - [patch][bug] fix express-app config.ui.demo issue ([#1136](https://github.com/electrode-io/electrode/pull/1136)) [commit](http://github.com/electrode-io/electrode/commit/595ffc4866f0b6b769454e01c922db9a092b21f5)
  - [patch][fix] get koa app to work with latest archetype ([#1135](https://github.com/electrode-io/electrode/pull/1135)) [commit](http://github.com/electrode-io/electrode/commit/2ebd42119392064d4d33d34d0d28959c736f5038)

- `packages/generator-electrode`

  - [patch][bug] fix express-app config.ui.demo issue ([#1136](https://github.com/electrode-io/electrode/pull/1136)) [commit](http://github.com/electrode-io/electrode/commit/595ffc4866f0b6b769454e01c922db9a092b21f5)
  - [patch][fix] get koa app to work with latest archetype ([#1135](https://github.com/electrode-io/electrode/pull/1135)) [commit](http://github.com/electrode-io/electrode/commit/2ebd42119392064d4d33d34d0d28959c736f5038)
  - [patch][chore] use .babelrc.js ([#1140](https://github.com/electrode-io/electrode/pull/1140)) [commit](http://github.com/electrode-io/electrode/commit/ca1d251f509f89e9cba8b2b68d05f6f8062a44e9)

- `samples/hapi-app`

  - [chore] update sample app files [commit](http://github.com/electrode-io/electrode/commit/7422008197a22e719b5eca9700a42faef16af9bc)

- `samples/universal-react-node`

  - [chore] update sample app lockfile [commit](http://github.com/electrode-io/electrode/commit/9e540f9e57a8e8d3e725006765bc777c3dfbdee6)

# 1/30/2019

- [patch][fix] explicitly set babel env modules config

## Packages

- `electrode-archetype-react-app@6.2.1` `(6.2.0 => 6.2.1)`
- `electrode-archetype-react-app-dev@6.2.1` `(6.2.0 => 6.2.1)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - add a simple dev dashboard [commit](http://github.com/electrode-io/electrode/commit/70d5b7b602c62d8d04858828bc74e2f735d80863)
  - [chore] use chalker to do terminal colors [commit](http://github.com/electrode-io/electrode/commit/3b3cf197a3e374f6c669168e3ac88ceddfbdb93b)
  - [patch][fix] explicitly set babel env modules config ([#1132](https://github.com/electrode-io/electrode/pull/1132)) [commit](http://github.com/electrode-io/electrode/commit/cdf466caaf2a4ba785ab9d0634c7a79ca5d9ff0b)

# 1/23/2019

- electrode-archetype-react-app

  - remove uglify and use webpack 4 built-in optimization
  - fix server watch for typescript
  - fix css module for production build
  - fix path separator for windows

- electrode-ui-config
  - add demo to generated sample app

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.2.0` `(6.1.4 => 6.2.0)`
- `electrode-archetype-react-app-dev@6.2.0` `(6.1.4 => 6.2.0)`
- `electrode-react-webapp@3.3.0` `(3.2.3 => 3.3.0)`
- `electrode-ui-config@1.2.0` `(1.1.2 => 1.2.0)`
- `generator-electrode@5.1.0` `(5.0.3 => 5.1.0)`

### Lerna Updated

- `electrode-ignite@3.0.5` `(3.0.4 => 3.0.5)`
- `electrode-ui-logger@1.1.4` `(1.1.3 => 1.1.4)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch][bug] ensures app mode dir always use / ([#1125](https://github.com/electrode-io/electrode/pull/1125)) [commit](http://github.com/electrode-io/electrode/commit/7108b4cb0365bb64eb292e98f708dffe5a66aadb)
  - fix: remove undeeded uglify partial [commit](http://github.com/electrode-io/electrode/commit/64a007016942b29548336fb2aa643e51518afa70)
  - [minor][bug] fix server watch when using typescript ([#1111](https://github.com/electrode-io/electrode/pull/1111)) [commit](http://github.com/electrode-io/electrode/commit/2d6e32ec6edc77cc89c08f46d5ef620d4dd4856d)
  - [patch][bug] set env for production build ([#1126](https://github.com/electrode-io/electrode/pull/1126)) [commit](http://github.com/electrode-io/electrode/commit/af28874dbfe3b70c890267263d142bbc651f9b3d)

- `packages/electrode-react-webapp`

  - [minor] add token to send ui config to window.\_config [commit](http://github.com/electrode-io/electrode/commit/14cb09a2b3b698ce2d3170179f6cdc3a2a404911)

- `packages/electrode-ui-config`

  - [minor] support hapi 17 ([#1119](https://github.com/electrode-io/electrode/pull/1119)) [commit](http://github.com/electrode-io/electrode/commit/4338d8c813f5a116d453d72645954260f05e92ad)

- `packages/generator-electrode`

  - [minor] add demo for electrode-ui-config [commit](http://github.com/electrode-io/electrode/commit/cea397d0077471e5b76f10a0717b2c26898eba8d)

- `samples/hapi-app`

  - add samples/hapi-app ([#1127](https://github.com/electrode-io/electrode/pull/1127)) [commit](http://github.com/electrode-io/electrode/commit/d1ce389c384e2382975e9fccc098462ea0c8edba)

- `MISC`

  - fix CI [commit](http://github.com/electrode-io/electrode/commit/22fd89f6c31bd4bbabb9f609b0015898043dc4db)
  - [ci][chore] add electrode-ui-config to local dep list [commit](http://github.com/electrode-io/electrode/commit/86ecd73af5a3a87d552990c531861306b657023d)
  - update CONTRIBUTING.md for sample start ([#1118](https://github.com/electrode-io/electrode/pull/1118)) [commit](http://github.com/electrode-io/electrode/commit/a33bf78a0e64df0e694be1c5fb5959d9c23cc69a)

# 1/10/2019

- fix component babel config to preserve ESM

## Packages

- `electrode-archetype-react-component@6.1.4` `(6.1.3 => 6.1.4)`
- `electrode-archetype-react-component-dev@6.1.4` `(6.1.3 => 6.1.4)`

## Commits

- `packages/electrode-archetype-react-component[-dev]`

  - [patch] allow component to be published w/o dist-min files [commit](http://github.com/electrode-io/electrode/commit/9afa43088566d48398295be25ff4e9fe503623c9)
  - [patch] fix component babel config to preserve ESM [commit](http://github.com/electrode-io/electrode/commit/b6b30b72f5af07192a2876680a5c004b7f526efb)

- `samples/demo-component`

  - use module field to point to ES6 module code [commit](http://github.com/electrode-io/electrode/commit/2119fb10ff4a121983ad1f388a664a1baa1afef5)
  - update samples auto gen files [commit](http://github.com/electrode-io/electrode/commit/aff8ead4b5a5816c3336735934650d204d4d9fe4)

- `samples/demo-tree-shaking`

  - test tree-shaking [commit](http://github.com/electrode-io/electrode/commit/ee590ca4ad9a90fb7f829f44dace05b93f5ac316)
  - update samples auto gen files [commit](http://github.com/electrode-io/electrode/commit/aff8ead4b5a5816c3336735934650d204d4d9fe4)

- `samples/stylus-sample`

  - update samples auto gen files [commit](http://github.com/electrode-io/electrode/commit/aff8ead4b5a5816c3336735934650d204d4d9fe4)

- `samples/universal-react-node`

  - update samples auto gen files [commit](http://github.com/electrode-io/electrode/commit/aff8ead4b5a5816c3336735934650d204d4d9fe4)

- `MISC`

  - build demo-component before test-tree-shaking [commit](http://github.com/electrode-io/electrode/commit/3d6b2a5580662e731177ec7a5769412436ccb527)

# 1/8/2019

- fix for express

## Packages

### Directly Updated

- `electrode-archetype-react-app@6.1.4` `(6.1.3 => 6.1.4)`
- `electrode-archetype-react-app-dev@6.1.4` `(6.1.3 => 6.1.4)`
- `generator-electrode@5.0.3` `(5.0.2 => 5.0.3)`

### Lerna Updated

- `electrode-ignite@3.0.4` `(3.0.3 => 3.0.4)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch][bug] fix webpack-dev-express middleware setup [commit](http://github.com/electrode-io/electrode/commit/f5bbd9d9c70a681b96cd5a5eafde118eb5ad0853)

- `packages/generator-electrode`

  - fix express-server linting errors [commit](http://github.com/electrode-io/electrode/commit/7ddbb3b6b6a1ba3d37f22fc7cc39beadc205658f)

- `MISC`

  - test express app generator [commit](http://github.com/electrode-io/electrode/commit/e35f18c4dd6fef951040e679b90c7ddfca8cda3c)

# 1/7/2019

- Add ES6 module support for component to enable webpack treeshaking
- Add express dev middleware for app archetype

## Packages

- `electrode-archetype-react-app@6.1.3` `(6.1.2 => 6.1.3)`
- `electrode-archetype-react-app-dev@6.1.3` `(6.1.2 => 6.1.3)`
- `electrode-archetype-react-component@6.1.3` `(6.1.2 => 6.1.3)`
- `electrode-archetype-react-component-dev@6.1.3` `(6.1.2 => 6.1.3)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - add express dev middleware ([#1007](https://github.com/electrode-io/electrode/pull/1007)) [commit](http://github.com/electrode-io/electrode/commit/bff7946489d1b689d7d4416af5631b3121ff4b64)

- `packages/electrode-archetype-react-component[-dev]`

  - build components with ES6 module syntax intact ([#1022](https://github.com/electrode-io/electrode/pull/1022)) [commit](http://github.com/electrode-io/electrode/commit/8c2fec36fa3a97656875e8b3182b5d89d93c38d5)

- `samples/demo-component`

  - update demo-component to support ES6 modules [commit](http://github.com/electrode-io/electrode/commit/20a669a9fe4d762fd371e9ae0ce36ac2ce586562)

- `samples/demo-tree-shaking`

  - add sample app to demo webpack tree shaking using components [commit](http://github.com/electrode-io/electrode/commit/0b0a1f9fc0f9a517604594a7235960c260fdd8e0)

- `MISC`

  - changelog [commit](http://github.com/electrode-io/electrode/commit/3d4567437b7ba92cad7a832637b71a0e57f82a94)

# 1/7/2019

## Packages

- `electrode-archetype-react-app@6.1.2` `(6.1.1 => 6.1.2)`
- `electrode-archetype-react-app-dev@6.1.2` `(6.1.1 => 6.1.2)`

## Commits

- `packages/electrode-archetype-react-app[-dev]`

  - [patch][bug] put @babel/runtime in electrode-archetype-react-app ([#1108](https://github.com/electrode-io/electrode/pull/1108)) [commit](http://github.com/electrode-io/electrode/commit/070ed3ea7a18f8213688bbb043c99b1e003bcd6c)

# 1/3/2019

## Packages

- `electrode-react-webapp@3.2.3` `(3.2.2 => 3.2.3)`

## Commits

- `packages/electrode-react-webapp`

  - [patch][bug] account for basePath from config.ui for routes ([#1106](https://github.com/electrode-io/electrode/pull/1106)) [commit](http://github.com/electrode-io/electrode/commit/3bb4e019a09bbc87191da3bc5cef944ff1357829)

# 1/2/2019

## Packages

- `electrode-archetype-react-component@6.1.2` `(6.1.1 => 6.1.2)`
- `electrode-archetype-react-component-dev@6.1.2` `(6.1.1 => 6.1.2)`
- `electrode-react-webapp@3.2.2` `(3.2.1 => 3.2.2)`

## Commits

- `packages/electrode-archetype-react-component[-dev]`

  - [patch][bug] fix babelrc being overriden ([#1105](https://github.com/electrode-io/electrode/pull/1105)) [commit](http://github.com/electrode-io/electrode/commit/a13399588cb16475af4aac8786009e5f7f466b6e)

- `packages/electrode-react-webapp`

  - [patch] check for "false" on WEBPACK_DEV_HTTPS ([#1103](https://github.com/electrode-io/electrode/pull/1103)) [commit](http://github.com/electrode-io/electrode/commit/97b75f94c2bacd32cb748aed703cb59221f84a75)

# [01/12/2018 - 12/11/2018](./xchangelog//2018.md)

# [02/14/2017 - 11/20/2017](./xchangelog//2017.md)
