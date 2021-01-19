import { createStore } from "redux";
import { todoReducer } from "./reducer";

export default createStore(todoReducer);
