import { SubAppContainer } from "./types";

/**
 * hooks for specific environment like node.js or the browser
 */
interface EnvHooks {
  getContainer?: () => SubAppContainer;
}

/**
 * Environment specific hooks
 *
 */
export const envHooks: EnvHooks = {};
