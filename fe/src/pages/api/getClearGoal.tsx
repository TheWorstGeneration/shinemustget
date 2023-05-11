import { MANDALART_READ_CLEAR_GOAL } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';
import axios from 'axios';

interface CompletedLogs {
  content: string;
  clearAt: string;
}

const getClearGoal = async () => {
  const data = await customAxios
    .get<CompletedLogs[]>(MANDALART_READ_CLEAR_GOAL)
    .then(res => res.data);

  return data;
};

export default getClearGoal;
