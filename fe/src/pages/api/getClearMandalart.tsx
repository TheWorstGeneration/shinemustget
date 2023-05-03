import axios from 'axios';

interface ClearMandalart {
  id: number;
  searchDto: SearchDto;
}

interface SearchDto {
  likeCnt: number;
  isLike: boolean;
  title: string;
  bigList: SearchBigDto[];
}

interface SearchBigDto {
  content: string;
  location: number;
}

const getClearMandalart = async () => {
  const data = await axios
    .get<ClearMandalart[]>(
      `https://shinemustget.com/api/profile/readClearMandalart`,
      {
        headers: {
          id: 2762543073,
        },
      },
    )
    .then(res => res.data);

  return data;
};

export default getClearMandalart;
