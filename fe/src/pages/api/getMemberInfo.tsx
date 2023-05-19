import { MEMBER_INFO } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

interface MemberInfo {
  imageUrl: string;
  nickname: string;
}

const getMemberInfo = async () => {
  const data = await customAxios
    .get<MemberInfo>(MEMBER_INFO)
    .then(res => res.data);

  return data;
};

export default getMemberInfo;
