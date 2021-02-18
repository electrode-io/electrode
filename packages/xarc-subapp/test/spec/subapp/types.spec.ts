import { SubAppContainer } from "../../../src/subapp/types";
import { declareSubApp } from "../../../src/node/index";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("SubAppContainer", () => {
  it("should SubAppContainer methods works as expected", () => {
    const subappDef1 = declareSubApp({
      name: "test-subapp1",
      getModule: () => import("../../blah")
    });
    subappDef1._module = () => "test-module1";
    const container = new SubAppContainer({
      test1: subappDef1
    });

    expect(container.get("test1")).eql(subappDef1);
    expect(container.get("test2")).eql(undefined);
    expect(container.getNames()).eql(["test1"]);
    expect(container.isReady()).true; //  eslint-disable-line

    const subappDef2 = declareSubApp({
      name: "test-subapp2",
      getModule: () => import("../../blah")
    });
    subappDef2._module = () => "test-module2";
    expect(container.declare("test2", subappDef2)).eql(subappDef2);
    expect(container.get("test1")).eql(subappDef1);
    expect(container.get("test2")).eql(subappDef2);
    expect(container.getNames()).eql(["test1", "test2"]);
    expect(container.getNames().length).eql(2); //  eslint-disable-line
    expect(container.isReady()).true; //  eslint-disable-line
  });
});
