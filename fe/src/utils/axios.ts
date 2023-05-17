import axios from 'axios';

export const customAxios = axios.create({
  headers: {
    // id: process.env.NODE_ENV === 'development' ? 2765572513 : null,
    // id: process.env.NODE_ENV === 'development' ? 2762543073 : null,
    id: process.env.NODE_ENV === 'development' ? 2765558388 : null,
  },
});
