import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLogin } from '@/store/modules/profile';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import getMemberInfo from '../api/getMemberInfo';
import { ImageButton } from '@/components/atoms/ImageButton/ImageButton';
import { DeleteButton } from '@/components/atoms/DeleteButton/DeleteButton';
import Head from 'next/head';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { MANDALART_READ_MAIN, MEMBER_INFO } from '@/constants/queryKey';
import { getReadMain } from '../api/getReadMain';

const HomeSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
`;

const HomeMain = styled.main`
  width: 100%;
  height: calc(100vh + 6rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  position: relative;

  margin-top: 5.5rem;

  @media screen and (max-width: 960px) {
    height: 100vh;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: absolute;

  top: 740px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 1rem;

  width: 680px;

  @media screen and (max-width: 960px) {
    top: 540px;
    width: 480px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    top: 485px;
    width: 425px;
    padding: 0;
  }

  @media screen and (max-width: 450px) {
    top: 460px;
    width: calc(100vw - 2rem);
  }
`;

export default function Home() {
  const dispatch = useAppDispatch();
  const { data } = useQuery(MEMBER_INFO, getMemberInfo);
  dispatch(setLogin({ imageUrl: data?.imageUrl, nickname: data?.nickname }));
  return (
    <>
      <Head>
        <meta
          name="description"
          content="당신의 만다라트 공유하고 목표를 이루어 보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta
          property="og:title"
          content="Shine Must Get | 당신의 만다라트 공유하고 목표를 이루어 보세요."
        />
        <meta
          property="og:description"
          content="당신의 만다라트 공유하고 목표를 이루어 보세요."
        />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <HomeSection>
        <HomeMain>
          <Mandalart />
          <ButtonContainer>
            <ImageButton />
            <DeleteButton />
          </ButtonContainer>
        </HomeMain>
      </HomeSection>
    </>
  );
}

export const getServersideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(MEMBER_INFO, getMemberInfo);
  await queryClient.prefetchQuery(MANDALART_READ_MAIN, getReadMain);

  return {
    props: dehydrate(queryClient),
  };
};
