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
        <title>Shine Must Get | 샤인머스켓</title>
        <meta
          name="description"
          content="목표 달성을 위한 만다라트를 OpenAI의 ChatGPT를 이용해 자동 제작해주는 서비스입니다."
        />
        <meta name="author" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 샤인머스켓" />
        <meta
          property="og:description"
          content="목표 달성을 위한 만다라트를 OpenAI의 ChatGPT를 이용해 자동 제작해주는 서비스입니다."
        />
        <meta property="og:image" content="assets/images/common/front-end" />
        <meta property="og:url" content="https://shinemustget.com" />
        <meta property="og:site_name" content="Shine Must Get | 샤인머스켓" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Shine Must Get | 샤인머스켓" />
        <meta
          name="twitter:description"
          content="목표 달성을 위한 만다라트를 OpenAI의 ChatGPT를 이용해 자동 제작해주는 서비스입니다."
        />
        <meta name="twitter:image" content="assets/images/common/front-end" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ShineMustGet" />
        <meta name="twitter:creator" content="@ShineMustGet" />
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
