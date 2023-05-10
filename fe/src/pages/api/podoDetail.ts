import { PODO_CREATE } from "@/constants/queryKey";
import axios from "axios";

interface podoId { id: number }

const podoDetail = async (props:number) => {
  const data = await axios.get(PODO_CREATE).then(res => res.data);

  return data;
}
 
export default podoDetail;