import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPodcasts } = podcastSlice.actions;

export default podcastSlice.reducer;
