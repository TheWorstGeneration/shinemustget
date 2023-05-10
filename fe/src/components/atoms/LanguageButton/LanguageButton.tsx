import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectProfile, setLanguage } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';

interface LanguageButtonProps {
  size: string;
}

const LargeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7rem;
  height: 3rem;
  border: solid 1px #222222;
  border-radius: 0.5rem;
  background-color: #ffffff;
  padding: 0.5rem 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: solid 1px #222222;
  border-radius: 1.5rem;
  background-color: #ffffff;
  padding: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const LanguageButton = ({ size }: LanguageButtonProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { language } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const handleLanguage = () => {
    dispatch(setLanguage(language == 'ko' ? 'en' : 'ko'));
  };

  return pathname !== '/' ? null : size === 'lg' ? (
    <LargeButton type="button" onClick={handleLanguage} title="Change Language">
      <FontAwesomeIcon icon={faGlobe} />
      <span>{language == 'ko' ? '한국어' : 'English'}</span>
    </LargeButton>
  ) : (
    <SmallButton type="button" onClick={handleLanguage} title="Change Language">
      <FontAwesomeIcon icon={faGlobe} />
    </SmallButton>
  );
};
