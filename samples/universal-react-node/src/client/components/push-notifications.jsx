// @flow

/* eslint-disable react/no-did-mount-set-state */
/* global navigator */
import React, { Component } from "react";
import icon from "../images/logo-192x192.png";
import badge from "../images/logo-72x72.png";

export default class PushNotifications extends Component<
  {},
  {
    supported: boolean,
    error: any,
    loading: boolean,
    subscribed: boolean,
    subscription: any,
    title: string,
    body: string
  }
> {
  constructor() {
    super();
    this.state = {
      // Whether ServiceWorkers are supported
      supported: false,
      // Did something fail?
      error: null,
      // Waiting on the service worker to be ready
      loading: true,
      // Whether we"ve got a push notification subscription
      subscribed: false,
      // The actual subscription itself
      subscription: null,
      title: "",
      body: ""
    };
    (this: any).handleSendNotification = this.handleSendNotification.bind(this);
    (this: any).handleInputChange = this.handleInputChange.bind(this);
    (this: any).handleSubscribe = this.handleSubscribe.bind(this);
  }

  componentDidMount() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready
        .then(registration => {
          // Check for any existing subscriptions
          registration.pushManager
            .getSubscription()
            .then(subscription => {
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
            })
            .catch(error => {
              this.setState({
                loading: false,
                error
              });
            });
        })
        .catch(error => {
          this.setState({
            loading: false,
            error
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

  handleSubscribe() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager
          .subscribe({ userVisibleOnly: true })
          .then(subscription => {
            this.setState({
              subscription,
              subscribed: true
            });
          })
          .catch(error => {
            this.setState({ error });
          });
      });
    }
  }

  handleInputChange(event: InputEvent) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSendNotification() {
    const { title, body } = this.state;
    const options = { body, icon, badge };
    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, options);
      });
    }
  }

  render() {
    const { error, loading, supported, subscribed, subscription } = this.state;

    if (!loading && !supported) {
      return (
        <div>Sorry, service workers are not supported in this browser.</div>
      );
    }

    if (error) {
      return (
        <div>
          Woops! Looks like there was an error:
          <span style={{ fontFamily: "monospace", color: "red" }}>
            {error.name}: {error.message}
          </span>
        </div>
      );
    }

    if (loading) {
      return <div>Checking push notification subscription status...</div>;
    }

    if (!subscribed) {
      return (
        <div>
          Click below to subscribe to push notifications
          <button onClick={this.handleSubscribe}>Subscribe</button>
        </div>
      );
    }

    const API_KEY = "AIzaSyDAL_a1Hswn8QRRICDlh5PIIbEbFN7Aih0";
    const GCM_ENDPOINT = "https://android.googleapis.com/gcm/send";
    const endpointSections = subscription.endpoint.split("/");
    const subscriptionId = endpointSections[endpointSections.length - 1];

    const curlCommand = `curl --header "Authorization: key=${API_KEY}"
    --header Content-Type:"application/json" ${GCM_ENDPOINT} -d
    "{\\"registration_ids\\":[\\"${subscriptionId}\\"]}"`;

    return (
      <div>
        <h2>Push Notifications with Service Workers</h2>
        Use the form below to define the parameters for a push notification.
        Click the send button to trigger the notification itself.
        <label htmlFor="title">Title</label>
        <input onChange={this.handleInputChange} name="title" />
        <label htmlFor="body">Body</label>
        <input onChange={this.handleInputChange} name="body" />
        <br />
        <button onClick={this.handleSendNotification}>Send</button>
        <h3>Subscription Endpoint</h3>
        <code>{this.state.subscription.endpoint}</code>
        <h3>Curl Command</h3>
        <code>{curlCommand}</code>
      </div>
    );
  }
}
