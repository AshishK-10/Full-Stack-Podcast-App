import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { playPause, setVideoPlaying } from '../../redux/features/playerSlice';
const VideoPlayer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="min-w-screen min-h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div className="w-[90%] max-h-screen mt-20 h-[500px] max-w-2xl p-12 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
          <span
            className="absolute top-2 right-3 cursor-pointer bg-cyan-500 text-white text-lg text-center font-bold  w-8 h-8 rounded-full"
            onClick={() => {
              dispatch(playPause(false));
              dispatch(setVideoPlaying(false));
            }}
          >
            X
          </span>
          <video autoPlay controls>
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></source>
          </video>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
