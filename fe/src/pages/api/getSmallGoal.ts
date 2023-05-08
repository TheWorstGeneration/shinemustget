import axios from 'axios';

interface SmallGoal {
  [key: string] : string[]
}

const getSmallGoal = async (bigGoal: string[]) => {
  const data = await axios.post<SmallGoal>("https://shinemustget.com/api/mandalart/small-goal", {
      bigGoal: bigGoal
  },{
        headers: {
        id: 2762543073,
        },
  }).then(res => res.data);
  return data;
};

export default getSmallGoal;