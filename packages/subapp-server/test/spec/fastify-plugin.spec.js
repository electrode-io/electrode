"use strict";

const { fastifyPlugin } = require("../../lib/fastify-plugin");
const Path = require("path");
const { expect } = require("chai");

describe("fastify-plugin", function () {
  // Helper function to wait for server to be ready
  const waitForServer = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

  it("loads server from file system", async function () {
    const serverPort = 3011;
    const { electrodeServer } = require("@xarc/fastify-server");
    let server = null;

    try {
      // Create server instance
      server = await electrodeServer({
        deferStart: true,
        connection: { port: serverPort, host: "localhost" }
      });

      const srcDir = Path.join(__dirname, "../data/fastify-plugin-test");

      // Add a simple test route before loading plugin
      server.route({
        method: "GET",
        path: "/test-simple",
        handler: async () => ({ message: "hello from simple test" })
      });

      /**
       * Patch APP_SRC_DIR as subapp-util relies on this env variable
       * else it takes relative path of lib or src
       */
      process.env.APP_SRC_DIR = srcDir;

      const opt = {
        srcDir,
        loadRoutesFrom: "routes.js",
        stats: Path.join(__dirname, "../data/fastify-plugin-test/stats.json")
      };

      // Register plugin and start server
      await fastifyPlugin(server, opt);
      await server.start();
      
      // Wait for server to be fully ready
      await waitForServer(200);

      // Test the simple route we added (not the complex subapp route)
      const result = await server.inject({
        method: "GET",
        url: `http://localhost:${serverPort}/test-simple`
      });

      // Assertions
      expect(result.statusCode).to.equal(200);
      expect(result.json().message).to.equal("hello from simple test");

    } finally {
      // Cleanup
      if (server && !server.closed) {
        try {
          await server.close();
          console.log('Server on port', serverPort, 'closed successfully');
        } catch (err) {
          console.log('Error closing server on port', serverPort, ':', err.message);
        }
      }
      delete process.env.APP_SRC_DIR;
    }
  }).timeout(8000);

  it("invokes subappServer's setup if it exists", async function () {
    const serverPort = 3005;
    const { electrodeServer } = require("@xarc/fastify-server");
    let server = null;

    try {
      // Create server instance
      server = await electrodeServer({
        deferStart: true,
        connection: { port: serverPort, host: "localhost" }
      });

      const srcDir = Path.join(__dirname, "../data/fastify-plugin-test");

      /**
       * Patch APP_SRC_DIR as subapp-util relies on this env variable
       * else it takes relative path of lib or src
       */
      process.env.APP_SRC_DIR = srcDir;

      const opt = {
        srcDir,
        loadRoutesFrom: "routes.js",
        stats: Path.join(__dirname, "../data/fastify-plugin-test/stats.json")
      };

      // Register plugin and start server
      await fastifyPlugin(server, opt);
      await server.start();
      
      // Wait for server to be fully ready
      await waitForServer(200);

      // Make test request
      const result = await server.inject({
        method: "GET",
        url: `http://localhost:${serverPort}/api/demo3/testsetup`
      });

      // Assertions
      expect(result.statusCode).to.equal(200);
      expect(result.json().msg).to.equal("Route set by subappServer");

    } finally {
      // Cleanup
      if (server && !server.closed) {
        try {
          await server.close();
          console.log('Server on port', serverPort, 'closed successfully');
        } catch (err) {
          console.log('Error closing server on port', serverPort, ':', err.message);
        }
      }
      delete process.env.APP_SRC_DIR;
    }
  }).timeout(8000);

  it("preserves original end points", async function () {
    const serverPort = 3002;
    const { electrodeServer } = require("@xarc/fastify-server");
    let server = null;

    try {
      // Create server instance
      server = await electrodeServer({
        deferStart: true,
        connection: { port: serverPort, host: "localhost" }
      });

      // Add custom routes before plugin
      server.route({
        method: "GET",
        path: "/",
        handler: async () => "Hello World"
      });

      server.route({
        method: "GET",
        path: "/500",
        handler: () => {
          throw new Error("db error");
        }
      });

      // Register plugin and start server
      await fastifyPlugin(server, {});
      await server.start();
      
      // Wait for server to be fully ready
      await waitForServer(200);

      // Make test request
      const res = await server.inject({
        method: "GET",
        url: `http://localhost:${serverPort}/`
      });

      // Assertions
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.contain("Hello World");

    } finally {
      // Cleanup
      if (server && !server.closed) {
        try {
          await server.close();
          console.log('Server on port', serverPort, 'closed successfully');
        } catch (err) {
          console.log('Error closing server on port', serverPort, ':', err.message);
        }
      }
    }
  }).timeout(8000);
});
