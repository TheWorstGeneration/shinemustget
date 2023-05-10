import { MANDALART_SEARCH_DETAIL } from "@/constants/queryKey";
import axios from "axios";

interface podoId { id: number }

const searchDetail = async (props:number) => {
  const data = await axios.post<podoId>(MANDALART_SEARCH_DETAIL+`${props}`, {}, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);
  
  return data;
}
 
export default searchDetail;