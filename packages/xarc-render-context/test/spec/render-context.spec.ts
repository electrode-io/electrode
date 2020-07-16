"use strict";

import { RenderContext } from "../../src/RenderContext";
import { RenderOutput } from "../../src/RenderOutput";
import { expect } from "chai";
import { PassThrough } from "stream";
import { makeDefer } from "xaa";
import { Context } from "mocha";

// import { Fs } from "fs";
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
  it("should handle error with this.stop() or this.voidStop()", function () {
    const context = new RenderContext({}, {});
    context.stop = null;

    context.handleError(new Error("void error"));
    expect(context.voidResult.message).to.equal("void error");
  });
});

describe("munchy output", function () {
  it("call setDefaultMunchyOutput() with no arga", function () {
    const context = new RenderContext({}, {});
    context.setMunchyOutput();
    expect(context.munchy).to.exist;
  });

  it("should print output to munchy", function () {
    const context = new RenderContext({}, {});
    context.setMunchyOutput();
    const munchyoutput = new PassThrough();
    context.munchy.pipe(munchyoutput);
    munchyoutput.on("data", data => {
      expect(data.toString()).to.equal("foo");
    });

    const ro = new RenderOutput(context);
    ro.add("foo");
    ro.flush();
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
            return `<title>${a}</title>`;
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
});

describe("token handler in render context", function () {
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
    try {
      const context = new RenderContext({}, {});

      context.intercept({
        responseHandler: resp => resp
      });
    } catch (e) {
      expect(e.message).to.equal("@xarc/render-context: user intercepted response");
    }
  });

  it("should send result to OutputSend function", function () {
    let receivedResult = "";
    const send = x => {
      receivedResult += x;
    };
    const context = new RenderContext({}, {});

    context.setOutputSend(send);

    const ro = new RenderOutput(context);
    ro.add("hello");
    ro.add(" world");
    ro.flush();
    expect(receivedResult).to.equal("hello world");
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

  it("should handle token results with buffer as input", function () {
    let received = "";
    const context = new RenderContext({}, {});

    context.output = {
      add: buf => (received += buf.toString("utf8"))
    };
    context.handleTokenResult(1, Buffer.from("hello world", "utf8"), err => {
      expect(err).to.be.undefined;
    });
    expect(received).to.equal("hello world");
    expect(context.transform("s")).to.equal("s");
  });

  it("should handle token results with readable stream as input", function () {
    const readableStream = new PassThrough();
    const context = new RenderContext({}, {});

    context.output = {
      add: rstream => {
        rstream.on("data", data => {
          expect(data.toString("ascii")).to.equal("hello");
        });
      }
    };
    context.handleTokenResult(1, readableStream, err => {
      expect(err).to.be.undefined;
    });
    // readableStream.setEncoding("utf-8");
    readableStream.write("hello", "ascii"); //
    readableStream.end();
  });

  it("should handle token result with promise", async function () {
    const defer = makeDefer();
    const context = new RenderContext({}, {});

    // const done = () => defer && defer.resolve("foo");
    context.output = {
      add: outcome => {
        expect(outcome).to.equal("foo");
      }
    };
    context.handleTokenResult(1, defer.promise, err => {
      expect(err).to.be.undefined;
    });
    await defer.done(null, "foo");
  });
  it("should ignore other types", function () {
    const context = new RenderContext({}, {});

    context.handleTokenResult(1, false, err => {
      expect(err).to.be.undefined;
    });
  });
});
