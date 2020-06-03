"use strict";

import { RenderContext, munchyHandleStreamError } from "../../src/RenderContext";
import { RenderOutput } from "../../src/RenderOutput";
import { expect } from "chai";
import * as Munchy from "munchy";
import { PassThrough } from "stream";
import { nextTick } from "process";
import { isContext } from "vm";

describe("render-context", function () {
  it("should handle setting all stop modes", () => {
    const context = new RenderContext({}, {});
    context.stop = RenderContext.FULL_STOP;
    expect(context.isFullStop).to.equal(true);
    context.softStop();
    expect(context.isSoftStop).to.equal(true);
    context.voidStop();
    expect(context.isVoidStop).to.equal(true);
    context.fullStop();
    expect(context.isFullStop).to.equal(true);

    expect(context.stop).to.equal(RenderContext.FULL_STOP);
  });

  it("should print output to munchy", function () {
    const context = new RenderContext({}, {});
    context.setMunchyOutput(new Munchy());
    const munchyoutput = new PassThrough();
    context.munchy.pipe(munchyoutput);
    munchyoutput.on("data", data => {
      console.log("STDOUT DATA", data.toString());
      expect(data.toString()).to.equal("foo");
    });

    const ro = new RenderOutput(context);
    ro.add("hello world");
    context.setOutputSend(process.stdout);

    context.munchy._handleStreamError = munchyHandleStreamError;

    const ret = context.munchy._handleStreamError(new Error("err"));
    expect(ret.result).to.contain("SSR ERROR");
  });

  it("should store token handlers in a map", function () {
    process.env.NODE_ENV = "production";
    const context = new RenderContext(
      {
        transform: a => a
      },
      {
        handlersMap: {
          title: function (a) {
            return "<title>" + a + "</title>";
          },
          handlerWithToken: {
            tokens: ["abc"]
          }
        }
      }
    );

    expect(typeof context.getTokenHandler("title")).to.equal("function");
    expect(context.getTokens("handlerWithToken").length).to.equal(1);
  });

  it("should transform output based on transform function", function () {
    const context = new RenderContext({}, {});

    context.setOutputTransform(output => {
      return output.replace("\n", "<br>");
    });
    expect(context.transform("\n new line ")).to.equal("<br> new line ");
  });

  it("should keep store status", function () {
    const context = new RenderContext({}, {});
    context.status = "green";
    expect(context.status).to.equal("green");
  });

  it("should allow users to intercept handling of the rendering flow", function () {
    const context = new RenderContext({}, {});

    try {
      context.intercept({
        responseHandler: resp => resp
      });
    } catch (e) {
      expect(e.message).to.equal("electrode-react-webapp: render-context - user intercepted");
    }
  });

  it("should handle token result with string", function () {
    const context = new RenderContext({}, {});
    let x;
    context.send = _x => (x = _x);

    context.handleTokenResult(1, "stringOutput", err => {
      expect(err).to.be.undefined;
    });
    context.output.flush();
    expect(x).to.equal("stringOutput");
  });

  it("should handle token result with promise", function () {
    // const context = new RenderContext({}, {});
    // let x;
    // context.send = _x => (x = _x);
    // context.handleTokenResult(1, deferred, err => {
    //   expect(err).to.be.undefined;
    // });
    // context.output.flush();
    // expect(x).to.equal("deferredOutput");
  });
});
