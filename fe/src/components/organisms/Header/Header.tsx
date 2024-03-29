import { usePageYOffset } from '../../../hooks/usePageYOffset';
import { KakaoButton } from '../../atoms/KakaoButton/KakaoButton';
import { LanguageButton } from '../../atoms/LanguageButton/LanguageButton';
import { LogoutButton } from '../../atoms/LogoutButton/LogoutButton';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import styled from '@emotion/styled';
import { Logo } from '@/components/atoms/Logo/Logo';
import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile, setLogin } from '@/store/modules/profile';
import { useRouter } from 'next/router';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import { SearchBar } from '@/components/atoms/SearchBar/SearchBar';

const HeadContainer = styled.header<{ isScroll: boolean; size: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100vw;
  height: 5.5rem;
  padding: 0 10rem;

  backdrop-filter: ${({ isScroll }) => (isScroll ? 'blur(10px)' : 'none')};
  background-color: ${({ isScroll }) =>
    isScroll ? 'rgba(255, 255, 255, 0.25)' : 'transparent'};
  box-shadow: ${({ isScroll }) =>
    isScroll ? '0 0.5rem .5rem 0 rgba(0, 0, 0, 0.10)' : 'none'};

  transition: padding 0s;

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

export const Header = () => {
  const router = useRouter();
  const changeYOffset = router.asPath === '/' ? 700 : 0;

  const size = useInnerWidth() > 500 ? 'lg' : 'sm';
  const isScroll = usePageYOffset() > changeYOffset;
  const { isLogin } = useAppSelector(selectProfile);

  return isLogin ? (
    <HeadContainer isScroll={isScroll} size={size}>
      <Logo />
      <HeaderItemList>
        <SearchBar />
        <LogoutButton />
        <ProfileImage />
      </HeaderItemList>
    </HeadContainer>
  ) : (
    <HeadContainer isScroll={isScroll} size={size}>
      <Logo />
      <HeaderItemList>
        <LanguageButton size={size} />
        <KakaoButton size={size} />
      </HeaderItemList>
    </HeadContainer>
  );
};
