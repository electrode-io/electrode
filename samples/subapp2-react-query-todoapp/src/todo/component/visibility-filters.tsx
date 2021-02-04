import { React } from "@xarc/react";
import classNames from "classnames";
import { VISIBILITY_FILTERS } from "../constant";
const custom = require("../styles/bootstrap.css");

const VisibilityFilters = ({ setFilter }) => {
  return (
    <div className={custom["row"]}>
      <div
        style={{ width: "600px" }}
        className={classNames(custom["center-block"], custom["btn-group"])}
      >
        {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
          const currentFilter = VISIBILITY_FILTERS[filterKey];
          return (
            <button
              style={{ width: "200px" }}
              className={classNames(custom["btn"], custom["btn-default"])}
              key={`visibility-filter-${currentFilter}`}
              onClick={() => {
                setFilter(currentFilter);
              }}
            >
              {currentFilter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VisibilityFilters;
