import { MANDALART_CREATE } from '@/constants/queryKey';
import { customAxios } from '@/utils/axios';

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
  const data = await customAxios
    .post(MANDALART_CREATE, {
      title,
      bigRequestDto,
    })
    .then(res => res.data);

  return data;
};
