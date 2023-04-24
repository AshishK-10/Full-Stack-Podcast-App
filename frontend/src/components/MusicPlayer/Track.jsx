import React from 'react';
import image from '../../assets/default.jpg';

const Track = ({ isPlaying, isActive, activePodcast }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activePodcast?.coverArt || image}
        alt="cover art"
        className="rounded-full h-[100%] w-[100%] object-cover"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activePodcast?.name ? activePodcast?.name : 'No active Podcast'}
      </p>
      <p className="truncate text-gray-300">
        {activePodcast?.creator ? activePodcast?.creator : 'No active Podcast'}
      </p>
    </div>
  </div>
);

export default Track;
