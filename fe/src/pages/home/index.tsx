import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import styled from '@emotion/styled';
import React from 'react';

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

export default function Home() {
  return (
    <HomeSection>
      <HomeMain>
        <Mandalart />
      </HomeMain>
    </HomeSection>
  );
}
