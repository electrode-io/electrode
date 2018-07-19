# Extract Styles

Application Archetype supports multiple styles, such as pure CSS, [CSS-Modules + CSS-Next](https://github.com/css-modules/css-modules), [Stylus](http://stylus-lang.com/docs/css-style.html) and [SCSS](http://sass-lang.com/). Use the following flags to choose your desired styles.

## Flags

> Note: You can check how to customize the configs [here](./customize-config.md#extending-webpack-configurations).

- `cssModuleSupport`: A flag to enable `css-modules + css-next` support.
- <span style="color:red">**[Deprecated Warning] This is not a recommended set up.**</span> `cssModulesStylusSupport`: A flag to enable `stylus` support with CSS modules. (Default: false)

## Style Default Cases

Without specifying flags, the following are the default cases for styles:

- `*.css`: CSS-Modules + CSS-Next
- `.styl`: Stylus
- `*.scss`: SCSS

## Style Use Cases

- To use pure CSS, include `*.css` to your styles folder and set `cssModuleSupport` to false.
- To use CSS-Modules + CSS-Next, include `*.css` to your styles folder. Set `cssModuleSupport` to true OR leave it undefined.

- To use Stylus, include `*.styl` to your styles folder. Set `cssModuleSupport` to true OR leave it undefined.
- To use Stylus along with CSS-Modules + CSS-Next, include `*.styl` to your styles folder and set `cssModuleSupport` to true.

- To use SCSS, include `*.scss` to your styles folder. Set `cssModuleSupport` to true OR leave it undefined.
- To use SCSS along with CSS-Modules + CSS-Next, include `*.scss` to your styles folder and set `cssModuleSupport` to true.
