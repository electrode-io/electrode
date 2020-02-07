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
      const startMsg = "\n<!-- subapp start -->\n";

      if (!xarcSubappSSR) return startMsg;

      concurrency = concurrency > 0 ? concurrency : DEFAULT_CONCURRENCY;

      xaa.map(
        Object.entries(xarcSubappSSR),
        async ([, { queue }]) => {
          await xaa.map(
            queue,
            async info => {
              // make sure subapp is ready with SSR
              if (info.ready) await info.ready.promise;
              // and then wait for it to complete data prepare
              // awaitData should be available once ready is awaited
              await info.awaitData;
              if (info.saveSSRInfo) {
                info.saveSSRInfo();
              }
            },
            { concurrency }
          );

          // finally kick off rendering for every subapp in the group
          await xaa.map(
            queue.filter(x => x.renderSSR),
            async ({ renderSSR }) => {
              if (renderSSR) await renderSSR();
            },
            { concurrency }
          );
        },
        { concurrency }
      );

      return startMsg;
    }
  };
};
