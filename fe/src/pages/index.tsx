import { Navigator } from '@/components/atoms/Navigator/Navigator';
import { CharacterSection } from '@/components/organisms/sections/Character/CharacterSection';
import { LoginSection } from '@/components/organisms/sections/Login/LoginSection';
import { VideoSection } from '@/components/organisms/sections/Video/VideoSection';
import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 100vw;
`;

export default function Landing() {
  const { isLogin } = useAppSelector(selectProfile);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/home');
    }
  }, [isLogin]);

  return (
    <>
      <Head>
        <title>Shine Must Get</title>
        <meta
          name="description"
          content="로그인 후 만다라트를 생성해 보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get" />
        <meta
          property="og:description"
          content="로그인 후 만다라트를 생성해 보세요."
        />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <MainContainer>
        <Navigator />
        <VideoSection />
        <CharacterSection />
        <LoginSection />
      </MainContainer>
    </>
  );
}
