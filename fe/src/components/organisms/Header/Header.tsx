import { KakaoButton } from '../../atoms/KakaoButton/KakaoButton';
import { LanguageButton } from '../../atoms/LanguageButton/LanguageButton';
import { LogoutButton } from '../../atoms/LogoutButton/LogoutButton';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import styled from '@emotion/styled';
import React from 'react';

interface HeaderProps {
  size: 'sm' | 'lg';
  isLogin: boolean;
  language: 'ko' | 'en';
}

const HeadContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.5rem;
  padding: 0 10rem;

  @media (max-width: 960px) {
    padding: 0 1rem;
  }
`;

const HeaderItemList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    margin-right: 1rem;
  }
`;

export const Header = ({ size, isLogin, language }: HeaderProps) => {
  return isLogin ? (
    <HeadContainer>
      <div>Logo</div>
      <HeaderItemList>
        <LanguageButton size={size} language={language} />
        <LogoutButton />
        <ProfileImage />
      </HeaderItemList>
    </HeadContainer>
  ) : (
    <HeadContainer>
      <div>Logo</div>
      <HeaderItemList>
        <LanguageButton size={size} language={language} />
        <KakaoButton size={size} />
      </HeaderItemList>
    </HeadContainer>
  );
};
