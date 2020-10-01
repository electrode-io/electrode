const sortDeps = require("../../src/sort-deps");
const { resolve } = require("path");
const _ = require("lodash");
const { execSync } = require("child_process");
const { expect } = require("chai");
const { unlink } = require("fs");
const { doesNotReject } = require("assert");

const xrequire = eval("require");

describe('sort-deps', function () {
    this.beforeEach(() => {
        process.chdir(resolve(__dirname, "../.."));
    })
    it('sorts packages by keys', async function () {

        await new Promise(resolve => {
            const pkg = xrequire(resolve(__dirname, "../../template/_package"))({}, _.merge);
            sortDeps(pkg);
            const sortedDeps = pkg.dependencies;
            const sortedStr = Object.keys(sortedDeps).join("\n");
            const qaSortedStr = execSync(`echo '${sortedStr}' > temp.txt && cat temp.txt |sort`).toString();
            expect(sortedStr.trim()).to.equal(qaSortedStr.trim());
            unlink('temp.txt', () => {
                resolve();
            });
        })
    });

    it("skip undefined sections", async () => {
        await new Promise(resolve => {

            const pkg = {
                dependencies: { "a": 1, "b": 1 }
            };
            sortDeps(pkg);
            const sortedDeps = pkg.dependencies;
            const sortedStr = Object.keys(sortedDeps).join("\n");
            const qaSortedStr = execSync(`echo '${sortedStr}' > temp.txt && cat temp.txt |sort`).toString();
            expect(sortedStr.trim()).to.equal(qaSortedStr.trim());
            unlink('temp.txt', () => {
                resolve();
            });
        });
    });
})