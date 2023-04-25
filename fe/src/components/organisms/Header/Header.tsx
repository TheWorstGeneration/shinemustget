import { usePageYOffset } from '../../../hooks/usePageYOffset';
import { KakaoButton } from '../../atoms/KakaoButton/KakaoButton';
import { LanguageButton } from '../../atoms/LanguageButton/LanguageButton';
import { LogoutButton } from '../../atoms/LogoutButton/LogoutButton';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import styled from '@emotion/styled';

interface HeaderProps {
  size: 'sm' | 'lg';
  isLogin: boolean;
  language: 'ko' | 'en';
}

const HeadContainer = styled.header<{ isScroll: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  width: 100%;
  height: 5.5rem;
  padding: 0 10rem;

  backdrop-filter: ${({ isScroll }) => (isScroll ? 'blur(10px)' : 'none')};
  background-color: ${({ isScroll }) =>
    isScroll ? 'rgba(255, 255, 255, 0.25)' : 'transparent'};

  @media (max-width: 960px) {
    padding: 0 1rem;
  }
`;

const HeaderItemList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    margin-left: 1rem;
  }
`;

export const Header = ({ size, isLogin, language }: HeaderProps) => {
  const isScroll = usePageYOffset() > 700;

  return isLogin ? (
    <HeadContainer isScroll={isScroll}>
      <div>Logo</div>
      <HeaderItemList>
        <LanguageButton size={size} language={language} />
        <LogoutButton />
        <ProfileImage />
      </HeaderItemList>
    </HeadContainer>
  ) : (
    <HeadContainer isScroll={isScroll}>
      <div>Logo</div>
      <HeaderItemList>
        <LanguageButton size={size} language={language} />
        <KakaoButton size={size} />
      </HeaderItemList>
    </HeadContainer>
  );
};
