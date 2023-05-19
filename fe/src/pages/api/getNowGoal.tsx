import { MANDALART_READ_NOW_GOAL } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';
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
  const data = await customAxios
    .get<ProgressProp>(MANDALART_READ_NOW_GOAL)
    .then(res => res.data);

  return data;
};

export default getNowGoal;
