import React, {PropTypes} from "react";
import formatSize from "../../lib/format-size.js";

const assetRow = (asset) => (
  <tr>
    <td>{asset.name}</td>
    <td>{formatSize(asset.size)}</td>
    <td>{asset.chunkNames.join(", ")}</td>
    <td>{asset.emitted ? "[emitted]" : "" }</td>
    <td>{asset.chunkNames.join(", ")}</td>
  </tr>
);

const WebpackAssets = (props) => (
  <table>
    <thead>
    <tr>
      <th>Asset</th>
      <th>Size</th>
      <th>Chunks</th>
      <th></th>
      <th>Chunk Names</th>
    </tr>
    </thead>
    <tbody>
    {props.assets.map(assetRow)}
    </tbody>
  </table>
);

WebpackAssets.propTypes = {
  assets: PropTypes.array
};

export default WebpackAssets;
