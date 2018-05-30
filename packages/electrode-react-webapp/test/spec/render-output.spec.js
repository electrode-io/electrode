"use strict";

const RenderOutput = require("../../lib/render-output");
const expect = require("chai").expect;

describe("render-output", function() {
  it("should flush simple string", () => {
    let text;
    const context = {
      send: x => (text = x)
    };
    const ro = new RenderOutput(context);
    ro.add("hello world");
    ro.flush();
    expect(text).to.equal("hello world");
    ro.flush();
    expect(text).to.equal("hello world");
  });

  it("should flush multiple strings", () => {
    let text;
    const context = {
      send: x => (text = x)
    };

    const ro = new RenderOutput(context);
    ro.add("hello world");
    ro.add("foo bar");
    ro.flush();
    expect(text).to.equal("hello worldfoo bar");
  });

  const testFlushPending = (ro, context) => {
    ro.add("hello world");
    ro.add("foo bar");
    const spot = ro.reserve();
    ro.add("after pending");
    ro.add("baz");
    ro.flush();
    expect(context.text).to.equal(undefined);
    spot.add("123");
    spot.add("456");
    spot.close();
    expect(context.text).to.equal("hello worldfoo bar123456after pendingbaz");
  };

  it("should wait on flush when there's pending", () => {
    const context = {
      text: undefined
    };
    context.send = x => (context.text = x);
    const ro = new RenderOutput(context);
    testFlushPending(ro, context);
  });

  it("should continue output after flush", () => {
    const context = {
      text: undefined
    };
    context.send = x => (context.text = x);
    const ro = new RenderOutput(context);
    testFlushPending(ro, context);
    context.text = undefined;
    testFlushPending(ro, context);
  });

  it("should handle multiple spots", () => {
    let text = "";
    const context = {
      send: x => (text += x)
    };
    const ro = new RenderOutput(context);
    ro.add("hello world");
    ro.add("foo bar");
    const spot1 = ro.reserve();
    ro.add("after spot1");
    spot1.add("spot1 123");
    ro.add("baz1");
    ro.flush();
    expect(text).to.equal("");
    const spot2 = ro.reserve();
    spot2.add("spot2 123");
    spot2.add("456");
    spot2.close();
    expect(text).to.equal("");
    spot1.add("spot1 abc");
    spot1.add("789");
    ro.add("closing");
    spot1.close();
    ro.flush();
    expect(text).to.equal(
      "hello worldfoo barspot1 123spot1 abc789after spot1baz1spot2 123456closing"
    );
  });

  it("should delegate result to a promise w/o context and send", () => {
    const ro = new RenderOutput();
    ro.add("hello world");
    ro.add("foo bar");
    const spot1 = ro.reserve();
    ro.add("after spot1");
    spot1.add("spot1 123");
    ro.add("baz1");
    ro.flush();
    expect(ro._result).to.equal("");
    const spot2 = ro.reserve();
    spot2.add("spot2 123");
    spot2.add("456");
    spot2.close();
    expect(ro._result).to.equal("");
    spot1.add("spot1 abc");
    spot1.add("789");
    ro.add("closing");
    spot1.close();
    return ro.close().then(result => {
      expect(result).to.equal(
        "hello worldfoo barspot1 123spot1 abc789after spot1baz1spot2 123456closing"
      );
    });
  });
});
