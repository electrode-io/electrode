import React from "react";
import PropTypes from "prop-types";
import { AboveTheFoldOnlyServerRender } from "above-the-fold-only-server-render";
import { connect } from "react-redux";
import smileyPng from "../images/718smiley.png";
import peaceSmileyPng from "../images/peace-smiley.png";

/* eslint-disable max-len */

export class AboveFold extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "98%",
            border: "2px solid",
            padding: "5pt"
          }}
        >
          <h3>
            Above-the-fold-only-server-render: Increase Your Performance. Note: This demo uses CSS3.
          </h3>
          <p>
            This page demonstrates the <span>AboveTheFoldOnlyServerRender</span> component.
          </p>
          <p>
            <a
              href="https://github.com/electrode-io/above-the-fold-only-server-render"
              target="_blank"
            >
              Read more about this module and see our live demo
            </a>
          </p>
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10px",
            marginBottom: "10px",
            color: "blue",
            border: "2px solid",
            width: "98%",
            height: "90vh",
            padding: "5pt"
          }}
        >
          <p>
            This content block is here to fill up the browser view port as Above The Fold content
            and it always will be rendered on server side.
          </p>
          <p>
            To verify, use your browser's view source to see the original HTML of this page and see
            this being part of the SSR content
          </p>
          <p>
            You should see this fill up your browser screen to push content below the browser view
            port, which are wrapped in the <span>AboveTheFoldOnlyServerRender</span> component.
          </p>
          <img
            style={{
              height: "30%"
            }}
            src={smileyPng}
          />
          <p>Scroll down to see the content below</p>
        </div>
        {this.props.skip ? (
          <div>
            In the page source you should NOT see any more HTML after this except a few empty{" "}
            <span>divs</span>
          </div>
        ) : (
          <div>
            In the page source you should SEE the HTML for the wrapped component after this.
          </div>
        )}
        <AboveTheFoldOnlyServerRender skip={this.props.skip}>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
              color: "red",
              border: "2px solid",
              width: "98%",
              height: "400px",
              padding: "5pt"
            }}
          >
            <p>
              This content block is wrapped inside the <span>AboveTheFoldOnlyServerRender</span>{" "}
              component, with the
              <span> skip</span> prop set to <span>{`${this.props.skip}`}</span>.
            </p>
            {this.props.skip ? (
              <div>
                <p>
                  It will not be rendered on the server side, but you should see it in the browser.
                </p>
                <p>
                  To verify, check the page source to see this not being part of the SSR content.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  It is also rendered on the server side since skip is{" "}
                  <span>{`${this.props.skip}`}</span>
                </p>
                <p>To verify, check the page source to see this being part of the SSR content.</p>
              </div>
            )}
            <img src={peaceSmileyPng} />
          </div>
        </AboveTheFoldOnlyServerRender>
      </div>
    );
  }
}

AboveFold.propTypes = {
  skip: PropTypes.bool
};

export default connect(state => {
  return { skip: state.skip };
})(AboveFold);
