import { KAKAO_LOGOUT } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

const getKakaoLogout = async () => {
  await customAxios.get(KAKAO_LOGOUT);
};

export default getKakaoLogout;
