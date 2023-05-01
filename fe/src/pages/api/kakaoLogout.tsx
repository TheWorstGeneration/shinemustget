import axios from 'axios';

const getKakaoLogout = async () => {
  await axios.get(`https://shinemustget.com/api/kakaoLogout`);
};

export default getKakaoLogout;
