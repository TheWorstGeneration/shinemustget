import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
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
  align-items: center;
  justify-content: space-between;

  width: 500px;
  height: 500px;

  @media screen and (max-width: 500px) {
    width: 200px;
    height: 200px;
  }
`;

const You = styled.h2`
  position: relative;
  width: 100%;

  font-size: 3rem;
  font-weight: 600;

  @media screen and (max-width: 960px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const CharacterImage = styled(Image)`
  position: absolute;
  object-fit: contain;
  width: 500px;
  height: 500px;

  @media screen and (max-width: 960px) {
    width: 400px;
    height: 400px;
  }
  @media screen and (max-width: 500px) {
    width: 200px;
    height: 200px;
  }
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

  @media screen and (max-width: 500px) {
    height: 20vh;
  }
`;

const Name = styled.h1`
  position: absolute;
  top: 170vh;
  left: 50%;

  font-size: 4rem;
  font-weight: bold;

  transform: translateX(-50%);

  @media screen and (max-width: 960px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
    top: 160vh;
  }
`;

export const Character = ({ src, alt }: CharacterProps) => {
  const { language } = useAppSelector(selectProfile);
  return (
    <ImageContainer>
      <You>{language == 'ko' ? '당신도' : 'You are next'}</You>
      <CharacterImage src={src} width={500} height={500} alt={alt} />
      <Dim />
      <Name>{alt}.</Name>
    </ImageContainer>
  );
};
