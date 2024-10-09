import { takeEvery, delay } from "redux-saga/effects";
import { ACTION_CONSTANT } from "../actions/number-actions";

function* handleIncrease(action) {
  yield delay(1000); // Simulate async work
  console.log("handleIncreaseSaga calls");
}

export function* numberSaga() {
  yield takeEvery(ACTION_CONSTANT.INCREASE, handleIncrease);
}
