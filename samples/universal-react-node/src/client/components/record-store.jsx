// @flow

import React, {Component} from "react";
import RecordForm from "./record-form";

const HTTP_BAD_REQUEST = 400;

type TypeState =  {
  records: [{}]
};

class RecordStore extends Component<string, TypeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      records: [{
        artist: "Led Zeppelin",
        name: "IV",
        _id: "1"
      }]
    };
  }

  componentDidMount() {
    fetch("/records")
      .then((response) => {
        if (response.status >= HTTP_BAD_REQUEST) {
          throw new Error("Bad response from server");
        }
        response.json().then((records) => {
          this.setState({ records });
        });
      })
      .catch(() => {
        throw new Error("Error Fetching Records");
      });
  }

  render() {
    return (
      <div >
        <h2>Welcome to the Electrode Record Store</h2>
        <h3> Available Records</h3>
        <ul>
          {this.state.records.map((record: Object) =>
            <li key={record._id}>{record.name} By {record.artist}</li>
          )}
        </ul>
        <RecordForm />
      </div >
    );
  }
}

export default RecordStore;
