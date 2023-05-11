import { MANDALART_READ_MAIN } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';
import { useRouter } from 'next/router';

export const getReadMain = async () => {
  const router = useRouter();

  const data = await customAxios
    .get(MANDALART_READ_MAIN)
    .then(res => res.data)
    .catch(() => router.push('/create'));
  return data;
};
