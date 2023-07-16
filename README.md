
# NextJs Sandbox
## Using redux-toolkit `createAsyncThunk()`


### Overview
This is a [Next.js](https://nextjs.org/) project using [Redux Toolkit](https://redux-toolkit.js.org/) 
demonstrating how to build a "slice" with async actions.

```ts
async function action() {
  return await setTimeout(() => 'Done', 1000);
}


type HallpassState = {
  value: string;
  status: 'idle' | 'working' | 'error';
  error?: string;
}

const initialState: HallpassState = {
  value: 'initial',
  status: 'idle',
  error: undefined
}

export const runAction = createAsyncThunk(
  'hallpass/runAction',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      return await action();
    } catch (error: any) {
      return reject(rejectWithValue, error);
    }
});

export const hallpassSlice = createSlice({
  name: 'hallpass',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(runAction.pending, (state) => {
      state.status = 'working';
      state.error = undefined;  //clear
    });
    builder.addCase(runAction.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    });
    builder.addCase(runAction.rejected, (state, action) => {
      state.status = 'error';
      console.warn("Rejected", {state, action});
      state.error = typeof(action.payload) === 'string' ? action.payload : action.error.message;
    });
  }
});

export const hallpassSliceReducer = hallpassSlice.reducer;

```


