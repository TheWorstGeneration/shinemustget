import axios from 'axios';

const getKakaoLogout = async () => {
  await axios.get(`https://shinemustget.com/api/kakaoLogout`, {
    headers: {
      // id: 2762543073,
    },
  });
};

export default getKakaoLogout;
