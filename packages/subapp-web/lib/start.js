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

      if (!xarcSubappSSR) {
        return startMsg;
      }

      concurrency = concurrency > 0 ? concurrency : DEFAULT_CONCURRENCY;

      /*
       */
      const waitForPrepare = async (info, mapCtx) => {
        mapCtx.assertNoFailure();

        // make sure subapp is ready with SSR
        if (info.ready) {
          await info.ready.promise;
        }

        mapCtx.assertNoFailure();

        // and then wait for it to complete data prepare
        // awaitData should be available once ready is awaited
        await info.awaitData;

        mapCtx.assertNoFailure();

        if (info.saveSSRInfo) {
          info.saveSSRInfo();
        }
      };

      /*
       */
      const runSSR = async ({ lib, renderSSR }, mapCtx) => {
        mapCtx.assertNoFailure();

        if (lib && lib.realizeReduxStore) {
          await lib.realizeReduxStore();
        }

        mapCtx.assertNoFailure();

        if (renderSSR) {
          await renderSSR();
        }
      };

      // default group _ subapps should all run independently
      if (xarcSubappSSR._) {
        xaa
          .map(
            xarcSubappSSR._.queue,
            async (info, ix, mapCtx) => {
              await waitForPrepare(info, mapCtx);
              await runSSR(info, mapCtx);
            },
            { concurrency }
          )
          .catch(err => {
            context.voidStop(err);
            xaa.map(xarcSubappSSR._.queue, async info => info.done(), { concurrency });
          });
      }

      xaa
        .map(
          Object.entries(xarcSubappSSR),
          async ([group, { queue }], ix, mapCtx) => {
            if (group !== "_") {
              mapCtx.assertNoFailure();

              // first ensure everyone in the queue finish preparing
              await xaa.map(
                queue,
                async (v, ix2, ctx2) => {
                  ctx2.assertNoFailure();

                  await waitForPrepare(v, ctx2);
                },
                { concurrency }
              );

              mapCtx.assertNoFailure();

              // and then kick off rendering for every subapp in the group
              await xaa.map(
                queue,
                async (v, ix2, ctx2) => {
                  ctx2.assertNoFailure();

                  await runSSR(v, ctx2);
                },
                { concurrency }
              );
            }
          },
          { concurrency }
        )
        .catch(err => {
          context.voidStop(err);
          xaa.map(
            Object.entries(xarcSubappSSR),
            async ([, { queue }]) => {
              await xaa.map(queue, async info => info.done(), { concurrency });
            },
            { concurrency }
          );
        });

      return startMsg;
    }
  };
};
