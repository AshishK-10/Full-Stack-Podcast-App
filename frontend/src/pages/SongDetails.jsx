/* eslint-disable no-unused-vars */
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader} from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useEffect } from 'react';
import { getPodcast } from '../../data';
import { useState } from 'react';
import {  HiHeart,  HiUserGroup, HiUserCircle } from 'react-icons/hi';

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
          <p className="text-gray-400 text-xl my-1 flex items-center gap-2">
           <HiUserCircle /> {songData?.artist?.name}
          </p>
          ;
          <p className="text-gray-400  my-1 text-xl flex items-center gap-2">
            <HiUserGroup /> <span className="">{songData?.views}</span>
          </p>
          ;
          <p className="text-gray-400 text-xl my-1 flex items-center gap-2">
            <HiHeart /> <span className="">{songData?.likes?.length}</span>
          </p>
          ;
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
