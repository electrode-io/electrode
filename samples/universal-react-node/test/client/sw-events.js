/* eslint-env serviceworker */
self.addEventListener("push", event => {
  const title = "It worked!";
  const options = {
    body: "Great job sending that push notification!",
    tag: "electrode-push-notification-test"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
