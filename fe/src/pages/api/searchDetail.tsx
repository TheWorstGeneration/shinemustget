import { MANDALART_SEARCH_DETAIL } from "@/constants/queryKey";
import { customAxios } from "@/utils/axios";

interface podoId { id: number }

const searchDetail = async (props:number) => {
  const data = await customAxios.post<podoId>(MANDALART_SEARCH_DETAIL+`${props}`, {}).then(res => res.data);
  
  return data;
}
 
export default searchDetail;