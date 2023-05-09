import axios from "axios";

interface podoId { id: number }

const podoIdSetting = async (props:number) => {
  const data = await axios.get<podoId>(`https://shinemustget.com/api/podo/setting/${props}`, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);

  return data;
}
 
export default podoIdSetting;