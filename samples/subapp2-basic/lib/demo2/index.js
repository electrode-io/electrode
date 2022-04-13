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

const Demo2 = props => {
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
      marginRight: "15%"
    }
  }, /*#__PURE__*/_react.React.createElement("h2", null, "subapp demo2 with Redux"), "Redux State Demo: ", /*#__PURE__*/_react.React.createElement("button", {
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
  }))(Demo2),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpbmNOdW1iZXIiLCJ0eXBlIiwiZGVjTnVtYmVyIiwiRGVtbzIiLCJwcm9wcyIsInZhbHVlIiwiZGlzcGF0Y2giLCJwYWRkaW5nIiwibWFyZ2luVG9wIiwiYm9yZGVyIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJudW1iZXIiLCJzdWJhcHAiLCJDb21wb25lbnQiLCJjb25uZWN0Iiwid2FudEZlYXR1cmVzIiwicmVkdXhGZWF0dXJlIiwiUmVhY3QiLCJzaGFyZVN0b3JlIiwicmVkdWNlcnMiLCJwcmVwYXJlIiwiaW5pdGlhbFN0YXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlbW8yL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQSBtb3JlIGNvbXBsaWNhdGUgZGVtbyBzdWJhcHAgdXNpbmcgUmVkdXhcbi8vXG4vLyBOb3RlOiB1c2luZyByZWR1eCByZXF1aXJlcyB0b3AgbGV2ZWwgUmVkdXggc3RvcmUgaW5pdGlhbGl6YXRpb24gc28gaWYgYW5vdGhlclxuLy8gc3ViYXBwIHRyaWVzIHRvIHVzZSB0aGlzIGFzIGEgZHluYW1pYyBjb21wb25lbnQsIHRoZW4gaXQgbXVzdCBhbHNvIHVzZXMgcmVkdXggYW5kXG4vLyBwcm92aWRlcyB0aGUgcmVkdXggdG9wIGxldmVsIHN0b3JlIGZhY2lsaXR5LlxuLy9cblxuaW1wb3J0IHsgUmVhY3QsIFJlYWN0U3ViQXBwIH0gZnJvbSBcIkB4YXJjL3JlYWN0XCI7XG5pbXBvcnQgeyByZWR1eEZlYXR1cmUsIGNvbm5lY3QgfSBmcm9tIFwiQHhhcmMvcmVhY3QtcmVkdXhcIjtcbmV4cG9ydCB7IHJlZHV4UmVkdWNlcnMgfSBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xuXG5jb25zdCBpbmNOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJJTkNfTlVNQkVSXCIsXG4gIH07XG59O1xuXG5jb25zdCBkZWNOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJERUNfTlVNQkVSXCIsXG4gIH07XG59O1xuXG5jb25zdCBEZW1vMiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHZhbHVlLCBkaXNwYXRjaCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6IFwiNXB4XCIsXG4gICAgICAgICAgbWFyZ2luVG9wOiBcIjE1cHhcIixcbiAgICAgICAgICBib3JkZXI6IFwic29saWRcIixcbiAgICAgICAgICBtYXJnaW5MZWZ0OiBcIjE1JVwiLFxuICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjE1JVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8aDI+c3ViYXBwIGRlbW8yIHdpdGggUmVkdXg8L2gyPlxuICAgICAgICBSZWR1eCBTdGF0ZSBEZW1vOiA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKGRlY051bWJlcigpKX0+JiM4ODEwOzwvYnV0dG9uPlxuICAgICAgICAmbmJzcDt7dmFsdWV9Jm5ic3A7XG4gICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZGlzcGF0Y2goaW5jTnVtYmVyKCkpfT4mIzg4MTE7PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4geyB2YWx1ZTogc3RhdGUubnVtYmVyLnZhbHVlIH07XG59O1xuXG5leHBvcnQgY29uc3Qgc3ViYXBwOiBSZWFjdFN1YkFwcCA9IHtcbiAgQ29tcG9uZW50OiBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgKGRpc3BhdGNoKSA9PiAoeyBkaXNwYXRjaCB9KSkoRGVtbzIpLFxuICB3YW50RmVhdHVyZXM6IFtcbiAgICByZWR1eEZlYXR1cmUoe1xuICAgICAgUmVhY3QsXG4gICAgICBzaGFyZVN0b3JlOiB0cnVlLFxuICAgICAgcmVkdWNlcnM6IHRydWUsIC8vIHRydWUgPT4gcmVhZCB0aGUgcmVkdXhSZWR1Y2VycyBleHBvcnQgZnJvbSB0aGlzIGZpbGVcbiAgICAgIHByZXBhcmU6IGFzeW5jIChpbml0aWFsU3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgaW5pdGlhbFN0YXRlOiBpbml0aWFsU3RhdGUgfHwgeyBudW1iZXI6IHsgdmFsdWU6IDk5OSB9IH0gfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQVFBOztBQUNBOztBQUNBOzs7O0FBVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxNQUFNQSxTQUFTLEdBQUcsTUFBTTtFQUN0QixPQUFPO0lBQ0xDLElBQUksRUFBRTtFQURELENBQVA7QUFHRCxDQUpEOztBQU1BLE1BQU1DLFNBQVMsR0FBRyxNQUFNO0VBQ3RCLE9BQU87SUFDTEQsSUFBSSxFQUFFO0VBREQsQ0FBUDtBQUdELENBSkQ7O0FBTUEsTUFBTUUsS0FBSyxHQUFJQyxLQUFELElBQVc7RUFDdkIsTUFBTTtJQUFFQyxLQUFGO0lBQVNDO0VBQVQsSUFBc0JGLEtBQTVCO0VBRUEsb0JBQ0UscURBQ0U7SUFDRSxLQUFLLEVBQUU7TUFDTEcsT0FBTyxFQUFFLEtBREo7TUFFTEMsU0FBUyxFQUFFLE1BRk47TUFHTEMsTUFBTSxFQUFFLE9BSEg7TUFJTEMsVUFBVSxFQUFFLEtBSlA7TUFLTEMsV0FBVyxFQUFFO0lBTFI7RUFEVCxnQkFTRSxpRUFURixxQ0FVb0I7SUFBUSxPQUFPLEVBQUUsTUFBTUwsUUFBUSxDQUFDSixTQUFTLEVBQVY7RUFBL0IsWUFWcEIsVUFXU0csS0FYVCx1QkFZRTtJQUFRLE9BQU8sRUFBRSxNQUFNQyxRQUFRLENBQUNOLFNBQVMsRUFBVjtFQUEvQixZQVpGLENBREYsQ0FERjtBQWtCRCxDQXJCRDs7QUF1QkEsTUFBTVksZUFBZSxHQUFJQyxLQUFELElBQVc7RUFDakMsT0FBTztJQUFFUixLQUFLLEVBQUVRLEtBQUssQ0FBQ0MsTUFBTixDQUFhVDtFQUF0QixDQUFQO0FBQ0QsQ0FGRDs7QUFJTyxNQUFNVSxNQUFtQixHQUFHO0VBQ2pDQyxTQUFTLEVBQUUsSUFBQUMsbUJBQUEsRUFBUUwsZUFBUixFQUEwQk4sUUFBRCxLQUFlO0lBQUVBO0VBQUYsQ0FBZixDQUF6QixFQUF1REgsS0FBdkQsQ0FEc0I7RUFFakNlLFlBQVksRUFBRSxDQUNaLElBQUFDLHdCQUFBLEVBQWE7SUFDWEMsS0FBSyxFQUFMQSxZQURXO0lBRVhDLFVBQVUsRUFBRSxJQUZEO0lBR1hDLFFBQVEsRUFBRSxJQUhDO0lBR0s7SUFDaEJDLE9BQU8sRUFBRSxNQUFPQyxZQUFQLElBQXdCO01BQy9CLE9BQU87UUFBRUEsWUFBWSxFQUFFQSxZQUFZLElBQUk7VUFBRVYsTUFBTSxFQUFFO1lBQUVULEtBQUssRUFBRTtVQUFUO1FBQVY7TUFBaEMsQ0FBUDtJQUNEO0VBTlUsQ0FBYixDQURZO0FBRm1CLENBQTVCIn0=