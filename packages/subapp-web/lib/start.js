"use strict";

const DEFAULT_CONCURRENCY = 15;
const xaa = require("xaa");
/*
 * subapp start for SSR
 * Nothing needs to be done to start subapp for SSR
 */
module.exports = function setup() {
  return {
    process: (context, { props: { concurrency } }) => {
      const { xarcSubappSSR } = context.user;
      const startMsg = `
<!-- subapp start -->
<script>window.xarcV1.start();</script>
`;

      if (!xarcSubappSSR) return startMsg;

      concurrency = concurrency > 0 ? concurrency : DEFAULT_CONCURRENCY;

      const waitForPrepare = async info => {
        // make sure subapp is ready with SSR
        if (info.ready) await info.ready.promise;
        // and then wait for it to complete data prepare
        // awaitData should be available once ready is awaited
        await info.awaitData;
        if (info.saveSSRInfo) {
          info.saveSSRInfo();
        }
      };

      const runSSR = async ({ lib, renderSSR }) => {
        if (lib && lib.realizeReduxStore) {
          await lib.realizeReduxStore();
        }
        if (renderSSR) await renderSSR();
      };

      // default group _ subapps should all run independently
      if (xarcSubappSSR._) {
        xaa.map(
          xarcSubappSSR._.queue,
          async info => {
            await waitForPrepare(info);
            await runSSR(info);
          },
          { concurrency }
        );
      }

      xaa.map(
        Object.entries(xarcSubappSSR),
        async ([group, { queue }]) => {
          if (group !== "_") {
            // first ensure everyone in the queue finish preparing
            await xaa.map(queue, waitForPrepare, { concurrency });
            // and then kick off rendering for every subapp in the group
            await xaa.map(queue, runSSR, { concurrency });
          }
        },
        { concurrency }
      );

      return startMsg;
    }
  };
};
