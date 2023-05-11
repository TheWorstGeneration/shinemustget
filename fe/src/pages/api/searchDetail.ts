import { MANDALART_SEARCH_DETAIL } from "@/constants/queryKey";
import axios from "axios";

interface podoId { id: number }

const searchDetail = async (props:number) => {
  const data = await axios.get<podoId>(MANDALART_SEARCH_DETAIL + `${props}`).then(res => res.data);
  
  return data;
}
 
export default searchDetail;