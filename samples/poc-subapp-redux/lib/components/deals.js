"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Deals = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _subappReact = require("subapp-react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
class SubApp extends _subappReact.React.Component {
  constructor() {
    super();
    this.state = {
      ready: false
    };
  }
  render() {
    // is subapp loaded?
    // TODO: handle SSR
    if (typeof window === "undefined") {
      return "";
    }
    const {
      name
    } = this.props;
    const subapp = _subappReact.xarc.getSubApp(name);
    if (_subappReact.xarc.getBundle(name) && subapp) {
      return /*#__PURE__*/_subappReact.React.createElement("div", {
        className: "col-sm-4"
      }, /*#__PURE__*/_subappReact.React.createElement("div", {
        className: "panel panel-primary"
      }, /*#__PURE__*/_subappReact.React.createElement("div", {
        className: "panel-body"
      }, subapp.start(null, {
        props: this.props
      }))));
    } else {
      const onLoad = () => this.setState({
        ready: true
      });
      (0, _subappReact.dynamicLoadSubApp)({
        name: "Deal",
        onLoad
      });

      // if not, return loadingComponent
      return "";
    }
  }
}
const DealSubApp = props => {
  const {
    id
  } = props;
  (0, _subappReact.dynamicLoadSubApp)({
    name: "Deal",
    id
  });
  return /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "panel panel-primary"
  }, /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "panel-body"
  }, /*#__PURE__*/_subappReact.React.createElement("div", {
    id: id
  }))));
};
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
const Deals = props => {
  const {
    value,
    dispatch
  } = props;
  return /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("div", null, "Redux State Demo: ", /*#__PURE__*/_subappReact.React.createElement("button", {
    onClick: () => dispatch(decNumber())
  }, "\u226A"), "\xA0", value, "\xA0", /*#__PURE__*/_subappReact.React.createElement("button", {
    onClick: () => dispatch(incNumber())
  }, "\u226B")), /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement(DealSubApp, (0, _extends2.default)({}, props, {
    id: "deal_1"
  })), /*#__PURE__*/_subappReact.React.createElement(DealSubApp, (0, _extends2.default)({}, props, {
    id: "deal_2"
  })), /*#__PURE__*/_subappReact.React.createElement(DealSubApp, (0, _extends2.default)({}, props, {
    id: "deal_3"
  }))), /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement(SubApp, {
    name: "Deal",
    deal: "hello"
  })));
};
Deals.propTypes = {
  value: _propTypes.default.number
};
const mapStateToProps = state => {
  return {
    value: state.number.value
  };
};
const ReduxDeals = (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
  dispatch
}))(Deals);
exports.Deals = ReduxDeals;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWJBcHAiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwic3RhdGUiLCJyZWFkeSIsInJlbmRlciIsIndpbmRvdyIsIm5hbWUiLCJwcm9wcyIsInN1YmFwcCIsInhhcmMiLCJnZXRTdWJBcHAiLCJnZXRCdW5kbGUiLCJzdGFydCIsIm9uTG9hZCIsInNldFN0YXRlIiwiZHluYW1pY0xvYWRTdWJBcHAiLCJEZWFsU3ViQXBwIiwiaWQiLCJpbmNOdW1iZXIiLCJ0eXBlIiwiZGVjTnVtYmVyIiwiRGVhbHMiLCJ2YWx1ZSIsImRpc3BhdGNoIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwibnVtYmVyIiwibWFwU3RhdGVUb1Byb3BzIiwiUmVkdXhEZWFscyIsImNvbm5lY3QiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9kZWFscy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhY3QsIGR5bmFtaWNMb2FkU3ViQXBwLCB4YXJjIH0gZnJvbSBcInN1YmFwcC1yZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuXG5jbGFzcyBTdWJBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7IHJlYWR5OiBmYWxzZSB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIGlzIHN1YmFwcCBsb2FkZWQ/XG4gICAgLy8gVE9ETzogaGFuZGxlIFNTUlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qgc3ViYXBwID0geGFyYy5nZXRTdWJBcHAobmFtZSk7XG4gICAgaWYgKHhhcmMuZ2V0QnVuZGxlKG5hbWUpICYmIHN1YmFwcCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+e3N1YmFwcC5zdGFydChudWxsLCB7IHByb3BzOiB0aGlzLnByb3BzIH0pfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9uTG9hZCA9ICgpID0+IHRoaXMuc2V0U3RhdGUoeyByZWFkeTogdHJ1ZSB9KTtcbiAgICAgIGR5bmFtaWNMb2FkU3ViQXBwKHtcbiAgICAgICAgbmFtZTogXCJEZWFsXCIsXG4gICAgICAgIG9uTG9hZFxuICAgICAgfSk7XG5cbiAgICAgIC8vIGlmIG5vdCwgcmV0dXJuIGxvYWRpbmdDb21wb25lbnRcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBEZWFsU3ViQXBwID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGlkIH0gPSBwcm9wcztcblxuICBkeW5hbWljTG9hZFN1YkFwcCh7IG5hbWU6IFwiRGVhbFwiLCBpZCB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cbiAgICAgICAgICA8ZGl2IGlkPXtpZH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IGluY051bWJlciA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcIklOQ19OVU1CRVJcIlxuICB9O1xufTtcblxuY29uc3QgZGVjTnVtYmVyID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiREVDX05VTUJFUlwiXG4gIH07XG59O1xuXG5jb25zdCBEZWFscyA9IHByb3BzID0+IHtcbiAgY29uc3QgeyB2YWx1ZSwgZGlzcGF0Y2ggfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFJlZHV4IFN0YXRlIERlbW86IDxidXR0b24gb25DbGljaz17KCkgPT4gZGlzcGF0Y2goZGVjTnVtYmVyKCkpfT4mIzg4MTA7PC9idXR0b24+XG4gICAgICAgICZuYnNwO3t2YWx1ZX0mbmJzcDtcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChpbmNOdW1iZXIoKSl9PiYjODgxMTs8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2PlxuICAgICAgICA8RGVhbFN1YkFwcCB7Li4ucHJvcHN9IGlkPVwiZGVhbF8xXCIgLz5cbiAgICAgICAgPERlYWxTdWJBcHAgey4uLnByb3BzfSBpZD1cImRlYWxfMlwiIC8+XG4gICAgICAgIDxEZWFsU3ViQXBwIHsuLi5wcm9wc30gaWQ9XCJkZWFsXzNcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8U3ViQXBwIG5hbWU9XCJEZWFsXCIgZGVhbD1cImhlbGxvXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuRGVhbHMucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLm51bWJlclxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xuICByZXR1cm4geyB2YWx1ZTogc3RhdGUubnVtYmVyLnZhbHVlIH07XG59O1xuXG5jb25zdCBSZWR1eERlYWxzID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIGRpc3BhdGNoID0+ICh7IGRpc3BhdGNoIH0pKShEZWFscyk7XG5cbmV4cG9ydCB7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