import axios from "axios";

const podoSticker = async () => {
  const data = await axios.get(`https://shinemustget.com/api/podo/mySticker`, {
    headers: {
      id: 2762543073,
    },
  }).then(res => res.data);

  return data;
}
 
export default podoSticker;