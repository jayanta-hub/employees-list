import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../store/slice/employeeSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
