import { useAppSelector } from '@/hooks/useRedux';
import { usePageYOffset } from '../../../hooks/usePageYOffset';
import { KakaoButton } from '../../atoms/KakaoButton/KakaoButton';
import { LanguageButton } from '../../atoms/LanguageButton/LanguageButton';
import { LogoutButton } from '../../atoms/LogoutButton/LogoutButton';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import styled from '@emotion/styled';
import { selectProfile } from '@/store/modules/profile';
import { Logo } from '@/components/atoms/Logo/Logo';

interface HeaderProps {
  size: string;
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
  box-shadow: ${({ isScroll }) =>
    isScroll ? '0 0.5rem .5rem 0 rgba(0, 0, 0, 0.10)' : 'none'};

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

export const Header = ({ size }: HeaderProps) => {
  const { imageUrl } = useAppSelector(selectProfile);
  const isScroll = usePageYOffset() > 700;

  return imageUrl ? (
    <HeadContainer isScroll={isScroll}>
      <Logo />
      <HeaderItemList>
        <LanguageButton size={size} />
        <LogoutButton />
        <ProfileImage />
      </HeaderItemList>
    </HeadContainer>
  ) : (
    <HeadContainer isScroll={isScroll}>
      <Logo />
      <HeaderItemList>
        <LanguageButton size={size} />
        <KakaoButton size={size} />
      </HeaderItemList>
    </HeadContainer>
  );
};
