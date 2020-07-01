"use strict";

exports.__esModule = true;
exports.default = void 0;

var _subappReact = require("subapp-react");

var _reactRedux = require("react-redux");

var _subappRedux = require("subapp-redux");

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("div", {
    style: {
      padding: "5px",
      marginTop: "15px",
      border: "solid",
      marginLeft: "15%",
      marginRight: "15%"
    }
  }, /*#__PURE__*/_subappReact.React.createElement("p", null, "subapp demo2"), "Redux State Demo: ", /*#__PURE__*/_subappReact.React.createElement("button", {
    onClick: () => dispatch(decNumber())
  }, "\u226A"), "\xA0", value, "\xA0", /*#__PURE__*/_subappReact.React.createElement("button", {
    onClick: () => dispatch(incNumber())
  }, "\u226B")), /*#__PURE__*/_subappReact.React.createElement("p", {
    style: {
      textAlign: "center"
    }
  }, "\xA9 ", new Date().getFullYear(), " Your (Company) name here"));
};

const mapStateToProps = state => state;

var _default = (0, _subappRedux.reduxLoadSubApp)({
  Component: (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
    dispatch
  }))(Demo2),
  name: "Demo2",
  reduxReducers: _reducers.default,
  prepare: ({
    context,
    request
  }) => {
    return Promise.resolve({
      value: 999
    });
  }
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZW1vMi9zdWJhcHAtZGVtbzIuanMiXSwibmFtZXMiOlsiaW5jTnVtYmVyIiwidHlwZSIsImRlY051bWJlciIsIkRlbW8yIiwicHJvcHMiLCJ2YWx1ZSIsImRpc3BhdGNoIiwicGFkZGluZyIsIm1hcmdpblRvcCIsImJvcmRlciIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsInRleHRBbGlnbiIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiQ29tcG9uZW50IiwibmFtZSIsInJlZHV4UmVkdWNlcnMiLCJwcmVwYXJlIiwiY29udGV4dCIsInJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLFNBQVMsR0FBRyxNQUFNO0FBQ3RCLFNBQU87QUFDTEMsSUFBQUEsSUFBSSxFQUFFO0FBREQsR0FBUDtBQUdELENBSkQ7O0FBTUEsTUFBTUMsU0FBUyxHQUFHLE1BQU07QUFDdEIsU0FBTztBQUNMRCxJQUFBQSxJQUFJLEVBQUU7QUFERCxHQUFQO0FBR0QsQ0FKRDs7QUFNQSxNQUFNRSxLQUFLLEdBQUdDLEtBQUssSUFBSTtBQUNyQixRQUFNO0FBQUVDLElBQUFBLEtBQUY7QUFBU0MsSUFBQUE7QUFBVCxNQUFzQkYsS0FBNUI7QUFFQSxzQkFDRSwyREFDRTtBQUNFLElBQUEsS0FBSyxFQUFFO0FBQ0xHLE1BQUFBLE9BQU8sRUFBRSxLQURKO0FBRUxDLE1BQUFBLFNBQVMsRUFBRSxNQUZOO0FBR0xDLE1BQUFBLE1BQU0sRUFBRSxPQUhIO0FBSUxDLE1BQUFBLFVBQVUsRUFBRSxLQUpQO0FBS0xDLE1BQUFBLFdBQVcsRUFBRTtBQUxSO0FBRFQsa0JBU0UsMkRBVEYscUNBVW9CO0FBQVEsSUFBQSxPQUFPLEVBQUUsTUFBTUwsUUFBUSxDQUFDSixTQUFTLEVBQVY7QUFBL0IsY0FWcEIsVUFXU0csS0FYVCx1QkFZRTtBQUFRLElBQUEsT0FBTyxFQUFFLE1BQU1DLFFBQVEsQ0FBQ04sU0FBUyxFQUFWO0FBQS9CLGNBWkYsQ0FERixlQWVFO0FBQUcsSUFBQSxLQUFLLEVBQUU7QUFBRVksTUFBQUEsU0FBUyxFQUFFO0FBQWI7QUFBVixjQUFzQyxJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFBdEMsOEJBZkYsQ0FERjtBQW1CRCxDQXRCRDs7QUF3QkEsTUFBTUMsZUFBZSxHQUFHQyxLQUFLLElBQUlBLEtBQWpDOztlQUVlLGtDQUFnQjtBQUM3QkMsRUFBQUEsU0FBUyxFQUFFLHlCQUFRRixlQUFSLEVBQXlCVCxRQUFRLEtBQUs7QUFBRUEsSUFBQUE7QUFBRixHQUFMLENBQWpDLEVBQXFESCxLQUFyRCxDQURrQjtBQUU3QmUsRUFBQUEsSUFBSSxFQUFFLE9BRnVCO0FBRzdCQyxFQUFBQSxhQUFhLEVBQWJBLGlCQUg2QjtBQUk3QkMsRUFBQUEsT0FBTyxFQUFFLENBQUM7QUFBRUMsSUFBQUEsT0FBRjtBQUFXQyxJQUFBQTtBQUFYLEdBQUQsS0FBMEI7QUFDakMsV0FBT0MsT0FBTyxDQUFDQyxPQUFSLENBQWdCO0FBQUVuQixNQUFBQSxLQUFLLEVBQUU7QUFBVCxLQUFoQixDQUFQO0FBQ0Q7QUFONEIsQ0FBaEIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0IH0gZnJvbSBcInN1YmFwcC1yZWFjdFwiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHsgcmVkdXhMb2FkU3ViQXBwIH0gZnJvbSBcInN1YmFwcC1yZWR1eFwiO1xuaW1wb3J0IHJlZHV4UmVkdWNlcnMgZnJvbSBcIi4vcmVkdWNlcnNcIjtcblxuY29uc3QgaW5jTnVtYmVyID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiSU5DX05VTUJFUlwiXG4gIH07XG59O1xuXG5jb25zdCBkZWNOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJERUNfTlVNQkVSXCJcbiAgfTtcbn07XG5cbmNvbnN0IERlbW8yID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IHZhbHVlLCBkaXNwYXRjaCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6IFwiNXB4XCIsXG4gICAgICAgICAgbWFyZ2luVG9wOiBcIjE1cHhcIixcbiAgICAgICAgICBib3JkZXI6IFwic29saWRcIixcbiAgICAgICAgICBtYXJnaW5MZWZ0OiBcIjE1JVwiLFxuICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjE1JVwiXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxwPnN1YmFwcCBkZW1vMjwvcD5cbiAgICAgICAgUmVkdXggU3RhdGUgRGVtbzogPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChkZWNOdW1iZXIoKSl9PiYjODgxMDs8L2J1dHRvbj5cbiAgICAgICAgJm5ic3A7e3ZhbHVlfSZuYnNwO1xuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKGluY051bWJlcigpKX0+JiM4ODExOzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8cCBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+wqkge25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gWW91ciAoQ29tcGFueSkgTmFtZSBIZXJlPC9wPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gc3RhdGU7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHV4TG9hZFN1YkFwcCh7XG4gIENvbXBvbmVudDogY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIGRpc3BhdGNoID0+ICh7IGRpc3BhdGNoIH0pKShEZW1vMiksXG4gIG5hbWU6IFwiRGVtbzJcIixcbiAgcmVkdXhSZWR1Y2VycyxcbiAgcHJlcGFyZTogKHsgY29udGV4dCwgcmVxdWVzdCB9KSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHZhbHVlOiA5OTkgfSk7XG4gIH1cbn0pO1xuIl19