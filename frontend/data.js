import axios from 'axios';

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
        'Authorization': `Bearer ${token} `,
      },
    };
    return await axios
      .get(`http://localhost:5000/api/podcast/${id}`, config)
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
};
export const getArtist = async (token, id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `,
      },
    };
    return await axios
      .get(`http://localhost:5000/api/user/${id}`, config)
      .then((res) => res.data)
      .catch(err => console.log(err))
  } catch (error) {
    console.log(error);
  }
};
