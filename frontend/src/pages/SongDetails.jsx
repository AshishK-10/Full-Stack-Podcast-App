import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useEffect } from 'react';
import { getPodcast } from '../../data';
import { useState } from 'react';

const SongDetails = () => {
  // const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data } = useSelector((state) => state.podcasts);
  // const songData = data.filter((item) => item._id === songid);
  const [songData, setSongData] = useState({});

  const { songid } = useParams();
  useEffect(() => {
    const localData = localStorage?.getItem('userInfo');
    const { token } = JSON.parse(localData) || '';
    getPodcast(token, songid).then((res) => setSongData(res));
  }, [songid]);

  console.log(songData);

  return (
    <div className="flex flex-col mt-12">
      <DetailsHeader artist={songData?.artist} songData={songData} />
      <div className="mb-10 mt-10">
        <h2 className="text-white text-4xl font-bold">Description</h2>
        <div className="mt-5">
          <p className="text-gray-400 text-base my-1">
            {songData?.description}
          </p>
          ;
          <p className="text-gray-400 text-base my-1">
            Artist: {songData?.artist?.name}
          </p>
          ;
          <p className="text-gray-400 text-base my-1">
            views: {songData?.views}
          </p>
          ;
          <p className="text-gray-400 text-base my-1">
            likes: {songData?.likes?.length}
          </p>
          ;
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
