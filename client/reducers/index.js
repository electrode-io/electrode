import { combineReducers } from "redux";
import dataReducer from "./data-reducer";
import countReducer from "./count-reducer";

const rootReducer = combineReducers({
  data: dataReducer,
  count: countReducer
});

export default rootReducer;
