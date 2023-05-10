import { KAKAO_LOGOUT } from '@/constants/queryKey';
import axios from 'axios';

const getKakaoLogout = async () => {
  await axios.get(KAKAO_LOGOUT, {
    headers: {
      id: 2762543073,
    },
  });
};

export default getKakaoLogout;
