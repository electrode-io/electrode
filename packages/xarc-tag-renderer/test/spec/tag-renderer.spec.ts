import { expect } from "chai";
import { TagRenderer, createTemplateTags } from "../../src";
import { templateTags as templateTags1 } from "../data/template1";
import { templateTags as templateTags2 } from "../data/template2";
import { templateTags as templateTags3 } from "../data/template3";

import { describe, it } from "mocha";

describe("tag template", function () {
  it("should render a TagTemplate", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags1
    });

    renderer.initializeRenderer();

    const context = await renderer.render({});

    expect(context.result).contains("<div>from custom-1</div>");
    expect(context.result).contains(
      "<div>sub template tagsx1<div>sub template tags 2x2</div></div>"
    );
    expect(context.result).contains("<title>user-handler-title</title>");
    expect(context.result).contains("custom-1</div>hello world from function: user,options");
  });

  it("should render a TagTemplate with handler that returns a sub template", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags3
    });

    renderer.initializeRenderer();

    const context = await renderer.render({});

    expect(context.result).contains("<div>from custom-1</div>");
    expect(context.result).contains(
      "<div>subTags</div><div>sub template tagsx1<div>sub template tags 2x2</div></div><div>subTags</div>"
    );
    expect(context.result).contains(
      "<div>subTagsPromise</div><div>sub template tagsx1<div>sub template tags 2x2</div></div><div>subTagsPromise</div>"
    );
  });

  it("should render a TagTemplate with token IDs as comments", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags1,
      insertTokenIds: true
    });

    renderer.initializeRenderer();

    const context = await renderer.render({});

    expect(context.result).contains("<div>from custom-1</div>");
    expect(context.result).contains(
      `<div>sub template tags<!-- BEGIN X props: {} -->
x1<!-- X END -->
<div>sub template tags 2<!-- BEGIN X2 props: {} -->
x2<!-- X2 END -->
</div></div><!-- unhandled token meta-tags -->
<!-- BEGIN ABC props: {} -->
ABC<!-- ABC END -->`
    );
    expect(context.result).contains(
      `<!-- BEGIN PAGE_TITLE props: {} -->
<title>user-handler-title</title>
<!-- PAGE_TITLE END -->`
    );
    expect(context.result).contains("hello world from function: user,options");
  });

  it("should catch and return error as result", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags1
    });

    renderer.registerTokenIds("test", Symbol("test"), () => {
      return {
        "webapp-body-bundles": () => {
          throw new Error("test");
        }
      };
    });
    renderer.initializeRenderer();

    const context = await renderer.render({});
    expect(context.result).to.be.an("Error");
    expect(context.result.message).equal("test");
  });

  it("should invoke context handleError if a token returns error", async () => {
    const renderer = new TagRenderer({
      templateTags: createTemplateTags`${() => {
        return Promise.reject(new Error("test blah"));
      }}`
    });

    renderer.initializeRenderer();
    renderer.render({});
    const context = await renderer.render({});
    expect(context.result).to.be.an("Error");
    expect(context.result.message).equal("test blah");
  });

  it("should catch and handle error from executing a sub template", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags1
    });

    renderer.initializeRenderer();
    renderer._template.initTagOpCode();
    renderer.registerTokenIds(
      "test",
      Symbol("test"),
      () => {
        return {
          X: () => {
            throw new Error("test");
          }
        };
      },
      1
    );

    const context = await renderer.render({});

    expect(context.result).to.be.an("Error");
    expect(context.result.message).equal("test");
  });

  it("should invoke RegisterTokenIds tag once only", () => {
    const renderer = new TagRenderer({
      templateTags: templateTags1,
      tokenHandlers: [
        () => {
          return {};
        }
      ]
    });

    const handler = () => ({});
    const sym1 = Symbol("test-1");
    const sym2 = Symbol("test-2");
    renderer.registerTokenIds("test-1", sym1, handler);
    renderer.registerTokenIds("test-2", sym2, () => ({}));
    renderer.registerTokenIds("test-1", sym1, handler);
    // test-1 should not have moved to the end of the registered array
    expect(renderer._tokenHandlers[1].name).equal("test-1");
    expect(renderer._tokenHandlers[1].handler).equal(handler);
    expect(renderer._tokenHandlers[2].name).equal("test-2");
  });

  it("should allow context to void progress and return a replacement result", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags1
    });

    renderer.registerTokenIds("test", Symbol("test"), () => {
      return {
        "webapp-body-bundles": context => {
          context.voidStop("oops - stop");
        }
      };
    });
    renderer.initializeRenderer();

    const context = await renderer.render({});
    expect(context.result).equal("oops - stop");
  });

  it("should handle token invoke handler return null", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags2
    });
    renderer.initializeRenderer();
    const context = await renderer.render({});
    expect(context.result).contains(`<!-- unhandled token meta-tags -->
<div>test</div>`);
  });

  it("should handle token invoke handler return null with comments", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags2,
      insertTokenIds: true
    });
    renderer.initializeRenderer();
    const context = await renderer.render({});
    expect(context.result).contains(`<!-- #tokenInvoke removed due to its process return null -->`);
  });

  it("should handle token ID being null", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags2
    });
    renderer.initializeRenderer();
    const context = await renderer.render({});
    expect(context.result).contains(`<!-- unhandled token prefetch-bundles -->
<div>test null id</div>`);
  });

  it("should handle token ID being null with comments", async () => {
    const renderer = new TagRenderer({
      templateTags: templateTags2,
      insertTokenIds: true
    });
    renderer.initializeRenderer();
    const context = await renderer.render({});
    expect(context.result).contains(`<!-- NULL_ID removed due to its handler set to null -->`);
  });

  describe("initializeRenderer", function () {
    it("should not reset already initialized renderer", () => {
      const renderer = new TagRenderer({
        templateTags: templateTags1
      });

      renderer.initializeRenderer();
      const save = renderer._processor;
      renderer.initializeRenderer();
      expect(save).equal(renderer._processor);
    });
  });
});
