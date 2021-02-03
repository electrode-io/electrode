import { React } from "@xarc/react";
import { connect } from "@xarc/react-redux";
import classNames from "classnames";
import { setFilter } from "../redux/action";
import { VISIBILITY_FILTERS } from "../constant";
const custom = require("../styles/bootstrap.css");

const VisibilityFilters = ({ dispatch, activeFilter }) => {
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
                dispatch(setFilter(currentFilter));
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

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
// export default VisibilityFilters;
export default connect(mapStateToProps, dispatch => ({ dispatch }))(VisibilityFilters);
