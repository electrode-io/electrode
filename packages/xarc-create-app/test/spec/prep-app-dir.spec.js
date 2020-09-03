
const { expect } = require("chai");
const { spawn, execSync } = require("child_process");
const Fs = require('fs')

describe('prepAppDir', function () {
    const callSubroutineWithArgv2 = arg => {
        return spawn("node", ["-e", `process.argv[2]='${arg}'; require('./src/prep-app-dir')()`]);
    }
    it('requires process.argv2', async function () {
        const routine = callSubroutineWithArgv2("");
        var output = ""
        routine.stdout.on("data", function (d) {
            output += d.toString();
        })

        routine.on("exit", () => {
            expect(output).to.include("pass '.' to use current directory")
        });
    });


    it('creates directory with name from  process.argv2', async function () {
        expect(execSync("ls test/data").toString()).to.not.include("hello_app");
        callSubroutineWithArgv2("./test/data/hello_app").on("exit", () => {
            expect(execSync("ls test/data").toString()).to.include("hello_app");
            Fs.rmdirSync("test/data/hello_app");
        });
    });

    it('when process.argv2 ', function () {
        // expect(execSync("ls test/data").toString()).to.not.include("hello_app");
        const nodeproc = callSubroutineWithArgv2(".");
        var output = ""
        nodeproc.stdout.on("data", function (d) {
            output += d.toString();
        })
        nodeproc.on("exit", () => {
            expect(output).to.include("Using current directory")
        });
    });
    it('when process.argv2 is existing directory', async function () {
        // expect(execSync("ls test/data").toString()).to.not.include("hello_app");
        await new Promise(resolve => {
            const nodeproc = callSubroutineWithArgv2("./test/spec");
            var output = ""
            nodeproc.stdout.on("data", function (d) {
                output += d.toString();
            })
            nodeproc.on("exit", (cod3) => {
                expect(cod3).to.equal(0);
                resolve();
            });
        })
    });





});
