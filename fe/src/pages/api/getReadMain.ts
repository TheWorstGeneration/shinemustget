import { MANDALART_READ_MAIN } from '@/constants/queryKey';
import axios from 'axios';

export const getReadMain = async () => {
  const data = await axios
    .get(MANDALART_READ_MAIN)
    .then(res => res.data);
  return data;
};
