import { MANDALART_DELETE } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

export const deleteMandalart = async () => {
  await customAxios.get(MANDALART_DELETE).then(res => {
    console.log(res);
  });
};
