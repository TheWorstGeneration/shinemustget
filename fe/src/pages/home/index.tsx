import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLogin } from '@/store/modules/profile';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

interface HomeProps {
  imageUrl: string;
  nickname: string;
}

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  padding: 0 10re;

  background-color: #ffffff;
`;

const HomeMain = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    scale: 0.75;
  }
`;

export default function Home({ imageUrl, nickname }: HomeProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLogin({ imageUrl, nickname }));
  }, []);

  return (
    <HomeSection>
      <HomeMain>
        <Mandalart />
      </HomeMain>
    </HomeSection>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(process.env.BASE_URL + '/api/profile');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
