import { MEMBER_INFO } from '@/constants/queryKey';
import axios from 'axios';

interface MemberInfo {
  imageUrl: string;
  nickname: string;
}

const getMemberInfo = async () => {
  const data = await axios
    .get<MemberInfo>(MEMBER_INFO)
    .then(res => res.data);

  return data;
};

export default getMemberInfo;
