import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.data = action.payload;
    },
    setLogout: (state) => {
      state.data = null;
      localStorage.clear();
    },
  },
});

export const { setPodcasts, setLogout } = podcastSlice.actions;

export default podcastSlice.reducer;
