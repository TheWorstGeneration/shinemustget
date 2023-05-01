import axios, { AxiosRequestConfig } from 'axios';

interface MemberInfo {
  imageUrl: string;
  nickname: string;
}

const getMemberInfo = async () => {
  const data = await axios
    .get<MemberInfo>(`https://shinemustget.com/api/memberInfo`, {
      headers: {
        id: 2762543073,
      },
    })
    .then(res => res.data);

  return data;
};

export default getMemberInfo;
