import { all } from "redux-saga/effects";
import { numberSaga } from "./number-saga";

export default function* rootSaga() {
  yield all([numberSaga()]);
}
