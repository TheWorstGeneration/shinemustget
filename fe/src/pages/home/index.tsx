import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLogin } from '@/store/modules/profile';
import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect } from 'react';

interface Data {
  imageUrl: string;
  nickname: string;
}

interface HomeProps {
  data: Data;
}

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  padding: 0 10rem;

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

export default function Home({ data }: HomeProps) {
  const { imageUrl, nickname } = data;
  const dispatch = useAppDispatch();
  console.log(data);

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
  const data = await axios
    .get(process.env.BASE_URL + '/api/memberInfo')
    .then(res => res.data);

  return {
    props: {
      data,
    },
  };
};
