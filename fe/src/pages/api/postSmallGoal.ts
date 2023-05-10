import { MANDALART_SMALL_GOAL } from '@/constants/queryKey';
import axios from 'axios';

interface SmallGoalList {
  [bigGoal: string] : string[];
}

const postSmallGoal = async (bigGoal: string[]) => {
  const data = await axios
    .post<SmallGoalList>(
      MANDALART_SMALL_GOAL,
      {
        bigGoal,
      },
      {
        headers: {
          id: 2762543073,
        },
      },
    )
    .then(res => res.data);
  return data;
};

export default postSmallGoal;
