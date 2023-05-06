import axios from 'axios';

interface SmallGoalList {
  smallGoalList: string[];
}

const getSmallGoal = async (bigGoal: string[]) => {
  const data = await axios.get("https://shinemustget.com/api/mandalart/small-goal", {
    params: {
      bigGoal: bigGoal
    }
  }).then(res => res.data);
  return data;
};

export default getSmallGoal;