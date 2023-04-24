import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import image from '../assets/default.jpg';

const PodcastBar = ({
  podcast,
  i,
  artistId,
  isPlaying,
  activePodcast,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activePodcast?.name === podcast?.name ? 'bg-[#4c426e]' : 'bg-transparent'
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={
          artistId
            ? podcast?.attributes?.artwork?.url
                .replace('{w}', '125')
                .replace('{h}', '125')
            : podcast?.coverArt || image
        }
        alt={podcast?.name}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link to={`/podcasts/${podcast.key}`}>
            <p className="text-xl font-bold text-white">{podcast?.name}</p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">
            {podcast?.attributes?.name}
          </p>
        )}
        <p className="text-base text-gray-300 mt-1">
          {artistId ? podcast?.attributes?.albumName : podcast?.subtitle}
        </p>
      </div>
    </div>
    {!artistId ? (
      <PlayPause
        isPlaying={isPlaying}
        activePodcast={activePodcast}
        podcast={podcast}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(podcast, i)}
      />
    ) : null}
  </div>
);

export default PodcastBar;
