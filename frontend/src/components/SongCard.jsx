/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from './PlayPause';
import image from '../assets/default.jpg';
import { setPodcasts } from '../redux/features/podcastSlice';
import {
  playPause,
  setActiveSong,
  setVideoPlaying,
} from '../redux/features/playerSlice';
import { HiOutlineHeart, HiHeart, HiVideoCamera, HiMicrophone } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { getAllPodcasts } from '../../data';
const SongCard = ({ song, i, isPlaying, activeSong, data, u_id,token,is_liked }) => {
  const [choice,setChoice] = useState(is_liked || 0);
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    if (song.type === 'video') {
      dispatch(setVideoPlaying(true));
    }
  };
  

const handleLike = async(e,val) => {
  e.stopPropagation();
  console.log("val",val)
  setChoice(val)
  console.log('choice',choice)
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `,
      },
    };
    let p_id = song?._id
    
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
            activeSong?.name === song.name
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img src={song?.coverArt || image} alt="" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?._id}`}>{song.name}</Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
          <Link to={`/artists/${song?.artist}`}>{song.creator}</Link>
        </p>
        </div>
        <div className="flex text-2xl gap-2" >
         <p >
         { !choice ? (<span className='text-red-600' onClick={(e) => handleLike(e,0)}><HiHeart /></span>):
          (<span className='text-white' onClick={(e) => handleLike(e,1)}><HiOutlineHeart /></span>)}
         </p>
         <p>
         { song?.type==='video' ? (<span className='text-white'><HiVideoCamera /></span>):
          (<span className=''><HiMicrophone /></span>)}
         </p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
