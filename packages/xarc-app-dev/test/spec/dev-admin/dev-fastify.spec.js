"use strict";

const events = require("events");
const fs = require("fs");
const mockRequire = require("mock-require");
const os = require("os");
const path = require("path");
const sinon = require("sinon");

function fakeReply(sandbox) {
  const reply = sandbox.stub();
  reply.savedHeaders = [];
  reply.savedPayloads = [];
  reply.callNotFoundCount = 0;
  reply.code = function(status) {
    reply.statusCode = status;
    return reply;
  };
  reply.header = function(name, value) {
    reply.savedHeaders.push({ name, value });
    return reply;
  };
  reply.send = function(payload) {
    reply.savedPayloads.push(payload);
    return reply;
  };
  reply.callNotFound = function() {
    reply.callNotFoundCount++;
    return reply;
  };
  return reply;
}

describe("dev-admin-fastify", function() {
  this.timeout(10000);
  let sandbox;
  let mockFastify;
  let MiddlewareClass;
  let request;
  let reply;

  function registerFastify() {
    const register = require("../../../lib/dev-admin/dev-fastify");
    register(mockFastify);
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const fastifyEvent = new events.EventEmitter();
    request = sandbox.stub();
    reply = fakeReply(sandbox);
    mockFastify = {
      initialConfig: {
        https: false
      },
      hooks: fastifyEvent,
      addHook: (evt, func) => {
        fastifyEvent.on(evt, func);
      },
      use: sandbox.spy(),
      server: {
        address: () => ({ port: 9000 })
      }
    };
    MiddlewareClass = function(args) {
      MiddlewareClass.initArgs = args;
      this.hotMiddleware = "hot";
      this.devMiddleware = "dev";
      this.process = MiddlewareClass.processStub;
      this.setup = () => {
        MiddlewareClass.setupCount++;
      };
    };
    MiddlewareClass.initArgs = [];
    MiddlewareClass.setupCount = 0;
    MiddlewareClass.processStub = sandbox.stub();

    mockRequire("../../../lib/dev-admin/middleware", MiddlewareClass);
    mockRequire("@xarc/app/config/archetype", {
      webpack: { devMiddleware: true }
    });
  });

  afterEach(() => {
    mockRequire.stopAll();
    sandbox.restore();
    delete require.cache[require.resolve("../../../lib/dev-admin/dev-fastify")];
  });

  it("register loads dev and hot middleware", () => {
    registerFastify();
    expect(MiddlewareClass.setupCount).eq(1);
    expect(mockFastify.use.callCount).eq(2);
    expect(mockFastify.use.calledWith(MiddlewareClass.hotMiddleware));
    expect(mockFastify.use.calledWith(MiddlewareClass.devMiddleware));
    expect(mockFastify.hooks.listenerCount("onRequest")).eq(1);
  });

  it("register baseUrl defaults to localhost", () => {
    registerFastify();
    expect(MiddlewareClass.initArgs.baseUrl()).eq("http://localhost:9000");
  });

  it("register baseUrl uses HOST env", () => {
    process.env.HOST = "walmart.com";
    registerFastify();
    expect(MiddlewareClass.initArgs.baseUrl()).eq("http://walmart.com:9000");
    delete process.env.HOST;
  });

  it("register baseUrl uses https", () => {
    mockFastify.initialConfig.https = true;
    registerFastify();
    expect(MiddlewareClass.initArgs.baseUrl()).eq("https://localhost:9000");
  });

  it("onRequest handler calls process", async () => {
    registerFastify();
    expect(mockFastify.hooks.listenerCount("onRequest")).eq(1);

    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(MiddlewareClass.processStub.callCount).eq(1);
  });

  it("process calls replyHTML to print HTML content", async () => {
    registerFastify();
    MiddlewareClass.processStub.callsFake((req, rpy, handlers) => {
      handlers.replyHtml("Some html content");
    });
    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(reply.called);
    expect(reply.statusCode).eq(200);
    expect(reply.savedHeaders).deep.eq([{ name: "Content-Type", value: "text/html" }]);
    expect(reply.savedPayloads).deep.eq(["Some html content"]);
  });

  it("process calls replyNotFound", async () => {
    registerFastify();
    MiddlewareClass.processStub.callsFake((req, rly, handlers) => {
      handlers.replyNotFound();
    });

    expect(reply.callNotFoundCount).eq(0);
    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(reply.callNotFoundCount).eq(1);
  });

  it("process calls replyError", async () => {
    registerFastify();
    MiddlewareClass.processStub.callsFake((req, rly, handlers) => {
      handlers.replyError("Yo Error!");
    });

    expect(reply.savedPayloads.length).eq(0);
    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(reply.savedPayloads.length).eq(1);
    expect(reply.savedPayloads[0]).eq("Yo Error!");
  });

  it("process calls replyStaticData", async () => {
    registerFastify();
    MiddlewareClass.processStub.callsFake((req, rly, handlers) => {
      handlers.replyStaticData("Yo Data!");
    });

    expect(reply.savedPayloads.length).eq(0);
    request.url = "http://example.com/animal.gif";
    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(reply.statusCode).eq(200);
    expect(reply.savedHeaders[0]).deep.eq({ name: "Content-Type", value: "image/gif" });
    expect(reply.savedPayloads.length).eq(1);
    expect(reply.savedPayloads[0]).eq("Yo Data!");
  });

  it("process calls replyFile", async () => {
    registerFastify();
    const tmpFile = path.join(os.tmpdir(), "valid.txt");
    fs.writeFileSync(tmpFile, "blah");

    MiddlewareClass.processStub.callsFake((req, rly, handlers) => {
      handlers.replyFile(tmpFile);
    });

    expect(reply.savedPayloads.length).eq(0);
    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(reply.statusCode).eq(200);
    expect(reply.savedHeaders[0]).deep.eq({
      name: "Content-Type",
      value: "text/plain; charset=UTF-8"
    });
    expect(reply.savedPayloads.length).eq(1);
    expect(reply.savedPayloads[0].toString()).eq("blah");
  });

  it("process calls replyFile with invalid file", async () => {
    registerFastify();
    const tmpFile = "yolo.txt";
    MiddlewareClass.processStub.callsFake((req, rly, handlers) => {
      handlers.replyFile(tmpFile);
    });

    expect(reply.savedPayloads.length).eq(0);
    await mockFastify.hooks.emit("onRequest", request, reply);
    expect(reply.statusCode).eq(404);
    expect(reply.savedPayloads.length).eq(0);
  });

  it("middleware skip does not load middleware", () => {
    mockRequire("@xarc/app/config/archetype", {
      webpack: { devMiddleware: false }
    });

    const register = require("../../../lib/dev-admin/dev-fastify");
    register(mockFastify);

    expect(MiddlewareClass.setupCount).eq(0);
    expect(mockFastify.use.callCount).eq(0);
    expect(mockFastify.hooks.listenerCount("onRequest")).eq(0);
  });
});
