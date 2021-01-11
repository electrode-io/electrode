import { React } from "@xarc/react";
import PropTypes from "prop-types";

const range = (n, cb) => {
  const r = [];
  for (let i = 0; i < n; i++) {
    r.push(cb(i));
  }
  return r;
};

function Large(props) {
  const { breadth, depth } = props;

  const rlvl = 150 + Math.floor(50 / (depth + 1));
  const level = 50 + Math.floor(100 / (depth + 1));

  return (
    <div style={{ padding: "1px", border: `solid 8px rgb(${rlvl}, ${level}, ${level})` }}>
      <span style={{ fontSize: "8pt" }}>{`hello ${depth}:${breadth}; `}</span>
      {range(breadth, i => (
        <div style={{ display: "inline", border: "solid 1px" }} key={`b_${depth}_${i}`}>
          <span style={{ fontSize: "8pt" }}>{`${depth}-${i}; `}</span>
          {i < 3 && depth > 0 && (
            <Large breadth={breadth} depth={depth - 1} imagesData={props.imagesData} />
          )}
        </div>
      ))}
      {range(8, i => (
        <span key={i} style={{ fontSize: "8pt" }}>{`${i}.`}</span>
      ))}
    </div>
  );
}

Large.propTypes = {
  breadth: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  imagesData: PropTypes.array.isRequired
};

export { Large };
