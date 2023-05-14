import { MANDALART_SEARCH } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

interface SearchDto {
  id: number;
  likeCnt: number;
  isLike: boolean;
  title: string;
  bigList: SearchBigDto[];
}

interface SearchBigDto {
  content: string;
  location: number;
}

const getSearch = async (
  queryKey: string | string[] | undefined,
  page: number,
) => {
  const data = await customAxios
    .get<SearchDto[]>(MANDALART_SEARCH + queryKey + `/${page}`)
    .then(res => res.data);

  console.log('axios search');

  return data;
};

export default getSearch;
