import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import VideoPlayer from "./components/VideoPlayer";
import {
  ArtistDetails,
  Discover,
  Search,
  PodcastDetails,
TopCharts,
  NotFound,
} from "./pages";
import { getAllPodcasts } from "../data";
import { setPodcasts } from "./redux/features/podcastSlice";

const App = () => {
  const { activePodcast, isVideoPlaying } = useSelector(
    (state) => state.player
  );
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage?.getItem("loggedIn")) || false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage?.getItem("userInfo");
    const { token } = JSON.parse(localData) || "";
    getAllPodcasts(token).then((res) => dispatch(setPodcasts(res)));
  }, [isLogin]);

  return (
    <>
        <div className="relative flex h-[100vh]">
          { isLogin &&  <Sidebar />}
          <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
            {isLogin &&  <Searchbar />}

            <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              <div className="flex-1 h-fit pb-40">
              <Routes>
                  <Route path="/" element={ !isLogin ? <Login setIsLogin={setIsLogin}  /> : <Discover /> }  />
                  <Route 
                    path="/signup"
                    element={!isLogin && <Signup setIsLogin={setIsLogin} />}
                  />
                  <Route path="/discover" element={!isLogin ?  <Login setIsLogin={setIsLogin} /> : <Discover />  } />
                  <Route path="/top-charts" element={!isLogin ?  <Login setIsLogin={setIsLogin} /> :<TopCharts />} />
                  <Route path="/artists/:id" element={!isLogin ?  <Login setIsLogin={setIsLogin} /> :<ArtistDetails />} />
                  <Route
                    path="/podcasts/:podcastid"
                    element={!isLogin ?  <Login setIsLogin={setIsLogin} /> :<PodcastDetails />}
                  />
                  <Route path="/search/:searchTerm" element={!isLogin ?  <Login setIsLogin={setIsLogin} /> :<Search />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              { isLogin && <div className="xl:sticky relative top-0 h-fit">
                <TopPlay />
              </div>}
            </div>
          </div>

          {isLogin && activePodcast?.name && activePodcast?.type === "audio" && (
            <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
              <MusicPlayer />
            </div>
          )}

          { isLogin && isVideoPlaying &&
            activePodcast?.name &&
            activePodcast?.type === "video" && (
              <div className="absolute h-28 top-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                <VideoPlayer />
              </div>
            )}
        </div>
      
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default App;
