import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import podcastReducer from './features/podcastSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    podcasts: podcastReducer,
  },
});
