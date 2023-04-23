import { Link } from 'react-router-dom';
import image from '../assets/image.jpg';
const DetailsHeader = ({ artist, songData }) => {
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-1 from-transparent to-black sm:h-40 h-28">
        <div className="absolute inset-0 flex items-center">
          {/* <img src={songData[0].coverArt} alt="" /> */}
          <img
            src={image}
            alt=""
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {songData ? songData?.name : artist?.name}
            </p>
            {songData ? (
              <Link to={`/artists/${songData?.artist?._id}`}>
                <p className="text-sm sm:text-2xl text-gray-400 mt-2">
                  {songData?.artist?.name}
                </p>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
