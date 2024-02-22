import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    data: [], // Change to array
  },
  reducers: {
    addDataSearch: (state, action) => {
      state.data = [];
      state.data.push(action.payload); // Push new data into the array
    },
  },
});

export const { addDataSearch } = searchSlice.actions;

export default searchSlice.reducer;
