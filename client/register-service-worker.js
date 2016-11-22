/* eslint-env browser */
/* eslint-disable no-console */

module.exports = () => {
  // Exit early if the navigator isn't available
  if (typeof navigator === "undefined") {
    return;
  }
  // Feature check if service workers are supported.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js", { scope: "./" })
      // Service worker registration was successful
      .then((registration) => {
        // The updatefound event is dispatched when the installing
        // worker changes. This new worker will potentially become
        // the active worker if the install process completes.
        registration.onupdatefound = function () {
          const installingWorker = registration.installing;
          // Listen for state changes on the installing worker so
          // we know when it has completed.
          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
            case "installing":
              console.log("Installing a new service worker...");
              break;
            case "installed":
              console.log(navigator.serviceWorker.controller);
              // We check the active controller which tells us if
              // new content is available, or the current service worker
              // is up to date (?)
              // TODO: Figure out why this is the case
              if (navigator.serviceWorker.controller) {
                console.log("New or updated content is available, refresh!");
              } else {
                console.log("Content is now available offline!");
              }
              break;
            case "activating":
              console.log("Activating a service worker...");
              break;
            case "activated":
              console.log("Successfully activated service worker.");
              break;
            case "redundant":
              console.log("Service worker has become redundant");
              break;
            }
          };
        };
      })
      // Service worker registration failed
      .catch((err) => {
        console.log("Service worker registration failed: ", err);
      });
  }
};
