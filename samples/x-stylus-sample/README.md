# x-stylus-sample

This sample demos using stylus for CSS in an Electrode X app.

## Steps

1. add `electrode-archetype-opt-stylus`: `npm install --save-dev electrode-archetype-opt-stylus`
2. Add `.styl` file to app under `src` dir
3. import the `.styl` files in one of the subapp's entry file
4. Use the styles in components

## Development

Some initial things to do and try:

1. Update your `package.json` to fill in some information.

   - `name`, `description`, `homepage`, `author`

2. Start doing some testing and development

   - First install dependencies

   ```
   npm install
   ```

   - Then to develop your app, do

   ```
   npm run dev
   ```

   - Once App is running, point browser to <http://localhost:3000>

3. Try adding some simple text to `home/subapp-home.js` or `demo1/subapp-demo1.js`.

4. Create some React components and add them to the home or demo subapp.

5. Enable some optional features in `archetype/config/index.js`.

6. Read up on a quick intro to the [Electrode SubApp architecture](https://github.com/electrode-io/electrode/blob/master/samples/poc-subapp/README.md).

7. Create a repo and push your app to <https://www.github.com>, and update `repository` in `package.json`.

8. Contribute to the [Electrode Platform](https://github.com/electrode-io/electrode/blob/master/CONTRIBUTING.md).

## Resources

- Check Electrode docs at <https://docs.electrode.io>
