"use strict";

const pausePrompt = require("../../../lib/util/helpers").pausePrompt;
const expect = require("chai").expect;
const readline = require("readline");
const sinon = require("sinon");

describe("pause-prompt", function() {
  let rlStub;
  let closed;
  let answers;

  const rl = {
    question: (q, cb) => {
      cb(answers.pop());
    },
    close: () => {
      closed++;
    }
  };

  beforeEach(() => {
    closed = 0;
    rlStub = sinon.stub(readline, "createInterface").returns(rl);
  });

  afterEach(() => {
    rlStub.restore();
  });

  it("pausePrompt should exist", () => {
    expect(pausePrompt).to.exist;
  });

  it("pausePrompt should prompt: Press enter to continue ...", done => {
    answers = ["enter"];
    pausePrompt().then(() => {
      expect(closed).to.equal(1);
      done();
    });
  });
});
