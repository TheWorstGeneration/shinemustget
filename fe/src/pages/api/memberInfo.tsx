import axios from 'axios';

const getMemberInfo = async () => {
  const res = await axios.get('https://shinemustget.com/api/memberInfo');

  return res.data;
};

export default getMemberInfo;
