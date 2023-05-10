import axios from "axios";

interface podoId { id: number }

const searchDetail = async (props:number) => {
  const data = await axios.post<podoId>(`https://shinemustget.com/api/podo/setting/${props}`, {}, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);
  
  return data;
}
 
export default searchDetail;