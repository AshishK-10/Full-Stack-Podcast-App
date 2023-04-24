import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedPodcasts } from '../components';
import { setActivePodcast, playPause } from '../redux/features/playerSlice';
import { useEffect } from 'react';
import { getPodcast } from '../../data';
import { useState } from 'react';

const PodcastDetails = () => {
  // const dispatch = useDispatch();
  const { activePodcast, isPlaying } = useSelector((state) => state.player);
  // const { data } = useSelector((state) => state.podcasts);
  // const podcastData = data.filter((item) => item._id === podcastid);
  const [podcastData, setPodcastData] = useState({});

  const { podcastid } = useParams();
  useEffect(() => {
    const localData = localStorage?.getItem('userInfo');
    const { token } = JSON.parse(localData) || '';
    getPodcast(token, podcastid).then((res) => setPodcastData(res));
  }, [podcastid]);

  console.log(podcastData);

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
          <p className="text-gray-400 text-base my-1">
            Artist: {podcastData?.artist?.name}
          </p>
          ;
          <p className="text-gray-400 text-base my-1">
            views: {podcastData?.views}
          </p>
          ;
          <p className="text-gray-400 text-base my-1">
            likes: {podcastData?.likes?.length}
          </p>
          ;
        </div>
      </div>
    </div>
  );
};

export default PodcastDetails;
