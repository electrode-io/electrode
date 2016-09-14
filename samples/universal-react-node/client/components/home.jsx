import React from "react";
import AboveFold from "./above-the-fold";
import styles from "../styles/base.css";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello <a href="https://github.com/electrode-io">Electrode</a></h1>
        <h2>Demonstration Components</h2>
        <ul>
          <li><a href="/csrf">CSRF protection using electrode-csrf-jwt</a></li>
          <li className="aboveFold">
            <button>
              <a href="/above-the-fold">
                Above the Fold Render - increase your App's performance by using a skip prop
              </a>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
