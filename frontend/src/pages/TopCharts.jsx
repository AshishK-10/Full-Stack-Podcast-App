import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, PodcastCard } from '../components';

const TopCharts = () => {
  const { activePodcast, isPlaying } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.podcasts);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((podcast, i) => (
          <PodcastCard
            key={podcast.key}
            podcast={podcast}
            isPlaying={isPlaying}
            activePodcast={activePodcast}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
