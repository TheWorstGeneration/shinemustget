import { MANDALART_BIG_GOAL } from '@/constants/queryKey';
import axios from 'axios';

type BigGoal = string;

export interface BigGoalDTO {
    [title: string] : BigGoal[];
}

const getBigGoal = async (content: string) => {
  const data = await axios
    .get<BigGoalDTO>(`${MANDALART_BIG_GOAL}/${content}`).then(res => res.data);
  return data;
};

export default getBigGoal;
