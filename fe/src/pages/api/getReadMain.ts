import { MANDALART_READ_MAIN } from '@/constants/queryKey';
import axios from 'axios';

export const getReadMain = async () => {
  const data = await axios
    .get(MANDALART_READ_MAIN, {
      headers: {
        id: 2762543073,
      },
    })
    .then(res => res.data);
  return data;
};
