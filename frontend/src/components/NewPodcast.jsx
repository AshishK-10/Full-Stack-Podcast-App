import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getAllPodcasts } from '../../data';
import { useDispatch } from 'react-redux';
import { setPodcasts } from '../redux/features/podcastSlice';

const NewPodcast = ({ setNewPodcast }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [type, setType] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  function toPodcast(id) {
    console.log(id);
    navigate(`/songs/${id}`);
  }

  useEffect(() => {
    const { _id, token } = JSON.parse(localStorage.getItem('userInfo'));
    setArtist(_id);
    setToken(token);
  }, []);

  // console.log('details', details);

  const handleFile = (podcastFile) => {
    setLoading(true);
    if (podcastFile === undefined) {
      console.log('pic is undefined'); // change to toast
      setLoading(false);
      return;
    }
    console.log(podcastFile.type);
    if (podcastFile.type === 'audio/mpeg') setType('audio');
    else if (podcastFile.type === 'video/mp4') setType('video');

    if (podcastFile.type === 'audio/mpeg' || podcastFile.type === 'video/mp4') {
      const data = new FormData();
      data.append('file', podcastFile);
      data.append('upload_preset', 'podcastApp');
      data.append('cloud_name', 'dnsbti7cd');

      // put this url in the env of react

      fetch('https://api.cloudinary.com/v1_1/dnsbti7cd/video/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFile(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          return;
        });
    } else {
      console.log('this is the not the image file'); // change to toast
      setLoading(false);
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !description || !file) {
      console.log('please enter all the details'); //change to toast
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token} `,
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/podcast',
        { name, description, file, type, artist },
        config
      );
      // toast of successful
      const podData = await getAllPodcasts(token);
      dispatch(setPodcasts(podData));
      localStorage.setItem('podcastData', JSON.stringify(data));
      setLoading(false);

      // move to the main page -> success
      toPodcast(data._id);
    } catch (error) {
      console.log(error); // toast to display error!
      setLoading(false);
    }
  };

  return (
    <div>
      <>
        <div className="min-w-screen min-h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-[90%] max-h-screen mt-20 h-[500px] max-w-2xl p-12 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <span
              className="absolute top-2 right-3 cursor-pointer bg-cyan-500 text-white text-lg text-center font-bold  w-8 h-8 rounded-full"
              onClick={() => setNewPodcast(false)}
            >
              X
            </span>
            <form className="mt-6" autoComplete="off">
              <div className="mb-2">
                <label
                  for="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  for="description"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  for="file"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Podcsat File
                </label>
                <input
                  id="file"
                  type="file"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  onChange={(e) => {
                    handleFile(e.target.files[0]);
                  }}
                />
              </div>
              <div className="mt-6">
                <button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 disabled:bg-purple-200 disabled:cursor-not-allowed"
                  disabled={loading}
                  onClick={submitHandler}
                >
                  Add Podcast
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewPodcast;
