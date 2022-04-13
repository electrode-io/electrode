"use strict";

exports.__esModule = true;
exports.subapp = exports.reduxReducers = void 0;

var _react = require("@xarc/react");

var _reactRedux = require("@xarc/react-redux");

var _reducers = require("./reducers");

exports.reduxReducers = _reducers.reduxReducers;

//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//
const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Home = props => {
  const {
    value,
    dispatch
  } = props;
  return /*#__PURE__*/_react.React.createElement("div", null, /*#__PURE__*/_react.React.createElement("div", {
    style: {
      padding: "5px",
      marginTop: "15px",
      border: "solid",
      marginLeft: "15%",
      marginRight: "15%",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.React.createElement("h2", null, "Body subApp with Redux State Demo"), /*#__PURE__*/_react.React.createElement("button", {
    onClick: () => dispatch(decNumber())
  }, "\u226A"), "\xA0", value, "\xA0", /*#__PURE__*/_react.React.createElement("button", {
    onClick: () => dispatch(incNumber())
  }, "\u226B")));
};

const mapStateToProps = state => {
  return {
    value: state.number.value
  };
};

const subapp = {
  Component: (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
    dispatch
  }))(Home),
  wantFeatures: [(0, _reactRedux.reduxFeature)({
    React: _react.React,
    shareStore: true,
    reducers: true,
    // true => read the reduxReducers export from this file
    prepare: async initialState => {
      return {
        initialState: initialState || {
          number: {
            value: 999
          }
        }
      };
    }
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpbmNOdW1iZXIiLCJ0eXBlIiwiZGVjTnVtYmVyIiwiSG9tZSIsInByb3BzIiwidmFsdWUiLCJkaXNwYXRjaCIsInBhZGRpbmciLCJtYXJnaW5Ub3AiLCJib3JkZXIiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJ0ZXh0QWxpZ24iLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm51bWJlciIsInN1YmFwcCIsIkNvbXBvbmVudCIsImNvbm5lY3QiLCJ3YW50RmVhdHVyZXMiLCJyZWR1eEZlYXR1cmUiLCJSZWFjdCIsInNoYXJlU3RvcmUiLCJyZWR1Y2VycyIsInByZXBhcmUiLCJpbml0aWFsU3RhdGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3ViYXBwcy9ob21lL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQSBtb3JlIGNvbXBsaWNhdGUgZGVtbyBzdWJhcHAgdXNpbmcgUmVkdXhcbi8vXG4vLyBOb3RlOiB1c2luZyByZWR1eCByZXF1aXJlcyB0b3AgbGV2ZWwgUmVkdXggc3RvcmUgaW5pdGlhbGl6YXRpb24gc28gaWYgYW5vdGhlclxuLy8gc3ViYXBwIHRyaWVzIHRvIHVzZSB0aGlzIGFzIGEgZHluYW1pYyBjb21wb25lbnQsIHRoZW4gaXQgbXVzdCBhbHNvIHVzZXMgcmVkdXggYW5kXG4vLyBwcm92aWRlcyB0aGUgcmVkdXggdG9wIGxldmVsIHN0b3JlIGZhY2lsaXR5LlxuLy9cblxuaW1wb3J0IHsgUmVhY3QsIFJlYWN0U3ViQXBwIH0gZnJvbSBcIkB4YXJjL3JlYWN0XCI7XG5pbXBvcnQgeyByZWR1eEZlYXR1cmUsIGNvbm5lY3QgfSBmcm9tIFwiQHhhcmMvcmVhY3QtcmVkdXhcIjtcbmV4cG9ydCB7IHJlZHV4UmVkdWNlcnMgfSBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xuXG5jb25zdCBpbmNOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJJTkNfTlVNQkVSXCIsXG4gIH07XG59O1xuXG5jb25zdCBkZWNOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJERUNfTlVNQkVSXCIsXG4gIH07XG59O1xuXG5jb25zdCBIb21lID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgdmFsdWUsIGRpc3BhdGNoIH0gPSBwcm9wcztcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcGFkZGluZzogXCI1cHhcIixcbiAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgIGJvcmRlcjogXCJzb2xpZFwiLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IFwiMTUlXCIsXG4gICAgICAgICAgbWFyZ2luUmlnaHQ6IFwiMTUlXCIsXG4gICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8aDI+Qm9keSBzdWJBcHAgd2l0aCBSZWR1eCBTdGF0ZSBEZW1vPC9oMj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChkZWNOdW1iZXIoKSl9PiYjODgxMDs8L2J1dHRvbj5cbiAgICAgICAgJm5ic3A7e3ZhbHVlfSZuYnNwO1xuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKGluY051bWJlcigpKX0+JiM4ODExOzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHsgdmFsdWU6IHN0YXRlLm51bWJlci52YWx1ZSB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHN1YmFwcDogUmVhY3RTdWJBcHAgPSB7XG4gIENvbXBvbmVudDogY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIChkaXNwYXRjaCkgPT4gKHsgZGlzcGF0Y2ggfSkpKEhvbWUpLFxuICB3YW50RmVhdHVyZXM6IFtcbiAgICByZWR1eEZlYXR1cmUoe1xuICAgICAgUmVhY3QsXG4gICAgICBzaGFyZVN0b3JlOiB0cnVlLFxuICAgICAgcmVkdWNlcnM6IHRydWUsIC8vIHRydWUgPT4gcmVhZCB0aGUgcmVkdXhSZWR1Y2VycyBleHBvcnQgZnJvbSB0aGlzIGZpbGVcbiAgICAgIHByZXBhcmU6IGFzeW5jIChpbml0aWFsU3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgaW5pdGlhbFN0YXRlOiBpbml0aWFsU3RhdGUgfHwgeyBudW1iZXI6IHsgdmFsdWU6IDk5OSB9IH0gfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQVFBOztBQUNBOztBQUNBOzs7O0FBVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxNQUFNQSxTQUFTLEdBQUcsTUFBTTtFQUN0QixPQUFPO0lBQ0xDLElBQUksRUFBRTtFQURELENBQVA7QUFHRCxDQUpEOztBQU1BLE1BQU1DLFNBQVMsR0FBRyxNQUFNO0VBQ3RCLE9BQU87SUFDTEQsSUFBSSxFQUFFO0VBREQsQ0FBUDtBQUdELENBSkQ7O0FBTUEsTUFBTUUsSUFBSSxHQUFJQyxLQUFELElBQVc7RUFDdEIsTUFBTTtJQUFFQyxLQUFGO0lBQVNDO0VBQVQsSUFBc0JGLEtBQTVCO0VBRUEsb0JBQ0UscURBQ0U7SUFDRSxLQUFLLEVBQUU7TUFDTEcsT0FBTyxFQUFFLEtBREo7TUFFTEMsU0FBUyxFQUFFLE1BRk47TUFHTEMsTUFBTSxFQUFFLE9BSEg7TUFJTEMsVUFBVSxFQUFFLEtBSlA7TUFLTEMsV0FBVyxFQUFFLEtBTFI7TUFNTEMsU0FBUyxFQUFFO0lBTk47RUFEVCxnQkFVRSwyRUFWRixlQVdFO0lBQVEsT0FBTyxFQUFFLE1BQU1OLFFBQVEsQ0FBQ0osU0FBUyxFQUFWO0VBQS9CLFlBWEYsVUFZU0csS0FaVCx1QkFhRTtJQUFRLE9BQU8sRUFBRSxNQUFNQyxRQUFRLENBQUNOLFNBQVMsRUFBVjtFQUEvQixZQWJGLENBREYsQ0FERjtBQW1CRCxDQXRCRDs7QUF3QkEsTUFBTWEsZUFBZSxHQUFJQyxLQUFELElBQVc7RUFDakMsT0FBTztJQUFFVCxLQUFLLEVBQUVTLEtBQUssQ0FBQ0MsTUFBTixDQUFhVjtFQUF0QixDQUFQO0FBQ0QsQ0FGRDs7QUFJTyxNQUFNVyxNQUFtQixHQUFHO0VBQ2pDQyxTQUFTLEVBQUUsSUFBQUMsbUJBQUEsRUFBUUwsZUFBUixFQUEwQlAsUUFBRCxLQUFlO0lBQUVBO0VBQUYsQ0FBZixDQUF6QixFQUF1REgsSUFBdkQsQ0FEc0I7RUFFakNnQixZQUFZLEVBQUUsQ0FDWixJQUFBQyx3QkFBQSxFQUFhO0lBQ1hDLEtBQUssRUFBTEEsWUFEVztJQUVYQyxVQUFVLEVBQUUsSUFGRDtJQUdYQyxRQUFRLEVBQUUsSUFIQztJQUdLO0lBQ2hCQyxPQUFPLEVBQUUsTUFBT0MsWUFBUCxJQUF3QjtNQUMvQixPQUFPO1FBQUVBLFlBQVksRUFBRUEsWUFBWSxJQUFJO1VBQUVWLE1BQU0sRUFBRTtZQUFFVixLQUFLLEVBQUU7VUFBVDtRQUFWO01BQWhDLENBQVA7SUFDRDtFQU5VLENBQWIsQ0FEWTtBQUZtQixDQUE1QiJ9