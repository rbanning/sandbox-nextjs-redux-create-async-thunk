
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { counterAPI } from '@/lib';

export type CounterStatus = 'idle' | 'working' | 'error';

export interface CounterState {
  value: number;
  status: CounterStatus;
  error?: string;
}

export const initialState: CounterState = {
  value: counterAPI.currentValue,
  status: 'idle'
};


//--- helper for rejecting async thunk
type Reject = (value: string) => any; // lazy ...
const reject = (rejectWithValue: Reject, error: any) => {
  return rejectWithValue(
    typeof(error) === 'string' ? error :
    (typeof(error?.message) === 'string' 
      ? error.message
      : `${error}`
    )
  );
}

export const increment = createAsyncThunk(
  'counter/increment',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      return await counterAPI.increment();
    } catch (error: any) {
      return reject(rejectWithValue, error);
    }
});
export const decrement = createAsyncThunk(
  'counter/decrement',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      return await counterAPI.decrement();
    } catch (error: any) {
      return reject(rejectWithValue, error);
    }
});


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(increment.pending, (state) => {
      state.status = 'working';
      state.error = undefined;
    });
    builder.addCase(increment.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    });
    builder.addCase(increment.rejected, (state, action) => {
      state.status = 'error';
      console.warn("Rejected", {state, action});
      state.error = typeof(action.payload) === 'string' ? action.payload : action.error.message;
    });

    builder.addCase(decrement.pending, (state) => {
      state.status = 'working';
      state.error = undefined;
    });
    builder.addCase(decrement.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    });
    builder.addCase(decrement.rejected, (state, action) => {
      state.status = 'error';
      console.warn("Rejected", {state, action});
      state.error = typeof(action.payload) === 'string' ? action.payload : action.error.message;
    });
  }
});

export const counterSliceReducer = counterSlice.reducer;

