import {  useSelector } from 'react-redux';
import {  PodcastCard } from '../components';
import NewPodcast from '../components/NewPodcast';
import { useState } from 'react';
import { useEffect } from 'react';

const Discover = () => {
  const [newPodcast, setNewPodcast] = useState(false);
  const { activePodcast, isPlaying } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.podcasts);
  const [userId,setUserId] = useState('')
  const [token,setToken] = useState('')

  useEffect(() => {
    const localData = localStorage?.getItem('userInfo');
    const { token,_id } = JSON.parse(localData) || '';
    setUserId(_id);
    setToken(token);
  },[data])

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start text-white justify-center gap-8">
        {data?.map((podcast, i) => (
          <PodcastCard
            key={i}
            podcast={podcast}
            isPlaying={isPlaying}
            activePodcast={activePodcast}
            i={i}
            data={data}
            token={token}
            u_id={userId}
            is_liked={podcast?.likes?.includes(userId)?1:0}
          />
        ))}
      </div>
      {newPodcast && <NewPodcast setNewPodcast={setNewPodcast} />}
      <button
        onClick={() => setNewPodcast(true)}
        className="absolute bottom-10 right-20 cursor-pointer bg-cyan-500 text-white text-center w-20 h-20 rounded-full flex justify-center items-center z-50"
      >
        <span className="sm:text-5xl text-3xl mb-2">+</span>
      </button>
    </div>
  );
};

export default Discover;
