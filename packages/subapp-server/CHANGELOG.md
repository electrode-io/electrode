# Change Log - subapp-server

This log was last generated on Wed, 03 Jan 2024 23:41:10 GMT and should not be manually modified.

## 2.3.0
Wed, 03 Jan 2024 23:41:10 GMT

### Minor changes

- Fix webpack stats error in dev mode during initial start up

### Patches

- Add missing direct dependency. This was available as transitive dependency before

## 2.2.2
Tue, 29 Aug 2023 14:57:37 GMT

_Version update only_

## 2.2.1
Mon, 08 May 2023 22:49:30 GMT

### Patches

- Add fix for memory leak in subapp-server template cache

## 2.2.0
Thu, 04 May 2023 21:08:31 GMT

### Minor changes

- Adding CSP header feature to Subapp V1
- Add phantom dependency `@xarc/render-context`. Add `@xarc/run` to dev dependency

### Patches

- Enhancement to set CSP nonce separately for script and styles

