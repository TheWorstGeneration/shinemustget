import { PODO_MY_STICKER } from "@/constants/queryKey";
import axios from "axios";

const podoSticker = async () => {
  const data = await axios.get(PODO_MY_STICKER).then(res => res.data);

  return data;
}
 
export default podoSticker;