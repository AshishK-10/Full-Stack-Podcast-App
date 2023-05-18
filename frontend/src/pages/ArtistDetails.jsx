/* eslint-disable no-unreachable */
import { useParams } from "react-router";
import { DetailsHeader } from "../components";
import { getArtist } from "../../data";
import { useState, useEffect } from "react";
import {PodcastCard} from "../components";
import { useSelector } from "react-redux";
const ArtistDetails = () => {
  const { id } = useParams();
  const [artistData, setArtistData] = useState({});
  const { data } = useSelector((state) => state.podcasts);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const { activePodcast, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const localData = localStorage?.getItem("userInfo");
    const { token, _id } = JSON.parse(localData) || "";
    setToken(token);
    setUserId(_id);
    getArtist(token, id).then((res) => setArtistData(res));
  }, [id]);
  return (
    <div className="flex flex-col mt-12">
      <DetailsHeader artistData={artistData} />
      <div className="mb-10 mt-10">
        <h2 className="text-white text-4xl font-bold">Related Podcasts</h2>
        <div className="mt-5 flex flex-wrap sm:justify-start text-white justify-center gap-8">
          {artistData?.podcasts?.map((item, i) => (
            <PodcastCard
              key={i}
              podcast={item}
              isPlaying={isPlaying}
              activeSong={activePodcast}
              i={i}
              data={data}
              token={token}
              u_id={userId}
              is_liked={item?.likes?.includes(userId) ? 1 : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
