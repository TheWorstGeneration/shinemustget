import axios from 'axios';

export const customAxios = axios.create({
  headers: {
    id: process.env.NODE_ENV === 'development' ? 2765410035 : null,
  },
});
