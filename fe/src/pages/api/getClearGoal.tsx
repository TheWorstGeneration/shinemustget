import { MANDALART_READ_CLEAR_GOAL } from '@/constants/queryKey';
import axios from 'axios';

interface CompletedLogs {
  content: string;
  clearAt: string;
}

const getClearGoal = async () => {
  const data = await axios
    .get<CompletedLogs[]>(MANDALART_READ_CLEAR_GOAL, {
      headers: {
        id: 2762543073,
      },
    })
    .then(res => res.data);

  return data;
};

export default getClearGoal;
