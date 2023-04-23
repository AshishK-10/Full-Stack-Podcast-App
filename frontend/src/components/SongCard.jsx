import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import image from '../assets/default.jpg';
import {
  playPause,
  setActiveSong,
  setVideoPlaying,
} from '../redux/features/playerSlice';
const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
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
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?._id}`}>{song.name}</Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
          <Link to={`/artists/${song?.artist}`}>{song.creator}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
