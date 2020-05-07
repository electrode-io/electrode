"use strict";

/* eslint-disable no-unused-vars, comma-dangle, arrow-parens */

import { RenderOutput } from "../../src";
import * as Munchy from "munchy";
import * as streamToArray from "stream-to-array";

import { expect } from "chai";

describe("render-output", function () {
  it("should flush simple string", () => {
    let text;
    const context = {
      send: (x) => (text = x),
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
      send: (x) => (text = x),
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
    const context: any = {
      text: undefined,
    };
    context.send = (x) => (context.text = x);
    const ro = new RenderOutput(context);
    testFlushPending(ro, context);
  });

  it("should continue output after flush", () => {
    const context: any = {
      text: undefined,
    };
    context.send = (x) => (context.text = x);
    const ro = new RenderOutput(context);
    testFlushPending(ro, context);
    context.text = undefined;
    testFlushPending(ro, context);
  });

  it("should handle multiple spots", () => {
    let text = "";
    const context: any = {
      send: (x) => (text += x),
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

  it("should handle multiple buffer and stream data", (done) => {
    const context: any = {
      munchy: new Munchy(),
      transform: (a) => a,
    };

    streamToArray(context.munchy, (err, arr) => {
      if (err) return done(err);
      try {
        expect(arr.map((x) => x.toString())).to.deep.equal([
          "hello world",
          "foo bar",
          "spot1 123",
          "spot1 abc",
          "spot1 a stream",
          "789",
          "after spot1",
          "baz1",
          "spot2 123",
          "spot2 456",
          "spot2 a buffer",
          "closing",
        ]);
        return done();
      } catch (err2) {
        return done(err2);
      }
    });

    const ro = new RenderOutput(context);
    ro.add("hello world");
    ro.add("foo bar");
    const spot1 = ro.reserve();
    ro.add("after spot1");
    spot1.add("spot1 123");
    ro.add("baz1");
    ro.flush();
    const spot2 = ro.reserve();
    spot2.add("spot2 123");
    spot2.add("spot2 456");
    spot2.add(Buffer.from("spot2 a buffer"));
    spot2.close();
    spot1.add("spot1 abc");
    spot1.add(new Munchy({}, "spot1 a stream", null));
    spot1.add("789");
    ro.add("closing");
    spot1.close();
    ro.close();
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
    return ro.close().then((result) => {
      expect(result).to.equal(
        "hello worldfoo barspot1 123spot1 abc789after spot1baz1spot2 123456closing"
      );
    });
  });

  it("should not munch if no items", (done) => {
    const ro = new RenderOutput();
    ro._output.sendToMunchy(null, done);
  });

  // it("should rethrow if no _reject is available in _finish", () => {
  //   const ro = new RenderOutput();
  //   ro._reject = undefined;
  //   ro._resolve = () => {
  //     throw new Error("test error");
  //   };
  //   expect(() => ro._finish()).to.throw("test error");
  // });

  it("should throw if can't stringify an item", () => {
    const ro = new RenderOutput();
    ro.add({});
    expect(() => ro.flush()).to.throw("unable to stringify item of type Object");
  });

  it("should throw if can't stringify an item without constructor", () => {
    const ro = new RenderOutput();
    const item: any = {};
    item.constructor = false;
    ro.add(item);
    expect(() => ro.flush()).to.throw("unable to stringify item of type object");
  });
});
