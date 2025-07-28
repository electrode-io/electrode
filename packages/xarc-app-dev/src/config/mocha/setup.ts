import { makeOptionalRequire } from "optional-require";
const optionalRequire = makeOptionalRequire(require);

const jsDomGlobal = optionalRequire("jsdom-global");
const tsNode = optionalRequire("ts-node");

if (jsDomGlobal) {
  require("jsdom-global/register");
}

if (tsNode) {
  require("ts-node/register");
}
const chai = optionalRequire("chai").default;

/**
 * @param addons
 */
function chaiUse(addons) {
  [].concat(addons).forEach((x) => {
    const AddonMod = x && optionalRequire(x);
    if (AddonMod) {
      chai.use(AddonMod);
    }
  });
}

if (chai) {
  chaiUse(["chai-as-promised", "sinon-chai", "chai-shallowly"]);

  chai.config.includeStack = true;

  (global as any).expect = chai.expect;
}
