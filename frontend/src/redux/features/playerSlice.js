import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPodcasts: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activePodcast: {},
  genreListId: '',
  isVideoPlaying: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setVideoPlaying: (state, action) => {
      state.isVideoPlaying = action.payload;
    },
    setActivePodcast: (state, action) => {
      state.activePodcast = action.payload.podcast;
      state.currentPodcasts = action.payload.podcast.file;
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextPodcast: (state, action) => {
      if (state.currentPodcasts[action.payload]?.track) {
        state.activePodcast = state.currentPodcasts[action.payload]?.track;
      } else {
        state.activePodcast = state.currentPodcasts[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevPodcast: (state, action) => {
      if (state.currentPodcasts[action.payload]?.track) {
        state.activePodcast = state.currentPodcasts[action.payload]?.track;
      } else {
        state.activePodcast = state.currentPodcasts[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActivePodcast,
  nextPodcast,
  prevPodcast,
  playPause,
  selectGenreListId,
  setVideoPlaying,
} = playerSlice.actions;

export default playerSlice.reducer;
