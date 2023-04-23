import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = ({ setIsLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function toDiscover() {
    navigate('/discover');
  }

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warn('Pic is undefined');
      setLoading(false);
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'podcastApp');
      data.append('cloud_name', 'dnsbti7cd');

      // put this url in the env of react

      fetch('https://api.cloudinary.com/v1_1/dnsbti7cd/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success('Profile pic Uploaded');
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          toast.error('Something went wrong');
          setLoading(false);
          return;
        });
    } else {
      toast.error('Please upload only image files');
      setLoading(false);
      return;
    }
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password) {
      toast.warn('Please enter all the details');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios
        .post(
          'http://localhost:5000/api/user',
          { name, email, password, pic },
          config
        )
        .then((res) => toast.success(`Welcome ${res.name}`));

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      setIsLogin(true);
      toDiscover();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden shadow-xl bg-green-500">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-4xl font-bold text-center text-purple-700">
          Sign up
        </h1>
        <form className="mt-6" autoComplete="off">
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label
              for="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-2">
            <label
              for="pic"
              className="block text-sm font-semibold text-gray-800"
            >
              Profile Image
            </label>
            <input
              id="pic"
              type="file"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
          </div>

          <div className="mt-6">
            <button
              className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 
               disabled:bg-purple-200 disabled:cursor-not-allowed`}
              disabled={loading}
              onClick={submitDetails}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Already have an account?{' '}
          <Link to="/" className="font-medium text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
