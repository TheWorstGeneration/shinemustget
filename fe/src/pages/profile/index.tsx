import { ProfileLog } from '@/components/organisms/ProfileLog/ProfileLog';
import { ProfileProgress } from '@/components/molecules/ProfileProgress/ProfileProgress';
import styled from '@emotion/styled';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import Head from 'next/head';
import { QueryClient, dehydrate } from 'react-query';
import getClearGoal from '../api/getClearGoal';
import { GetServerSideProps } from 'next';
import getNowGoal from '../api/getNowGoal';
import getClearMandalart from '../api/getClearMandalart';
import {
  MANDALART_READ_CLEAR_GOAL,
  MANDALART_READ_CLEAR_MANDALART,
  MANDALART_READ_NOW_GOAL,
} from '@/constants/queryKey';
import { useGoToLandingPage } from '@/hooks/useGoToLandingPage';

const ProfileTop = styled.section`
  display: flex;
  justify-content: center;
`;

const ProfileSection = styled.section<{ isMaxWidth: boolean }>`
  display: flex;
  margin: 6.5rem 0 0;
  flex-direction: column;

  width: ${({ isMaxWidth }) => (isMaxWidth ? '50vw' : '100vw')};
  padding: ${({ isMaxWidth }) => (isMaxWidth ? '0' : '0 9.5rem')};
  height: 91vh;

  background-color: #ffffff;

  @media (max-width: 960px) {
    padding: 0;
  }

  @media (max-width: 500px) {
    height: 130vh;
  }
`;

export const Profile = (props: any) => {
  useGoToLandingPage();

  const isMaxWidth = useInnerWidth() >= 1440;

  return (
    <>
      <Head>
        <title>Shine Must Get | 개인 프로필 관리</title>
        <meta
          name="description"
          content="프로필 페이지에서 현재 만다라트 진척도를 확인하고, 지난 만다라트를 확인할 수 있습니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 개인 프로필 관리" />
        <meta
          property="og:description"
          content="프로필 페이지에서 현재 만다라트 진척도를 확인하고, 지난 만다라트를 확인할 수 있습니다."
        />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <ProfileTop>
        <ProfileSection isMaxWidth={isMaxWidth}>
          <ProfileProgress />
          <ProfileLog />
        </ProfileSection>
      </ProfileTop>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(MANDALART_READ_NOW_GOAL, getNowGoal, {
    staleTime: 10000,
    cacheTime: 20000,
  });
  await queryClient.prefetchQuery(
    MANDALART_READ_CLEAR_MANDALART,
    getClearMandalart,
    {
      staleTime: 10000,
      cacheTime: 20000,
    },
  );
  await queryClient.prefetchQuery(MANDALART_READ_CLEAR_GOAL, getClearGoal, {
    staleTime: 10000,
    cacheTime: 20000,
  });

  return {
    props: dehydrate(queryClient),
  };
};

export default Profile;
