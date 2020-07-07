/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */
/* eslint-disable filenames/match-regex */

import { JsxRenderer } from "../JsxRenderer";

/**
 * Load and register classic template token handler for the JSX template.
 * After loading the handler, its tokens can be used in the JSX template
 *
 * Usage: (*This is a JSX tag, don't call the function directly.*)
 *
 *  - With function: `<LoadTokenHandler name="handler1" handler={() => {...}}`
 *  - Load from source file: `<LoadTokenHandler handler="./token-handlers" />`
 *    - If the handler string starts with `"."` then it will be resolved to the full
 *      path relative to the template's location, else it's a module for require.
 *    - The full path of the handler will be used as `name`, but you can provide
 *      a name prop if desired.
 *
 *
 *
 * Example:
 *
 * ```js
 * import { IndexPage, Token, LoadTokenHandler } from "@xarc/jsx-renderer"
 *
 * export const Template = () => (<IndexPage>
 *   <LoadTokenHandler name="handler1" handler={setupContext => {
 *     return {
 *       TOKEN1: context => {
 *         return "result from TOKEN1"
 *       }
 *     }
 *   }} />
 *   <Token _id="TOKEN1" />
 * </IndexPage>)
 * ```
 *
 * @param props - JSX tag props
 * @param context - rendering context
 */
export const LoadTokenHandler = (props, context) => {
  const renderer: JsxRenderer = context.asyncTemplate;
  renderer.registerTokenHandler(props.name, props.handler, props.call);
};
