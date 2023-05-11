import { MANDALART_READ_MAIN } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

export const getReadMain = async () => {
  const data = await customAxios.get(MANDALART_READ_MAIN).then(res => res.data);
  return data;
};
