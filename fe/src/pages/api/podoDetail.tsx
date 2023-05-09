import axios from "axios";

interface podoId { id: number }

const podoDetail = async (props:number) => {
  const data = await axios.get(`https://shinemustget.com/api/podo/detail/${props}`, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);

  return data;
}
 
export default podoDetail;