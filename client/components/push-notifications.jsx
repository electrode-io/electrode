import React from 'react';

export default class PushNotifications extends React.Component {

  constructor() {
    super();
    this.state = {
      title: "",
      body: ""
    };
    this.sendNotification = this.sendNotification.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    var inst = this;
    require.ensure(["../register-service-worker.js"], function(require) {
      require("../register-service-worker")(function(registration) {
        registration.pushManager.subscribe({ userVisibleOnly: true })
          .then(function(subscription) {
            inst.registration = registration;
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
    if (!this.registration) {
      return;
    }
    this.registration.showNotification(this.state.title, {
      body: this.state.body
    });
  }

  render() {
    return (
      <div>
      Use the form below to define the parameters for a push notification.
      Click the send button to trigger the notification itself.
        <label for="title">Title</label>
        <input
          onChange={this.handleInputChange}
          name="title"
        />
        <label for="body">Body</label>
        <input
          onChange={this.handleInputChange}
          name="body"
        />
          <br/>
        <button onClick={this.sendNotification}>Send</button>
      </div>
    )
  }
}