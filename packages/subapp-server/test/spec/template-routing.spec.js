const templateRouting = require("../../lib/template-routing");
const Path = require("path");
describe("template-routing", () => {
  it("should not create new instances for unique request urls", async () => {
    const routeOptions = {
      path: "/abc/*",
      cdn: { enable: false },
      stats: Path.join(__dirname, "../data/fastify-plugin-test/stats.json"),
      cspNonceValue: false,
      assets: {},
      __internals: {
        chunkSelector: () => {
          return {
            css: {}
          };
        }
      },
      templateFile: Path.resolve(__dirname, "index-page.jsx")
    };
    const routeRenderer = templateRouting.makeRouteTemplateSelector(routeOptions);

    // Make 5 requests with unique urls. There should be single value in cache.
    await Promise.all(
      [1, 2, 3, 4, 5].map(i =>
        routeRenderer({
          request: { url: `/abc/def?id=${i}` }
        })
      )
    );
    expect(Object.keys(routeOptions._templateCache).length).to.equal(1);
  });
});
