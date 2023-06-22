import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type FormData = {
  fromCurrency?: string;
  amount?: number | null;
  toCurrency?: string;
  result?: number | null;
};

const initialState: FormData = {
  fromCurrency: '',
  amount: null,
  toCurrency: '',
  result: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormData>) {
      for (const key in action.payload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state[key as keyof FormData] = action.payload[key as keyof FormData] as any;
      }
    },
    resetFormData() {
      return initialState;
    },
  },
});

export const { setFormData, resetFormData } = formSlice.actions;
export const selectFormData = (state: RootState) => state.formReducer;
export const formReducer = formSlice.reducer;
