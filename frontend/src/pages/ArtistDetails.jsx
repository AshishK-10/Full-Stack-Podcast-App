import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { data } from '../../data';
const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  console.log(id);
  return (
    <div className="flex flex-col mt-12">
      <DetailsHeader artistId={id} />
      <div className="mb-10 mt-10">
        <h2 className="text-white text-4xl font-bold">Podcasts</h2>
        <div className="mt-5">
          {data.map((song, i) => {
            return <p className="text-gray-400 text-base my-1">{song.title}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
