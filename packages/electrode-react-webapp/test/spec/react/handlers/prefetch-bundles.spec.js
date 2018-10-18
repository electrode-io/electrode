"use strict";

const handler = require("../../../../lib/react/handlers/prefetch-bundles");

describe("prefetch bundles handler", function() {
  it("should return empty string if no prefetch in content", () => {
    expect(handler({ user: { content: {} } })).to.equal("");
  });

  it("should return <script> tag if it's not exist", () => {
    expect(handler({ user: { scriptNonce: "", content: { prefetch: "test" } } })).to.equal(
      "<script>test</script>"
    );
  });

  it("should not return <script> tag if it exists", () => {
    expect(
      handler({
        user: { scriptNonce: "", content: { prefetch: "<script id='blah'>test</script>" } }
      })
    ).to.equal("<script id='blah'>test</script>");
  });
});
