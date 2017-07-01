"use strict";

const data = [
  "a",
  "b",
  "c",
  { src: 1 },
  { src: 5, defer: 1 },
  { src: 2 },
  "d",
  "e",
  "f;",
  "g",
  { src: 3 },
  "h",
  "i",
  "j",
  {
    src: 4,
    async: 1
  },
  { src: 10 },
  "k",
  "l",
  "m"
];

const groupScripts = require("../../lib/group-scripts");
const chai = require("chai");

describe("group-scripts", function() {
  it("should group scripts", () => {
    const expected = [
      "a;\n\nb;\n\nc;",
      [
        {
          src: 1
        },
        {
          src: 5,
          defer: 1
        },
        {
          src: 2
        }
      ],
      "d;\n\ne;\n\nf;\n\ng;",
      [
        {
          src: 3
        }
      ],
      "h;\n\ni;\n\nj;",
      [
        {
          src: 4,
          async: 1
        },
        {
          src: 10
        }
      ],
      "k;\n\nl;\n\nm;"
    ];
    const result = groupScripts(data);
    chai.expect(result.scripts).to.deep.equal(expected);
  });
});
