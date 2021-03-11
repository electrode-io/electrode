/* eslint-disable prefer-arrow-callback */
import "jsdom-global/register";
import React from "react"; // eslint-disable-line
import { describe, it } from "mocha";
import { expect } from "chai";
import { SubAppDef, SubAppContainer, envHooks } from "@xarc/subapp";
import { render, waitFor, screen } from "@testing-library/react";
import sinon from "sinon";
import { recoilFeature, RecoilFeature } from "../../src/browser/index";

const { createElement } = React; // eslint-disable-line

const mockPrepare = async initialState => {
  return {
    initialState: {
      state: {
        todoListState: { key: "todoListState", value: [] },
        todoListFilterState: { key: "todoListFilterState", value: "Show All" }
      },
      selectors: {}
    }
  };
};

const options = {
  React,
  prepare: mockPrepare
};

const MockComponent = () => {
  return (
    <div>
      test<p>mock-component-content</p>
    </div>
  );
};

describe("reactRecoilFeature", function () {
  it("should return a feature factory", () => {
    const factory = recoilFeature({ React, prepare: mockPrepare });
    expect(factory.id).equal("state-provider");
    expect(factory.subId).equal("react-recoil");
    expect(factory.add).to.be.a("function");
  });

  it("should add recoil feature to subapp", () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;
    const factory = recoilFeature(options);
    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;
    container.declare("test", def);

    factory.add(def);

    const recoil: Partial<RecoilFeature> = def._features.recoil;
    expect(recoil.wrap).to.be.an("function");
    expect(recoil.execute).to.be.an("function");

    expect(recoil.options).equal(options);
    expect(recoil.options.prepare).equal(options.prepare);

    expect(recoil.id).equal("state-provider");
    expect(recoil.subId).equal("react-recoil");
  });

  it("should render subapp have recoil wrapper", async () => {
    const container = new SubAppContainer({});
    envHooks.getContainer = () => container;

    const factory = recoilFeature(options);

    const def = {
      name: "test",
      getModule() {
        return Promise.resolve({});
      },
      _features: {}
    } as SubAppDef;

    container.declare("test", def);

    factory.add(def);

    const recoil: Partial<RecoilFeature> = def._features.recoil;
    const atomsMap = {
      initialState: {
        state: {
          todoListState: { key: "todoListState", value: [] },
          todoListFilterState: { key: "todoListFilterState", value: "Show All" }
        },
        selectors: {}
      }
    };

    render(
      recoil.wrap({
        Component: MockComponent,
        store: atomsMap
      })
    );

    const element = await waitFor(() => screen.getByText("test"), { timeout: 500 });

    expect(element.innerHTML).contains(`test<p>mock-component-content</p>`);
  });
});
