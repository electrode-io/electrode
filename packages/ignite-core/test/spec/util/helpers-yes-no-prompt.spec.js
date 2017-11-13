"use strict";

const yesNo = require("../../../lib/util/helpers").yesNoPrompt;
const expect = require("chai").expect;
const readline = require("readline");
const sinon = require("sinon");

describe("yes-no-prompt", function() {
  let question;
  let answers;
  let rlStub;

  const rl = {
    question: (q, cb) => {
      question = q;
      cb(answers.pop());
    },
    close: () => undefined
  };

  beforeEach(() => {
    rlStub = sinon.stub(readline, "createInterface").returns(rl);
  });

  afterEach(() => {
    rlStub.restore();
  });

  it("should ask question and return true for y", () => {
    answers = ["y"];
    return yesNo("hello").then(yes => {
      expect(question).includes("hello");
      expect(yes).to.equal(true);
    });
  });

  it("should ask question and return false for n", () => {
    answers = ["n"];
    return yesNo("hello").then(yes => {
      expect(question).includes("hello");
      expect(yes).to.equal(false);
    });
  });

  it("should ask question again for non y/n", () => {
    answers = ["y", "x", false];
    return yesNo("hello").then(yes => {
      expect(question).includes("hello");
      expect(yes).to.equal(true);
    });
  });
});
