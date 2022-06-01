"use strict";

exports.__esModule = true;
exports.incNumber = exports.default = exports.decNumber = void 0;

const number = (number = 1000, action = {}) => {
  if (action.type === "INC_NUMBER") {
    return number + 1;
  }

  if (action.type === "DEC_NUMBER") {
    return number - 1;
  }

  return number;
};

const items = s => {
  return s || {
    items: []
  };
};

var _default = {
  number,
  items
}; // Action function for easy of use.

exports.default = _default;

const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

exports.incNumber = incNumber;

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

exports.decNumber = decNumber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJudW1iZXIiLCJhY3Rpb24iLCJ0eXBlIiwiaXRlbXMiLCJzIiwiaW5jTnVtYmVyIiwiZGVjTnVtYmVyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4tYm9keS9yZWR1Y2Vycy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbnVtYmVyID0gKG51bWJlciA9IDEwMDAsIGFjdGlvbiA9IHt9KSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gXCJJTkNfTlVNQkVSXCIpIHtcbiAgICByZXR1cm4gbnVtYmVyICsgMTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFwiREVDX05VTUJFUlwiKSB7XG4gICAgcmV0dXJuIG51bWJlciAtIDE7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyO1xufTtcblxuY29uc3QgaXRlbXMgPSBzID0+IHtcbiAgcmV0dXJuIHMgfHwgeyBpdGVtczogW10gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbnVtYmVyLFxuICBpdGVtc1xufTtcblxuLy8gQWN0aW9uIGZ1bmN0aW9uIGZvciBlYXN5IG9mIHVzZS5cbmV4cG9ydCBjb25zdCBpbmNOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJJTkNfTlVNQkVSXCJcbiAgfTtcbn07XG5leHBvcnQgY29uc3QgZGVjTnVtYmVyID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiREVDX05VTUJFUlwiXG4gIH07XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU1BLE1BQU0sR0FBRyxDQUFDQSxNQUFNLEdBQUcsSUFBVixFQUFnQkMsTUFBTSxHQUFHLEVBQXpCLEtBQWdDO0VBQzdDLElBQUlBLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixZQUFwQixFQUFrQztJQUNoQyxPQUFPRixNQUFNLEdBQUcsQ0FBaEI7RUFDRDs7RUFDRCxJQUFJQyxNQUFNLENBQUNDLElBQVAsS0FBZ0IsWUFBcEIsRUFBa0M7SUFDaEMsT0FBT0YsTUFBTSxHQUFHLENBQWhCO0VBQ0Q7O0VBRUQsT0FBT0EsTUFBUDtBQUNELENBVEQ7O0FBV0EsTUFBTUcsS0FBSyxHQUFHQyxDQUFDLElBQUk7RUFDakIsT0FBT0EsQ0FBQyxJQUFJO0lBQUVELEtBQUssRUFBRTtFQUFULENBQVo7QUFDRCxDQUZEOztlQUllO0VBQ2JILE1BRGE7RUFFYkc7QUFGYSxDLEVBS2Y7Ozs7QUFDTyxNQUFNRSxTQUFTLEdBQUcsTUFBTTtFQUM3QixPQUFPO0lBQ0xILElBQUksRUFBRTtFQURELENBQVA7QUFHRCxDQUpNOzs7O0FBS0EsTUFBTUksU0FBUyxHQUFHLE1BQU07RUFDN0IsT0FBTztJQUNMSixJQUFJLEVBQUU7RUFERCxDQUFQO0FBR0QsQ0FKTSJ9