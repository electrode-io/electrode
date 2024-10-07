import { all } from "redux-saga/effects";
import { increaseNumberSaga } from "./number-saga";

export default function* rootSaga() {
  yield all([increaseNumberSaga()]);
}
