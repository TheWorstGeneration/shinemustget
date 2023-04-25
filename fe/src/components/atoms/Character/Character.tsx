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

const You = styled.h2`
  position: relative;

  font-size: 3rem;
  font-weight: 600;
`;

const CharacterImage = styled(Image)`
  position: absolute;
  object-fit: contain;
`;

const Dim = styled.div`
  position: absolute;
  top: 150vh;
  left: 0;

  width: 100%;
  height: 50vh;

  background: linear-gradient(
    to top,
    rgba(255, 255, 255) 50%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const Name = styled.h1`
  position: absolute;
  top: 170vh;
  left: 50%;

  font-size: 5rem;
  font-weight: bold;

  transform: translateX(-50%);
`;

export const Character = ({ src, alt }: CharacterProps) => {
  return (
    <ImageContainer>
      <You>당신도</You>
      <CharacterImage src={src} width={500} height={500} alt={alt} />
      <Dim />
      <Name>{alt}.</Name>
    </ImageContainer>
  );
};
