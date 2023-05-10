import { MANDALART_READ_NOW_GOAL } from '@/constants/queryKey';
import axios from 'axios';

interface Goal {
  content: string;
  isClear: boolean;
}

interface ProgressProp {
  title: string;
  rate: number;
  nowBigGoalDtoList: Goal[];
}

const getNowGoal = async () => {
  const data = await axios
    .get<ProgressProp>(MANDALART_READ_NOW_GOAL, {
      headers: {
        id: 2762543073,
      },
    })
    .then(res => res.data);

  return data;
};

export default getNowGoal;
