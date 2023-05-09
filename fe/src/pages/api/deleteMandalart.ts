import { MANDALART_DELETE } from '@/constants/queryKey';
import axios from 'axios';

export const deleteMandalart = async () => {
  await axios.get(MANDALART_DELETE, {
    headers: {
      id: 2762543073,
    },
  });
};
