/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function toDiscover() {
    navigate('/discover');
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.info('Please enter complete details');
      setLoading(false);
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
          `${import.meta.env.VITE_BASE_URL}/user/login`,
          { email, password },
          config
        )
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          localStorage.setItem('loggedIn', JSON.stringify(true));
          toast.success('Login Success');
          setLoading(false);
          setIsLogin(true);
          toDiscover();
        })
        .catch((err) => toast.error('Something went wrong', err));
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden shadow-xl bg-gradient-to-br from-violet-400 to-indigo-600 ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-4xl font-bold text-center text-purple-700">
          Login
        </h1>
        <form className="mt-6" autoComplete="off">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full text-lg sm:text-2xl px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={submitHandler}
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <Link
            to="/signup"
            component={<Signup />}
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
