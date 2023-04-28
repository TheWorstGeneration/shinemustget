import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLogin } from '@/store/modules/profile';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import getMemberInfo from '../api/memberInfo';

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

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const axiosMemberInfo = async () => {
      const memberInfo = await getMemberInfo();
      if (memberInfo) {
        dispatch(setLogin(memberInfo));
      }
    };

    axiosMemberInfo();
  }, []);

  return (
    <HomeSection>
      <HomeMain>
        <Mandalart />
      </HomeMain>
    </HomeSection>
  );
}
