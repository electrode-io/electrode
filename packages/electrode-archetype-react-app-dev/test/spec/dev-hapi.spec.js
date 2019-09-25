const mockRequire = require("mock-require");
const expect = require("chai").expect;
const hapiCompat = require("electrode-hapi-compat");

const moduleName = "../../lib/dev-admin/dev-hapi";

describe("dev-hapi", function() {
  this.timeout(10000);

  before(() => {
    mockRequire("electrode-archetype-react-app/config/archetype", {webpack: {devMiddleware: true}});
  });

  beforeEach(() => {
  });

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  after(() => {
    mockRequire.stop("electrode-archetype-react-app/config/archetype");
    mockRequire.stop("../../lib/dev-admin/middleware");
  });

  const textCycle = (callback) => {
    const mockReply = (arg) => {
      mockReply.result.reply = arg;
      return mockReply;
    };
    mockReply.result = {};
    mockReply.continue = () => {
      mockReply.result.continue = true;
      return mockReply;
    };
    mockReply.takeover = () => {
      mockReply.result.takeover = true;
      return mockReply;
    };
    mockReply.response = (arg) => {
      mockReply.result.response = arg;
      return mockReply;
    };
    mockReply.code = (arg) => {
      mockReply.result.code = arg;
      return mockReply;
    };
    mockReply.header = (key, value) => {
      mockReply.result.headers = mockReply.result.headers || {};
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
    mockRequire("../../lib/dev-admin/middleware", mockMiddleware);
    let register = require(moduleName);
    register = register.register || register;
    register({
      ext: (opts) => {
        opts.method({raw: {}}, mockReply);
      }
    }, {}, () => {});
  };

  describe("register", () => {
    it("Hapi16: if replyFile is called with a valid file then return 200", () => {
      hapiCompat.hapiVersion = 16;
      textCycle((cycle) => {
        const {result} = cycle.replyFile("./xclap.js");
        expect(result.code).to.equal(200);
        expect(result).to.have.any.keys("response");
        expect(result.headers["Content-Type"]).to.equal("application/javascript; charset=UTF-8");
      });
    });

    it("Hapi16: if replyFile is called with an invalid file then return 404", () => {
      hapiCompat.hapiVersion = 16;
      textCycle((cycle) => {
        const {result} = cycle.replyFile("./xclap.bs");
        expect(result.code).to.equal(404);
      });
    });

    it("Hapi17: if replyFile is called with a valid file then return 200", () => {
      hapiCompat.hapiVersion = 17;
      textCycle((cycle) => {
        const {result} = cycle.replyFile("./xclap.js");
        expect(result.code).to.equal(200);
        expect(result.takeover).to.equal(true);
        expect(result).to.have.any.keys("response");
        expect(result.headers["Content-Type"]).to.equal("application/javascript; charset=UTF-8");
      });
    });

    it("Hapi17: if replyFile is called with an invalid file then return 404", () => {
      hapiCompat.hapiVersion = 17;
      textCycle((cycle) => {
        const {result} = cycle.replyFile("./xclap.bs");
        expect(result.code).to.equal(404);
      });
    });

    it("Hapi18: if replyFile is called with a valid file then return 200", () => {
      hapiCompat.hapiVersion = 18;
      textCycle((cycle) => {
        const {result} = cycle.replyFile("./xclap.js");
        expect(result.code).to.equal(200);
        expect(result.takeover).to.equal(true);
        expect(result).to.have.any.keys("response");
        expect(result.headers["Content-Type"]).to.equal("application/javascript; charset=UTF-8");
      });
    });

    it("Hapi18: if replyFile is called with an invalid file then return 404", () => {
      hapiCompat.hapiVersion = 18;
      textCycle((cycle) => {
        const {result} = cycle.replyFile("./xclap.bs");
        expect(result.code).to.equal(404);
      });
    });
  });
});
