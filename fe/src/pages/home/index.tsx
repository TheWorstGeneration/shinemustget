import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLogin } from '@/store/modules/profile';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import getMemberInfo from '../api/memberInfo';
import { ImageButton } from '@/components/atoms/ImageButton/ImageButton';
import { DeleteButton } from '@/components/atoms/DeleteButton/DeleteButton';

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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  margin-top: 5.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  width: 680px;

  @media screen and (max-width: 960px) {
    width: 480px;
  }

  @media screen and (max-width: 500px) {
    width: 425px;
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
        <ButtonContainer>
          <ImageButton />
          <DeleteButton />
        </ButtonContainer>
      </HomeMain>
    </HomeSection>
  );
}
