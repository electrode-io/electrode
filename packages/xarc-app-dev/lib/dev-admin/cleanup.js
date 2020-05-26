"use strict";

/* eslint-disable no-console, no-process-exit */
const { psChildren } = require("ps-get");

/**
 * Attempt to clean up any child process remaining
 */
let cleaned = false;

const doCleanup = async () => {
  if (cleaned) {
    return;
  }
  cleaned = true;
  const children = await psChildren(process.pid);
  children.reverse().forEach(c => {
    try {
      console.log(
        "detected child process left from dev-admin, PID:",
        c.pid,
        "- trying to terminate it"
      );
      process.kill(c.pid, "SIGINT");
    } catch {
      //
    }
  });
};

["uncaughtException", "unhandledRejection"].forEach(event => {
  process.on(event, async err => {
    console.log("dev-admin failure", event, err.stack);
    await doCleanup();
    process.exit(process.exitCode);
  });
});

["SIGTERM", "SIGINT", "SIGHUP"].forEach(sig => {
  process.on(sig, async name => {
    console.log("dev-admin received signal:", name);
    await doCleanup();
    process.exit(process.exitCode);
  });
});

module.exports = { doCleanup };
