# Extract Styles

Application Archetype supports multiple styles, such as pure CSS, [CSS-Modules + CSS-Next](https://github.com/css-modules/css-modules), [Stylus](http://stylus-lang.com/docs/css-style.html) and [SCSS](http://sass-lang.com/). Use the following flags to choose your desired styles.

## Flags

> Note: You can check the customizing configs [here](/chapter1/intermediate/app-archetype/customize-config.md#extending-webpack-configurations).

- `cssModuleSupport`: A flag to enable `css-modules + css-next` support. (Default: true)
- `cssModulesStylusSupport`: A flag to enable `stylus` support with CSS modules. (Default: false)
<span style="color:red">**[Deprecated Warning] This is not a recommended set up.**</span>

## Style Use Cases

- To use plain CSS, include `*.css` to your styles folder and set `cssModuleSupport` to false.
- To use CSS-Modules + CSS-Next, include `*.css` to your styles folder and set `cssModuleSupport` to true.
- To use Stylus, include `*.styl` to your styles folder.
- To use SCSS, include `*.scss` to your styles folder.