import { MANDALART_CLEAR } from '@/constants/queryKey';
import axios from 'axios';

interface podoId {
  id: number;
}

const mandalartClear = async (props: number) => {
  const data = await axios
    .post<podoId>(`${MANDALART_CLEAR}/${props}`, {})
    .then(res => res.data);

  return data;
};

export default mandalartClear;
