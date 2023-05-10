import axios from "axios";
import { PODO_CREATE } from "@/constants/queryKey";

interface podoId { id: number }

const podoSetting = async (props:number) => {
  const data = await axios.post<podoId>(PODO_CREATE+`${props}`, {}, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);

  console.log("data", data);

  return data;
}
 
export default podoSetting;