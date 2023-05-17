import { MANDALART_SEARCH_DETAIL } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

interface podoId {
  id: number;
}

const searchDetail = async (props: string | string[] | undefined) => {
  const data = await customAxios
    .get<podoId>(MANDALART_SEARCH_DETAIL + `/${props}`)
    .then(res => res.data);

  return data;
};

export default searchDetail;
