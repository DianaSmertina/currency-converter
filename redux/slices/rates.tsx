import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type RateData = {
  baseCurrency: string;
  rates: object;
  currencyList: Array<string>;
};

const initialState: RateData = {
  baseCurrency: 'USD',
  rates: {},
  currencyList: [],
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setBaseCurrency(state, action: PayloadAction<string>) {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setBaseCurrency } = ratesSlice.actions;
export const selectRatesData = (state: RootState) => state.ratesReducer;
export const ratesReducer = ratesSlice.reducer;
