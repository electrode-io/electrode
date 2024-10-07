import { createAction } from "@reduxjs/toolkit";
export const ACTION_CONSTANT = {
  NUMBER_INCREASE: "number/increase",
  NUMBER_DECREASE: "number/decrease",
};
export const incNumber = createAction(ACTION_CONSTANT.NUMBER_INCREASE);
export const decNumber = createAction(ACTION_CONSTANT.NUMBER_DECREASE);
