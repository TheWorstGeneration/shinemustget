import axios from "axios";

interface podoCreate { 
  id: number,
  imageUrl: String,
  oneline:String
}

const podoWrite = async ( props:podoCreate) => {
  const data =  await axios.post<podoCreate>(`https://shinemustget.com/api/podo/write`, {
      id: props.id,
      imageUrl: props.imageUrl,
      oneline:props.oneline,
    }, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);

  return data;
}
 
export default podoWrite;