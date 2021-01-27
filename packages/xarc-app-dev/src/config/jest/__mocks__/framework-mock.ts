/* eslint-disable @typescript-eslint/no-var-requires */

import makeOptionalRequire from "optional-require";

const optionalRequire = makeOptionalRequire(require);

const Enzyme = optionalRequire("enzyme");
const EnzymeAdapter = optionalRequire("enzyme-adapter-react-16");

if (Enzyme && EnzymeAdapter) {
  // Setup enzyme's react adapter
  Enzyme.configure({ adapter: new EnzymeAdapter() });
}
