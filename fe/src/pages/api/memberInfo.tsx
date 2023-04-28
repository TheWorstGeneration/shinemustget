import axios from 'axios';

interface MemberInfo {
  imageUrl: string;
  nickname: string;
}

const getMemberInfo = async () => {
  const data = await axios
    .get<MemberInfo>(`https://shinemustget.com/api/memberInfo`)
    .then(res => res.data);

  return data;
};

export default getMemberInfo;
