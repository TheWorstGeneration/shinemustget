import styled from '@emotion/styled';
import Image from 'next/image';
import grapeUrl from '../../../../public/assets/images/grapeBoard/grape_board.png';

export default function GrapeBoard() {
  const ImageContainer = styled.div``;

  const GrapeContainer = styled.div`
    margin-bottom: 16rem;
  `;

  return (
    <>
      <ImageContainer>
        <Image
          src={grapeUrl}
          width={325}
          height={400}
          placeholder="blur"
          alt="image"
        ></Image>
      </ImageContainer>
    </>
  );
}
