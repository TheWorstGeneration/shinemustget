import Image from 'next/image';
import grapeUrl from '../../../../public/assets/images/grapeBoard/grape_board.png';

export default function GrapeBoard() {
  return <Image src={grapeUrl} width={325} height={400} alt="image" />;
}
