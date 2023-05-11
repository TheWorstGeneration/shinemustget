import axios from "axios";
import { PODO_READ_PODO } from "@/constants/queryKey";

interface podoId { id: number }

const podoRead = async (props:number) => {
  const data = await axios.get<podoId>(PODO_READ_PODO+`${props}`).then(res => res.data);

  return data;
}
 
export default podoRead;