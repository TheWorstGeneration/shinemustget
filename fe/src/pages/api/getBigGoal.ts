import axios from 'axios';

type BigGoal = string;

export interface BigGoalDTO {
    [title: string] : BigGoal[];
}

const getBigGoal = async (content: string) => {
  const data = await axios
    .get<BigGoalDTO>(`https://shinemustget.com/api/mandalart/big-goal/${content}`,{
        headers: {
        id: 2762543073,
        },
    }).then(res => res.data);
  return data;
};

export default getBigGoal;