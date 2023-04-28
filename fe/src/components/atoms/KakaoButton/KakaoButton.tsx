import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectProfile, setLogin } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonProps {
  size: string;
}

const LargeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #f7e600;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #f7e600;
    opacity: 0.8;
  }
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: #f7e600;
  padding: 1rem;

  &:hover {
    background-color: #f7e600;
    opacity: 0.8;
  }
`;

const LoginText = styled.span`
  font-size: 0.75rem;
  font-weight: 900;
`;

export const KakaoButton = ({ size }: ButtonProps) => {
  const { language } = useAppSelector(selectProfile);

  const handleLogin = () => {
    // TODO: 카카오 로그인 구현
    window.location.href = process.env.NEXT_PUBLIC_LOGIN_REDIRECTURI
      ? process.env.NEXT_PUBLIC_LOGIN_REDIRECTURI
      : '/';
  };

  return size === 'lg' ? (
    <LargeButton type="button" onClick={handleLogin}>
      <FontAwesomeIcon icon={faComment} />
      <LoginText>{language == 'ko' ? '카카오 로그인' : 'LOGIN'}</LoginText>
    </LargeButton>
  ) : (
    <SmallButton type="button" onClick={handleLogin} title="카카오 로그인">
      <FontAwesomeIcon icon={faComment} />
    </SmallButton>
  );
};
