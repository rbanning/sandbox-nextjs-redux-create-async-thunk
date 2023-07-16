//THIS IS THE SITE's REDUX STORE

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { counterSliceReducer } from './features/counter/counter-slice';

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//typed the useDispatch and useSelector methods
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

