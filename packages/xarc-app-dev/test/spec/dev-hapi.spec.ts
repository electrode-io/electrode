/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore, no-invalid-this, @typescript-eslint/class-name-casing */

const mockRequire = require("mock-require");
const hapiCompat = require("electrode-hapi-compat");

const moduleName = "../../src/lib/dev-admin/dev-hapi";

import { before, beforeEach, describe, it, after, afterEach } from "mocha";
import { expect } from "chai";

describe("dev-hapi", function() {
  this.timeout(10000);

  before(() => {});

  beforeEach(() => {});

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  after(() => {
    mockRequire.stop("@xarc/app/config/archetype");
    mockRequire.stop("../../src/lib/dev-admin/middleware");
  });

  const textCycle = callback => {
    const mockReply = arg => {
      // @ts-ignore
      mockReply.result.reply = arg;
      return mockReply;
    };
    mockReply.result = {};
    mockReply.continue = () => {
      // @ts-ignore
      mockReply.result.continue = true;
      return mockReply;
    };
    mockReply.takeover = () => {
      // @ts-ignore
      mockReply.result.takeover = true;
      return mockReply;
    };
    mockReply.response = arg => {
      // @ts-ignore
      mockReply.result.response = arg;
      return mockReply;
    };
    mockReply.code = arg => {
      // @ts-ignore
      mockReply.result.code = arg;
      return mockReply;
    };
    mockReply.header = (key, value) => {
      // @ts-ignore
      mockReply.result.headers = mockReply.result.headers || {};
      // @ts-ignore
      mockReply.result.headers[key] = value;
      return mockReply;
    };

    class mockMiddleware {
      hotMiddleware() {}
      process(req, fakeRes, cycle) {
        callback(cycle);
        return new Promise(() => {});
      }
      setup() {}
    }
    mockRequire("../../src/lib/dev-admin/middleware", mockMiddleware);
    let register = require(moduleName);
    register = register.register || register;
    register(
      {
        ext: opts => {
          opts.method({ raw: {} }, mockReply);
        }
      },
      {},
      () => {}
    );
  };

  describe("register", () => {
    it("Hapi16: if replyFile is called with a valid file then return 200", () => {
      hapiCompat.hapiVersion = 16;
      textCycle(cycle => {
        const { result } = cycle.replyFile("./require.js");
        expect(result.code).to.equal(200);
        expect(result).to.have.any.keys("response");
        expect(result.headers["Content-Type"]).to.equal("application/javascript");
      });
    });

    it("Hapi16: if replyFile is called with an invalid file then return 404", () => {
      hapiCompat.hapiVersion = 16;
      textCycle(cycle => {
        const { result } = cycle.replyFile("./xclap.bs");
        expect(result.code).to.equal(404);
      });
    });

    it("Hapi17: if replyFile is called with a valid file then return 200", () => {
      hapiCompat.hapiVersion = 17;
      textCycle(cycle => {
        const { result } = cycle.replyFile("./require.js");
        expect(result.code).to.equal(200);
        expect(result.takeover).to.equal(true);
        expect(result).to.have.any.keys("response");
        expect(result.headers["Content-Type"]).to.equal("application/javascript");
      });
    });

    it("Hapi17: if replyFile is called with an invalid file then return 404", () => {
      hapiCompat.hapiVersion = 17;
      textCycle(cycle => {
        const { result } = cycle.replyFile("./xclap.bs");
        expect(result.code).to.equal(404);
      });
    });

    it("Hapi18: if replyFile is called with a valid file then return 200", () => {
      hapiCompat.hapiVersion = 18;
      textCycle(cycle => {
        const { result } = cycle.replyFile("./require.js");
        expect(result.code).to.equal(200);
        expect(result.takeover).to.equal(true);
        expect(result).to.have.any.keys("response");
        expect(result.headers["Content-Type"]).to.equal("application/javascript");
      });
    });

    it("Hapi18: if replyFile is called with an invalid file then return 404", () => {
      hapiCompat.hapiVersion = 18;
      textCycle(cycle => {
        const { result } = cycle.replyFile("./xclap.bs");
        expect(result.code).to.equal(404);
      });
    });
  });
});
