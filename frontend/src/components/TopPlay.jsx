import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import image from '../assets/default.jpg';

import PlayPause from './PlayPause';
import { playPause, setActivePodcast } from '../redux/features/playerSlice';
import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ podcast, i }) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={podcast?.coverArt || image}
          alt={podcast.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/podcasts/${podcast._id}`}>
            <p className="text-xl font-bold text-white">{podcast?.name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activePodcast, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  const { data } = useSelector((state) => state.podcasts);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);
  const handlPauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActivePodcast({ podcast, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((podcast, i) => (
            <TopChartCard key={i} podcast={podcast} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
