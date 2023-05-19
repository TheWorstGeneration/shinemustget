import { MANDALART_SMALL_GOAL } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

interface SmallGoalList {
  [bigGoal: string]: string[];
}

const postSmallGoal = async (bigGoal: string[]) => {
  const data = await customAxios
    .post<SmallGoalList>(MANDALART_SMALL_GOAL, {
      bigGoal,
    })
    .then(res => res.data)
    .catch(err => {
      alert('저희의 ChatGPT 사용요금이 예상 범위를 뛰어 넘어 버렸습니다. 😭');
    });

  return data;
};

export default postSmallGoal;
