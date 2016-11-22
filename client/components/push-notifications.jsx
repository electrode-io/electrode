/* eslint-disable react/no-did-mount-set-state */
/* global navigator */
import React from "react";

export default class PushNotifications extends React.Component {

  constructor() {
    super();
    this.state = {
      // Whether ServiceWorkers are supported
      supported: false,
      // Waiting on the service worker to be ready
      loading: true,
      // Whether we"ve got a push notification subscription
      subscribed: false,
      // The actual subscription itself
      subscription: null,
      title: "",
      body: ""
    };
    this.sendNotification = this.sendNotification.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Check for any existing subscriptions
        registration.pushManager.getSubscription().then((subscription) => {
          // No current subscription, let the user subscribe
          if (!subscription) {
            this.setState({
              loading: false,
              subscribed: false,
              supported: true
            });
          } else {
            this.setState({
              subscription,
              subscribed: true,
              loading: false,
              supported: true
            });
          }
        });
      });
    } else {
      // ServiceWorkers are not supported, let the user know.
      this.setState({
        loading: false,
        supported: false
      });
    }
  }

  subscribe() {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe({ userVisibleOnly: true })
        .then((subscription) => {
          this.setState({
            subscription,
            subscribed: true
          });
        });
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  sendNotification() {
    const { title, body } = this.state;
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, { body });
    });
  }

  render() {
    const { loading, subscribed, subscription, supported } = this.state;

    if (!loading && !supported) {
      return (
        <div>Sorry, service workers are not supported in this browser.</div>
      );
    }

    if (loading) {
      return (
        <div>
          Checking push notification subscription status...
        </div>
      );
    }

    if (!subscribed) {
      return (
        <div>
          Click below to subscribe to push notifications
          <button onClick={this.subscribe}>Subscribe</button>
        </div>
      );
    }

    const API_KEY = "AIzaSyDAL_a1Hswn8QRRICDlh5PIIbEbFN7Aih0";
    const GCM_ENDPOINT = "https://android.googleapis.com/gcm/send";
    const endpointSections = subscription.endpoint.split("/");
    const subscriptionId = endpointSections[endpointSections.length - 1];

    const curlCommand = `curl --header "Authorization: key='${API_KEY}'" ` +
    `--header Content-Type:"application/json" ${GCM_ENDPOINT} -d ` +
    `"{\"registration_ids\":[\"${subscriptionId}\"]}"`;

    return (
      <div>
      <h2>Push Notifications with Service Workers</h2>
      Use the form below to define the parameters for a push notification.
      Click the send button to trigger the notification itself.
        <label htmlFor="title">Title</label>
        <input
          onChange={this.handleInputChange}
          name="title"
        />
        <label htmlFor="body">Body</label>
        <input
          onChange={this.handleInputChange}
          name="body"
        />
          <br/>
        <button onClick={this.sendNotification}>Send</button>

      <h3>Push Notification Subscription</h3>
      <code>
        {JSON.stringify(this.state.subscription, null, 4)}
      </code>
      <h3>Curl Command</h3>
      <code>
        {curlCommand}
      </code>
      </div>
    );
  }
}
