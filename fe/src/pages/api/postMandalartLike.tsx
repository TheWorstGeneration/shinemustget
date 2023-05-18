import { MANDALART_LIKE } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

const mandalartLike = async (id: number) => {
  const data = await customAxios
    .post<number>(MANDALART_LIKE + `${id}`)
    .then(res => res.data);

  return data;
};

export default mandalartLike;
