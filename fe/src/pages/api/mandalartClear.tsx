import axios from "axios";

interface podoId { id: number }

const mandalartClear = async (props:number) => {
  const data = await axios.post<podoId>(`https://shinemustget.com/api/mandalart/clear/${props}`, {}, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);

  return data;
}
 
export default mandalartClear;