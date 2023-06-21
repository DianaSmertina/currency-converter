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
    setRates(state, action: PayloadAction<object>) {
      state.rates = action.payload;
    },
    setCurrencyList(state, action: PayloadAction<Array<string>>) {
      state.currencyList = action.payload;
    },
  },
});

export const { setBaseCurrency, setRates, setCurrencyList } = ratesSlice.actions;
export const selectRatesData = (state: RootState) => state.ratesReducer;
export const ratesReducer = ratesSlice.reducer;
