import { initContext } from "../../../src/node/init-context";
import { expect } from "chai";

describe("Test init-context", () => {
  it("test process context", () => {
    const tokens = {
      props: {}
    };
    const initializer = initContext(null, tokens);

    const context: any = {
      options: {
        request: { bingo: true }
      }
    };
    initializer.process(context);

    expect(context.user.request).deep.eq(context.options.request);
    expect(context.user.scriptNonce).have.property("tokens");
    expect(context.user.scriptNonceAttr).contains("nonce");
    expect(context.user.styleNonce).have.property("tokens");
    expect(context.user.styleNonceAttr).contains("nonce");
    expect(context.user.cspHeader).match(
      /^script-src-elem 'strict-dynamic' 'nonce-[A-Za-z0-9+=\/]{22}'; style-src-elem 'strict-dynamic' 'nonce-[A-Za-z0-9+=\/]{22}';$/
    );
  });

  it("test process context without header", () => {
    const tokens = {
      props: {
        nonce: {
          script: false,
          style: false,
          tokens: {}
        }
      }
    };
    const initializer = initContext(null, tokens);

    const context: any = {
      user: {},
      options: {
        request: { bingo: true }
      }
    };
    initializer.process(context);

    expect(context.user.request).deep.eq(context.options.request);
    expect(context.user.scriptNonce).eq(undefined);
    expect(context.user.scriptNonceAttr).eq("");
    expect(context.user.styleNonce).eq(undefined);
    expect(context.user.styleNonceAttr).eq("");
    expect(context.user).not.have.property("cspHeader");
  });
});
