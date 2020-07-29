/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-ignore */
export {};

const optionalRequire = require("optional-require")(require);
const Enzyme = optionalRequire("enzyme");
const Adapter = optionalRequire("enzyme-adapter-react-16");

if (Enzyme && Adapter) {
  Enzyme.configure({ adapter: new Adapter() });
}

const chai = optionalRequire("chai");

function chaiUse(addons) {
  [].concat(addons).forEach(x => {
    const AddonMod = x && optionalRequire(x);
    if (AddonMod) {
      chai.use(AddonMod);
    }
  });
}

if (chai) {
  chaiUse(["chai-as-promised", "sinon-chai", "chai-shallowly"]);

  chai.config.includeStack = true;

  // @ts-ignore
  global.expect = chai.expect;
}
