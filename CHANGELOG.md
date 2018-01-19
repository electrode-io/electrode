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
