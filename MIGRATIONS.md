## 2.x -> 3.0.1

### Install peerDependencies for `*-dev`

E.g.,
```
$ npm install --save extract-text-webpack-plugin webpack-partial webpack-stats-plugin isparta-loader
```

### Add a `.babelrc` file to the root of the project

`.babelrc` should look like this:

```json
{
  "extends": "./node_modules/@walmart/electrode-archetype-react-app/config/babel/.babelrc"
}
```

### Update `import` statements that use modules doing `export default foo`

```
import {default as foo} from "./foo";

# alternatively, if you change `export default foo` to `export const foo = myObj`, then do
import {foo} from "./foo";
```
