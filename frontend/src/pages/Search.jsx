import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {  PodcastCard } from '../components';

const Search = () => {
  const { searchTerm } = useParams();
  const { activePodcast, isPlaying } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.podcasts);

  const podcasts = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col">
      {podcasts.length > 0 ? (
        <>
          <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
            Showing results for {searchTerm}
          </h2>

          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {podcasts.map((podcast, i) => (
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
        </>
      ) : (
        <h2 className="font-bold text-center text-3xl text-white text-left mt-4 mb-10">
          No results found for {searchTerm}
        </h2>
      )}
    </div>
  );
};

export default Search;
