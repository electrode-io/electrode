import { PageRenderer } from "../../../src/node/render-page";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("render-page", () => {
  it("PageRenderer init successfully", async () => {
    const pageOptions = {
      prodAssetData: {
        cdnMap: "mock-cdn-address",
        pathMap: {
          base: "mock-map-base",
          a: "test-a"
        }
      },
      devAssetData: {
        cdnMap: "mock-cdn-address",
        pathMap: {
          base: "mock-map-base",
          b: "test-b"
        },
        nonce: true,
        namespace: "ns1"
      },
      subApps: [
        {
          name: "not-exist1",
          ssr: true
        },
        {
          name: "not-exist2"
        }
      ],
      pageTitle: "test-page-title",
      favicon: "test-icon",
      charSet: "UTF-8",
      templateInserts: {
        head: {
          begin: ["<link>test-link1</link>", "<link>test-link2</link>"],
          contextReady: ["<p>test-context-ready1</p>", "<p>test-context-ready2</p>"],
          end: ["<style>test-style1</style>", "<style>test-style2</style>"],
          afterInit: ["<script>test-script1</script>", "<script>test-script2</script>"]
        },
        body: {
          begin: ["<h1>Head1</h1>", "<h2>Head2</h2>"],
          end: ["<foot>foot1</foot>", "<foot>foot2</foot>"],
          beforeStart: ["<p>p1</p>", "<p>p2</p>"],
          afterStart: ["<p>p3</p>", "<p>p4</p>"]
        }
      }
    };
    const pageRenderer = new PageRenderer(pageOptions);
    expect(pageRenderer._getSSRSubAppNames()).eql(["not-exist1"]);
    expect(pageRenderer.render({})).to.be.a("Promise");
  });
});
