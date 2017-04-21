import React from "react";
import "es6-promise";
import "isomorphic-fetch";
import RecordForm from "./record-form";

let HTTP_BAD_REQUEST = 400;

class RecordStore extends React.Component {
  constructor(props) {
    super(props);

    //this.allRecords = this.allRecords.bind(this);
  }
  componentDidMount() {
    fetch('/records')
      .then((response) => {
        //console.log("RECORDS::", response.json());
        if (response.status >= HTTP_BAD_REQUEST) {
          throw new Error("Bad response from server");
        }
        response.json().then((data) => {
          console.log("BLOB IS:::", data);
        })
        // response.body.read().then(function (result) {
        //   // array of cell values for the first row
        //   console.log(result.value);
        //   return reply(result.value);
        // });
      })

      .catch((err) => {
        throw new Error("Error Fetching Records", err);
      });
  }

  render() {
    return (
      <div >
        <h2>Welcome to the Electrode Record Store</h2>
        <h3> Available Records</h3>
        <h3>Add a Record</h3>
        <RecordForm />
      </div >
    );
  }
}

export default RecordStore;
