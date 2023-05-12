import { MANDALART_SEARCH_DETAIL } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

interface podoId {
  id: number;
}

const searchDetail = async (props: number) => {
  const data = await customAxios
    .get<podoId>(MANDALART_SEARCH_DETAIL + `/${props}`)
    .then(res => res.data);

  console.log(data, 'data');
  return data;
};

export default searchDetail;
