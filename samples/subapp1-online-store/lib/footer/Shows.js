"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fetchShows = void 0;

var _axios = _interopRequireDefault(require("axios"));

const fetchShows = () => {
  let status = "pending";
  let result;
  let suspender = (0, _axios.default)(`https://api.tvmaze.com/search/shows?q=heist`).then(r => {
    status = "success";
    result = r.data;
  }, e => {
    status = "error";
    result = e;
  });
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }

  };
};

exports.fetchShows = fetchShows;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmZXRjaFNob3dzIiwic3RhdHVzIiwicmVzdWx0Iiwic3VzcGVuZGVyIiwiYXhpb3MiLCJ0aGVuIiwiciIsImRhdGEiLCJlIiwicmVhZCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb290ZXIvU2hvd3MuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuZXhwb3J0IGNvbnN0IGZldGNoU2hvd3MgPSAoKSA9PiB7XG4gICAgbGV0IHN0YXR1cyA9IFwicGVuZGluZ1wiO1xuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IHN1c3BlbmRlciA9IGF4aW9zKGBodHRwczovL2FwaS50dm1hemUuY29tL3NlYXJjaC9zaG93cz9xPWhlaXN0YCkudGhlbihcbiAgICAgIChyKSA9PiB7XG4gICAgICAgIHN0YXR1cyA9IFwic3VjY2Vzc1wiO1xuICAgICAgICByZXN1bHQgPSByLmRhdGE7XG4gICAgICB9LFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgc3RhdHVzID0gXCJlcnJvclwiO1xuICAgICAgICByZXN1bHQgPSBlO1xuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IFwicGVuZGluZ1wiKSB7XG4gICAgICAgICAgdGhyb3cgc3VzcGVuZGVyO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgdGhyb3cgcmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG59OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVPLE1BQU1BLFVBQVUsR0FBRyxNQUFNO0VBQzVCLElBQUlDLE1BQU0sR0FBRyxTQUFiO0VBQ0EsSUFBSUMsTUFBSjtFQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFBQyxjQUFBLEVBQU8sNkNBQVAsRUFBcURDLElBQXJELENBQ2JDLENBQUQsSUFBTztJQUNMTCxNQUFNLEdBQUcsU0FBVDtJQUNBQyxNQUFNLEdBQUdJLENBQUMsQ0FBQ0MsSUFBWDtFQUNELENBSmEsRUFLYkMsQ0FBRCxJQUFPO0lBQ0xQLE1BQU0sR0FBRyxPQUFUO0lBQ0FDLE1BQU0sR0FBR00sQ0FBVDtFQUNELENBUmEsQ0FBaEI7RUFVQSxPQUFPO0lBQ0xDLElBQUksR0FBRztNQUNMLElBQUlSLE1BQU0sS0FBSyxTQUFmLEVBQTBCO1FBQ3hCLE1BQU1FLFNBQU47TUFDRCxDQUZELE1BRU8sSUFBSUYsTUFBTSxLQUFLLE9BQWYsRUFBd0I7UUFDN0IsTUFBTUMsTUFBTjtNQUNELENBRk0sTUFFQSxJQUFJRCxNQUFNLEtBQUssU0FBZixFQUEwQjtRQUMvQixPQUFPQyxNQUFQO01BQ0Q7SUFDRjs7RUFUSSxDQUFQO0FBV0gsQ0F4Qk0ifQ==