# Extract Styles

Application Archetype contains multiple choices of different styles, such as pure CSS, [CSS-Modules + CSS-Next](https://github.com/css-modules/css-modules), [Stylus](http://stylus-lang.com/docs/css-style.html) and [SCSS](http://sass-lang.com/). To make your app work with the specified style, you'll need a setup before start.

## Style Related Flags

> Note: You can check [Customize Config](/chapter1/intermediate/app-archetype/customize-config.md) for customizing flags.

- `cssModuleSupport`: A flag to enbale css-modules + css-next support. (Default: true)
- `cssModulesStylusSupport`: A flag to enable stylus support for CSS modules. (Default: false)

## Supported Styles

- To use plain CSS, include `*.css` only to your styles folder and set `cssModuleSupport` to false.
- To use CSS-Modules + CSS-Next, include `*.css` only to your styles folder and set `cssModuleSupport` to true.
- To use Stylus, just include `*.styl` only to your styles folder
- To use SCSS, just include `*.scss` only to your styles folder