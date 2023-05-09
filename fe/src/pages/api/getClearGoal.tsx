import axios from 'axios';

interface CompletedLogs {
  content: string;
  clearAt: string;
}

const getClearGoal = async () => {
  const data = await axios
    .get<CompletedLogs[]>(
      `https://shinemustget.com/api/profile/readClearGoal`,
      {
        headers: {
          id: 2762543073,
        },
      },
    )
    .then(res => res.data);

  return data;
};

export default getClearGoal;
