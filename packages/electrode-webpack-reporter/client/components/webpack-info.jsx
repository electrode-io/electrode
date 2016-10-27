import React, {PropTypes} from "react";

const WebpackInfo = (props) => (
  <table>
    <thead>
    <tr>
      <th>Hash</th>
      <th>Version</th>
      <th>Time</th>
      <th>publicPath</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{props.hash}</td>
      <td>{props.version}</td>
      <td>{props.time !== undefined ? `${props.time}ms` : ""}</td>
      <td>{props.publicPath}</td>
    </tr>
    </tbody>
  </table>
);

WebpackInfo.propTypes = {
  hash: PropTypes.string,
  version: PropTypes.string,
  time: PropTypes.string,
  publicPath: PropTypes.string
};

export default WebpackInfo;
