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
      const { xarcSubappSSR, emitter } = context.user;
      const startMsg = `
<!-- subapp start -->
<script>window.xarcV1.start();</script>
`;
      const startTimes = {};

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
        startTimes[`load-subapps`] = Date.now();
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
        if (emitter) {
          emitter.emit("web_ssr", {
            action: `load-subapps`,
            duration: Date.now() - startTimes[`load-subapps`]
          });
        }
      }

      xaa
        .map(
          Object.entries(xarcSubappSSR),
          async ([group, { queue }], ix, mapCtx) => {
            if (group !== "_") {
              mapCtx.assertNoFailure();

              startTimes[`load-grp-${group}`] = Date.now();

              // first ensure everyone in the queue finish preparing
              await xaa.map(
                queue,
                async (v, ix2, ctx2) => {
                  ctx2.assertNoFailure();

                  await waitForPrepare(v, ctx2);
                },
                { concurrency }
              );
              if (emitter) {
                emitter.emit("web_ssr", {
                  action: `prepare-group`,
                  labels: ["group"],
                  group,
                  duration: Date.now() - context.user[`prepare-grp-${group}`]
                });
              }

              mapCtx.assertNoFailure();

              // and then kick off rendering for every subapp in the group
              startTimes[`render-grp-${group}`] = Date.now();
              await xaa.map(
                queue,
                async (v, ix2, ctx2) => {
                  ctx2.assertNoFailure();

                  await runSSR(v, ctx2);
                },
                { concurrency }
              );
              if (emitter) {
                emitter.emit("web_ssr", {
                  action: `render-group`,
                  group,
                  labels: ["group"],
                  duration: Date.now() - startTimes[`render-grp-${group}`]
                });
                emitter.emit("web_ssr", {
                  action: `load-group`,
                  group,
                  labels: ["group"],
                  duration: Date.now() - startTimes[`load-grp-${group}`]
                });
              }
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
