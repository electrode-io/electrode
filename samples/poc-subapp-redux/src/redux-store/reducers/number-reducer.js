import { createReducer } from "@reduxjs/toolkit";
import { incNumber, decNumber } from "../actions/number-actions";

const initialState = { number: 1000 };

export const numberReducer = createReducer(initialState, (builder) => {
  builder
    // eslint-disable-next-line consistent-return
    .addCase(incNumber, (state, action) => {
      state.number += 1;
    })
    .addCase(decNumber, (state, action) => {
      state.number -= 1;
    });
});
