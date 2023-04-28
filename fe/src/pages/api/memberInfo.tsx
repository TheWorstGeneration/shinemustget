import axios from 'axios';

const getMemberInfo = async () => {
  const data = await axios
    .get('https://shinemustget.com/api/memberInfo')
    .then(res => {
      return res.data;
    });

  return data;
};

export default getMemberInfo;
