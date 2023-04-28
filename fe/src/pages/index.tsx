import { Navigator } from '@/components/atoms/Navigator/Navigator';
import { CharacterSection } from '@/components/organisms/sections/Character/CharacterSection';
import { LoginSection } from '@/components/organisms/sections/Login/LoginSection';
import { VideoSection } from '@/components/organisms/sections/Video/VideoSection';
import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
import { getCookie } from '@/utils/cookie';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Landing() {
  const router = useRouter();
  const { isLogin } = useAppSelector(selectProfile);

  useEffect(() => {
    if (isLogin) {
      router.push('/home');
    }
  }, [isLogin]);

  return (
    <MainContainer>
      <Navigator />
      <VideoSection />
      <CharacterSection />
      <LoginSection />
    </MainContainer>
  );
}
