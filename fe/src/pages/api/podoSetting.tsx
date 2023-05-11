import { PODO_CREATE } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

interface podoId {
  id: number;
}

const podoSetting = async (props: number) => {
  const data = await customAxios
    .post<podoId>(PODO_CREATE + `/${props}`, {})
    .then(res => res.data);

  console.log('data', data);

  return data;
};

export default podoSetting;
