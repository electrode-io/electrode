import { createAction } from "@reduxjs/toolkit";

export const ACTION_CONSTANT = {
  INCREASE: "number/increase",
  DECREASE: "number/decrease",
};
export const incNumber = createAction(ACTION_CONSTANT.INCREASE);
export const decNumber = createAction(ACTION_CONSTANT.DECREASE);
