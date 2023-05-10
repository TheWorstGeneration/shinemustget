import { PODO_CREATE, PODO_DETAIL } from "@/constants/queryKey";
import axios from "axios";

interface podoId { id: number }

const podoDetail = async (props:number) => {
  const data = await axios.get(PODO_DETAIL+`${props}`).then(res => res.data);

  return data;
}
 
export default podoDetail;