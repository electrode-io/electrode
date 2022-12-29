"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Products = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reducers = require("../02.main-body/reducers");
const DealItem = props => {
  const {
    item
  } = props;
  const panelClass = `panel panel-${item.type || "primary"}`;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: panelClass
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-heading"
  }, item.heading), /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-body"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: item.imageUrl,
    className: "img-responsive",
    style: {
      width: "100%"
    },
    alt: "Image"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-footer"
  }, item.footer)));
};
const DealRow = props => {
  const {
    items,
    index
  } = props;
  const elements = [];
  for (let i = 0; i < 3 && index + i < items.length; i++) {
    elements.push( /*#__PURE__*/_react.default.createElement(DealItem, {
      key: i,
      item: items[index + i]
    }));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, elements);
};
const Products = props => {
  const {
    items,
    dispatch
  } = props;
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push( /*#__PURE__*/_react.default.createElement(DealRow, {
      key: i,
      items: items,
      index: i
    }));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Products"), /*#__PURE__*/_react.default.createElement("div", null, "Redux State Demo: ", /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => dispatch((0, _reducers.decNumber)())
  }, "\u226A"), "\xA0", props.number, "\xA0", /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => dispatch((0, _reducers.incNumber)())
  }, "\u226B")), rows);
};
Products.propTypes = {
  items: _propTypes.default.array,
  value: _propTypes.default.number
};
const mapStateToProps = state => {
  return {
    items: state.items,
    number: state.number
  };
};
const ReduxProducts = (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
  dispatch
}))(Products);
exports.Products = ReduxProducts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZWFsSXRlbSIsInByb3BzIiwiaXRlbSIsInBhbmVsQ2xhc3MiLCJ0eXBlIiwiaGVhZGluZyIsImltYWdlVXJsIiwid2lkdGgiLCJmb290ZXIiLCJEZWFsUm93IiwiaXRlbXMiLCJpbmRleCIsImVsZW1lbnRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJQcm9kdWN0cyIsImRpc3BhdGNoIiwicm93cyIsImRlY051bWJlciIsIm51bWJlciIsImluY051bWJlciIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5IiwidmFsdWUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIlJlZHV4UHJvZHVjdHMiLCJjb25uZWN0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJvZHVjdHMuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5cbmltcG9ydCB7ZGVjTnVtYmVyLCBpbmNOdW1iZXJ9IGZyb20gXCIuLi8wMi5tYWluLWJvZHkvcmVkdWNlcnNcIjtcblxuY29uc3QgRGVhbEl0ZW0gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgaXRlbSB9ID0gcHJvcHM7XG4gIGNvbnN0IHBhbmVsQ2xhc3MgPSBgcGFuZWwgcGFuZWwtJHtpdGVtLnR5cGUgfHwgXCJwcmltYXJ5XCJ9YDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cGFuZWxDbGFzc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPntpdGVtLmhlYWRpbmd9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz17aXRlbS5pbWFnZVVybH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImltZy1yZXNwb25zaXZlXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiB9fVxuICAgICAgICAgICAgYWx0PVwiSW1hZ2VcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWZvb3RlclwiPntpdGVtLmZvb3Rlcn08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgRGVhbFJvdyA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBpdGVtcywgaW5kZXggfSA9IHByb3BzO1xuICBjb25zdCBlbGVtZW50cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDMgJiYgaW5kZXggKyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50cy5wdXNoKDxEZWFsSXRlbSBrZXk9e2l9IGl0ZW09e2l0ZW1zW2luZGV4ICsgaV19IC8+KTtcbiAgfVxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJyb3dcIj57ZWxlbWVudHN9PC9kaXY+O1xufTtcblxuY29uc3QgUHJvZHVjdHMgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgaXRlbXMsIGRpc3BhdGNoIH0gPSBwcm9wcztcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgcm93cy5wdXNoKDxEZWFsUm93IGtleT17aX0gaXRlbXM9e2l0ZW1zfSBpbmRleD17aX0gLz4pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgPHA+UHJvZHVjdHM8L3A+XG4gICAgICA8ZGl2PlxuICAgICAgICBSZWR1eCBTdGF0ZSBEZW1vOiA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKGRlY051bWJlcigpKX0+JiM4ODEwOzwvYnV0dG9uPlxuICAgICAgICAmbmJzcDt7cHJvcHMubnVtYmVyfSZuYnNwO1xuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKGluY051bWJlcigpKX0+JiM4ODExOzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICB7cm93c31cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cblByb2R1Y3RzLnByb3BUeXBlcyA9IHtcbiAgaXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgdmFsdWU6IFByb3BUeXBlcy5udW1iZXJcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIHsgaXRlbXM6IHN0YXRlLml0ZW1zLCBudW1iZXI6IHN0YXRlLm51bWJlciB9O1xufTtcblxuY29uc3QgUmVkdXhQcm9kdWN0cyA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgZGlzcGF0Y2ggPT4gKHsgZGlzcGF0Y2ggfSlcbikoUHJvZHVjdHMpO1xuXG5leHBvcnQgeyBSZWR1eFByb2R1Y3RzIGFzIFByb2R1Y3RzIH07XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQSxNQUFNQSxRQUFRLEdBQUdDLEtBQUssSUFBSTtFQUN4QixNQUFNO0lBQUVDO0VBQUssQ0FBQyxHQUFHRCxLQUFLO0VBQ3RCLE1BQU1FLFVBQVUsR0FBSSxlQUFjRCxJQUFJLENBQUNFLElBQUksSUFBSSxTQUFVLEVBQUM7RUFDMUQsb0JBQ0U7SUFBSyxTQUFTLEVBQUM7RUFBVSxnQkFDdkI7SUFBSyxTQUFTLEVBQUVEO0VBQVcsZ0JBQ3pCO0lBQUssU0FBUyxFQUFDO0VBQWUsR0FBRUQsSUFBSSxDQUFDRyxPQUFPLENBQU8sZUFDbkQ7SUFBSyxTQUFTLEVBQUM7RUFBWSxnQkFDekI7SUFDRSxHQUFHLEVBQUVILElBQUksQ0FBQ0ksUUFBUztJQUNuQixTQUFTLEVBQUMsZ0JBQWdCO0lBQzFCLEtBQUssRUFBRTtNQUFFQyxLQUFLLEVBQUU7SUFBTyxDQUFFO0lBQ3pCLEdBQUcsRUFBQztFQUFPLEVBQ1gsQ0FDRSxlQUNOO0lBQUssU0FBUyxFQUFDO0VBQWMsR0FBRUwsSUFBSSxDQUFDTSxNQUFNLENBQU8sQ0FDN0MsQ0FDRjtBQUVWLENBQUM7QUFFRCxNQUFNQyxPQUFPLEdBQUdSLEtBQUssSUFBSTtFQUN2QixNQUFNO0lBQUVTLEtBQUs7SUFBRUM7RUFBTSxDQUFDLEdBQUdWLEtBQUs7RUFDOUIsTUFBTVcsUUFBUSxHQUFHLEVBQUU7RUFDbkIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxJQUFJRixLQUFLLEdBQUdFLENBQUMsR0FBR0gsS0FBSyxDQUFDSSxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO0lBQ3RERCxRQUFRLENBQUNHLElBQUksZUFBQyw2QkFBQyxRQUFRO01BQUMsR0FBRyxFQUFFRixDQUFFO01BQUMsSUFBSSxFQUFFSCxLQUFLLENBQUNDLEtBQUssR0FBR0UsQ0FBQztJQUFFLEVBQUcsQ0FBQztFQUM3RDtFQUNBLG9CQUFPO0lBQUssU0FBUyxFQUFDO0VBQUssR0FBRUQsUUFBUSxDQUFPO0FBQzlDLENBQUM7QUFFRCxNQUFNSSxRQUFRLEdBQUdmLEtBQUssSUFBSTtFQUN4QixNQUFNO0lBQUVTLEtBQUs7SUFBRU87RUFBUyxDQUFDLEdBQUdoQixLQUFLO0VBQ2pDLE1BQU1pQixJQUFJLEdBQUcsRUFBRTtFQUNmLEtBQUssSUFBSUwsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSCxLQUFLLENBQUNJLE1BQU0sRUFBRUQsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUN4Q0ssSUFBSSxDQUFDSCxJQUFJLGVBQUMsNkJBQUMsT0FBTztNQUFDLEdBQUcsRUFBRUYsQ0FBRTtNQUFDLEtBQUssRUFBRUgsS0FBTTtNQUFDLEtBQUssRUFBRUc7SUFBRSxFQUFHLENBQUM7RUFDeEQ7RUFFQSxvQkFDRTtJQUFLLFNBQVMsRUFBQztFQUFXLGdCQUN4QixtREFBZSxlQUNmLDZFQUNvQjtJQUFRLE9BQU8sRUFBRSxNQUFNSSxRQUFRLENBQUMsSUFBQUUsbUJBQVMsR0FBRTtFQUFFLFlBQWlCLFVBQ3pFbEIsS0FBSyxDQUFDbUIsTUFBTSx1QkFDbkI7SUFBUSxPQUFPLEVBQUUsTUFBTUgsUUFBUSxDQUFDLElBQUFJLG1CQUFTLEdBQUU7RUFBRSxZQUFpQixDQUMxRCxFQUNMSCxJQUFJLENBQ0Q7QUFFVixDQUFDO0FBRURGLFFBQVEsQ0FBQ00sU0FBUyxHQUFHO0VBQ25CWixLQUFLLEVBQUVhLGtCQUFTLENBQUNDLEtBQUs7RUFDdEJDLEtBQUssRUFBRUYsa0JBQVMsQ0FBQ0g7QUFDbkIsQ0FBQztBQUVELE1BQU1NLGVBQWUsR0FBR0MsS0FBSyxJQUFJO0VBQy9CLE9BQU87SUFBRWpCLEtBQUssRUFBRWlCLEtBQUssQ0FBQ2pCLEtBQUs7SUFBRVUsTUFBTSxFQUFFTyxLQUFLLENBQUNQO0VBQU8sQ0FBQztBQUNyRCxDQUFDO0FBRUQsTUFBTVEsYUFBYSxHQUFHLElBQUFDLG1CQUFPLEVBQzNCSCxlQUFlLEVBQ2ZULFFBQVEsS0FBSztFQUFFQTtBQUFTLENBQUMsQ0FBQyxDQUMzQixDQUFDRCxRQUFRLENBQUM7QUFBQyJ9