"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.subapp = exports.reduxReducers = exports.Product = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = require("@xarc/react");

var _reactRedux = require("@xarc/react-redux");

var _data = require("./data");

var _reducers = require("./reducers");

exports.reduxReducers = _reducers.reduxReducers;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Product = (0, _react.createDynamicComponent)({
  name: "product",
  getModule: () => Promise.resolve().then(() => _interopRequireWildcard(require("./product")))
}, {
  ssr: true
});
exports.Product = Product;

const Products = ({
  products,
  dispatch
}) => {
  const fetchProducts = () => {
    return {
      type: "PRODUCTS_FETCHED",
      payload: _data.products
    };
  };

  _react.React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (products) {
    return /*#__PURE__*/_react.React.createElement("div", {
      style: {
        padding: "5px",
        marginTop: "15px",
        border: "solid",
        marginLeft: "15%",
        marginRight: "15%",
        textAlign: "center"
      }
    }, /*#__PURE__*/_react.React.createElement("h2", null, "Products"), products.map((product, i) => /*#__PURE__*/_react.React.createElement(Product, (0, _extends2.default)({
      key: `prd_key_${i}`
    }, product))));
  }
};

const mapStateToProps = state => {
  return { ...state.products
  };
};

const subapp = {
  Component: (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
    dispatch
  }))(Products),
  wantFeatures: [(0, _reactRedux.reduxFeature)({
    React: _react.React,
    shareStore: true,
    reducers: true,
    // true => read the reduxReducers export from this file
    prepare: async initialState => {
      return {
        initialState: initialState || {
          products: []
        }
      };
    }
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9kdWN0IiwiY3JlYXRlRHluYW1pY0NvbXBvbmVudCIsIm5hbWUiLCJnZXRNb2R1bGUiLCJzc3IiLCJQcm9kdWN0cyIsInByb2R1Y3RzIiwiZGlzcGF0Y2giLCJmZXRjaFByb2R1Y3RzIiwidHlwZSIsInBheWxvYWQiLCJkYXRhIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJwYWRkaW5nIiwibWFyZ2luVG9wIiwiYm9yZGVyIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwidGV4dEFsaWduIiwibWFwIiwicHJvZHVjdCIsImkiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsInN1YmFwcCIsIkNvbXBvbmVudCIsImNvbm5lY3QiLCJ3YW50RmVhdHVyZXMiLCJyZWR1eEZlYXR1cmUiLCJzaGFyZVN0b3JlIiwicmVkdWNlcnMiLCJwcmVwYXJlIiwiaW5pdGlhbFN0YXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N1YmFwcHMvcHJvZHVjdHMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBBIG1vcmUgY29tcGxpY2F0ZSBkZW1vIHN1YmFwcCB1c2luZyBSZWR1eFxuLy9cbi8vIE5vdGU6IHVzaW5nIHJlZHV4IHJlcXVpcmVzIHRvcCBsZXZlbCBSZWR1eCBzdG9yZSBpbml0aWFsaXphdGlvbiBzbyBpZiBhbm90aGVyXG4vLyBzdWJhcHAgdHJpZXMgdG8gdXNlIHRoaXMgYXMgYSBkeW5hbWljIGNvbXBvbmVudCwgdGhlbiBpdCBtdXN0IGFsc28gdXNlcyByZWR1eCBhbmRcbi8vIHByb3ZpZGVzIHRoZSByZWR1eCB0b3AgbGV2ZWwgc3RvcmUgZmFjaWxpdHkuXG4vL1xuXG5pbXBvcnQgeyBjcmVhdGVEeW5hbWljQ29tcG9uZW50LCBSZWFjdCwgUmVhY3RTdWJBcHAgfSBmcm9tIFwiQHhhcmMvcmVhY3RcIjtcbmltcG9ydCB7IHJlZHV4RmVhdHVyZSwgY29ubmVjdCB9IGZyb20gXCJAeGFyYy9yZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHsgcHJvZHVjdHMgYXMgZGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IFByb2R1Y3RzUHJvcHMgfSBmcm9tIFwiLi90eXBlXCI7XG5leHBvcnQgeyByZWR1eFJlZHVjZXJzIH0gZnJvbSBcIi4vcmVkdWNlcnNcIjtcblxuZXhwb3J0IGNvbnN0IFByb2R1Y3QgPSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KFxuICB7XG4gICAgbmFtZTogXCJwcm9kdWN0XCIsXG4gICAgZ2V0TW9kdWxlOiAoKSA9PiBpbXBvcnQoXCIuL3Byb2R1Y3RcIiksXG4gIH0sXG4gIHsgc3NyOiB0cnVlIH1cbik7XG5cbmNvbnN0IFByb2R1Y3RzOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9kdWN0c1Byb3BzPiA9ICh7IHByb2R1Y3RzLCBkaXNwYXRjaCB9KSA9PiB7XG4gIGNvbnN0IGZldGNoUHJvZHVjdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiUFJPRFVDVFNfRkVUQ0hFRFwiLFxuICAgICAgcGF5bG9hZDogZGF0YSxcbiAgICB9O1xuICB9O1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZGlzcGF0Y2goZmV0Y2hQcm9kdWN0cygpKTtcbiAgfSwgW10pO1xuXG4gIGlmIChwcm9kdWN0cykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcGFkZGluZzogXCI1cHhcIixcbiAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgIGJvcmRlcjogXCJzb2xpZFwiLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IFwiMTUlXCIsXG4gICAgICAgICAgbWFyZ2luUmlnaHQ6IFwiMTUlXCIsXG4gICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8aDI+UHJvZHVjdHM8L2gyPlxuICAgICAgICB7cHJvZHVjdHMubWFwKChwcm9kdWN0LCBpKSA9PiAoXG4gICAgICAgICAgPFByb2R1Y3Qga2V5PXtgcHJkX2tleV8ke2l9YH0gey4uLnByb2R1Y3R9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7IC4uLnN0YXRlLnByb2R1Y3RzIH07XG59O1xuXG5leHBvcnQgY29uc3Qgc3ViYXBwOiBSZWFjdFN1YkFwcCA9IHtcbiAgQ29tcG9uZW50OiBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgKGRpc3BhdGNoKSA9PiAoeyBkaXNwYXRjaCB9KSkoUHJvZHVjdHMpLFxuICB3YW50RmVhdHVyZXM6IFtcbiAgICByZWR1eEZlYXR1cmUoe1xuICAgICAgUmVhY3QsXG4gICAgICBzaGFyZVN0b3JlOiB0cnVlLFxuICAgICAgcmVkdWNlcnM6IHRydWUsIC8vIHRydWUgPT4gcmVhZCB0aGUgcmVkdXhSZWR1Y2VycyBleHBvcnQgZnJvbSB0aGlzIGZpbGVcbiAgICAgIHByZXBhcmU6IGFzeW5jIChpbml0aWFsU3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgaW5pdGlhbFN0YXRlOiBpbml0aWFsU3RhdGUgfHwgeyBwcm9kdWN0czogW10gfSB9O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVFBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7OztBQUVPLE1BQU1BLE9BQU8sR0FBRyxJQUFBQyw2QkFBQSxFQUNyQjtFQUNFQyxJQUFJLEVBQUUsU0FEUjtFQUVFQyxTQUFTLEVBQUUsbUVBQWEsV0FBYjtBQUZiLENBRHFCLEVBS3JCO0VBQUVDLEdBQUcsRUFBRTtBQUFQLENBTHFCLENBQWhCOzs7QUFRUCxNQUFNQyxRQUFnRCxHQUFHLENBQUM7RUFBRUMsUUFBRjtFQUFZQztBQUFaLENBQUQsS0FBNEI7RUFDbkYsTUFBTUMsYUFBYSxHQUFHLE1BQU07SUFDMUIsT0FBTztNQUNMQyxJQUFJLEVBQUUsa0JBREQ7TUFFTEMsT0FBTyxFQUFFQztJQUZKLENBQVA7RUFJRCxDQUxEOztFQU9BQyxZQUFBLENBQU1DLFNBQU4sQ0FBZ0IsTUFBTTtJQUNwQk4sUUFBUSxDQUFDQyxhQUFhLEVBQWQsQ0FBUjtFQUNELENBRkQsRUFFRyxFQUZIOztFQUlBLElBQUlGLFFBQUosRUFBYztJQUNaLG9CQUNFO01BQ0UsS0FBSyxFQUFFO1FBQ0xRLE9BQU8sRUFBRSxLQURKO1FBRUxDLFNBQVMsRUFBRSxNQUZOO1FBR0xDLE1BQU0sRUFBRSxPQUhIO1FBSUxDLFVBQVUsRUFBRSxLQUpQO1FBS0xDLFdBQVcsRUFBRSxLQUxSO1FBTUxDLFNBQVMsRUFBRTtNQU5OO0lBRFQsZ0JBVUUsa0RBVkYsRUFXR2IsUUFBUSxDQUFDYyxHQUFULENBQWEsQ0FBQ0MsT0FBRCxFQUFVQyxDQUFWLGtCQUNaLDJCQUFDLE9BQUQ7TUFBUyxHQUFHLEVBQUcsV0FBVUEsQ0FBRTtJQUEzQixHQUFrQ0QsT0FBbEMsRUFERCxDQVhILENBREY7RUFpQkQ7QUFDRixDQS9CRDs7QUFpQ0EsTUFBTUUsZUFBZSxHQUFJQyxLQUFELElBQVc7RUFDakMsT0FBTyxFQUFFLEdBQUdBLEtBQUssQ0FBQ2xCO0VBQVgsQ0FBUDtBQUNELENBRkQ7O0FBSU8sTUFBTW1CLE1BQW1CLEdBQUc7RUFDakNDLFNBQVMsRUFBRSxJQUFBQyxtQkFBQSxFQUFRSixlQUFSLEVBQTBCaEIsUUFBRCxLQUFlO0lBQUVBO0VBQUYsQ0FBZixDQUF6QixFQUF1REYsUUFBdkQsQ0FEc0I7RUFFakN1QixZQUFZLEVBQUUsQ0FDWixJQUFBQyx3QkFBQSxFQUFhO0lBQ1hqQixLQUFLLEVBQUxBLFlBRFc7SUFFWGtCLFVBQVUsRUFBRSxJQUZEO0lBR1hDLFFBQVEsRUFBRSxJQUhDO0lBR0s7SUFDaEJDLE9BQU8sRUFBRSxNQUFPQyxZQUFQLElBQXdCO01BQy9CLE9BQU87UUFBRUEsWUFBWSxFQUFFQSxZQUFZLElBQUk7VUFBRTNCLFFBQVEsRUFBRTtRQUFaO01BQWhDLENBQVA7SUFDRDtFQU5VLENBQWIsQ0FEWTtBQUZtQixDQUE1QiJ9