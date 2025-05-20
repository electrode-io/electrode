import { makeOptionalRequire } from "optional-require";
const optionalRequire = makeOptionalRequire(require);
const Enzyme = optionalRequire("enzyme");
const Adapter = optionalRequire("enzyme-adapter-react-16");

const jsDomGlobal = optionalRequire("jsdom-global");
const tsNode = optionalRequire("ts-node");

if (Enzyme && Adapter) {
  Enzyme.configure({ adapter: new Adapter() });
}
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
