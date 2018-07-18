# Extract Styles

Component Archetype supports for multiple styles, such as pure CSS, [CSS-Modules + CSS-Next](https://github.com/css-modules/css-modules), [Stylus](http://stylus-lang.com/docs/css-style.html) and [SCSS](http://sass-lang.com/).

## Structure

The following is the layout of an Electrode Component's style files:

```
demo-app
    src/client/styles
packages
    [component]
        demo/demo.[css|styl]
        src/styles
```

- `demo-app/src/client/styles`: stores the style files for the `demo-app`, which used for component's demo.

- `packages/[component]/demo`: `demo` folder is a connection between `demo-app` and `packages/[component]`. It's a only source for the `demo-app` to get the `packages/[component]` styles.

- `packages/[component]/src/styles`: stores the style styles for the component.

## Flags

Electrode component uses `demo-app` to demo the `packages/[component]`. It uses the flag from `demo-app`. To check out the available flags for your desired styles, please refer [here.](../app-archetype/extract-styles.md)

## Style Default Cases

Without specifying flags, the following are the default cases for styles:

- `*.css`: CSS-Modules + CSS-Next
- `.styl`: Stylus
- `*.scss`: SCSS

## Style Use Cases

> It's not strictly required, but in order to keep your styles clean, you probably want it ☺. We recommend to keep one style in each of the Electrode Component. Style files are in both `packages/[component]/src/styles` and `demo-app/src/client/styles` folders.

Here, we are using `style folder` to refer the style folders above.

- To use pure CSS, include `*.css` files to your style folder. Set `cssModuleSupport` to false.
- To use CSS-Modules + CSS-Next, include `*.css` files to your style folder. Set `cssModuleSupport` to true OR leave it undefined.

- To use Stylus, include `*.styl` to your style folder. Set `cssModuleSupport` to true OR leave it undefined.
- To use Stylus along with CSS-Modules + CSS-Next, include `*.styl` to your style folder and set `cssModuleSupport` to true.

- To use SCSS, include `*.scss` to your style folder. Set `cssModuleSupport` to true OR leave it undefined.
- To use SCSS along with CSS-Modules + CSS-Next, include `*.scss` to your style folder and set `cssModuleSupport` to true.
