import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

interface CharacterProps {
  src: string;
  alt: string;
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  width: 500px;
  height: 500px;
`;

const CharacterImage = styled(Image)`
  object-fit: contain;
`;

const Name = styled.h1`
  position: absolute;
  bottom: 100px;
  left: 50%;

  transform: translateX(-50%);
`;

export const Character = ({ src, alt }: CharacterProps) => {
  return (
    <ImageContainer>
      <h2>당신도</h2>
      <CharacterImage src={src} width={500} height={500} alt={alt} />
      <Name>{alt}.</Name>
    </ImageContainer>
  );
};
