import axios from 'axios';

const getKakaoLogout = async () => {
  await axios.get(`https://shinemustget.com/api/auth/kakao/logout`);
};

export default getKakaoLogout;
