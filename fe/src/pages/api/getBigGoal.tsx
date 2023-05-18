import { MANDALART_BIG_GOAL } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

type BigGoal = string;

export interface BigGoalDTO {
  [title: string]: BigGoal[];
}

const getBigGoal = async (content: string) => {
  const data = await customAxios
    .get<BigGoalDTO>(`${MANDALART_BIG_GOAL}/${content}`)
    .then(res => res.data)
    .catch(err => {
      alert('저희의 ChatGPT 사용요금이 예상 범위를 뛰어 넘어 버렸습니다. 😭');
    });
  return data;
};

export default getBigGoal;
