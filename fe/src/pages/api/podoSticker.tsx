import { PODO_MY_STICKER } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

const podoSticker = async () => {
  const data = await customAxios.get(PODO_MY_STICKER).then(res => res.data);

  return data;
};

export default podoSticker;
