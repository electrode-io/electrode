"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _subappReact = require("subapp-react");
var _subappRedux = require("subapp-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
const email = (email = '', action = {}) => {
  if (action.type === "EMAIL") {
    return action.payload;
  }
  return email;
};
const setEmail = value => {
  return {
    type: 'EMAIL',
    payload: value
  };
};
const reducers = {
  email
};
const Footer = props => {
  const onSubmit = () => {
    const email = document.getElementById("email").value;
    props.dispatch(setEmail(email));
    return true;
  };
  return /*#__PURE__*/_subappReact.React.createElement("footer", {
    className: "container-fluid text-center"
  }, /*#__PURE__*/_subappReact.React.createElement("h4", null, "Redux state change demo in a subApp"), "Footer is a subApp. Click \"Submit\" to see Redux state change in browser console.", /*#__PURE__*/_subappReact.React.createElement("input", {
    type: "email",
    id: "email",
    className: "form-control",
    size: "50",
    placeholder: "Email Address, no validation"
  }), /*#__PURE__*/_subappReact.React.createElement("button", {
    type: "button",
    className: "btn btn-danger",
    onClick: onSubmit
  }, "Submit"));
};
Footer.propTypes = {
  title: _propTypes.default.string
};
const Component = (0, _reactRedux.connect)(state => state, dispatch => ({
  dispatch
}))(Footer);
var _default = (0, _subappRedux.reduxLoadSubApp)({
  name: "Footer",
  Component,
  reduxShareStore: true,
  reduxReducers: reducers,
  prepare: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: "Online Store Copyright"
        });
      }, 2000);
    });
  }
});
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJlbWFpbCIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwic2V0RW1haWwiLCJ2YWx1ZSIsInJlZHVjZXJzIiwiRm9vdGVyIiwicHJvcHMiLCJvblN1Ym1pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwYXRjaCIsInByb3BUeXBlcyIsInRpdGxlIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiQ29tcG9uZW50IiwiY29ubmVjdCIsInN0YXRlIiwicmVkdXhMb2FkU3ViQXBwIiwibmFtZSIsInJlZHV4U2hhcmVTdG9yZSIsInJlZHV4UmVkdWNlcnMiLCJwcmVwYXJlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjLzA0LmZvb3Rlci9zdWJhcHAtZm9vdGVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdCB9IGZyb20gXCJzdWJhcHAtcmVhY3RcIjtcbmltcG9ydCB7IHJlZHV4TG9hZFN1YkFwcCB9IGZyb20gXCJzdWJhcHAtcmVkdXhcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcblxuY29uc3QgZW1haWwgPSAoZW1haWwgPSAnJywgYWN0aW9uID0ge30pID0+IHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSBcIkVNQUlMXCIpIHtcbiAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQ7XG4gIH1cbiAgcmV0dXJuIGVtYWlsO1xufTtcblxuY29uc3Qgc2V0RW1haWwgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRU1BSUwnLFxuICAgIHBheWxvYWQ6IHZhbHVlXG4gIH07XG59O1xuXG5jb25zdCByZWR1Y2VycyA9IHtlbWFpbH07XG5cbmNvbnN0IEZvb3RlciA9IHByb3BzID0+IHtcblxuICBjb25zdCBvblN1Ym1pdCA9ICgpID0+IHtcbiAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWU7XG4gICAgcHJvcHMuZGlzcGF0Y2goc2V0RW1haWwoZW1haWwpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkIHRleHQtY2VudGVyXCI+XG4gICAgICA8aDQ+UmVkdXggc3RhdGUgY2hhbmdlIGRlbW8gaW4gYSBzdWJBcHA8L2g0PlxuICAgICAgRm9vdGVyIGlzIGEgc3ViQXBwLiBDbGljayBcIlN1Ym1pdFwiIHRvIHNlZSBSZWR1eCBzdGF0ZSBjaGFuZ2UgaW4gYnJvd3NlciBjb25zb2xlLlxuICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBzaXplPVwiNTBcIiBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3MsIG5vIHZhbGlkYXRpb25cIiAvPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBvbkNsaWNrPXtvblN1Ym1pdH0+XG4gICAgICAgIFN1Ym1pdFxuICAgICAgPC9idXR0b24+XG4gICAgPC9mb290ZXI+XG4gICk7XG59O1xuXG5Gb290ZXIucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuY29uc3QgQ29tcG9uZW50ID0gY29ubmVjdChcbiAgc3RhdGUgPT4gc3RhdGUsXG4gIGRpc3BhdGNoID0+ICh7IGRpc3BhdGNoIH0pXG4pKEZvb3Rlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHV4TG9hZFN1YkFwcCh7XG4gIG5hbWU6IFwiRm9vdGVyXCIsXG4gIENvbXBvbmVudCxcbiAgcmVkdXhTaGFyZVN0b3JlOiB0cnVlLFxuICByZWR1eFJlZHVjZXJzOiByZWR1Y2VycyxcbiAgcHJlcGFyZTogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICB0aXRsZTogXCJPbmxpbmUgU3RvcmUgQ29weXJpZ2h0XCJcbiAgICAgICAgfSk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxLQUFLLEdBQUcsQ0FBQ0EsS0FBSyxHQUFHLEVBQUUsRUFBRUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLO0VBQ3pDLElBQUlBLE1BQU0sQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtJQUMzQixPQUFPRCxNQUFNLENBQUNFLE9BQU87RUFDdkI7RUFDQSxPQUFPSCxLQUFLO0FBQ2QsQ0FBQztBQUVELE1BQU1JLFFBQVEsR0FBSUMsS0FBSyxJQUFLO0VBQzFCLE9BQU87SUFDTEgsSUFBSSxFQUFFLE9BQU87SUFDYkMsT0FBTyxFQUFFRTtFQUNYLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTUMsUUFBUSxHQUFHO0VBQUNOO0FBQUssQ0FBQztBQUV4QixNQUFNTyxNQUFNLEdBQUdDLEtBQUssSUFBSTtFQUV0QixNQUFNQyxRQUFRLEdBQUcsTUFBTTtJQUNyQixNQUFNVCxLQUFLLEdBQUdVLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDTixLQUFLO0lBQ3BERyxLQUFLLENBQUNJLFFBQVEsQ0FBQ1IsUUFBUSxDQUFDSixLQUFLLENBQUMsQ0FBQztJQUMvQixPQUFPLElBQUk7RUFDYixDQUFDO0VBRUQsb0JBQ0U7SUFBUSxTQUFTLEVBQUM7RUFBNkIsZ0JBQzdDLG1GQUE0QyxxR0FFNUM7SUFBTyxJQUFJLEVBQUMsT0FBTztJQUFDLEVBQUUsRUFBQyxPQUFPO0lBQUMsU0FBUyxFQUFDLGNBQWM7SUFBQyxJQUFJLEVBQUMsSUFBSTtJQUFDLFdBQVcsRUFBQztFQUE4QixFQUFHLGVBQy9HO0lBQVEsSUFBSSxFQUFDLFFBQVE7SUFBQyxTQUFTLEVBQUMsZ0JBQWdCO0lBQUMsT0FBTyxFQUFFUztFQUFTLFlBRTFELENBQ0Y7QUFFYixDQUFDO0FBRURGLE1BQU0sQ0FBQ00sU0FBUyxHQUFHO0VBQ2pCQyxLQUFLLEVBQUVDLGtCQUFTLENBQUNDO0FBQ25CLENBQUM7QUFFRCxNQUFNQyxTQUFTLEdBQUcsSUFBQUMsbUJBQU8sRUFDdkJDLEtBQUssSUFBSUEsS0FBSyxFQUNkUCxRQUFRLEtBQUs7RUFBRUE7QUFBUyxDQUFDLENBQUMsQ0FDM0IsQ0FBQ0wsTUFBTSxDQUFDO0FBQUMsZUFFSyxJQUFBYSw0QkFBZSxFQUFDO0VBQzdCQyxJQUFJLEVBQUUsUUFBUTtFQUNkSixTQUFTO0VBQ1RLLGVBQWUsRUFBRSxJQUFJO0VBQ3JCQyxhQUFhLEVBQUVqQixRQUFRO0VBQ3ZCa0IsT0FBTyxFQUFFLE1BQU07SUFDYixPQUFPLElBQUlDLE9BQU8sQ0FBQ0MsT0FBTyxJQUFJO01BQzVCQyxVQUFVLENBQUMsTUFBTTtRQUNmRCxPQUFPLENBQUM7VUFDTlosS0FBSyxFQUFFO1FBQ1QsQ0FBQyxDQUFDO01BQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNWLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQyxDQUFDO0FBQUEifQ==