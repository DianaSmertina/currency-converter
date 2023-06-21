import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from './slices/form';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    formReducer,
  },
});

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
