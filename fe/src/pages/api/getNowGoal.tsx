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
    .get<ProgressProp>(`https://shinemustget.com/api/profile/readNowGoal`, {
      headers: {
        id: 2762543073,
      },
    })
    .then(res => res.data);

  return data;
};

export default getNowGoal;
