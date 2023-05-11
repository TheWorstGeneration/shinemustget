import { PODO_READ_PODO } from "@/constants/queryKey";
import { customAxios } from "@/utils/axios";

interface podoId { id: number }

const podoRead = async (props:number) => {
  const data = await customAxios.get<podoId>(PODO_READ_PODO+`${props}`).then(res => res.data);

  return data;
}
 
export default podoRead;