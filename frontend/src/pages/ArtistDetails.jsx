import { useParams } from 'react-router';
import { DetailsHeader } from '../components';
import { getArtist } from '../../data';
import { useState, useEffect } from 'react';
const ArtistDetails = () => {
  const { id } = useParams();
  const [artistData, setArtistData] = useState({});


  useEffect(() => {
    const localData = localStorage?.getItem('userInfo');
    const { token } = JSON.parse(localData) || '';
    getArtist(token, id).then((res) => {setArtistData(res);console.log(res)});
  }, [id]);
  console.log(artistData)
  return (
    <div className="flex flex-col mt-12">
      <DetailsHeader artistId={id} />
      <div className="mb-10 mt-10">
        <h2 className="text-white text-4xl font-bold">Podcasts</h2>
        <div className="mt-5">
          {/* {artistData?.map((song, i) => {
            return <p className="text-gray-400 text-base my-1" key={i}>{song.name}</p>;
          })} */}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
