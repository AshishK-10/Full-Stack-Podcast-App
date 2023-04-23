import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Error, Loader, SongCard } from '../components';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.podcasts);

  const songs = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(songs);
  return (
    <div className="flex flex-col">
      {songs.length > 0 ? (
        <>
          <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
            Showing results for {searchTerm}
          </h2>

          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {songs.map((song, i) => (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
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
