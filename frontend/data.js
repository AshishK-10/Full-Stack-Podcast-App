import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPodcasts } from './src/redux/features/podcastSlice';

export const getAllPodcasts = async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `,
      },
    };
    return await axios
      .get('http://localhost:5000/api/podcast', config)
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};
export const getPodcast = async (token, id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token} `,
      },
    };
    return await axios
      .get(`http://localhost:5000/api/podcast/${id}`, config)
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};
