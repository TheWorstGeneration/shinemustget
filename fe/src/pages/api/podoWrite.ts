import { PODO_WRITE } from "@/constants/queryKey";
import axios from "axios";

interface podoCreate { 
  id: number,
  imageUrl: String,
  oneline:String
}

const podoWrite = async ( props:podoCreate) => {
  const data =  await axios.post<podoCreate>(PODO_WRITE, {
      id: props.id,
      imageUrl: props.imageUrl,
      oneline:props.oneline,
    }).then(res => res.data);

  return data;
}
 
export default podoWrite;