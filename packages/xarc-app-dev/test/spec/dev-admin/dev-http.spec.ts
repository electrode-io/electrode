// /* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-empty-function */
// /* eslint-disable @typescript-eslint/ban-ts-ignore, no-invalid-this, @typescript-eslint/class-name-casing */

// const mockRequire = require("mock-require");

// const moduleName = "../../../lib/dev-admin/dev-http";

// import { before, beforeEach, describe, it, after, afterEach } from "mocha";
// import { expect } from "chai";
// import * as Axios from "axios";

// describe("dev-http", function() {
//   this.timeout(10000);
//   let server;
// ]
//   before(() => {});

//   beforeEach(() => {
//     const setupServer = require("../../../lib/dev-admin/dev-http").setup;

//     const textCycle = () => {};
//     server = setupServer({ port: 3003, host: "localhost" });
//     server.start();
//   });

//   afterEach(() => {
//     delete require.cache[require.resolve(moduleName)];
//     server.stop();
//   });

//   after(() => {
//     mockRequire.stop("@xarc/app/config/archetype");
//     mockRequire.stop("../../src/lib/dev-admin/middleware");
//   });

//   describe("setup", () => {
//     it.skip("http server: if replyFile is called with a valid file then return 200", () => {
//       Axios.default.get("http://localhost:3003/").then(resp => {
//         expect(resp.status).to.equal(200);
//       });
//     });

//     // it("if replyFile is called with an invalid file then return 404", () => {
//     //   textCycle(cycle => {
//     //     const { result } = cycle.replyFile("./xclap.bs");
//     //     expect(result.code).to.equal(404);
//     //   });
//     // });
//   });
// });
