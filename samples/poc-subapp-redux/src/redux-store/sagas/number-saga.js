import { takeEvery, delay } from "redux-saga/effects";
import { ACTION_CONSTANT } from "../actions/number-actions";

function* handleIncreaseNumber(action) {
  yield delay(1000); // Simulate async work
  console.log("handleIncreaseNumber");
}

export function* increaseNumberSaga() {
  yield takeEvery(ACTION_CONSTANT.NUMBER_INCREASE, handleIncreaseNumber);
}
