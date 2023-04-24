/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import image from '../assets/default.jpg';
import { setPodcasts } from '../redux/features/podcastSlice';
import {
  playPause,
  setActivePodcast,
  setVideoPlaying,
} from '../redux/features/playerSlice';
import { HiOutlineHeart, HiHeart, HiVideoCamera, HiMicrophone } from 'react-icons/hi';
import {  useState } from 'react';
import axios from 'axios'
import { getAllPodcasts } from '../../data';
const PodcastCard = ({ podcast, i, isPlaying, activePodcast, data, u_id,token,is_liked }) => {
  console.log(podcast)
  const [choice,setChoice] = useState(is_liked || 0);
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActivePodcast({ podcast, data, i }));
    dispatch(playPause(true));
    if (podcast.type === 'video') {
      dispatch(setVideoPlaying(true));
    }
  };

 
  

const handleLike = async(val) => {
  setChoice(val)
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `,
      },
    };
    let p_id = podcast?._id
    
    await axios
      .patch(`${import.meta.env.VITE_BASE_URL}/podcast/likedPodcast`,{p_id,u_id,choice}, config)
      .then((res) => {console.log('like',res);
      getAllPodcasts(token).then((res) => dispatch(setPodcasts(res)));
    });
  } catch (error) {
    console.log(error);
  }
}

 
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group overflow-hidden">
        <div
          className={` absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activePodcast?.name === podcast?.name
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            podcast={podcast}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activePodcast={activePodcast}
          />
        </div>
        <img src={podcast?.coverArt || image} alt="" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/podcasts/${podcast?._id}`}>{podcast?.name}</Link>
        </p>
        </div>
        <div className="flex text-2xl gap-2" >
         <p >
         { choice ? (<span className='text-red-600' onClick={() => handleLike(0)}><HiHeart /></span>):
          (<span className='text-white' onClick={() => handleLike(1)}><HiOutlineHeart /></span>)}
         </p>
         <p>
         { podcast?.type==='video' ? (<span className='text-white'><HiVideoCamera /></span>):
          (<span className=''><HiMicrophone /></span>)}
         </p>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
