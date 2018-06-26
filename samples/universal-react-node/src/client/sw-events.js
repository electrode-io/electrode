// @flow

/* eslint-env serviceworker */

// This file contains all the user defined service worker related events
import icon from "./images/logo-192x192.png";
import badge from "./images/logo-72x72.png";

self.addEventListener("push", (event) => {
  const title = "It worked!";
  const options = {
    body: "Great job sending that push notification!",
    tag: "electrode-push-notification-test",
    icon,
    badge
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
