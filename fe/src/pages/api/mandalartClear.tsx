import { MANDALART_CLEAR } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

const mandalartClear = async (props: number) => {
  await customAxios.post(`${MANDALART_CLEAR}/${props}`, {});
};

export default mandalartClear;
