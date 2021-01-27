/* eslint-disable no-console, no-process-exit */
import { psChildren } from "ps-get";

/**
 * Attempt to clean up any child process remaining
 */
let cleaned = false;

export const doCleanup = async () => {
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

export function setupCleanupHooks() {
  ["uncaughtException", "unhandledRejection"].forEach((event: any) => {
    process.on(event, async (err: Error) => {
      console.log("dev-admin failure", event, err.stack);
      await doCleanup();
      process.exit(process.exitCode);
    });
  });

  ["SIGTERM", "SIGINT", "SIGHUP"].forEach((sig: any) => {
    process.on(sig, async name => {
      console.log("dev-admin received signal:", name);
      await doCleanup();
      process.exit(process.exitCode);
    });
  });
}
