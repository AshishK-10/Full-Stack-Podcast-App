/* eslint-disable no-unused-vars */
import { useParams } from 'react-router';
import { useSelector} from 'react-redux';
import { DetailsHeader} from '../components';
import { useEffect } from 'react';
import { getPodcast } from '../../data';
import { useState } from 'react';
import {  HiHeart,  HiUserGroup, HiUserCircle } from 'react-icons/hi';

const PodcastDetails = () => {
  const { activePodcast, isPlaying } = useSelector((state) => state.player);
 
  const [podcastData, setPodcastData] = useState({});

  const { podcastid } = useParams();
  useEffect(() => {
    const localData = localStorage?.getItem('userInfo');
    const { token } = JSON.parse(localData) || '';
    getPodcast(token, podcastid).then((res) => setPodcastData(res));
  }, [podcastid]);


  return (
    <div className="flex flex-col mt-12">
      <DetailsHeader artist={podcastData?.artist} podcastData={podcastData} />
      <div className="mb-10 mt-10">
        <h2 className="text-white text-4xl font-bold">Description</h2>
        <div className="mt-5">
          <p className="text-gray-400 text-base my-1">
            {podcastData?.description}
          </p>
          ;
          <p className="text-gray-400 text-xl my-1 flex items-center gap-2">
           <HiUserCircle /> {podcastData?.artist?.name}
          </p>
          ;
          <p className="text-gray-400  my-1 text-xl flex items-center gap-2">
            <HiUserGroup /> <span className="">{podcastData?.views}</span>
          </p>
          ;
          <p className="text-gray-400 text-xl my-1 flex items-center gap-2">
            <HiHeart /> <span className="">{podcastData?.likes?.length}</span>
          </p>
          ;
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;
