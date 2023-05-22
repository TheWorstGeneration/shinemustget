import { Character } from '../../../atoms/Character/Character';
import { CHARACTERS } from '../../../../constants/characters';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';

const SectionStyle = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;

  z-index: 1;

  width: 100vw;
  height: 100vh;

  margin-top: 100vh;

  background-color: #ffffff;
`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2;

  width: 15rem;
  height: 15rem;

  &:hover {
    scale: 1.2;
  }

  @media screen and (max-width: 500px) {
    width: 5rem;
    height: 5rem;
  }
`;

export const CharacterSection = () => {
  const [characterIndex, setCharacterIndex] = useState(0);
  const { koName, enName, image } = CHARACTERS[characterIndex];

  const { language } = useAppSelector(selectProfile);

  const handlePrevClick = () => {
    setCharacterIndex(
      characterIndex - 1 < 0 ? CHARACTERS.length - 1 : characterIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCharacterIndex((characterIndex + 1) % CHARACTERS.length);
  };

  return (
    <SectionStyle id="character">
      <ButtonContainer
        type="button"
        title="previous character"
        onClick={handlePrevClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} size={'2x'} />
      </ButtonContainer>
      <Character src={image} alt={language === 'ko' ? koName : enName} />
      <ButtonContainer
        type="button"
        title="next character"
        onClick={handleNextClick}
      >
        <FontAwesomeIcon icon={faChevronRight} size={'2x'} />
      </ButtonContainer>
    </SectionStyle>
  );
};