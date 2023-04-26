import styled from '@emotion/styled';
import React from 'react';

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  padding-top: 88px;

  background-color: #f7e600;
`;

export default function Home() {
  return <HomeSection>home</HomeSection>;
}
