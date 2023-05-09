import { MANDALART_CREATE } from '@/constants/queryKey';
import axios from 'axios';

interface smallRequestDto {
  content: string;
  location: number;
}

interface bigRequestDto {
  content: string;
  location: number;
  smallRequestDto: smallRequestDto[];
}

interface PostCreateProps {
  title: string;
  bigRequestDto: bigRequestDto[];
}

export const postCreate = async ({ title, bigRequestDto }: PostCreateProps) => {
  const data = await axios
    .post(MANDALART_CREATE, {
      title,
      bigRequestDto,
    }, {
        headers: {
        id: 2762543073,
        },
    })
    .then(res => res.data);

  return data;
};
