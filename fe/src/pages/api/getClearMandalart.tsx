import { MANDALART_READ_CLEAR_MANDALART } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

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
  const data = await customAxios
    .get<ClearMandalart[]>(MANDALART_READ_CLEAR_MANDALART)
    .then(res => res.data);

  return data;
};

export default getClearMandalart;
